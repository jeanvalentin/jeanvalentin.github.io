---
tags: publication
layout: articlelayout.liquid
title: "Package managers: bringing the best of Linux to Windows"
date: "2022-11-26"
---

You want to install a new program to Windows. What do you do? Simple, really.

Input the name of the application in a search engine, pick the right link among all the advertisements and fake websites, find your way through the site of the program supplier to locate the downloads page, find the download for the right version, your OS, and your processor architecture, find the real link among the advertisements that look like download buttons, download the file, launch the installer, go through all the menus, opt out of the extra bloatware, click Finish, and here you go, the program is installed. Could not be more simple.

Then, updating the program is even easier.

Just wait until the program notifies you that an update is available, download the update by some way that may vary between applications, launch the updater, go through all the menus, remember to opt out of the extra bloatware again, click Finish, and here you go, fresh version. Easy, really. Then just do that for all your programs. If the program never notifies for updates, then you can go to their website again, or never update, your choice.

What if you need to uninstall a program?

Find the uninstaller, it must be somewhere in the start menu. If not, there should be one in the installation directory, which is probably in Program Files, or maybe in Program Files (x86), or maybe in AppData, or maybe elsewhere. Then launch the uninstaller, go through all the menus, fill the survey asking you why you are uninstalling and telling you you should reconsider, close the browser popups, and there you go, your program is gone, save for some random files here and there that the uninstaller could not be bothered to remove, and will just live forever on your storage drive. Also, something something stale registry entries, whatever, who cares. True convenience! If there is no uninstaller, fear not: you can always try your luck in Add or remove programs, or resign and ignore the program for the rest of your life.

To make it clear, just in case: everything above this line is sarcasm. Managing software this way is a horrible, humiliating experience that will leave your soul scathed and your computer bloated.

## Enter package managers

Install a package on any Debian-based Linux distribution:

`sudo apt install package_name`

Update all packages:

`sudo apt update && sudo apt upgrade -y`

Remove a package:

`sudo apt remove package_name`

## Come on, Windows

Software management on Linux is simple; software management on Windows is a never-ending pilgrimage. All major Linux distributions got that right, but Windows did not? Why? Microsoft could not come up with a package manager of their own<sup>1</sup>, so someone else did and bestowed upon forsaken Windows users Chocolatey.

And if you think it does the same things apt does, but on Windows, then in most cases, you are right.

<sup>1. Actually, Windows has a package manager; more on that later.</sup>

## Get started with Chocolatey

This is the last program you will ever need to manually fetch with your web browser. Even better news: you do not even have to download an executable installer. Follow the directions here: [https://chocolatey.org/install](https://chocolatey.org/install)

TL;DR: open a PowerShell admin console and paste the following:

```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

Done. You now have a package manager. Next time you need to manage software, do not open a web browser. Open a PowerShell admin console.

Find a package?

`choco search package_name`

Install a package?

`choco install package_name`

Update all packages?

`choco upgrade all -y`

Uninstall a package?

`choco uninstall package_name`

Have a nice user interface instead of the console?

`choco install chocolateygui`

Anything else?

[https://docs.chocolatey.org/en-us/choco/commands/](https://docs.chocolatey.org/en-us/choco/commands/)

But wait, is it really that simple?

Yes, yes it is.

## Provisioning with Chocolatey

You have a fresh Windows install, and now you have to add plenty of software.

There was a joke, back in the days: "Do you know the only thing Internet Explorer is good at? Downloading Firefox."

The days are over, mostly because Internet Explorer is extinct, but also, you know, everything you just read. Now open Edge and go find that Chocolatey install string to paste into your PowerShell admin console. Then close Edge forever and use Chocolatey to install Firefox, and also to install everything else.

Of course you can batch install. Here is an example:

```
choco install 7zip firefox git keepass libreoffice-still nmap rufus smplayer vscode winscp
```

Make your own provisioning by customizing the package names in the command, then save it to a text file to reuse it later, on other machines or on your next Windows fresh install.

## A word about Winget

Yes, Microsoft has its own package manager now. In fact, Winget is even included by default in Windows 11 and the later builds of Windows 10. Is it good? Yes. Is it better than Chocolatey? No.

The thing is, at the time of this publication, Chocolatey's repositories are far more furnished than Winget's, which means if you are looking for an obscure package, Chocolatey will have it, but Winget will not.

For now, you may be better off sticking to Chocolatey. Winget, nonetheless, is good software, a welcome addition to Windows, and worth watching. Time will tell.
