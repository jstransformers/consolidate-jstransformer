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
      var result = transformer.renderFile(filename, options, locals)
      return fn(null, result.body)
    }
    return new Promise(function (fulfill, reject) {
      var result = transformer.renderFile(filename, options, locals)
      if (result && result.body) {
        return fulfill(result.body)
      }
      return reject('Error compiling template')
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
      var result = transformer.render(str, options, locals)
      return fn(null, result.body)
    }
    return new Promise(function (fulfill, reject) {
      var result = transformer.render(str, options, locals)
      if (result) {
        return fulfill(result.body)
      }
      reject('Error compiling template')
    })
  }

})
