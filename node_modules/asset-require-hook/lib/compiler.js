'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compiler;

var _fs = require('fs');

var _loaderUtils = require('loader-utils');

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function compiler(name, options) {
  return function compile(file) {
    var limit = options.limit,
        publicPath = options.publicPath,
        mimetype = options.mimetype,
        regExp = options.regExp;

    var content = (0, _fs.readFileSync)(file);

    if (limit !== undefined) {
      var max = parseInt(limit || 0, 10);
      if (max <= 0 || content.length < max) {
        var mime = mimetype || require('mime').lookup(file);
        return 'data:' + (mime ? mime + ';' : '') + 'base64,' + content.toString('base64');
      }
    }

    var context = {
      resourcePath: file
    };

    var result = (0, _loaderUtils.interpolateName)(context, name, {
      regExp: regExp,
      content: content
    });

    if (publicPath) {
      result = typeof publicPath === 'function' ? publicPath(result) : '' + publicPath + result;
    }

    return result;
  };
}
module.exports = exports['default'];