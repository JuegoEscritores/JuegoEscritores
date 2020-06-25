'use strict'

/*!
 * constructor.
 */

var Ctor = function () {}

/*!
 * exports.
 */

module.exports = create

/**
 * Portable Object.create that is not a shim and
 * drops the verbose property descriptor syntax.
 *
 * @param {Object} prototype
 * The object which should be the prototype of the newly-created object.
 *
 * @return {String}
 * New object with the specified prototype object.
 */

function create (prototype, properties) {
  Ctor.prototype = prototype || {}
  return properties ? copy(new Ctor(), properties) : new Ctor()
}

/**
 * Copy properties from source to target.
 *
 * @param {Object} target
 * Object to assign properties to.
 *
 * @param {Object} source
 * Object to get properties from.
 *
 * @return {Object}
 * New object.
 */

function copy (target, source) {
  for (var key in Object(source)) target[key] = source[key]
  return target
}
