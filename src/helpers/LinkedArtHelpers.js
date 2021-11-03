/**
 * @file LinkedArtHelpers
 * @author Adam Brin, Pamela Lam, Alyx Rossetti, Charles Webb, Selina Zawacki, Nabil Kashyap
 * @module LinkedArtHelpers
 * @description This class contains helpers for working with linked.art JSON-LD data
 */

import { doesObjectLanguageMatch } from "./LanguageHelpers";
import {
  normalizeAatId,
  normalizeFieldToArray,
  normalizeFieldWithParts,
} from "./BasicHelpers";
import aat from "../data/aat.json";
import {
  ATTRIBUTED_BY,
  ASSIGNED_BY,
  CLASSIFIED_AS,
  CLASSIFIED_BY,
  IDENTIFIED_BY,
  NAME,
  PART,
  REFERRED_TO_BY,
  UNKNOWN,
  ASSIGNED_PROPERTY,
  ASSIGNED,
} from "../data/constants.json";

const AND = "AND";
const OR = "OR";
/**
 * Given an object or an array of objects, find all entries that have an object in their classified_as
 * field with an id that matches the requestedClassification.
 *
 * @param {object|array} submittedResource -- the object to inspect
 * @param {string|array} requestedClassifications -- the classification ID/IDS to match
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example for the submittedResource:
 * [
 *   {content: 'Irises', classified_by: [{id: 'title'}]},
 *   {content: 'Blue Irises', classified_by: [{id: 'title', classified_by: 'descriptive title'}]},
 *   {content: 'Van Gogh painting', classified_as: [{id: 'description', classified_as: 'descriptive title'}]}
 * ]
 * getClassifiedAs(submittedResource, 'description') would return the third object in the array
 *
 * @returns {array} an array of objects that match
 */
export function getClassifiedAs(
  submittedResource,
  requestedClassifications,
  language = undefined,
  languageOptions = {}
) {
  return getClassified(
    submittedResource,
    requestedClassifications,
    CLASSIFIED_AS,
    language,
    languageOptions
  );
}

/**
 * Given an object or an array of objects, find all entries that have an object in their classified_by
 * field with an id that matches the requestedClassification.
 *
 * @param {object|array} submittedResource -- the object to inspect
 * @param {string|array} requestedClassifications -- the classification ID/IDS to match
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example for the submittedResource:
 * [
 *   {content: 'Irises', classified_by: [{id: 'title'}]},
 *   {content: 'Blue Irises', classified_by: [{id: 'title', classified_by: 'descriptive title'}]},
 *   {content: 'Van Gogh painting', classified_as: [{id: 'description', classified_as: 'descriptive title'}]}
 * ]
 * getClassifiedBy(submittedResource, 'title') would return the first and second objects in the array
 *
 * @returns {array} an array of objects that match
 */
