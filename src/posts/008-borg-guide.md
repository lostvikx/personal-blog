---
title: "How to Create Backups using Borg"
author: "Vikram S. Negi"
date: 2025-12-15
description: "Learn how to use the borg CLI tool to take backups of your system."
---

Taking regular backups of your computer system is considered a vital maintenance practice. It is crutial as hardware can fail anytime leading to loss of important personal data. It ensures safety by providing recovery option and peace of mind. A point to note is not how your hardware will fail, but when will it fail.

A program that I like to use for taking backups and ensuring redundancy of my files is [borg](https://www.borgbackup.org/). Here is a concise guide to using the BorgBackup (borg) command-line tool. `borg` is a powerful, deduplicating backup program ideal for Linux systems.

Borg mainly focuses on:

* Deduplication (store only unique data chunks)
* Compression
* Encryption

The main goal of `borg` is to provide an efficient and secure way to backup data.

## Installation

Install borg on your system using your distro specific package manager.

```bash
sudo pacman -S borg
```

## Create a Repository

Create a new repository for backing up your data. Use the `--encryption` flag to encrypt the repo with a passkey. Make sure the save that passkey using a password manager like [pass](/posts/password-manager).

```bash
borg init --encryption repokey /path/to/backup-repo
```

## Create an Archive

An archive is a backup created of the various files (or entire system) in the encrypted repository. As `borg` is a uses deduplication technique, meaning that it only the changes in the files are stored and not the duplicates. Hence, making it ideal for taking regular (or even daily) backups.

The following is an example of creating a new archive in a given borg repository.

```bash
borg create                                     \
    --list                                      \
    --compression lz4                           \
    --exclude-caches                            \
    --exclude $HOME/.local                      \
    --exclude $HOME/.var                        \
    --exclude $HOME/Games                       \
    /path/to/backup-repo::'{hostname}-{now}'    \
    $HOME
```

Note the various flags it uses:

* `--list`: lists the files being archived (verbose).
* `--compression lz4`: uses the lz4 compression algorithm.
* `--exclude <directory-name>`: excludes the given directory.

## List Archives

List all archives in a borg repository:

```bash
borg list /path/to/backup-repo
```

List all contents (files and directories) in a specific archive:

```bash
borg list /path/to/backup-repo::archive-name
```

Get archive information:

```bash
borg info /path/to/backup-repo::archive-name
```

## Extract Files

Extract the files in an archive to the current directory.

```bash
borg extract /path/to/backup-repo::archive-name
```

To extract in a specific location:

```bash
borg extract /path/to/backup-repo::archive-name $HOME/archive-name
```

> **Note:** Use `--dry-run` to preview what would be extracted.

## Mount Archive & Copy Files

Sometimes it is easier to visualize the files by using a file manager application like `thunar`. We can mount a backup archive at a location to view and inspect it in a file manager.

```bash
mkdir -p /mnt/borg
borg mount /path/to/repo::archive-name /mnt/borg
```

Now that we have mounted the archive to a location in our computer's file system, we can use a program called `rsync` to copy files in an efficient and reliable manner.

```bash
rsync -avhP /mnt/borg/path/to/some-dir $HOME/archive-data
```

When the copying in completed, always make sure to unmount the archive from the file system.

```bash
borg umount /mnt/borg
```

## Delete Old Archives

If running low on space on the disk (external), we can delete old archives or even entire repositories.

```bash
borg delete /path/to/backup-repo::archive-name
```

When deleting an archive, use the `compact` sub-command after using the `delete` to free up disk space.

```bash
borg compact --progress /path/to/backup-repo
```

## Verify Repository

To verify the integrity of the repository use the following command:

```bash
borg check /path/to/backup-repo
```

## Closing Remarks

Borg is an amazing tool to create and manage backup archives of Linux systems, making the process effortless and secure for users. Its deduplication and encryption features ensure that your data is backed up efficiently and is protected from bad actors. This guide has provided a foundational understanding of how to get started with `borg`.

By utilizing `borg` as your regular backup manager, you can gain peace of mind knowing that your valuable data is safe and recoverable in case of any unforeseen events.
