"use strict";

var fs = require("fs");
var path = require('path');
var loaderUtils = require("loader-utils");

module.exports = function(source) {
    this.cacheable && this.cacheable();
    var query = loaderUtils.parseQuery(this.query);
    if (query.write === undefined) {
        query.write = true;
    }
    if (query.remove === undefined) {
        query.remove = false;
    }
    var cb = this.async();
    try {
        if (query.write) {
            var code = source.split('// module')[1].split('// exports')[0];
            var module = {};
            var exports = [];
            var require = function(url) {
                return url;
            };
            eval(code);
            code = exports[0][1];
            var filename = path.basename(this.context) + '.css';
            var filepath = path.join(this.options.output.path, filename);
            fs.writeFile(filepath, code, function(err) {
                err && console.log('Generating css failed: ' + filepath);
            });
        }
        if (query.remove) {
            cb(null, source.split('// exports')[1]);
        } else {
            cb(null, source);
        }
    } catch (e) {
        cb(null, source);
    }
};
