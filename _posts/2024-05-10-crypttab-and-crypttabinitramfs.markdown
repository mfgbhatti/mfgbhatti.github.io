---
layout: post
title: Crypttab And Crypttabinitramfs
---

**Crypttab**

The four fields of `/etc/crypttab` are defined as follows:
- The first field contains the name of the resulting volume with decrypted
      data; its block device is set up below `/dev/mapper/`.
- The second field contains a path to the underlying block device or file,
      or a specification of a block device via `"UUID="` followed by the device `UUID`.
- The third field specifies an absolute path to a file with the encryption
      key. Optionally, the path may be followed by ":" and an `/etc/fstab` style
      device specification (e.g. starting with `"LABEL="` or similar); in which
      case the path is taken relative to the specified device's file system root.
      If the field is not present or is `"none"` or `"-"`, a key file named after
      the volume to unlock (i.e. the first column of the line), suffixed with
      .key is automatically loaded from the `/etc/cryptsetup-keys.d/` and `/run/cryptsetup-keys.d/`
      directories, if present. Otherwise, the password has to be manually entered
      during system boot. For swap encryption, `/dev/urandom` may be used as key
      file, resulting in a randomized key.
- If the specified key file path refers to an AF_UNIX stream socket in the
      file system, the key is acquired by connecting to the socket and reading
      it from the connection. This allows the implementation of a service to
      provide key information dynamically, at the moment when it is needed.

**Crypttab.initramfs**
- It is same as crypttab but it is used for mainly root partition to decrypt


### td;lr

crypttab is for encrypted partitions other than root. For root use crypttab.initramfs.
