var fs = require('fs');

// yesterday's regexes
// var reBlock = /\/\*(?!\/)(?:[\S\s\W\w]+?)\*\//gm
// var reBlockIgnore = /\/\*(?!(\*?\/|\*?\!))(?:[\S\s\W\w]+?)\*\//gm
// var reLine = /(?:^|\s)\/\/([\S\s\W\w]+?)$/gm
// var reLineIgnore = /(?:^|\s)\/\/(?!\!)([\S\s\W\w]+?)$/gm

// today regexes
var reBlock = /(?:^|\s)(?:\/\*(?!\*?\/)(?:[\S\s]+?)\*\/)/gm
var reBlockIgnore = /(?:^|\s)(?:\/\*(?!(\*?\/|\*?\!))(?:[\S\s]+?)\*\/)/gm
var reLine = /(?:^|\s?)\/\/([^\\;]+?)$/gm
var reLineIgnore = /(?:^|\s?)\/\/(?!\!)([^\\;]+?)$/gm

var fixture = fs.readFileSync('./fixture.js', 'utf-8')


var actualBlock = fixture.replace(reBlock,'')
var actualBlockIgnore = fixture.replace(reBlockIgnore,'')

var actualLine = fixture.replace(reLine,'')
var actualLineIgnore = fixture.replace(reLineIgnore,'')

var actualAll = actualBlock.replace(reLine,'')
var actualAllIgnore = actualBlockIgnore.replace(actualLineIgnore,'')

var args = process.argv.slice(2)

if (!args[0]) {
  console.log('choose between "all", "block", "line"')
  return;
}

if (args[0] === 'line') {
  if (args[1] === 'safe') {
    console.log(actualLineIgnore)
    return;
  }
  console.log(actualLine)
  return;
}

if (args[0] === 'block') {
  if (args[1] === 'safe') {
    console.log(actualBlockIgnore)
    return;
  }
  console.log(actualBlock)
  return;
}

if (args[0] === 'all') {
  if (args[1] === 'safe') {
    console.log(actualAllIgnore)
    return;
  }
  console.log(actualAll)
  return;
}
