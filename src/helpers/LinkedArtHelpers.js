/**
 * @file LinkedArtHelpers
 * @author Adam Brin, Pamela Lam, Alyx Rossetti, Charles Webb, Selina Zawacki
 * @module LinkedArtHelpers
 * @description This class contains helpers for working with linked.art JSON-LD data
 */

import * as languageHelpers from "./LanguageHelpers";
import { checkEmptyField } from "./BasicHelpers";
const CLASSIFIED_AS = "classified_as";
const CLASSIFIED_BY = "classified_by";
const REFERRED_TO_BY = "referred_to_by";

/**
 * Given an object or an array of objects, find all entries that have an object in their classified_as
 * field with an id that matches the requestedClassification.
 *
 * @param {object} submittedResource -- the object to inspect
 * @param {string|array} requestedClassification -- the classification ID/IDS to match
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesLanguageMatch
 *
 * @returns {array} an array of objects that match
 */
export function classifiedAs(
  submittedResource,
  requestedClassification,
  language = undefined,
  languageOptions = {}
) {
  return resourcesByClassifications(
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
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesLanguageMatch
 *
 * @returns {array} an array of objects that match
 */
export function classifiedBy(
  submittedResource,
  requestedClassification,
  language = undefined,
  languageOptions = {}
) {
  return resourcesByClassifications(
    submittedResource,
    requestedClassification,
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
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesLanguageMatch
 *
 * @returns {array} an array of objects that match
 */
export function classificationsByNestedClass(
  submittedResource,
  nestedClassification,
  classificationField = CLASSIFIED_AS,
  language = undefined,
  languageOptions = {}
) {
  let results = [];
  let resourceArray = resourceParamToArray(submittedResource);
  if (resourceArray == results) {
    return results;
  }

  for (const resource of resourceArray) {
    // If there are no classifications, or the classification is just a string,
    // continue
    var classified_as = checkEmptyField(resource, classificationField);
    if (!classified_as.length) {
      continue;
    }
    results = results.concat(
      resourcesByClassifications(
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
 * Given an object or an array of objects, find all objects that are classified by an object
 * which is classified by nestedClassification
 *
 * @param {object} submittedResource -- the object to inspect
 * @param {string|array} nestedClassification -- the classification ID/IDS to match
 * @param {string} classificationField -- the field to investigate for an object's classification (e.g. classified_as, classified_by)
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesLanguageMatch
 *
 * @returns {array} an array of objects that match
 */
export function objectsByNestedClass(
  submittedResource,
  nestedClassification,
  classificationField = CLASSIFIED_AS,
  language = undefined,
  languageOptions = {}
) {
  let results = [];
  let resourceArray = resourceParamToArray(submittedResource);
  if (resourceArray == results) {
    return results;
  }

  for (const resource of resourceArray) {
    // If there are no classifications, or the classification is just a string,
    // continue
    var classified_as = checkEmptyField(resource, classificationField);
    if (!classified_as.length) {
      continue;
    }
    let classifications = resourcesByClassifications(
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
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesLanguageMatch
 *
 * @returns {array} an array of objects that match
 */
export function resourcesByClassifications(
  submittedResource,
  requestedClassifications,
  classificationField = CLASSIFIED_AS,
  language = undefined,
  languageOptions = {},
  operator = "AND"
) {
  let results = [];
  let resourceArray = resourceParamToArray(submittedResource);
  let requestedClassArray = resourceParamToArray(requestedClassifications);
  if (resourceArray.length == 0 || requestedClassArray.length == 0) {
    return results;
  }
  for (const resource of resourceArray) {
    // If there is no classifications, or the classification is just a string,
    // continue
    var classified_as = checkEmptyField(resource, classificationField);
    let languageMatch = languageHelpers.doesLanguageMatch(
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
function resourceParamToArray(resourceParam) {
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
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesLanguageMatch
 *
 * @returns {string|number} the matching value
 */
export function getValueByClassification(
  submittedResource,
  requestedClassification,
  language,
  languageOptions
) {
  let results = classifiedAs(
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
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesLanguageMatch
 *
 * @returns {array} the matching values (string|array)
 */
export function getValuesByClassification(
  submittedResource,
  requestedClassification,
  language,
  languageOptions
) {
  let results = classifiedAs(
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
export function getAttributed(object, assignedProperty) {
  let attributed = checkEmptyField(object, "attributed_by");
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
export function getAssigned(object, assignedProperty) {
  let assigned = checkEmptyField(object, "assigned_by");
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
