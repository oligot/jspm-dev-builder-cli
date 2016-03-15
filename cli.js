#!/usr/bin/env node

const program = require('commander');
const DevBuilder = require('jspm-dev-builder');
const path = require('path');
const chokidar = require('chokidar');
const reqCwd = require('req-cwd');
const pkg = require('./package');

program
  .version(pkg.version)
  .description(pkg.description)
  .usage('[options] <entrypoint>')
  .option('-o, --out <file>', 'output file (default to dev-bundle.js)', 'dev-bundle.js')
  .option('-w, --watch <pattern>', 'file, directory or glob to watch for changes (default to cwd)', '.')
  .parse(process.argv);

const entrypoint = program.args[0];
if (!entrypoint) program.help();

var appBuilder = new DevBuilder({
  jspm: reqCwd('jspm'),
  expression: entrypoint,
  outLoc: program.out,
  logPrefix: reqCwd('./package.json').name,
  buildOptions: {
    sourceMaps: true
  }
});

appBuilder.build();

chokidar.watch(program.watch, {ignored: /[\/\\]\./}).on('change', function(path) {
  appBuilder.build(path);
});
