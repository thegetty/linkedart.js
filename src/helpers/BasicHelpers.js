/**
 * @file BasicHelpers
 * @author Adam Brin, Pamela Lam, Alyx Rossetti, Charles Webb, Selina Zawacki
 * @module BasicHelpers
 * @description This class contains helpers for working with linked.art JSON-LD data
 */

/**
 * Checks whether the object has the key as a property, and returns the result as either an empty array (if it doesn't exist or it isn't an array), or the array
 * @param {object} obj
 * @param {string} key
 *
 * @returns {array} - undefined is treated as an arry
 */
export function checkEmptyArray(obj, key) {
  if (obj == undefined) {
    return [];
  }

  var val = obj[key];
  if (val == undefined) {
    return [];
  }

  if (Array.isArray(val) == false) {
    return [];
  }

  if (val.length < 1) {
    return [];
  }

  return val;
}

/**
 * Checks whether the object has the key as a property, and returns the result as either an empty array (if it doesn't exist), and array with the single object if it's an object or primative, or the array
 *
 * @param {object} obj
 * @param {string} key
 *
 * @returns {array} - undefined is treated as an arry
 */
export function checkEmptyField(obj, key) {
  if (obj == undefined) {
    return [];
  }

  var val = obj[key];
  if (val == undefined) {
    return [];
  }

  if (Array.isArray(val) == false) {
    return [val];
  }

  if (val.length < 1) {
    return [];
  }

  return val;
}
