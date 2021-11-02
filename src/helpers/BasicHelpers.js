/**
 * @file BasicHelpers
 * @author Adam Brin, Pamela Lam, Alyx Rossetti, Charles Webb, Selina Zawacki
 * @module BasicHelpers
 * @description This class contains helpers for working with linked.art JSON-LD data
 */

const PART = "part";

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
 * @example - short to full aat value
 * normalizeAatId("aat:300388306") would return http://vocab.getty.edu/aat/300388306
 *
 * @example - full to short
 * normalizeAatId("http://vocab.getty.edu/aat/300388306") would return aat:300388306
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

/**
 * Normalize a field that may have parts.
 *
 * @description Some of the fields in LinkedArt may be (but sometimes dont) include parts.
 * For example, `produced_by` which may have a production, or that production may contain multiple
 * parts.  This method returns an array with the single or all parts
 *
 * @param {object} object - the JSON-LD object (or sub-bart)
 * @param {string} field - the field to look for/in
 *
 * @example with a production without parts:
 *  normalizeFieldWithParts({produced_by: { carried_out_by: {id:123}}}, 'produced_by'), it would return an array with 1 item [{ carried_out_by: {id:123}}}]
 *
 * @example with a production with parts:
 *  normalizeFieldWithParts({produced_by: { part: [{carried_out_by: {id:123}}}]}, 'produced_by'), it would return an array with one item [{ carried_out_by: {id:123}}}]
 *
 * @returns {array} an array that contains the single or multiple parts
 */
export function normalizeFieldWithParts(object, field) {
  let part = object[field];

  if (part == undefined) {
    return [];
  }

  let parts = part[PART];
  if (Array.isArray(parts) == false) {
    parts = [part];
  }
  return parts;
}
