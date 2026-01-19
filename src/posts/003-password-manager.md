---
title: "How to Manage Passwords on Linux Locally Using GNU Pass"
author: "Vikram S. Negi"
date: 2025-04-15
description: "A detailed guide on how to set up a local password store on a linux system."
---

The digital world is more or less become the "real" world that most humans spend time on. And keeping your online space secure has become mission critical. One way to do exactly that is to use a password manager to store and manage all your passwords in one place.

But, you are someone who doesn't trust the companies that offer you these services. Maybe their company policy includes a back-door for the CIA. Instead you decide to use `*.txt` files, which are also vulnerable to security breaches. And potentially have the risk of LLM oversight.

Here is when you should use `pass` which is a local password managing utility tool. And I love its simplicity. `pass` stores your password as encrypted files using GNU Privacy Guard (GPG).

For more informaion on the installation of `pass` visit their [website](https://www.passwordstore.org).

## Setup

Here is a quick setup guide on using `pass`.

**Step 1:** Create a GPG key

```bash
gpg --full-generate-key
```

This generates a full featured key pair (private & public). For more information check out the [documentation](https://docs.fedoraproject.org/en-US/quick-docs/create-gpg-keys/#_creating_gpg_keys_using_the_command_line).

Find your GPG key id (you can also use your email id as a valid key id).

```bash
gpg --list-keys
```

**Step 2:**  Initialize pass

```bash
pass init <gpg-id>
```

## Password Store

Each password is stored as a GPG encrypted file with the filename being a title, website, or resource that requires the password. These passwords can be arranged in meaningful heirarchies of directories.

> Note: All passwords live in `~/.password-store` directory.

Here is an example of such an hierarchy:

```bash
Password Store
├── email
│   ├── gmail
│   └── proton
├── finance
│   ├── jupiter
│   └── zerodha
└── website
    ├── amazon
    └── chatgpt
```

Here email, finance, and website are directories that organize the passwords stored in GPG files.

## Basic Commands

List passwords

```bash
pass ls
```

Show passwords

```bash
pass show email/proton-mail
```

Generate a password

```bash
pass generate dev/github
```

Find more commands

```bash
pass --help
```

## Syncing Passwords

You can also use a remote git repostitory to backup your passwords.

Init git

```bash
pass git init
```

Add remote repo

```bash
pass git remote add origin <git-url>
```

Push and pull changes

```bash
pass git push -u origin <branch>
```

## Exporting GPG Keys

You should always create a backup copy of both your public and private GPG key pair.

Export public key

```bash
gpg --armor --export <gpg-id> > public_key.asc
```
Export private key

```bash
gpg --armor --export-secret-keys <gpg-id> > private_key.asc
```

It is a good practice to verify the exported keys.

Public key

```bash
gpg --import public_key.asc
```

Private key

```bash
gpg --import --dry-run private_key.asc
```

## Editing a Key

Here is how you can edit a key.

```bash
gpg --edit-key <gpg-id>
```

## Parting Regards

If you know the basic command line commands, then navigating and working with `pass` becomes super easy and delightful. Personally, I believe that one should store their passwords locally on their own systems, rather than relying on a third-party service as it may be vulnerable to cyber attacks.
