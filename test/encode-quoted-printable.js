var test = require('tape');
var encodeQuotedPrintable = require('../lib/encode-quoted-printable.js');

test('a=b=c', function (t) {
  t.equal(encodeQuotedPrintable('a=b=c'), 'a=3Db=3Dc');
  t.end();
});

test('Newlines', function (t) {
  t.equal(encodeQuotedPrintable('abc   \r\n123   \r\n'), 'abc  =20\r\n123  =20\r\n');
  t.end();
});

test('Long string', function (t) {
  t.equal(encodeQuotedPrintable('0123456789012345678901234567890123456789012345678901234567890123456789012345'), '012345678901234567890123456789012345678901234567890123456789012345678901234=\r\n5');
  t.end();
});
