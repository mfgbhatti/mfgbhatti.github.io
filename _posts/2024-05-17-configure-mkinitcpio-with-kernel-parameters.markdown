---
layout: post
title: Configure Mkinitcpio With Kernel Parameters
---

It uses `default_options="--cmdline /etc/kernel/cmdline"`. If you are using a single uefi binary file to load your system without any bootloader. This option will generate binary with kernel parameters. This will be helpfull if you are using btrfs with luks and swap is enabled on a laptop with suspend-then-hibernate from systemd.

My `/etc/kernel/cmdline` contains

```
root=/dev/mapper/cryptroot
resume=UUID=XxXxxxXX-xxxx-Xxxx-xXXx-xxxXxxXXxXXX
resume_offset=nnnnNNNN rw rootflags=subvol=@ rootfstype=btrfs
```

If you are using luks and want to pass discard parameter to kernel on boot. You should put it in `cryptab` or `crypttab.initramfs`. Offset can be obtained by running

```
# btrfs inspect-internal map-swapfile -r swap_file
```

You can verify parameters from `/proc/cmdline` after booting.
