
var foo = function foo(oneline, func) {
  // indented oneline line comment
  var indented = 'variable'; // some "double-quotes" here

 
  var and = true; // after var

  // indented with http://google.url.com
  var six = 'and maybe ./some*/star/*/*path.js';// again without spaces

  /**!
   * ignored indented
   * block comment
   */
  function url(that) {};

 
  var faz = 'and ./globstar/path/to/**/*.js source';
};

var bar = true;

//! ignored oneline line comment before variable
var baz = 'oneline block string';

var qux = 'globstar-like ./path/to/*/some/file.js here';

//! @mk-pmb use case for
//! line comments bug
process.stdout.write('string literals: ');
console.dir({
  str0: '&apos;',
  str1: "&quot;",
  str2: ". // ' \\ . // ' \\ ."
});

process.stdout.write('RegExp literals: ');
console.dir({
  regexp0: /I'm the easiest in Chomsky hierarchy!/,
});

/*!
 * ignored not indented
 * block comment
 * @type {String}
 */
var fuz = 'some //line comment in string'; // line comment after variable

// here some
// multiline
// line comment
var _with = 'leading  //                    whitespace should be stripped';

var globstar = 'one ./glob/star/*/*like*/*.js more'; // some long; text with 'single-quotes' here

// globstar in line
// comment ./globstar/path/to/**/*.js source
var again = 'fake ./some*/star/*/*path.js here';

// oneline line comment with http://url.com
var url = 'line comment in string // with http://some.url.com'; //! ignored line comment
