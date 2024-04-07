---
tags: publication
layout: articlelayout.liquid
title: Deploy a Next.js app to cPanel
date: "2022-11-11"
---

## Custom server

Your application requires an explicit entry point. A Next.js custom server fits the need and is easy to implement. Follow the guide at [https://nextjs.org/docs/advanced-features/custom-server](https://nextjs.org/docs/advanced-features/custom-server). 

The given example code contains instructions you most likely need not, but works as is and can be copied and pasted without modification.

## Upload the release

Make sure you have a working build; if not, create one. The default command is `npm run build`.

The following files are required to run the built application:
- _.next_: Next.js build
- _public_: public assets
- _package.json_: self-explanatory
- _server.js_: entry point

A convenient way to send all these files to your hosting provider is to gather them in an archive, for example as such: `tar cfzv release.tar.gz .next public package.json server.js`

Upload and extract the archive to your cPanel server. If you are able to do it via ssh, then by all means. In any case, you may use cPanel's file manager, accessible from the cPanel home page. Browse to your project directory, upload the archive, extract the contents, then delete the archive.

## Setup Node.js App

From the cPanel home page, navigate to Setup Node.js App. Hit the big button "Create Application", then fill the form:
- Node.js version: pick one. If you don't know, pick the  most recent.
- Application mode: _production_
- Application root: path to the directory where you have just extracted your files. 
- Application URL: choose your URL from the list; leave the text field blank unless you have to fill it.
- Application startup file: _server.js_

Define a Passenger log file if you wish so. Define environment variables if your app uses them.

Hit "Create". Your application is now set up.

Hit "Run NPM Install". Navigate to your URL. Congratulations, your app is live.

## "Drawbacks"

You now have a custom server. As mentioned in the Next.js documentation linked earlier, it has a few drawbacks, one of them being that you cannot deploy your application on Vercel. But wait, this does not matter at all. You are reading these lines because you are deploying your application on a cPanel provider anyway, i.e., not on Vercel. You will also pass on edge functions and automatic static optimization, at least those provided by Vercel. But again, you are using cPanel, so you know that already.

Now the good news. "Custom server" means "you can do whatever you want with your server", something that would be off limits had you deployed your app on Vercel, so go all in. Add middleware, set custom routes, use RabbitMQ, replace all the API, you name it. Yes, you read that right, your regional €5 web hoster provides more flexibility than Vercel, so take advantage of it. Terms and conditions apply, probably.
