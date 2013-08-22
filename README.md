# Encode Quoted Printable

[![Travis CI Test Status](https://travis-ci.org/connrs/node-encode-quoted-printable.png)](https://travis-ci.org/connrs/node-encode-quoted-printable)

This package simply exposes a single function to allow you to encode a string in to a quoted printable format that is usable in MIME emails

This code was originally reverse engineered from the [quoted_printable_encode function](http://phpjs.org/functions/quoted_printable_encode/) within the PHP.js project. However, it sucked. Later, I grabbed the unit tests from the PHP project in order to improve my tests and it turns out that the PHP implementation is wrong. So! Good old Perl. I wrote it my way, trusting the Perl output of the PHP tests.

To install with NPM type:

    npm install encode-quoted-printable

To use:

    var encodeQuotedPrintable = require('encode-quoted-printable');
    var text = 'This is a long email string';

    encodeQuotedPrintable(text);
