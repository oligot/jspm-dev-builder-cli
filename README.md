# jspm-dev-builder-cli

> Incremental development builds with jspm

## Install

```shell
npm install -g jspm-dev-builder-cli
```

## Usage

```shell
jspm-dev-builder app/app -w app -o bundle.js
```

This will
* bundle your application starting with _app/app_ as entrypoint 
* Output the result in a file _bundle.js_
* watch the directory _app_ and rebuild the application when a file changes

## Credits

Credits goes to Jack Franklin who did all the hard work in [jspm-dev-builder](https://github.com/jackfranklin/jspm-dev-builder).
