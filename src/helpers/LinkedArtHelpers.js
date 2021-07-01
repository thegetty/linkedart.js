/**
 * @file LinkedArtHelpers
 * @author Adam Brin, Pamela Lam, Alyx Rossetti, Charles Webb, Selina Zawacki
 * @module LinkedArtHelpers
 * @description This class contains helpers for working with linked.art JSON-LD data
 */

import * as languageHelpers from "./LanguageHelpers";
import { normalizeFieldToArray } from "./BasicHelpers";

const CLASSIFIED_AS = "classified_as";
const CLASSIFIED_BY = "classified_by";
const PART = "part";
const REFERRED_TO_BY = "referred_to_by";

/**
 * Given an object or an array of objects, find all entries that have an object in their classified_as
 * field with an id that matches the requestedClassification.
 *
 * @param {object} submittedResource -- the object to inspect
 * @param {string|array} requestedClassification -- the classification ID/IDS to match
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @returns {array} an array of objects that match
 */
export function getClassifiedAs(
  submittedResource,
  requestedClassification,
  language = undefined,
  languageOptions = {}
) {
  return getClassified(
    submittedResource,
    requestedClassification,
    CLASSIFIED_AS,
    language,
    languageOptions
  );
}

/**
 * Given an object or an array of objects, find all entries that have an object in their classified_by
 * field with an id that matches the requestedClassification.
 *
 * @param {object} submittedResource -- the object to inspect
 * @param {string|array} requestedClassification -- the classification ID/IDS to match
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @returns {array} an array of objects that match
 */
export function getClassifiedBy(
  submittedResource,
  requestedClassification,
  language = undefined,
  languageOptions = {}
) {
  return getClassified(
    submittedResource,
    requestedClassification,
    CLASSIFIED_BY,
    language,
    languageOptions
  );
}

/**
 * Given an object or an array of objects, find all classification objects that are classified as
 * with the nestedClassification. (e.g. for Visual Items we need to get the rights statement
 * classification object, which we identify by its own classification see VisualItems.getClearanceLevel)
 *
 * @param {object} submittedResource -- the object to inspect
 * @param {string|array} nestedClassification -- the classification ID/IDS to match
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 * @private
 *
 * @returns {array} an array of objects that match
 */
export function getClassifiedAsWithClassification(
  submittedResource,
  nestedClassification,
  language = undefined,
  languageOptions = {}
) {
  return _getClassificationsWithNestedClass(
    submittedResource,
    nestedClassification,
    CLASSIFIED_AS,
    language,
    languageOptions
  );
}

/**
 * Given an object or an array of objects, find all classification objects that are classified by
 * with the nestedClassification. (e.g. for Visual Items we need to get the rights statement
 * classification object, which we identify by its own classification see VisualItems.getClearanceLevel)
 *
 * @param {object} submittedResource -- the object to inspect
 * @param {string|array} nestedClassification -- the classification ID/IDS to match
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 * @private
 *
 * @returns {array} an array of objects that match
 */
export function getClassifiedByWithClassification(
  submittedResource,
  nestedClassification,
  language = undefined,
  languageOptions = {}
) {
  return _getClassificationsWithNestedClass(
    submittedResource,
    nestedClassification,
    CLASSIFIED_BY,
    language,
    languageOptions
  );
}

/**
 * Given an object or an array of objects, find all classification objects that are classified
 * with the nestedClassification. (e.g. for Visual Items we need to get the rights statement
 * classification object, which we identify by its own classification see VisualItems.getClearanceLevel)
 *
 * @param {object} submittedResource -- the object to inspect
 * @param {string|array} nestedClassification -- the classification ID/IDS to match
 * @param {string} classificationField -- the field to investigate for an object's classification (e.g. classified_as, classified_by)
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 * @private
 *
 * @returns {array} an array of objects that match
 */
