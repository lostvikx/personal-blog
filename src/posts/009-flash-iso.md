---
title: "Flashing a USB Stick"
author: "Vikram S. Negi"
date: 2026-01-18
description: "A guide to using command line for flashing a USB stick."
---

Flashing an .iso file to a USB stick is an important step in installing operating systems on a modern hardware. This process can be entirely done on the command line, I prefer this method as it is more reliable than using a GUI application. We will be using the `dd` command to accomplish our goal.

> **WARNING**: `dd` is a powerful and dangerous command. If you specify the wrong output device (`of=`), you can permanently erase data on your main drive.

## Identify USB Device

First step is to know the correct name for your USB stick (`/dev/sdb`). Note that we need to format the whole device and not a partition.

List block devices plugging in your USB:

```bash
lsblk
# OR
sudo fdisk -l
```

Find your USB stick. It will usually be named something like `/dev/sdb`. Pay attention to its size to confirm it's your USB drive.

> **CRITICAL:** From this point forward, replace `/dev/sdX` in the commands with your actual device.

## Unmount the USB Device

If your system automatically mounted the USB stick's partitions, you need to unmount them before using `dd`.

Unmount all partitions of your USB device:

```bash
sudo umount /dev/sdX1
sudo umount /dev/sdX2
# ... and so on for any other partitions
```

If `umount` complains the device is busy, make sure no file manager, terminal, or other application is accessing it. Sometimes simply closing the file manager window showing the USB contents is enough.

## Flash the ISO

Now, execute the `dd` command. Here is an example of how to flash your USB with an `.iso` file.

```bash
sudo dd if=/path/to/your_image.iso of=/dev/sdX bs=4M status=progress conv=fsync
```

Command breakdown:

* `sudo`: root privileges, this is required for writing directly to a device.
* `dd`: command line utility for copying files.
* `if=/path/to/your_image.iso`: `if` stands for "input file".
* `of=/dev/sdX`: `of` stands for "output file".
* `bs=4M`: `bs` stands for "block size".
* `status=progress`: shows the progress of the operation.
* `conv=fsync`: written data is immediately synced to the disk, preventing data loss if system crashes or drive is removed prematurely.

Enter your password if prompted. The process can take several minutes depending on the size of the ISO and the write speed of your USB stick.

## Synchronize Data to Disk

Even after `dd` reports completion, some data might still be in the kernel's write buffer. It's good practice to explicitly flush these buffers to the disk.

```bash
sudo sync
```

Wait for this command to complete (it will return to the prompt after flushing).

## Safely Remove the USB Stick

You can now safely remove your USB stick. It should be bootable.

```bash
sudo eject /dev/sdX
```

## Conclusion

Hopefully this simple guide to using the command line for flashing an `.iso` file to a USB stick is useful. Command line is my preferred choice for flashing a USB stick, it provides more transparency and reliability than a traditional GUI application.
