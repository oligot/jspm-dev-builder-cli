'use strict';

const fs = require('fs');
const DevBuilder = require('jspm-dev-builder');
const sane = require('sane');
const reqCwd = require('req-cwd');
const objectAssign = require('object-assign');
const jspm = reqCwd('jspm');

function build(options) {

  DevBuilder.prototype.logError = function() {
    const args = Array.prototype.slice.call(arguments);
    const content = `console.error(${JSON.stringify(args.join('\n'))});`;
    fs.writeFileSync(options.outLoc, content);
    console.log.apply(console, arguments);
  };

  var appBuilder = new DevBuilder(objectAssign({}, options, {
    jspm: jspm,
    logPrefix: reqCwd('./package.json').name,
    buildOptions: {
      sourceMaps: true
    }
  }));

  var builder = new jspm.Builder();
  console.log(`Building the tree for ${options.expression}`);
  builder.trace(options.expression).then(function(tree) {
    var files = [];
    for (var name in tree) {
      let modulePath = tree[name].path;
      if (modulePath) {
        files.push(modulePath);
      }
    }
    console.log(`Building into ${options.outLoc}`);
    appBuilder.build().then(function() {
      var watcher = sane(process.cwd(), {
        glob: files,
        watchman: true
      });
      watcher.on('change', function(changed) {
        console.log(`${changed} changed: rebuilding...`);
        appBuilder.build(changed);
      });
    });
  });
}

module.exports = build;
