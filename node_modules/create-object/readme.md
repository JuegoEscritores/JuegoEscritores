# create-object
> Portable Object.create that is not a shim and drops the verbose property descriptor syntax.

[![Build Status](http://img.shields.io/travis/wilmoore/create-object.js.svg)](https://travis-ci.org/wilmoore/create-object.js) [![Code Climate](https://codeclimate.com/github/wilmoore/create-object.js/badges/gpa.svg)](https://codeclimate.com/github/wilmoore/create-object.js) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

```shell
npm install create-object --save
```

>  You can also use Duo, Bower or [download the files manually](https://github.com/wilmoore/create-object.js/releases).

###### npm stats

[![npm](https://img.shields.io/npm/v/create-object.svg)](https://www.npmjs.org/package/create-object) [![NPM downloads](http://img.shields.io/npm/dm/create-object.svg)](https://www.npmjs.org/package/create-object) [![Dependency Status](https://gemnasium.com/wilmoore/create-object.js.svg)](https://gemnasium.com/wilmoore/create-object.js)

## API Example

###### Create

```js
var create = require('create-object')

var point = create({
  type: 'Point',
  coordinates: [-0.127758, 51.507351],
  valueOf: function () { return this.coordinates }
})

point
//=> {}

point.valueOf()
//=> [ -0.127758, 51.507351 ]
```

###### Create with properties

```js
var create = require('create-object')

var geo = create({}, {
  coordinates: [-0.127758, 51.507351]
})

geo
//=> { coordinates: [ -0.127758, 51.507351 ] }
```

## Features

 - True prototypal inheritance.
 - Your code does not need to bother with constructors or the `new` keyword.
 - Fields and methods on the prototype are non-enumerable.
 - Works in all JS engines (including old IEs like IE8).

## Anti-Features

 - Does not shim/sham `Object.create`.
 - Ignores verbose ES5 property descriptor syntax.

## API

### `create(prototype)`

###### arguments

 - `prototype: (Object)` The object which should be the prototype of the newly-created object.
 - `properties: (Object)` Key-values which should be copied to the newly-created object.

###### returns

 - `(Object)` New object with the specified prototype object including any copied properties.

## Reference

 - [Prototypal Inheritance in JavaScript](http://javascript.crockford.com/prototypal.html)
 - [JS Objects: De”construct”ion](http://davidwalsh.name/javascript-objects-deconstruction)
 - [Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

## Alternatives

 - [object-create](https://www.npmjs.com/package/object-create)
 - [redefine](https://www.npmjs.com/package/redefine)

## Contributing

> SEE: [contributing.md](contributing.md)

## Licenses

[![GitHub license](https://img.shields.io/github/license/wilmoore/create-object.js.svg)](https://github.com/wilmoore/create-object.js/blob/master/license)
