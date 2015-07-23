'use strict'

var jstransformer = require('jstransformer')
var Promise = require('promise')
var extractOpts = require('extract-opts')
var transformers = require('list-of-jstransformers')

transformers.forEach(function (name) {
  /**
   * The file renderer.
   */
  module.exports[name] = function (filename, options, fn) {
    var transformer = jstransformer(require('jstransformer-' + name))
    var args = extractOpts(options, fn)
    options = args[0]
    fn = args[1]
    var locals = options.locals ? options.locals : options

    if (fn) {
      return transformer.renderFileAsync(filename, options, locals, function (err, result) {
        fn(err, result.body ? result.body : null)
      })
    }
    return new Promise(function (fulfill, reject) {
      transformer.renderFileAsync(filename, options, locals, function (err, result) {
        if (err) {
          reject(err)
        } else {
          fulfill(result.body)
        }
      })
    })
  }

  /**
   * The string renderer.
   */
  module.exports[name].render = function (str, options, fn) {
    var transformer = jstransformer(require('jstransformer-' + name))
    var args = extractOpts(options, fn)

    options = args[0]
    fn = args[1]

    var locals = options.locals ? options.locals : options

    if (fn) {
      return transformer.renderAsync(str, options, locals, function (err, result) {
        fn(err, result.body ? result.body : null)
      })
    }
    return new Promise(function (fulfill, reject) {
      transformer.renderAsync(str, options, locals, function (err, result) {
        if (err) {
          reject(err)
        } else {
          fulfill(result.body)
        }
      })
    })
  }
})
