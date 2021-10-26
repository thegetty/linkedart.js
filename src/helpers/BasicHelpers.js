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
 * @param {string} key - The key for the attribute field we want to retrieve
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

/**
 * Normalizes the AAT ID to one of two versions (an aat: prefixed id or a full url)
 *
 * @param {string} id - an ID to test
 *
 * @returns {string} - the alternate ID format
 */
export function normalizeAatId(id) {
  let id_ = id.toLowerCase();
  // if we're using the aat:<#> format, turn it into a full vocab url
  if (id_.startsWith("aat:")) {
    return id_.replace("aat:", "http://vocab.getty.edu/aat/");
  }

  // if we've got a full url with https://, replace it with http:// to make it internally consistent
  if (id_.startsWith("https://vocab.getty.edu/aat/")) {
    return id_.replace(
      "https://vocab.getty.edu/aat/",
      "http://vocab.getty.edu/aat/"
    );
  }

  // otherwise, convert the full url to the aat:<#> format
  return id_.replace("http://vocab.getty.edu/aat/", "aat:");
}
