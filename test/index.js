'use strict'

const assert = require('assert')
const fs = require('fs')
const test = require('testit')
const cons = require('..')

function testTransformer(name) {
  const inputFile = 'test/' + name + '/input.' + name
  const input = fs.readFileSync(inputFile, {encoding: 'utf8'}).trim()
  const inputNoLocalsFile = 'test/' + name + '/input-nolocals.' + name
  const inputNoLocals = fs.readFileSync(inputNoLocalsFile, {encoding: 'utf8'}).trim()
  const expectedFile = 'test/' + name + '/expected.txt'
  const expected = fs.readFileSync(expectedFile, {encoding: 'utf8'}).trim()
  const locals = JSON.parse(fs.readFileSync('test/' + name + '/locals.json', {encoding: 'utf8'}))

  test('cons.' + name, () => {
    test('self', () => {
      test('(file, locals, fn)', done => {
        cons[name](inputFile, locals, (err, result) => {
          if (err) {
            return done(new Error(err))
          }
          assert.equal(expected, result.trim())
          done()
        })
      })

      test('(file, locals)', done => {
        cons[name](inputFile, locals).then(result => {
          assert.equal(expected, result.trim())
          done()
        }, err => {
          done(new Error(err))
        })
      })

      test('(file, fn)', done => {
        cons[name](inputNoLocalsFile, (err, result) => {
          if (err) {
            return done(new Error(err))
          }
          assert.equal(expected, result.trim())
          done()
        })
      })

      test('(file)', done => {
        cons[name](inputNoLocalsFile).then(result => {
          assert.equal(expected, result.trim())
          done()
        }, err => {
          done(new Error(err))
        })
      })
    })

    test('.render', () => {
      test('(str, locals, fn)', done => {
        cons[name].render(input, locals, (err, result) => {
          if (err) {
            return done(new Error(err))
          }
          assert.equal(expected, result.trim())
          done()
        })
      })

      test('(str, locals)', done => {
        cons[name].render(input, locals).then(result => {
          assert.equal(expected, result.trim())
          done()
        }, err => {
          done(new Error(err))
        })
      })

      test('(str, fn)', done => {
        cons[name].render(inputNoLocals, (err, result) => {
          if (err) {
            return done(new Error(err))
          }
          assert.equal(expected, result.trim())
          done()
        })
      })

      test('(str)', done => {
        cons[name].render(inputNoLocals).then(result => {
          assert.equal(expected, result.trim())
          done()
        }, err => {
          done(new Error(err))
        })
      })
    })
  })
}

testTransformer('stylus')
testTransformer('swig')
