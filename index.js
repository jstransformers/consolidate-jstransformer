'use strict';

var jstransformer = require('jstransformer');
var Promise = require('promise');
var transformers = require('list-of-jstransformers');

/**
 * Extract the callback, options, and locals from the provided arguments.
 *
 * @param [options] The options to be passed to the transformer.
 * @param [fn] There function callback, should there be one.
 */
function extractArgs(options, fn) {
  if (typeof options === 'function') {
    fn = options;
    options = {};
  }
  return {
    fn: fn,
    options: options,
    locals: options ? (options.locals || options) : options
  };
}

transformers.forEach(function (name) {
  /**
   * The file renderer.
   */
  module.exports[name] = function (file, options, fn) {
    var transformer = jstransformer(require('jstransformer-' + name));
    var args = extractArgs(options, fn);

    if (args.fn) {
      return transformer.renderFileAsync(file, args.options, args.locals, function (err, result) {
        args.fn(err, result.body ? result.body : null);
      });
    }
    return new Promise(function (resolve, reject) {
      transformer.renderFileAsync(file, args.options, args.locals, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result.body);
        }
      });
    });
  };

  /**
   * The string renderer.
   */
  module.exports[name].render = function (str, options, fn) {
    var transformer = jstransformer(require('jstransformer-' + name));
    var args = extractArgs(options, fn);

    if (args.fn) {
      return transformer.renderAsync(str, args.options, args.locals, function (err, result) {
        args.fn(err, result.body ? result.body : null);
      });
    }
    return new Promise(function (resolve, reject) {
      transformer.renderAsync(str, args.options, args.locals, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result.body);
        }
      });
    });
  };
});
