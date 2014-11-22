/**
 * code-comments-regex <https://github.com/regexps/code-comments-regex>
 *
 * Copyright (c) 2014 Sindre Sorhus, Jon Schlinkert, Charlike Mike Reagents, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var block = require('./block');
var line = require('./line');

/**
 * Strip all comments
 *
 * {%= docs("strip-all") %}
 *
 * @param   {String} `str`  file contents or string to strip.
 * @param   {Object} `opts` options are passed to `.block`, and `.line`
 * @return  {String} String without comments or empty string.
 * @api public
 */

module.exports = function all(str, opts) {
  if (str) {
    str = line(str, opts);
    str = block(str, opts);
    return str;
  }
  return '';
};
