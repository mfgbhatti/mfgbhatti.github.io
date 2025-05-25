---
layout: post
title: Passing RealIp Address To Nginx Access Log
---

When you place Nginx behind Cloudflare, the `http_remote_addr` in Nginx `access_log` will contain the Cloudflare IP, which is not helpfull when banning users. To enable Nginx to resolve the real IP of visitors, we need to whitelist the Cloudflare IPs and map the header value.
```
set_real_ip_from [Cloudflare IP]

real_ip_header CF-Connecting-IP;
```

To automate this process, we can write a bash script `/usr/bin/get_cloudflare_ips.sh` that handles this repetitive task.

```
#!/usr/bin/env bash

generate_ip_file() {
    CMD="$1"

    printf "# https://www.cloudflare.com/ips\n"
    printf "# Generated at %s\n" "$(LC_ALL=C date)"

    for TYPE in v4 v6; do
        printf "\n# IP%s\n" "$TYPE"
        curl -sL "https://www.cloudflare.com/ips-$TYPE/" | sed "s!^!$CMD !g" | sed "s!\$!;!g"
        printf "\n"
    done
}

(generate_ip_file set_real_ip_from && printf "real_ip_header CF-Connecting-IP;\n") > /etc/nginx/conf.d/cloudflare.conf

```

Assuming this works well, it will produce `/etc/nginx/conf.d/cloudflare.conf` like

```
# https://www.cloudflare.com/ips
#

# IPv4
set_real_ip_from 173.245.48.0/20;
set_real_ip_from 103.21.244.0/22;
set_real_ip_from 103.22.200.0/22;
set_real_ip_from 103.31.4.0/22;
set_real_ip_from 141.101.64.0/18;
set_real_ip_from 108.162.192.0/18;
set_real_ip_from 190.93.240.0/20;
set_real_ip_from 188.114.96.0/20;
set_real_ip_from 197.234.240.0/22;
set_real_ip_from 198.41.128.0/17;
set_real_ip_from 162.158.0.0/15;
set_real_ip_from 104.16.0.0/13;
set_real_ip_from 104.24.0.0/14;
set_real_ip_from 172.64.0.0/13;
set_real_ip_from 131.0.72.0/22;

# IPv6
set_real_ip_from 2400:cb00::/32;
set_real_ip_from 2606:4700::/32;
set_real_ip_from 2803:f800::/32;
set_real_ip_from 2405:b500::/32;
set_real_ip_from 2405:8100::/32;
set_real_ip_from 2a06:98c0::/29;
set_real_ip_from 2c0f:f248::/32;
real_ip_header CF-Connecting-IP;
```

Since Cloudflare may update their IP addresses, it’s best practice to stay synced with them. To overcome this difficulty, a nice systemd timer at `/etc/systemd/system/cloudflare.timer` like


```

[Unit]
Description=Running cloudflare service

[Timer]
OnCalendar=Sat *-*-1..7 18:00:00
Persistent=true

[Install]
WantedBy=timers.target

```

This timer will run after 4 weeks and start a service `/etc/systemd/system/cloudflare.service` which in turn will execute bash script at `/usr/bin/get_cloudflare_ips.sh`

```

[Unit]
Description=Fetching cloudflare ips
 
[Service]
Type=simple
ExecStart=/usr/bin/get_cloudflare_ips.sh
```
