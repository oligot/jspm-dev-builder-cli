'use strict';

const DevBuilder = require('jspm-dev-builder');
const sane = require('sane');
const reqCwd = require('req-cwd');
const objectAssign = require('object-assign');
const jspm = reqCwd('jspm');

function build(options) {
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
