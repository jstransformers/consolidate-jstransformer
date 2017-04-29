# consolidate-jstransformer

[![Greenkeeper badge](https://badges.greenkeeper.io/jstransformers/consolidate-jstransformer.svg)](https://greenkeeper.io/)

[Consolidate](https://github.com/tj/consolidate.js)-compatible API to use [JSTransformers](http://github.com/jstransformers).

[![Build Status](https://img.shields.io/travis/jstransformers/jstransformer-consolidate/master.svg)](https://travis-ci.org/jstransformers/jstransformer-consolidate)
[![Coverage Status](https://img.shields.io/codecov/c/github/jstransformers/jstransformer-consolidate/master.svg)](https://codecov.io/gh/jstransformers/jstransformer-consolidate)
[![Dependency Status](https://img.shields.io/david/jstransformers/jstransformer-consolidate/master.svg)](http://david-dm.org/jstransformers/jstransformer-consolidate)
[![NPM version](https://img.shields.io/npm/v/jstransformer-consolidate.svg)](https://www.npmjs.org/package/jstransformer-consolidate)

``` javascript
var cons = require('consolidate')
```

#### After

``` javascript
var cons = require('consolidate-jstransformer')
```

## API

Use `consolidate-jstransformer` the same way you would use Consolidate:

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

  Render strings rather than files:

```js
var cons = require('consolidate-jstransformer')
  , name = 'swig';

cons[name].render('Hello {{ user }}', { user: 'tobi' }, function(err, html){
  if (err) throw err;
  console.log(html);
});
```

### Promises

If no callback function is provided, a Promise will be returned.

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
