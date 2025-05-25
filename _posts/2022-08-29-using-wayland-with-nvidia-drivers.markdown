---
layout: post
title: Using Wayland With Nvidia Drivers
---

Wayland does not play well with proprietary drivers especially with
        Nvidia. But some time installing Nvidia drivers to use with
        <a href="https://github.com/geminis3/envycontrol">Evonycontrol</a>,
        which is way better than any Nvidia Optimus System Managers. If you are
        using Gnome, it will automatically disable Wayland upon first install.
        But with Linux, there is always way around.
First of all, edit `/etc/gdm/custom.conf` and see and comment out the
        line containing `WaylandEnable=false`. This file should look like after
        editing
```
# GDM configuration storage daemon
# Uncomment the line below to force the login screen to use Xorg
#WaylandEnable=false
```
Edit `/usr/lib/udev/rules.d/61-gdm.rules` and comment out below two lines. This is the only case in my experience.

```
LABEL="gdm_prefer_xorg"
# RUN+="/usr/lib/gdm-runtime-config set daemon PreferredDisplayServer xorg"
GOTO="gdm_end"

LABEL="gdm_disable_wayland"
# RUN+="/usr/lib/gdm-runtime-config set daemon WaylandEnable false"
GOTO="gdm_end"
```
`kms-modifiers` must be enabled through `gsettings`. Try the following command
```
gsettings set org.gnome.mutter experimental-features '["kms-modifiers"]
```

Enable modesetting for nvdia drivers. Follow the <a href="https://wiki.archlinux.org/index.php/NVIDIA#DRM_kernel_mode_setting">Arch Wiki Instructions</a>. Also make sure to double check `xorg-xwayland` and `egl-wayland` are installed. The most important thing, **Reboot**. Congratulations, Gnome is running with Wayland despite Nvidia drivers. This will only work for arch linux. I have not tried it on any other Linux.
