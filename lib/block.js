/**
 * strip-comments <https://github.com/jonschlinkert/strip-comments>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var reBlock = /(?:^|\s)(?:\/\*(?!\*?\/)(?:[\S\s]+?)\*\/)/gm
var reBlockIgnore = /(?:^|\s)(?:\/\*(?!(\*?\/|\*?\!))(?:[\S\s]+?)\*\/)/gm

/**
 * Strip only block comments, optionally leaving protected comments
 * (e.g. `/*!`, `/**!`) intact.
 *
 * @param   {String} `str`  file content or string to strip to
 * @param   {Object} `opts` if `safe:true`, strip only comments that not starts with `/*!` or `/**!`
 * @return  {String} String without block comments or empty string.
 * @api public
 */

module.exports = function stripBlock(str, opts) {
  opts = opts || {};

  if(opts.safe) {
    reBlock = reBlockIgnore
  }

  return str ? str.replace(reBlock, '') : '';
};
