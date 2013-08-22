var toUTF8Array = require('./to-utf8-array.js');
var matchEncodableCharacters = / \r\n|\r\n|[^!-<>-~ ]/gm;
var matchTrailingSoftLineBreak = /\=\r\n$/;

function zeroPad(text) {
  while (text.length < 2) {
    text = '0' + text;
  }
  return text;
}

function encodeCharacters(characters) {
  var charCode;

  // Encode space before CRLF sequence to prevent spaces from being stripped
  // Keep hard line breaks intact; CRLF sequences
  if (characters.length > 1) {
    return characters.replace(' ', '=20');
  }

  // Encode matching character
  charCode = characters.charCodeAt(0);

  //return '=' + hexChars[((charCode >>> 4) & 15)] + hexChars[(charCode & 15)];
  return toUTF8Array(characters).map(function (c) { return '=' + zeroPad(c.toString(16).toUpperCase());  }).join('');
}

// Split lines to 75 characters; the reason it's 75 and not 76 is because softline breaks are preceeded by an equal sign; which would be the 76th character.
// However, if the last line/string was exactly 76 characters, then a softline would not be needed.
function encodeSplitLine(line) {
  if (line.substr(line.length - 2) === '\r\n') {
    return line;
  }

  return line + '=\r\n';
}

function trimLastSoftLinebreak(text) {
  return text.replace(matchTrailingSoftLineBreak, '');
}

function splitLongLines(text) {
  var lines = '';
  var counter = 1;
  var i = 0;
  var length = text.length;

  while (i < length) {
    if (text[i] === '\r' && text[i + 1] === '\n') {
      lines += '\r\n';
      counter = 1;
      i += 2;
    }
    else if (counter >= 73 && text[i + 1] === '=') {
      lines += text[i] + '=\r\n';
      counter = 1;
      i += 1;
    }
    else if (counter === 75) {
      lines += text[i] + '=\r\n';
      counter = 1;
      i += 1;
    }
    else {
      lines += text[i];
      counter += 1;
      i += 1;
    }
  }

  return lines;
}

function encodeEncodableCharacters(text) {
  return text.replace(matchEncodableCharacters, encodeCharacters);
}

function encodeQuotedPrintable(text) {
  return trimLastSoftLinebreak(splitLongLines(encodeEncodableCharacters(text)));
}

module.exports = encodeQuotedPrintable;
