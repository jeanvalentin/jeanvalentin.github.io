# Release a new version of a JavaScript application to cPanel

## A few things you should know first

but are not required to, so [skip this part](#prerequisites) if you feel like it; nobody will judge you.

### Setup Node.js App

Upon creating an application with cPanel's Setup Node.js App tool, you have to provide an _Application root_, which is a directory, and an _Application URL_, which is an URL, but also a directory. 

If your application URL is `example.com`, then a directory named _example.com_ will be created. It contains, among other things, a `.htaccess` with Passenger configuration and environment variables.

If your application root is `myapp`, then that is where your files live, and you have two directories. If your application root happens to also be `example.com`, then so be it, you have only one directory. If your application root is `example.com/current`, then fine, it is a subdirectory of your application URL directory. Either way, your application is accessible at `http://example.com`.

### npm install

When you run `npm install` locally, a directory created `node_modules` is created in your application directory, and that is where the dependencies are installed. However, that is not precisely what happens when you hit that _Run NPM Install_ button on cPanel. `node_modules` is indeed created, but elsewhere. What is created in your application directory is actually a symlink to that node_modules.

Moreover, if said symlink is not present, everything works just fine. Phusion Passenger knows the location of the actual node_modules, and works with it.

If you are wondering, the path follows this pattern: `/home/USERNAME/nodevenv/APPLICATION_ROOT/NODE_VERSION/lib/node_modules`. An actual path, where the application root is `example.com/current` and the node version is 16, may be `~/nodevenv/myapp/current/16/lib/node_modules`. Your npm dependencies are there. They are reused between releases, which means any subsequent run of `npm install` takes much less time as if it were to install all the dependencies from scratch.

### restart.txt

Your application root contains a directory named `tmp`, with an empty file called `restart.txt`. If you touch this file, it tells Phusion Passenger to restart the application. It does not actually restart the application right away, but does so as soon as a request arrives. As a consequence, the next person to use your application will experience a stall, during which the application is actually restarted, before their request is fulfilled. 

Therefore, you may want to trigger a restart of your own. You can achieve this via cPanel's Setup Node.js App tool, by hitting Restart. Or, via ssh, you may proceed as such:
- `touch APPLICATION_ROOT/tmp/restart.txt`
- query your application, for example by executing `curl example.com/api/status`.

## Prerequisites

Your application must live in a subdirectory named `current`. For example, if your application URL is `example.com`, you shall set your application root to `example.com/current`, or `myapp/current`, or anything you want with a subdirectory named `current`. As its name implies, this directory contains the release that is currently live.

## Walkthrough

- upload the new release to your project directory,
- remove `current`, or keep it elsewhere if you like having the option of a rollback,
- rename your new release to `current`,
- run npm install if need be,
- send any request to your application to trigger the restart.

## There has to be a quicker way

Scripts.

```sh
#!/bin/sh
# deploy.sh

SSH_STRING=your_ssh_string
RESTART_URL=your_url

RELEASE_NAME=release_$(date +%Y%m%d_%H%M%S)

echo Creating archive...
tar cfz $RELEASE_NAME.tar.gz .next public package.json server.js
echo Sending files...
scp $RELEASE_NAME.tar.gz $SSH_STRING:/tmp
scp deploy-remote.sh $SSH_STRING:/tmp
rm $RELEASE_NAME.tar.gz
ssh $SSH_STRING "sh /tmp/deploy-remote.sh $RELEASE_NAME"
echo Requesting restart...
curl $RESTART_URL
```

```sh
#!/bin/sh
# deploy-remote.sh

PROJECT_DIRECTORY=your_project_directory

BACKUP=backup_$(date +%Y%m%d_%H%M%S)
PWD=$(pwd)

if [ -z "$1" ]; then
  echo Release archive name required.
  exit 1
fi

if [ ! -f /tmp/"$1".tar.gz ]; then
  echo Release archive /tmp/"$1".tar.gz does not exist.
  exit 2
fi

echo Creating backup...
cd $PROJECT_DIRECTORY
tar cfz $BACKUP.tar.gz current
rm -rf current
echo Creating release...
mkdir current
tar xfz /tmp/"$1".tar.gz -C current
rm /tmp/"$1".tar.gz
cd current
source ~/nodevenv/$PROJECT_DIRECTORY/current/16/bin/activate
echo Installing dependencies...
npm install
mkdir tmp
touch tmp/restart.txt
cd $PWD
rm "$0"
```

- create `deploy.sh` and `deploy-remote.sh` at the root of your local project, with the contents hereabove,
- change the values of _your_ssh_string_, _your_url_, and _your_project_directory_,
- add the following to the `scripts` section of your package.json: `"deploy": "sh deploy.sh",`

These scripts are suited for a Next.js application. However, if you do not use Next.js, tweak the first instruction (`tar cfz $RELEASE_NAME.tar.gz something something`) to fit your needs; just replace _something_ with whichever files you want in the archive.

Note: you could `chmod +x` the scripts; they have the shebang, so they should be executable. While it will definitely work on your computer, it might not be permitted by your cPanel provider. Either way, running them with `sh` works, so just do that.


## Walkthrough, automated

Once the scripts are set up, all you need to do is:

- `npm run build`
- `npm run deploy`

Congratulations, your app is live and up to date.


## Rollback

These scripts create a backup upon each release. Should you need to rollback to a previous version, navigate to your project directory, then:
- remove `current` or rename it to something else,
- pick a backup, and execute `tar xfzv backup_name.tar.gz`,
- run npm install if need be,
- send any request to your application to trigger the restart.

 Backups take space; you may want to visit your remote project directory every once in a while to delete some of the older backups.