export function getClassifiedBy(
  submittedResource,
  requestedClassifications,
  language = undefined,
  languageOptions = {}
) {
  return getClassified(
    submittedResource,
    requestedClassifications,
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
 * @param {object|array} submittedResource -- the object to inspect
 * @param {string|array} nestedClassification -- the classification ID/IDS to match
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example for the submittedResource:
 * [
 *   {content: 'Irises', classified_by: [{id: 'title'}]},
 *   {content: 'Blue Irises', classified_by: [{id: 'title', classified_by: 'descriptive title'}]},
 *   {content: 'Van Gogh painting', classified_as: [{id: 'description', classified_as: 'descriptive title'}]}
 * ]
 * getClassifiedByWithClassification(submittedResource, 'descriptive title') would return the object with
 * 'id': 'description' from the 'classified_as' attribute of the third object in the array
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
 * @param {object|array} submittedResource -- the object to inspect
 * @param {string|array} nestedClassification -- the classification ID/IDS to match
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example for the submittedResource:
 * [
 *   {content: 'Irises', classified_by: [{id: 'title'}]},
 *   {content: 'Blue Irises', classified_by: [{id: 'title', classified_by: 'descriptive title'}]},
 *   {content: 'Van Gogh painting', classified_as: [{id: 'description', classified_as: 'descriptive title'}]}
 * ]
 * getClassifiedByWithClassification(submittedResource, 'descriptive title') would return the object with
 * 'id': 'title' from the 'classified_by' attribute of the second object in the array
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
 * Given an object or an array of objects, find all objects that are classified as an object
 * which is classified by nestedClassification
 *
 * @param {object|array} submittedResource -- the object to inspect
 * @param {string|array} nestedClassification -- the classification ID/IDS to match
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example for the submittedResource:
 * [
 *   {content: 'Irises', classified_by: [{id: 'title'}]},
 *   {content: 'Blue Irises', classified_by: [{id: 'title', classified_by: 'descriptive title'}]},
 *   {content: 'Van Gogh painting', classified_as: [{id: 'description', classified_as: 'descriptive title'}]}
 * ]
 * getObjectsClassifiedByWithClassification(submittedResource, 'descriptive title') would return the
 * third object in the array
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
 * @param {object|array} submittedResource -- the object to inspect
 * @param {string|array} nestedClassification -- the classification ID/IDS to match
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example for the submittedResource:
 * [
 *   {content: 'Irises', classified_by: [{id: 'title'}]},
 *   {content: 'Blue Irises', classified_by: [{id: 'title', classified_by: 'descriptive title'}]},
 *   {content: 'Van Gogh painting', classified_as: [{id: 'description', classified_as: 'descriptive title'}]}
 * ]
 * getObjectsClassifiedByWithClassification(submittedResource, 'descriptive title') would return the
 * second object in the array
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
 * Gets the primary name of the JSON-LD object based on an AAT value or other qualifier, uses the AAT value of Preferred Term as the default
 *
 * @param {Object} submittedResource - the JSON-LD object
 * @param {Object} options - additional options
 * @param {string|array} options.requestedClassifications - the requested classifications (default is aat.PRIMARY_TERM)
 * @param {string} options.language - the requested language (default undefined)
 * @param {Object} options.languageOptions - additional language options
 * @param {Object} options.languageOptions.lookupMap - a map of terms -> values for translating language keys (eg. "en": "aat:11111")
 * @param {string} options.languageOptions.fallbackLanguage - if a language is specified, this provides a fallback language if that language is not available in the data, e.g. use english if there is no french
 *
 * @example gets the primary name using defaults getPrimaryName(object)
 * @example gets the primary name in french getPrimaryName(object, {language:'fr'})
 * @example gets the primary name using a different AAT term getPrimaryName(object, {requestedClassifications: 'http://vocab.getty.edu/aat/300417193'})
 *
 * @returns {String} of items identified as primary names
 */
export function getPrimaryName(
  submittedResource,
  {
    requestedClassifications = aat.PREFERRED_TERM,
    language,
    languageOptions = {},
  } = {}
) {
  return getPrimaryNames(submittedResource, {
    requestedClassifications,
    language,
    languageOptions,
  })[0];
}

/**
 * Gets the primary names of the JSON-LD object based on an AAT value or other qualifier, uses the AAT value of Preferred Term as the default
 *
 * @param {Object} submittedResource - the JSON-LD object
 * @param {Object} options - additional options
 * @param {string|array} options.requestedClassifications - the requested classifications (default is aat.PRIMARY_TERM)
 * @param {string} options.language - the requested language (default undefined)
 * @param {Object} options.languageOptions - additional language options
 * @param {Object} options.languageOptions.lookupMap - a map of terms -> values for translating language keys (eg. "en": "aat:11111")
 * @param {string} options.languageOptions.fallbackLanguage - if a language is specified, this provides a fallback language if that language is not available in the data, e.g. use english if there is no french
 *
 * @example gets the primary name using defaults getPrimaryName(object)
 * @example gets the primary name in french getPrimaryName(object, {language:'fr'})
 * @example gets the primary name using a different AAT term getPrimaryName(object, {requestedClassifications: 'http://vocab.getty.edu/aat/300417193'})
 *
 * @returns {Array} of items identified as primary names
 */
export function getPrimaryNames(
  submittedResource,
  {
    requestedClassifications = aat.PREFERRED_TERM,
    language,
    languageOptions = {},
  } = {}
) {
  if (submittedResource == undefined) {
    return UNKNOWN;
  }
  let identified_by = normalizeFieldToArray(submittedResource, IDENTIFIED_BY);
  let names = identified_by.filter((item) => item.type == NAME);
  let name = getValuesByClassification(
    names,
    requestedClassifications,
    language,
    languageOptions
  );

  if (name.length > 0) {
    return name;
  }

  // fallback for error case
  let label = UNKNOWN;
  if (submittedResource && submittedResource.id) {
    label += " (" + submittedResource.id + ")";
  }
  return [label];
}

/**
 * Given an object or an array of objects, find all objects that with classifications
 * that match either all of the requestedClassifications or any of the requestedClassifications.
 *
 * @param {object|array} submittedResource -- the object to inspect
 * @param {string|array} requestedClassifications -- either a string or an array of classification strings
 * @param {string} classificationField -- the field to investigate for an object's classification (e.g. classified_as, classified_by)
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example for the submittedResource:
 * [
 *   {content: 'Irises', classified_as: [{id: 'title'}]},
 *   {content: 'Blue Irises', classified_as: [{id: 'title'}, {id: 'description'}]},
 *   {content: 'Van Gogh painting', classified_as: [{id: 'description'}]}
 * ]
 * getClassified(submittedResource, ['title', 'description']) would return the second object in the array
 *
 * @example for the submittedResource:
 * [
 *   {content: 'Irises', classified_as: [{id: 'title'}]},
 *   {content: 'Blue Irises', classified_as: [{id: 'title'}, {id: 'description'}]},
 *   {content: 'Van Gogh painting', classified_as: [{id: 'description'}]}
 * ]
 * getClassified(submittedResource, ['title', 'description'], 'classified_as', undefined, {}, 'OR')
 * would return all objects in the array
 *
 * @returns {array} an array of objects that match
 */
export function getClassified(
  submittedResource,
  requestedClassifications,
  classificationField = CLASSIFIED_AS,
  language = undefined,
  languageOptions = {},
  operator = AND
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
    let languageMatch = doesObjectLanguageMatch(
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

    // function to check whether the ID matches
    let inClassificationIDs = (id) =>
      (languageMatch && classificationIDs.includes(id)) ||
      classificationIDs.includes(normalizeAatId(id));

    if (operator.toUpperCase() == AND) {
      if (requestedClassArray.every(inClassificationIDs)) {
        results.push(resource);
      }
    } else if (operator.toUpperCase() == OR) {
      if (requestedClassArray.some(inClassificationIDs)) {
        results.push(resource);
      }
    }
  }
  return results;
}

/**
 * Get the value of the first object that is classified as the requestedClassification
 * parameter.
 *
 * @param {object|array} submittedResource -- the JSON-LD Object
 * @param {string|array} requestedClassifications -- the requested classifications
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example for the submittedResource:
 * [
 *   {content: 'Irises', classified_as: [{id: 'title'}]},
 *   {content: 'Blue Irises', classified_as: [{id: 'title'}]},
 *   {content: 'Van Gogh painting', classified_as: [{id: 'description'}]}
 * ]
 * getValuesByClassification(submittedResource, 'title') would return 'Irises'
 *
 * @returns {string|number} the matching value
 */
export function getValueByClassification(
  submittedResource,
  requestedClassifications,
  language,
  languageOptions
) {
  let results = getClassifiedAs(
    submittedResource,
    requestedClassifications,
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
 * Get an array of all the values of objects that are classified as the
 * requestedClassification parameter.
 *
 * @param {object|array} submittedResource -- the JSON-LD Object
 * @param {string|array} requestedClassifications -- the requested classifications
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example for the submittedResource:
 * [
 *   {content: 'Irises', classified_as: [{id: 'title'}]},
 *   {content: 'Blue Irises', classified_as: [{id: 'title'}]},
 *   {content: 'Van Gogh painting', classified_as: [{id: 'description'}]}
 * ]
 * getValuesByClassification(submittedResource, 'title') would return ['Irises', 'Blue Irises']
 *
 * @returns {array} the matching values (string|array)
 */
export function getValuesByClassification(
  submittedResource,
  requestedClassifications,
  language,
  languageOptions
) {
  let results = getClassifiedAs(
    submittedResource,
    requestedClassifications,
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
  return [];
}

/**
 * Given an object get the value of the 'value' or 'content' attribute (if
 * an object has both returns the 'value' attribute)
 *
 * @param {object} object -- the JSON-LD object
 *
 * @example getValueOrContent({'value': 123, 'content': '456'}) would return 123
 *
 * //fixme: if this should only return a string or number should we add a type check?
 * @returns {string|number} the value or content depending on which exists.
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
 * Gets all the values of objects in a Linked Art object's 'referred_to_by' field
 * which are classified by the classification parameter.
 *
 * @param {object} object - the Actor object to inspect
 * @param {string|array} classification - the classification
 *
 * @example for the object:
 * {
 *  'referred_to_by': [
 *     {content: 'Irises', classified_as: [{id: 'title'}]},
 *     {content: 'Van Gogh painting', classified_as: [{id: 'description'}]}
 *   ]
 * }
 * getReferredToByClassification(object, 'title') would return ['Irises']
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
 * Gets all of the objects from a LinkedArt Object's 'attributed_by' attribute which have
 * an 'assigned_property' attribute that matches the assignedProperty parameter.
 *
 * @param {Object} object - the LinkedArt Object
 * @param {String} assignedProperty  - the assigned property
 * 
 * @example getAttributedBy(object, 'identified_by') would return the object with 'type': 'Name'
 * from the example object below
 * {
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
   }
 * 
 * @return {Array} the list of values that map to the attributed value
 */
export function getAttributedBy(object, assignedProperty) {
  let attributed = normalizeFieldToArray(object, ATTRIBUTED_BY);
  if (attributed.length == 0) {
    return [];
  }

  return _getAssignedProperty(attributed, assignedProperty);
}

/**
 * Gets all of the objects from a LinkedArt Object's 'assigned_by' attribute which have
 * an 'assigned_property' attribute that matches the assignedProperty parameter.
 *
 * @param {Object} object - the LinkedArt Object
 * @param {String} assignedProperty  - the assigned properly
 * 
 * @example getAssignedBy(object, 'identified_by') would return the object with 'type': 'Name'
 * from the example object below
 *  {
 *   "assigned_by": [
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
     }
 * 
 * @return {Array} the list of values that map to the attributed value
 */
export function getAssignedBy(object, assignedProperty) {
  let assigned = normalizeFieldToArray(object, ASSIGNED_BY);
  if (assigned.length == 0) {
    return [];
  }

  return _getAssignedProperty(assigned, assignedProperty);
}

/**
 * Removes all duplicate objects (those with the same 'id' property) from an array
 * of objects. (keeps 1st object with a duplicated 'id' attribute and removes following
 * objects with the same 'id' attribute)
 *
 * @param {array} _array - the array of objects to de-duplicate
 *
 * @example removeDuplicatesById([{id: '123', type: 'Object'}, {id: '123', type: 'Artist'}])
 * would return [{id: '123', type: 'Object'}]
 *
 * @private
 * @return {array} the array of objects with duplicates removed
 */
export function removeDuplicatesById(_array) {
  const result = Array.from(new Set(_array.map((a) => a.id))).map((id) => {
    return _array.find((a) => a.id === id);
  });

  return result;
}

/**
 * Checks to see if an object's requested field has a part and returns the value. Otherwise,
 * returns either the requested field (if available) or an empty array (if neither is available)
 * 
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
 * @return {array} If the value of the object's field has a 'part' attribute, return it. If not, 
 * return the value of the object's field as an array. If the object does not have an attribute 
 * matching the field parameter return an empty array.
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
    if (attr[ASSIGNED_PROPERTY] == assignedProperty) {
      accumulator.push(attr[ASSIGNED]);
    }
  });
  return accumulator;
}

/**
 * Given an object or an array of objects, find all objects that are classified by an object
 * which is classified by nestedClassification
 *
 * @param {object|array} submittedResource -- the object to inspect
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
  let { objects } = _getObjectsAndClassificationsWithNestedClass(
    submittedResource,
    nestedClassification,
    classificationField,
    language,
    languageOptions
  );

  return objects;
}

/**
 * Given an object or an array of objects, find all classification objects that are classified
 * with the nestedClassification. (e.g. for Visual Items we need to get the rights statement
 * classification object, which we identify by its own classification see VisualItems.getClearanceLevel)
 *
 * @param {object} submittedResource -- the object to inspect
 * @param {string|array} nestedClassifications -- the classification ID/IDS to match
 * @param {string} classificationField -- the field to investigate for an object's classification (e.g. classified_as, classified_by)
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 * @private
 *
 * @returns {array} an array of objects that match
 */
export function _getClassificationsWithNestedClass(
  submittedResource,
  nestedClassifications,
  classificationField = CLASSIFIED_AS,
  language = undefined,
  languageOptions = {}
) {
  let { classifications } = _getObjectsAndClassificationsWithNestedClass(
    submittedResource,
    nestedClassifications,
    classificationField,
    language,
    languageOptions
  );

  return classifications;
}

/**
 * Given an object or an array of objects, find all classification objects that are classified
 * with the nestedClassification and return those classification objects as well as the full objects
 * from the original submittedResource to which those classification objects apply.
 *
 * (i.e. Some Linked Data objects will be classified by rights statements objects, such objects
 * will have different IDs depending upon the rights of the Linked Data object, but will themselves
 * be classified as "rights statements". This function could be used to grab all of the "rights
 * statements" classification objects from a set of Linked Data objects as well as all of the Linked
 * Data objects that are classified by a "rights statement" type of classification)
 *
 * @param {object} submittedResource -- the object to inspect
 * @param {string|array} nestedClassifications -- the classification ID/IDS to match
 * @param {string} classificationField -- the field to investigate for an object's classification (e.g. classified_as, classified_by)
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 * @private
 *
 * @returns {object} an object with 'classifications' and 'objects' attributes containing arrays of
 *   classification objects and full objects from the submittedResource respectively
 */
export function _getObjectsAndClassificationsWithNestedClass(
  submittedResource,
  nestedClassifications,
  classificationField = CLASSIFIED_AS,
  language = undefined,
  languageOptions = {}
) {
  let returnObject = { classifications: [], objects: [] };
  let resourceArray = _convertToArrayIfNeeded(submittedResource);
  if (resourceArray.length == 0) {
    return returnObject;
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
      nestedClassifications,
      classificationField,
      language,
      languageOptions
    );
    returnObject.classifications =
      returnObject.classifications.concat(classifications);
    if (classifications.length > 0) {
      returnObject.objects.push(resource);
    }
  }

  return returnObject;
}

/**
 * Gets the specified sub-field values for a field that may have parts.
 *
 * @description
 * Helper function that returns an array of requested production/creation information, tries to reconcile where the production may have parts.
 * This can be useful to get the Timespan for a creation, or the creator, or other nested fields
 *
 * @param {object} object - the JSON-LD HumanMadeObject or InformationObject
 * @param {string} field - the data field in the object to look for the subfield
 * @param {string} subfield - the subfield to look for
 *
 * @example gets the subfield regardless of whether the field has parts or not
 *  getFieldPartSubfield({produced_by: { part: [{carried_out_by: {id:123}}}]}, 'produced_by', 'carried_out_by'),  would return an array with one item [{id:123}]
 *
 * @returns {array} an array of the matching values
 */
export function getFieldPartSubfield(object, field, subfield) {
  let parts = normalizeFieldWithParts(object, field);
  let accumulator = [];
  parts.forEach((part) => {
    let target = normalizeFieldToArray(part, subfield);
    accumulator = accumulator.concat(target);
  });

  return accumulator;
}

/**
 * Builds on getValuesByClassification to look inside a field for those values, e.g. "referred_to_by" or "identified_by" and returns the entries classified by the values
 *
 * @param {Object} submittedResource - the JSON-LD Object
 * @param {String} field - the field to look in (e.g. referred_to_by)
 * @param {String|Array} requestedClassifications - the AAT or local classifications
 * @param {String} language - the desired language (default is any)
 * @param {Object} languageOptions (additional language options)
 *
 *  @example getFieldValuesByClassifications(object, "referred_to_by", aat.ACKNOWLEDGEMENTS, 'ja') // would return all of the acknowledgement entries in japanese
 *
 * @returns {Array} an array of objects
 */
export function getFieldValuesByClassifications(
  submittedResource,
  field,
  requestedClassifications,
  language,
  languageOptions
) {
  return getValuesByClassification(
    normalizeFieldToArray(submittedResource, field),
    requestedClassifications,
    language,
    languageOptions
  );
}

/**
 * @description Gets the descriptions(s) associated with an object if available.
 * @param {object} submittedResource -- JSON-LD object
 * @param {Object} options - additional options
 * @param {string|array} options.requestedClassifications -- AAT descriptions (default: {@link http://vocab.getty.edu/aat/300080091|aat.DESCRIPTION})
 * @param {string} options.language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} options.languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example getDescriptions(object) // gets descriptions(s) using defaults
 * @example getDescriptions(object, {language:'fr'}) // gets descriptions(s) in French
 *
 * @returns {array} content of descriptions(s)
 */
export function getDescriptions(
  submittedResource,
  {
    requestedClassifications = aat.DESCRIPTION,
    language,
    languageOptions = {},
  } = {}
) {
  return getFieldValuesByClassifications(
    submittedResource,
    REFERRED_TO_BY,
    requestedClassifications,
    language,
    languageOptions
  );
}