export function _getClassificationsWithNestedClass(
  submittedResource,
  nestedClassification,
  classificationField = CLASSIFIED_AS,
  language = undefined,
  languageOptions = {}
) {
  let results = [];
  let resourceArray = _convertToArrayIfNeeded(submittedResource);
  if (resourceArray.length == 0) {
    return results;
  }

  for (const resource of resourceArray) {
    // If there are no classifications, or the classification is just a string,
    // continue
    var classified_as = normalizeFieldToArray(resource, classificationField);
    if (!classified_as.length) {
      continue;
    }
    results = results.concat(
      getClassified(
        classified_as,
        nestedClassification,
        classificationField,
        language,
        languageOptions
      )
    );
  }

  return results;
}

/**
 * Given an object or an array of objects, find all objects that are classified as an object
 * which is classified by nestedClassification
 *
 * @param {object} submittedResource -- the object to inspect
 * @param {string|array} nestedClassification -- the classification ID/IDS to match
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @returns {array} an array of objects that match
 */
export function getObjectsClassifiedAsWithClassification(
  submittedResource,
  nestedClassification,
  language = undefined,
  languageOptions = {}
) {
  return _getObjectWithNestedClass(
    submittedResource,
    nestedClassification,
    CLASSIFIED_AS,
    language,
    languageOptions
  );
}

/**
 * Given an object or an array of objects, find all objects that are classified by an object
 * which is classified by nestedClassification
 *
 * @param {object} submittedResource -- the object to inspect
 * @param {string|array} nestedClassification -- the classification ID/IDS to match
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @returns {array} an array of objects that match
 */
export function getObjectsClassifiedByWithClassification(
  submittedResource,
  nestedClassification,
  language = undefined,
  languageOptions = {}
) {
  return _getObjectWithNestedClass(
    submittedResource,
    nestedClassification,
    CLASSIFIED_BY,
    language,
    languageOptions
  );
}

/**
 * Given an object or an array of objects, find all objects that are classified by an object
 * which is classified by nestedClassification
 *
 * @param {object} submittedResource -- the object to inspect
 * @param {string|array} nestedClassification -- the classification ID/IDS to match
 * @param {string} classificationField -- the field to investigate for an object's classification (e.g. classified_as, classified_by)
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 * @private
 *
 * @returns {array} an array of objects that match
 */
export function _getObjectWithNestedClass(
  submittedResource,
  nestedClassification,
  classificationField = CLASSIFIED_AS,
  language = undefined,
  languageOptions = {}
) {
  let results = [];
  let resourceArray = _convertToArrayIfNeeded(submittedResource);
  if (resourceArray.length == 0) {
    return results;
  }

  for (const resource of resourceArray) {
    // If there are no classifications, or the classification is just a string,
    // continue
    var classified_as = normalizeFieldToArray(resource, classificationField);
    if (!classified_as.length) {
      continue;
    }
    let classifications = getClassified(
      classified_as,
      nestedClassification,
      classificationField,
      language,
      languageOptions
    );
    if (classifications.length > 0) {
      results.push(resource);
    }
  }

  return results;
}

/**
 * Given an object or an array of objects, find all objects that have either all of the requestedClassifications
 * or any of the requestedClassifications.
 *
 * @param {object} submittedResource -- the object to inspect
 * @param {string|array} requestedClassifications -- either a string or an array of classification strings
 * @param {string} classificationField -- the field to investigate for an object's classification (e.g. classified_as, classified_by)
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @returns {array} an array of objects that match
 */
