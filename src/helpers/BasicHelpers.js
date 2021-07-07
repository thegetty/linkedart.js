/**
 * @file BasicHelpers
 * @author Adam Brin, Pamela Lam, Alyx Rossetti, Charles Webb, Selina Zawacki
 * @module BasicHelpers
 * @description This class contains helpers for working with linked.art JSON-LD data
 */

/**
 * Checks whether the object has the key as a property, and returns the result as either
 * an empty array (if it doesn't exist), an array with the single object if it's an object
 * or primitive, or the array
 *
 * @param {object} obj - The object that might have an array attribute
 * @param {string} key - The key for the attribute field we are interested in
 *
 * @example field doesn't exist
 * normalizeFieldToArray({"id": "1234"}, "type") would return an empty array ([])
 *
 * @example field value is not an array
 * normalizeFieldToArray({"id": "1234"}, "id") would return ["1234"]
 *
 * @returns {array} - The field's value normalized to an array
 */
export function normalizeFieldToArray(obj, key) {
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
