---
layout: post
title: 'iwlwifi: Your Wifi Is Working?'
---

Sometimes, specially when you are using Arch, after using
`pacman -Syu`, and updating `linux-firmware`, you
will find that there is no wifi present after rebooting. Donot panic,
there is a bug in firmware for iwlwifi which block your system to load
latest firmware for iwlwifi. Just issue command `journalctl -p 3 -xb`,
this will let you know that firmware file is not loading (I dont recall
the exact error message).

```
sudo mv /usr/lib/firmware/faulty.ucode.xz /usr/lib/firmware/faulty.ucode.xz.back
```

Thats is all. your wifi will be up in no time!