export function getClassified(
  submittedResource,
  requestedClassifications,
  classificationField = CLASSIFIED_AS,
  language = undefined,
  languageOptions = {},
  operator = "AND"
) {
  let results = [];
  let resourceArray = _convertToArrayIfNeeded(submittedResource);
  let requestedClassArray = _convertToArrayIfNeeded(requestedClassifications);
  if (resourceArray.length == 0 || requestedClassArray.length == 0) {
    return results;
  }
  for (const resource of resourceArray) {
    // If there is no classifications, or the classification is just a string,
    // continue
    var classified_as = normalizeFieldToArray(resource, classificationField);
    let languageMatch = languageHelpers.doesObjectLanguageMatch(
      resource,
      language,
      languageOptions
    );
    if (!classified_as.length) {
      continue;
    }
    let classificationIDs = classified_as.map((obj) =>
      typeof obj == "string" ? obj : obj.id
    );
    let inClassificationIDs = (id) =>
      languageMatch && classificationIDs.includes(id);
    if (operator == "AND") {
      if (requestedClassArray.every(inClassificationIDs)) {
        results.push(resource);
      }
    } else if (operator == "OR") {
      if (requestedClassArray.some(inClassificationIDs)) {
        results.push(resource);
      }
    }
  }
  return results;
}

/**
 * Given an object or an array of objects, return the array or return an array containing the object.
 * Used to handle parameters like submittedResource where we need to handle either an object or array.
 *
 * @param {object|array} resourceParam -- the parameter that needs to be transformed or confirmed to be
 * an array.
 * @private
 *
 * @returns {array} an array
 */
function _convertToArrayIfNeeded(resourceParam) {
  let results = [];
  let resourceArray = resourceParam;

  if (resourceParam == undefined) {
    return results;
  }

  // make a single submittedResource into an array of submittedResources
  if (Array.isArray(resourceParam) == false) {
    resourceArray = [resourceParam];
  }
  return resourceArray;
}

/**
 * Get the 1st matching value for the classification
 * @param {object} submittedResource
 * @param {string|array} requestedClassification
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @returns {string|number} the matching value
 */
export function getValueByClassification(
  submittedResource,
  requestedClassification,
  language,
  languageOptions
) {
  let results = getClassifiedAs(
    submittedResource,
    requestedClassification,
    language,
    languageOptions
  );
  if (results.length) {
    let result = getValueOrContent(results[0]);
    return result;
  }
  return undefined;
}

/**
 * Get an array of values matching value for the classification
 * @param {object} submittedResource
 * @param {string|array} requestedClassification
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @returns {array} the matching values (string|array)
 */
export function getValuesByClassification(
  submittedResource,
  requestedClassification,
  language,
  languageOptions
) {
  let results = getClassifiedAs(
    submittedResource,
    requestedClassification,
    language,
    languageOptions
  );
  if (results.length) {
    let values = [];
    results.forEach((result) => {
      const value = getValueOrContent(result);
      if (value) {
        values.push(value);
      }
    });
    return values;
  }
  return undefined;
}

/**
 * Get an array of values matching value for the classification
 * @param {object} object
 *
 * @returns {string|number} the value or content depending on which exists.  String comes from the content field, Number comes from the value field
 */
export function getValueOrContent(object) {
  if (object == undefined) {
    return undefined;
  }

  if (object.value !== undefined) {
    return object.value;
  }
  if (object.content) {
    return object.content;
  }
  return undefined;
}

/**
 * Helper function that checks the 'referred_to_by' field for a birth place
 *
 * @private
 * @param {object} object - the Actor object to inspect
 * @param {string|array} classification - the classification
 *
 * @returns {string}  or undefined
 */
export function getReferredToByClassification(object, classification) {
  if (!object) return undefined;
  const referredToBy = object[REFERRED_TO_BY];
  if (!referredToBy) return undefined;

  return getValueByClassification(referredToBy, classification);
}

/**
 * Gets an Attributed value (one assigned from an external source) for the object and returns matching values

 * @param {Object} object - the LinkedArt Object
 * @param {String} assignedProperty  - the assigned properly
 * 
 * @example (an example of the data)
 *  "attributed_by": [
    {
      "id": "https://data.getty.edu/museum/collection/object/5be2eb9f-1b4e-49f6-bfc4-0fc7ab67a1c5/name/f04fde5c-e645-4b4d-986c-443d7c6aa2ef/attribute-assignment",
      "type": "AttributeAssignment",
      "assigned_property": "identified_by",
      "assigned": {
        "id": "https://data.getty.edu/museum/collection/object/5be2eb9f-1b4e-49f6-bfc4-0fc7ab67a1c5/name/f04fde5c-e645-4b4d-986c-443d7c6aa2ef",
        "type": "Name",
        "content": "Initial B: David Playing the Harp",
        "classified_as": [
        ]
      },
    }]
 * 
 * @return {Array} the list of values that map to the attributed value
 */
