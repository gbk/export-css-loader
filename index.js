"use strict";

var fs = require("fs");
var path = require('path');
var loaderUtils = require("loader-utils");

module.exports = function(source) {
    this.cacheable && this.cacheable();
    var cb = this.async();
    if (!cb) {
        return source;
    }
    try {
        var code = source.split('// module')[1].split('// exports')[0];
        var module = {};
        var exports = [];
        eval(code);
        code = exports[0][1];
        var filename = path.basename(this.context) + '.css';
        var filepath = path.join(this.options.output.path, filename)
        fs.writeFile(filepath, code, function(err) {
            err && console.log('Generating css failed: ' + filepath);
        });
        cb(null, source);
    } catch (e) {
        cb(null, source);
    }
};
