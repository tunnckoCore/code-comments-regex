/**
 * code-comments-regex <https://github.com/regexps/code-comments-regex>
 *
 * Copyright (c) 2014 Sindre Sorhus, Jon Schlinkert, Charlike Mike Reagents, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var forOwn = require('for-own');
var filter = require('filter-object');
var strip = require('../index');


function join(fp) {
  return path.join(__dirname, fp);
}

function read(src) {
  var str = fs.readFileSync(join(src),'utf-8');
  return str;
}

function normalize(str) {
  return str.replace(/[\n\r\s]+/g, '');
}

function cli(args, callback) {
  exec(join('../bin/cli.js') + [''].concat(args).join(' '), function (err, stdout) {
    if (err) {
        callback(err);
        return;
      }
      if (!err && (typeof stdout === 'string' || typeof stdout === null)) {
        callback(null)
        return;
      }
      callback(new Error('Something goes wrong. Unknown error.'));
      return;
  });
}


describe('code-comments-regex', function() {
  strip = filter(strip, '*');
  forOwn(strip, function(fn, method) {
    it('should strip ' + method, function(done) {
      var fixture = read('fixture.js');
      var actual = strip[method](fixture, {safe:false})
      var expected = read('expected/strip-' + method + '.js');
      normalize(actual).should.equal(normalize(expected));
      done();
    });
  });
});

describe('code-comments-regex in safe mode {safe:true}', function() {
  strip = filter(strip, '*');
  forOwn(strip, function(fn, method) {
    it('should strip ' + method, function(done) {
      var fixture = read('fixture.js');
      var actual = strip[method](fixture, {safe:true})
      var expected = read('expected/strip-' + method + '-safe.js');
      normalize(actual).should.equal(normalize(expected));
      done();
    });
  });
});

describe('cli', function() {
  strip = filter(strip, '*');
  forOwn(strip, function(fn, method) {
    it('should strip ' + method, function(done) {
      this.timeout(10000);

      var args = [
        '--input test/fixture.js',
        '--output test/actual/strip-' + method + '.js',
        '--method ' + method
      ];

      cli(args, function(e) {
        if (!e) {
          var actual = read('actual/strip-' + method + '.js');
          var expected = read('expected/strip-' + method + '.js');
          normalize(actual).should.eql(normalize(expected));
          done();
          return;
        }
        done(e);
      });
    });
  });
});

describe('cli in safe mode', function() {
  strip = filter(strip, '*');
  forOwn(strip, function(fn, method) {
    it('should strip ' + method, function(done) {
      this.timeout(10000);

      var args = [
        '--input test/fixture.js',
        '--output test/actual/strip-' + method + '-safe.js',
        '--method ' + method,
        '--safe'
      ];

      cli(args, function(e) {
        if (!e) {
          var actual = read('actual/strip-' + method + '-safe.js');
          var expected = read('expected/strip-' + method + '-safe.js');
          normalize(actual).should.eql(normalize(expected));
          done();
          return;
        }
        done(e);
      });
    });
  });
});
