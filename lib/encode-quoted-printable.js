var hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
var matchEncodableCharacters = / \r\n|\r\n|[^!-<>-~ ]/gm;
var matchLongLines = /.{1,72}(?!\r\n)[^=]{0,3}/g;
var matchTrailingSoftLineBreak = /\=\r\n$/;

function encodeCharacters(characters) {
  var charCode;

  // Encode space before CRLF sequence to prevent spaces from being stripped
  // Keep hard line breaks intact; CRLF sequences
  if (characters.length > 1) {
    return characters.replace(' ', '=20');
  }

  // Encode matching character
  charCode = characters.charCodeAt(0);

  return '=' + hexChars[((charCode >>> 4) & 15)] + hexChars[(charCode & 15)];
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
  return text.replace(matchLongLines, encodeSplitLine);
}

function encodeEncodableCharacters(text) {
  return text.replace(matchEncodableCharacters, encodeCharacters);
}

function encodeQuotedPrintable(text) {
  return trimLastSoftLinebreak(splitLongLines(encodeEncodableCharacters(text)));
}

module.exports = encodeQuotedPrintable;
