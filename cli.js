#!/usr/bin/env node

const program = require('commander');
const build = require('./index');
const pkg = require('./package');

program
  .version(pkg.version)
  .description(pkg.description)
  .usage('[options] <entrypoint>')
  .option('-o, --out <file>', 'output file (default to dev-bundle.js)', 'dev-bundle.js')
  .parse(process.argv);

const expression = program.args[0];
if (!expression) program.help();

build({
  expression: expression,
  outLoc: program.out,
});
