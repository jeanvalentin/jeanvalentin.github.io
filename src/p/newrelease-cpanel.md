---
tags: publication
layout: articlelayout.liquid
title: Release a new version of a JavaScript application to cPanel
date: "2022-11-13"
---

## A few things you should know first

but are not required to, so [skip this part](#prerequisites) if you feel like it; nobody will judge you.

This article assumes you are using cPanel and Phusion Passenger with CloudLinux. Otherwise, YMMV.

### Setup Node.js App

Upon creating an application with cPanel's Setup Node.js App tool, you have to provide an _Application root_, which is a directory, and an _Application URL_, which is an URL, but also a directory. 

If your application URL is _example.com_, then a directory named _example.com_ will be created. It contains, among other things, a _.htaccess_ with Passenger configuration and environment variables.

If your application root is _myapp_, then that is where your files live, and you have two directories. If your application root happens to also be _example.com_, then so be it, you have only one directory. If your application root is _example.com/current_, then fine, it is a subdirectory of your application URL directory. Either way, your application is accessible at _[http://example.com](http://example.com)_.

### npm install

When you run `npm install` locally, a directory created _node_modules_ is created in your application directory, and that is where the dependencies are installed. However, that is not precisely what happens when you hit that _Run NPM Install_ button on cPanel. _node_modules_ is indeed created, but elsewhere. What is created in your application directory is actually a symlink to that _node_modules_.

Moreover, if said symlink is not present, everything works just fine. Phusion Passenger knows the location of the actual node_modules, and works with it.

If you are wondering, the path follows this pattern: `/home/USERNAME/nodevenv/APPLICATION_ROOT/NODE_VERSION/lib/node_modules`. An actual path, where the application root is _example.com/current_ and the node version is 16, may be `~/nodevenv/myapp/current/16/lib/node_modules`. Your npm dependencies are there. They are reused between releases, which means any subsequent run of `npm install` takes much less time as if it were to install all the dependencies from scratch.

### restart.txt

Your application root contains a directory named _tmp_, with an empty file called _restart.txt_. If you touch this file, it tells Phusion Passenger to restart the application. It does not restart the application right away, but does so as soon as a request arrives. As a consequence, the next person to use your application will experience a stall, during which the application is actually restarted, before their request is fulfilled. This behaviour is documented here: [https://www.phusionpassenger.com/docs/advanced_guides/troubleshooting/apache/restart_app.html](https://www.phusionpassenger.com/docs/advanced_guides/troubleshooting/apache/restart_app.html)

Therefore, you may want to trigger a restart of your own. You can achieve this via cPanel's Setup Node.js App tool, by hitting Restart. Or, via ssh, you may proceed as such:
- `touch APPLICATION_ROOT/tmp/restart.txt`
- query your application, for example by executing `curl example.com/api/status`.

<span id='prerequisites'/>

## Prerequisites

Your application must live in a subdirectory named _current_. For example, if your application URL is _example.com_, you shall set your application root to _example.com/current_, or _myapp/current_, or anything you want with a subdirectory named _current_. As its name implies, this directory contains the release that is currently live.

## Walkthrough

- upload the new release to your project directory,
- remove _current_, or keep it elsewhere if you like having the option of a rollback,
- rename your new release to _current_,
- run `npm install` if need be,
- send any request to your application to trigger the restart.

## There has to be a quicker way

Script.

```sh
#!/bin/sh
# deploy.sh

SSH_STRING=
RESTART_URL=
PROJECT_DIRECTORY=

RELEASE_NAME=release_$(date +%Y%m%d_%H%M%S)

echo Creating archive...
tar cfz $RELEASE_NAME.tar.gz .next public package.json server.js
echo Sending files...
scp $RELEASE_NAME.tar.gz $SSH_STRING:$PROJECT_DIRECTORY
rm $RELEASE_NAME.tar.gz

ssh $SSH_STRING <<EOF
echo Creating backup...
cd $PROJECT_DIRECTORY
tar cfz backup_$(date +%Y%m%d_%H%M%S).tar.gz current
rm -rf current
echo Creating release...
mkdir current
tar xfz $RELEASE_NAME.tar.gz -C current
rm $RELEASE_NAME.tar.gz
cd current
source ~/nodevenv/$PROJECT_DIRECTORY/current/16/bin/activate
echo Installing dependencies...
npm install
mkdir tmp
touch tmp/restart.txt
EOF

echo Requesting restart...
curl $RESTART_URL

```


- create "deploy.sh" at the root of your local project, with the contents hereinabove,
- set the values of: <ul>
    <li>SSH_STRING: your ssh credentials,</li>
    <li>RESTART_URL: any URL of your application,</li>
    <li>PROJECT_DIRECTORY: your application root path, without "current"</li></ul>
- add the following to the "scripts" section of your package.json: `"deploy": "sh deploy.sh",`

This script is suited for a Next.js application. However, if you do not use Next.js, tweak the release archive instruction (`tar cfz $RELEASE_NAME.tar.gz something something`) to fit your needs; replace _something_ with whichever files you want in the archive.

Yes, you can `chmod +x` the script if you want.


## Walkthrough, automated

Once the script is set up, all you need to do is:

- `npm run build`
- `npm run deploy`

Congratulations, your app is live and up to date.


## Rollback

This script creates a backup upon each release. Should you need to rollback to a previous version, navigate to your project directory, then:
- remove _current_ or rename it to something else,
- pick a backup, and execute `tar xfzv backup_name.tar.gz`,
- run `npm install` if need be,
- send any request to your application to trigger the restart.

Backups take space; you may want to visit your remote project directory every once in a while to delete some of the older backups.
