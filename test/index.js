'use strict'

var test = require('testit')
var assert = require('assert')
var cons = require('..')
var fs = require('fs')

function testTransformer (name) {
  var inputFile = 'test/' + name + '/input.' + name
  var input = fs.readFileSync(inputFile, { encoding: 'utf8' }).trim()
  var inputNoLocalsFile = 'test/' + name + '/input-nolocals.' + name
  var inputNoLocals = fs.readFileSync(inputNoLocalsFile, { encoding: 'utf8' }).trim()
  var expectedFile = 'test/' + name + '/expected.txt'
  var expected = fs.readFileSync(expectedFile, { encoding: 'utf8' }).trim()
  var locals = JSON.parse(fs.readFileSync('test/' + name + '/locals.json', { encoding: 'utf8' }))

  test('cons.' + name, function () {
    test('self', function () {
      test('(file, locals, fn)', function (done) {
        cons[name](inputFile, locals, function (err, result) {
          if (err) {
            return done(new Error(err))
          }
          assert.equal(expected, result.trim())
          done()
        })
      })

      test('(file, locals)', function (done) {
        cons[name](inputFile, locals).then(function (result) {
          assert.equal(expected, result.trim())
          done()
        }, function (err) {
          done(new Error(err))
        })
      })

      test('(file, fn)', function (done) {
        cons[name](inputNoLocalsFile, function (err, result) {
          if (err) {
            return done(new Error(err))
          }
          assert.equal(expected, result.trim())
          done()
        })
      })

      test('(file)', function (done) {
        cons[name](inputNoLocalsFile).then(function (result) {
          assert.equal(expected, result.trim())
          done()
        }, function (err) {
          done(new Error(err))
        })
      })
    })

    test('.render', function () {
      test('(str, locals, fn)', function (done) {
        cons[name].render(input, locals, function (err, result) {
          if (err) {
            return done(new Error(err))
          }
          assert.equal(expected, result.trim())
          done()
        })
      })

      test('(str, locals)', function (done) {
        cons[name].render(input, locals).then(function (result) {
          assert.equal(expected, result.trim())
          done()
        }, function (err) {
          done(new Error(err))
        })
      })

      test('(str, fn)', function (done) {
        cons[name].render(inputNoLocals, function (err, result) {
          if (err) {
            return done(new Error(err))
          }
          assert.equal(expected, result.trim())
          done()
        })
      })

      test('(str)', function (done) {
        cons[name].render(inputNoLocals).then(function (result) {
          assert.equal(expected, result.trim())
          done()
        }, function (err) {
          done(new Error(err))
        })
      })
    })
  })

}

testTransformer('stylus')
testTransformer('swig')
