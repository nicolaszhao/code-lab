/**
 *
 * All rights reserved.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';

require("babel-core/register")({
  only: /local-cli/,
});

var server = require('./server');
var defaultConfig = require('./defaultConfig');
var Config = require('./util/Config');
var path = require('path');
var Promise = require('promise');
var fs = require('fs');
var gracefulFs = require('graceful-fs');

// graceful-fs helps on getting an error when we run out of file
// descriptors. When that happens it will enqueue the operation and retry it.
gracefulFs.gracefulify(fs);

var documentedCommands = {
  'start': [server, 'starts the webserver']
}

var commands = Object.assign({}, documentedCommands);


function run() {
  var args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('error usage')
  }

  var command = commands[args[0]];
  if (!command) {
    console.error('Command `%s` unrecognized', args[0]);
    return;
  }

  command[0](args, Config.get(__dirname, defaultConfig)).done();
}



if (require.main === module) {
  run();
}
