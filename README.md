# consolidate-jstransformer

[Consolidate](https://github.com/tj/consolidate.js)-compatible API to use [JSTransformers](http://github.com/jstransformers).

[![Build Status](https://img.shields.io/travis/jstransformers/consolidate-jstransformer/master.svg)](https://travis-ci.org/jstransformers/consolidate-jstransformer)
[![Coverage Status](https://img.shields.io/coveralls/jstransformers/consolidate-jstransformer/master.svg)](https://coveralls.io/r/jstransformers/consolidate-jstransformer?branch=master)
[![Dependency Status](https://img.shields.io/david/jstransformers/consolidate-jstransformer/master.svg)](http://david-dm.org/jstransformers/consolidate-jstransformer)
[![NPM version](https://img.shields.io/npm/v/consolidate-jstransformer.svg)](https://www.npmjs.org/package/consolidate-jstransformer)

## Installation

    npm install consolidate-jstransformer

## API

All templates supported by this library may be rendered using the signature `(path[, locals], callback)` as shown below, which happens to be the signature that Express 3.x supports so any of these engines may be used within Express.

```js
var cons = require('consolidate-jstransformer');
cons.swig('views/page.html', { user: 'tobi' }, function(err, html){
  if (err) throw err;
  console.log(html);
});
```

  Or without options / local variables:

```js
var cons = require('consolidate-jstransformer');
cons.swig('views/page.html', function(err, html){
  if (err) throw err;
  console.log(html);
});
```

  To dynamically pass the engine, simply use the subscript operator and a variable:

```js
var cons = require('consolidate-jstransformer')
  , name = 'swig';

cons[name]('views/page.html', { user: 'tobi' }, function(err, html){
  if (err) throw err;
  console.log(html);
});
```

### Promises

  Additionally, all templates optionally return a promise if no callback function is provided. The promise represents the eventual result of the template function which will either resolve to a string, compiled from the template, or be rejected. Promises expose a `then` method which registers callbacks to receive the promise’s eventual value and a `catch` method which the reason why the promise could not be fulfilled. Promises allow more synchronous-like code structure and solve issues like race conditions.

```js
var cons = require('consolidate-jstransformer');

cons.swig('views/page.html', { user: 'tobi' })
  .then(function (html) {
    console.log(html);
  })
  .catch(function (err) {
    throw err;
  });
```

## License

MIT
