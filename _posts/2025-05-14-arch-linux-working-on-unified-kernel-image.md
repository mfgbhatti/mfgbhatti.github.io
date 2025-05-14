---
layout: post
title: arch linux working on unified kernel image
---

## What is a Unified Kernel Image?
A Unified Kernel Image (UKI) is a single executable file that combines:

- The Linux kernel
- An initramfs (initial RAM filesystem)
- The kernel command line
- UEFI stub (for direct UEFI booting)
- Optional secure boot signatures

UKIs simplify the boot process by bundling everything needed into one file, making it easier to manage and sign for Secure Boot compatibility.

## Generating UKIs
Arch linux mkinitcpio will assemble the UKI itself unless `systemd-ukify` is installed.

### Using mkinitcpio
`mkinitcpio` preset file for the `linux` package at `/etc/mkinitcpio.d/linux.preset`

    ESP_DIR="/efi/EFI/ArchLinux"

    ALL_kver="/boot/vmlinuz-linux${SUFFIX}"

    PRESETS=('default') # this is not for a fallback

    default_image="/boot/initramfs-linux${SUFFIX}.img"
    default_uki="${ESP_DIR}/arch-linux${SUFFIX}.efi"
    default_options="--cmdline /etc/kernel/cmdline"

This code can be helpfull when creating a template i.e. for `linux-lts` e.g. in `/etc/mkinitcpio.d/linux.preset`

    SUFFIX="-lts"
    source /etc/mkinitcpio.d/linux.preset

#### Kernel command line
`mkinitcpio` supports reading kernel parameters from command line files in the `/etc/cmdline.d directory`. `mkinitcpio` will concatenate the contents of all files with a .conf extension in this directory and use them to generate the kernel command line. Or `/etc/kernel/cmdline` can also be used as illustrated in above code.

    rd.luks.name=fe30dd04-9v8a-4817-q10e-0999ece7oo31=archlinux root=/dev/mapper/archlinux rootflags=noatime,ssd,compress=zstd:1,space_cache=v2,discard=async,subvol=@ rw quiet splash loglevel=3 systemd.show_status=auto rd.udev.log_level=3

### Additional info
`mkinitcpio.conf` contains hooks e.g.

    HOOKS=(base systemd plymouth autodetect microcode modconf kms keyboard sd-vconsole block sd-encrypt filesystems fsck)

# Note
Please give a proper read [unified_kernel_image](https://wiki.archlinux.org/title/Unified_kernel_image) and [mkinitcpio](https://wiki.archlinux.org/title/Mkinitcpio).
