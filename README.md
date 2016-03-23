# jspm-dev-builder-cli

> Incremental development builds with jspm

## Motivations

By default, jspm fetches and transpiles all the files in the browser which is great as you don't have to configure anything.
However, when your project grows, this turn out to take a lot of times.
This project is an attempt to reduce this time by watching the files and rebuilding when they change.

## Install

Install [watchman](https://facebook.github.io/watchman/docs/install.html) and then run this command in a terminal
```shell
npm install -g jspm-dev-builder-cli
```

## Usage

```shell
jspm-dev-builder app/app -o bundle.js
```

This will
* bundle your application starting with _app/app_ as entrypoint 
* Output the result in a file _bundle.js_
* watch files and rebuild the application when a file changes

## Watched files

How do we know which files to watch ?
It turns out that SystemJS builder (which is used by jspm to build your app) has this nice method called _trace_ that build direct trace tree objects that can be used to determine your app files.
That way, we are sure we only watch the files that are really needed and not all the files of a given folder that have nothing to do with jspm (like a README.md file for example).

## Credits

Credits goes to Jack Franklin who did all the hard work in [jspm-dev-builder](https://github.com/jackfranklin/jspm-dev-builder).
