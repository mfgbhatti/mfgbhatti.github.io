---
layout: post
title: finding and deleting old kernels
---

In Ubuntu, you will some time find fallback kernels in `/boot`. These are
        some time annoyning specially when you do not have something else to do.
        I'm using ubuntu server for my web projects, I updated it, to my my
        surprize there were about four versions of kernel were present. Yes you
        can certainly delete them by issuing command but why so easy. Why not
        use just one command and you will get only two, one for main use and
        other one for fallback.
So any time you got more than two use this command
```
dpkg --list | grep linux-image | awk '{ print $2 }' | sort -V | sed -n '/'`uname -r`'/q;p' \
| sed -n '/linux-image second last/q' | xargs sudo apt-get -y purge
```

But do not forgot to update your `grub config` after this.