export function getAttributedBy(object, assignedProperty) {
  let attributed = normalizeFieldToArray(object, "attributed_by");
  if (attributed.length == 0) {
    return [];
  }

  return _getAssignedProperty(attributed, assignedProperty);
}
/**
 * Gets the assigned property objects
 *
 * @param {array} assigned
 * @param {string} assignedProperty
 * @private
 *
 * @returns {array} - the assigned values
 */
function _getAssignedProperty(assigned, assignedProperty) {
  let accumulator = [];
  assigned.forEach((attr) => {
    if (attr["assigned_property"] == assignedProperty) {
      accumulator.push(attr["assigned"]);
    }
  });
  return accumulator;
}

/**
 * Gets an Assinged value (one assigned from an external source) for the object and returns matching values

 * @param {Object} object - the LinkedArt Object
 * @param {String} assignedProperty  - the assigned properly
 * 
 * @example (an example of the data)
 *  "assigned_by": [
    {
      "id": "https://data.getty.edu/museum/collection/object/5be2eb9f-1b4e-49f6-bfc4-0fc7ab67a1c5/name/f04fde5c-e645-4b4d-986c-443d7c6aa2ef/attribute-assignment",
      "type": "AttributeAssignment",
      "assigned_property": "identified_by",
      "assigned": {
        "id": "https://data.getty.edu/museum/collection/object/5be2eb9f-1b4e-49f6-bfc4-0fc7ab67a1c5/name/f04fde5c-e645-4b4d-986c-443d7c6aa2ef",
        "type": "Name",
        "content": "Initial B: David Playing the Harp",
        "classified_as": [
        ]
      },
    }]
 * 
 * @return {Array} the list of values that map to the attributed value
 */
export function getAssignedBy(object, assignedProperty) {
  let assigned = normalizeFieldToArray(object, "assigned_by");
  if (assigned.length == 0) {
    return [];
  }

  return _getAssignedProperty(assigned, assignedProperty);
}

/*
  takes: array of objects
  returns: array of objects with duplicates removed
  (keeps 1st object of ID and removes following with same ID)
*/
export function removeDuplicatesById(_array) {
  const result = Array.from(new Set(_array.map((a) => a.id))).map((id) => {
    return _array.find((a) => a.id === id);
  });

  return result;
}

/**
 * Checks to see if an object's requested field has a part and returns the value. Otherwise, returns either the requested field (if availalble)
 * or an empty array (if neither is available)

 * @param {object} object - the LinkedArt Object
 * @param {string} field  - the requested field to search for parts
 * 
 * @example (an example of the data)
 *  "produced_by": {
      "id": "https://data.getty.edu/museum/collection/object/f8fd6961-6da3-4c39-94ad-e8e9367fa51b/production",
      "type": "Production",
      "_label": "Production of Artwork",
      "part": [
        {
          "id": "https://data.getty.edu/museum/collection/object/f8fd6961-6da3-4c39-94ad-e8e9367fa51b/production/1663467e-66d8-4170-91b0-2937ba6447e6/producer-description",
          "type": "LinguisticObject",
          "_label": "Artist/Maker (Producer) Description",
          "classified_as": [
          ]
        },
      ]
    }
 * 
 * @return {array} if the part was found, return it. if not, but the field was found, return the whole field requested in an array.
 * otherwise, return an empty array.
 */
export function getObjectParts(object, field) {
  const fieldRequested = object[field];
  if (!fieldRequested) {
    return [];
  }

  let fieldPart = normalizeFieldToArray(fieldRequested, PART);
  if (fieldPart.length == 0) {
    return [fieldRequested];
  }

  return fieldPart;
}
