'use strict'

const jstransformer = require('jstransformer')
const transformers = require('list-of-jstransformers')

/**
 * Extract the callback, options, and locals from the provided arguments.
 *
 * @param [options] The options to be passed to the transformer.
 * @param [fn] There function callback, should there be one.
 */
function extractArgs(options, fn) {
  if (typeof options === 'function') {
    fn = options
    options = {}
  }
  return {
    fn,
    options,
    locals: options ? (options.locals || options) : options
  }
}

transformers.forEach(name => {
  /**
   * The file renderer.
   */
  module.exports[name] = (file, options, fn) => {
    const transformer = jstransformer(require('jstransformer-' + name)) // eslint-disable-line import/no-dynamic-require
    const args = extractArgs(options, fn)

    if (args.fn) {
      return transformer.renderFileAsync(file, args.options, args.locals, (err, result) => {
        args.fn(err, result.body ? result.body : null)
      })
    }
    return new Promise((resolve, reject) => {
      transformer.renderFileAsync(file, args.options, args.locals, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result.body)
        }
      })
    })
  }

  /**
   * The string renderer.
   */
  module.exports[name].render = function (str, options, fn) {
    const former = require('jstransformer-' + name) // eslint-disable-line import/no-dynamic-require
    const transformer = jstransformer(former)
    const args = extractArgs(options, fn)

    if (args.fn) {
      return transformer.renderAsync(str, args.options, args.locals, (err, result) => {
        args.fn(err, result.body ? result.body : null)
      })
    }
    return new Promise((resolve, reject) => {
      transformer.renderAsync(str, args.options, args.locals, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result.body)
        }
      })
    })
  }
})
