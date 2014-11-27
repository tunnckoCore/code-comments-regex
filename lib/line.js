/**
 * code-comments-regex <https://github.com/regexps/code-comments-regex>
 *
 * Copyright (c) 2014 Sindre Sorhus, Jon Schlinkert, Charlike Mike Reagents, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var reLine = /(?:^|\s?)\/\/([^\\;]+?)$/gm
var reLineIgnore = /(?:^|\s?)\/\/(?!\!)([^\\;]+?)$/gm

/**
 * Strip only line comments, optionally leaving protected comments
 * (e.g. `//!`) intact.
 *
 * @param   {String} `str`  file content or string to strip to
 * @param   {Object} `opts` if `safe:true`, strip only comments that not starts with `//!`
 * @return  {String} String without line comments or empty string.
 * @api public
 */

module.exports = function stripLine(str, opts) {
  opts = opts || {};

  if (opts.safe) {
    reLine = reLineIgnore
  }

  return str ? str.replace(reLine, '') : '';
};
