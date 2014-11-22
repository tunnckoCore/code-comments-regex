#!/usr/bin/env node
/**
 * code-comments-regex <https://github.com/regexps/code-comments-regex>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var meow = require('meow');
var strip = require('../index');

var cli = meow({
  pkg: '../package.json',
  help: [
    'Options',
    '  --help                     show this help',
    '  --version                  current version of package',
    '  -i | --input   <filepath>  input file',
    '  -o | --output  <filepath>  output file',
    '  -m | --method  [method]    available values are "all", "block" and "line", default "all"',
    '  -s | --safe                safe mode',
    '',
    'Usage',
    '  ccr file.js output.js',
    '  ccr commented.js cleaned.js line',
    '  ccr --method block --output out/putfile.js -i path/to/file.js',
    '',
  ].join('\n')
});

var program = {
  input: cli.input[0] || cli.flags.i || cli.flags.input,
  output: cli.input[1] || cli.flags.o || cli.flags.output,
  method: cli.input[2] || cli.flags.m || cli.flags.method || 'all',
  safe: cli.input[3] || cli.flags.s || cli.flags.safe || false
};


if (program.input && program.output) {
  var safe = program.safe === true ? {safe:true} : {};
  var fixture = fs.readFileSync(program.input, 'utf-8');
  var actual = strip[program.method](fixture, safe);

  fs.writeFileSync(program.output, actual, 'utf-8');
}
