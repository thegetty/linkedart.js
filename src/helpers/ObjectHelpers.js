/**
 * @file LinkedArtHelpers
 * @author Adam Brin, Pamela Lam, Nabil Kashyap
 * @module ObjectHelpers
 * @description This class contains convenience helpers for working with linked.art objects
 */

import {
  getFieldPartSubfield,
  getFieldValuesByClassifications,
  getClassifiedAs,
  getClassified,
  getValueOrContent,
} from "./LinkedArtHelpers";
import { normalizeAatId, normalizeFieldToArray } from "./BasicHelpers";
import aat from "../data/aat.json";
import {
  REFERRED_TO_BY,
  TIMESPAN,
  PRODUCED_BY,
  CARRIED_OUT_BY,
  IDENTIFIED_BY,
  REPRESENTATION,
  SUBJECT_TO,
  CLASSIFIED_AS,
  OR,
} from "../data/constants.json";

/**
 * @description Gets descriptive statement(s) about the physical extent of an object if available.
 * @param {object} submittedResource -- JSON-LD object
 * @param {Object} options - additional options
 * @param {string|array} options.requestedClassifications -- AAT dimensions description (default: {@link http://vocab.getty.edu/aat/300435430|aat.DIMENSIONS_DESCRIPTION})
 * @param {string} options.language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} options.languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example getDimensionsDescriptions(object) // gets dimensions descriptions using defaults
 * @example getDimensionsDescriptions(object, {language:'cy'}) // gets dimensions descriptions in Welsh
 * @example getDimensionsDescriptions(object, {requestedClassifications: 'http://vocab.getty.edu/aat/300266036'}) // gets dimensions descriptions using a different AAT term
 *
 * @returns {array} content of AAT dimensions descriptions
 */
export function getDimensionsDescriptions(
  submittedResource,
  {
    requestedClassifications = aat.DIMENSIONS_DESCRIPTION,
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

/**
 * @description Gets accession number(s) associated with an object if available.
 * @param {object} submittedResource -- JSON-LD object
 * @param {Object} options - additional options
 * @param {string|array} options.requestedClassifications -- AAT accession numbers (default: {@link http://vocab.getty.edu/aat/300312355|aat.ACCESSION_NUMBERS})
 * @param {string} options.language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} options.languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example getAccessionNumbers(object) // gets accession numbers using defaults
 * @example getAccessionNumbers(object, {language:'hi'}) // gets accession numbers in Hindi
 * @example getAccessionNumbers(object, {requestedClassifications: 'http://vocab.getty.edu/aat/300444185'}) // gets accession numbers using a different AAT term
 * @returns {array} content of AAT accession numbers
 */
export function getAccessionNumbers(
  submittedResource,
  {
    requestedClassifications = aat.ACCESSION_NUMBERS,
    language,
    languageOptions = {},
  } = {}
) {
  return getFieldValuesByClassifications(
    submittedResource,
    IDENTIFIED_BY,
    requestedClassifications,
    language,
    languageOptions
  );
}

/**
 * Gets the carried out by object(s) that are referenced in the productions and returns them.
 *
 * @description
 * gets the creator from the JSON-LD (produced_by / carried_out_by ) and returns the result.  This is likely an object which
 * is a reference to a Person or Group (Id, Type, and Label with nothing else), but could simply be an ID reference as well.
 *
 * @param {object} object - the JSON-LD Object to look in
 *
 * @example gets creator object/reference regardless of whether the production has a part or not
 *  getCarriedOutBy({produced_by: { part: [{carried_out_by: {id:123}}}]}),  would return an array with one item [{id:123}]
 *
 * @returns {array} - an array of the references
 */
export function getCarriedOutBy(object) {
  return getFieldPartSubfield(object, PRODUCED_BY, CARRIED_OUT_BY);
}

/**
 * @description Gets URLs for digital images associated with an object if available.
 * @param {object} submittedResource -- JSON-LD object
 * @param {Object} options - additional options
 * @param {string|array} options.requestedClassifications -- AAT digital images (default: {@link http://vocab.getty.edu/aat/300215302|aat.DIGITAL_IMAGES})
 *
 * @example getDigitalImages(object) // gets digital images using defaults
 *
 * @returns {array} urls of AAT digital images
 */
export function getDigitalImages(
  submittedResource,
  {
    requestedClassifications = aat.DIGITAL_IMAGES,
    language,
    languageOptions = {},
  } = {}
) {
  const representations = normalizeFieldToArray(
    submittedResource,
    REPRESENTATION
  );

  let digitalImages = getClassifiedAs(
    representations,
    requestedClassifications
  );
  // return the digital image ids
  return digitalImages.map((img) => img.id);
}

/**
 * @description Gets rights statements associated with an object if available.
 * @param {object} submittedResource
 * @param {Object} options - additional options
 * @param {string|array} options.requestedClassifications -- (default: [{@link http://vocab.getty.edu/aat/300417696|aat.RIGHTS_STATEMENT}, {@link http://vocab.getty.edu/aat/300055547|aat.LEGAL_CONCEPTS}])
 * @param {string} options.language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} options.languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example getRightsStatements(object) // gets rights statements using defaults
 * @example getRightsStatements(object, {language:'ca'}) // gets rights statements in Catalan
 * @example getRightsStatements(object, {requestedClassifications: 'http://vocab.getty.edu/aat/300055617'}) // gets rights statements using a different AAT term
 *
 * @returns {array} array of rights statements
 */
export function getRightsStatements(
  submittedResource,
  {
    requestedClassifications = [aat.LEGAL_CONCEPTS, aat.RIGHTS_STATEMENT],
    language,
    languageOptions = {},
  } = {}
) {
  requestedClassifications = requestedClassifications.map((c) =>
    normalizeAatId(c)
  );
  const referredToBy = normalizeFieldToArray(submittedResource, REFERRED_TO_BY);
  const rights = getClassified(
    referredToBy,
    requestedClassifications,
    CLASSIFIED_AS,
    language,
    languageOptions,
    OR
  );
  return rights.map((right) => getValueOrContent(right));
}

/**
 * @description Gets copyright or licensing statements associated with an object if available.
 * @param {object} submittedResource
 * @param {Object} options - additional options
 * @param {string|array} options.requestedClassifications -- AAT copyright (default: {@link http://vocab.getty.edu/aat/300435434 |aat.COPYRIGHT})
 * @param {string} options.language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} options.languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example getCopyright(object) // gets copyright using defaults
 * @example getCopyright(object, {language:'ca'}) // gets copyright in Catalan
 * @example getCopyright(object, {requestedClassifications: 'http://vocab.getty.edu/aat/300055617'}) // gets copyright using a different AAT term
 *
 * @returns {array} array of copyright objects
 */
export function getCopyrightStatements(
  submittedResource,
  {
    requestedClassifications = aat.COPYRIGHT,
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

/**
 * @description Gets URLs for rights assertions an object is subject to if available.
 * @param {object} submittedResource
 *
 * @example getRightsAssertions(object) // gets rights assertions
 *
 * @returns {array} array of urls of assertions of rights the resource is subject to
 */
export function getRightsAssertions(
  submittedResource,
  { language, languageOptions = {} } = {}
) {
  const subjectTo = normalizeFieldToArray(submittedResource, SUBJECT_TO);

  // get array of rights assertion objects
  let rightsAssertions = [];
  subjectTo.forEach((obj) => {
    rightsAssertions = rightsAssertions.concat(obj[CLASSIFIED_AS]);
  });

  // return rights assertion ids
  return rightsAssertions.map((d) => d.id);
}

/**
 * @description Gets the acknowledgement statement associated with an object if available.
 * @param {object} submittedResource
 * @param {Object} options - additional options
 * @param {string|array} options.requestedClassifications -- AAT acknowledgement statement (default: {@link http://vocab.getty.edu/aat/300026687 |aat.ACKNOWLEDGEMENT})
 * @param {string} options.language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} options.languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example getAcknowledgementStatements(object) // gets acknowledgements using defaults
 * @example getAcknowledgementStatements(object, {language:'ca'}) // gets acknowledgements in Catalan
 * @example getAcknowledgementStatements(object, {requestedClassifications: 'http://vocab.getty.edu/aat/300055617'}) // gets acknowledgement using a different AAT term
 *
 * @returns {array} array of acknowledgement statements
 */
export function getAcknowledgementStatements(
  submittedResource,
  {
    requestedClassifications = aat.ACKNOWLEDGEMENT,
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

/**
 * Gets the timespan(s) for a production
 * 
 * @description This gets the timespan object(s) for the production information regardless of whether the production has parts or not.
 *
 * @param {Object} object - a JSON-LD Object
 *
 * @example gets the timespan 
 * getProductionTimespan({produced_by: { "timespan": {
      "id": "https://data.getty.edu/museum/collection/object/c88b3df0-de91-4f5b-a9ef-7b2b9a6d8abb/production/timespan",
      "type": "TimeSpan",
      "begin_of_the_begin": "1889-01-01T00:00:00",
      "end_of_the_end": "1889-12-31T23:59:59"
    },
}}}) returns [{"id": "https://data.getty.edu/museum/collection/object/c88b3df0-de91-4f5b-a9ef-7b2b9a6d8abb/production/timespan",
      "type": "TimeSpan",
      "begin_of_the_begin": "1889-01-01T00:00:00",
      "end_of_the_end": "1889-12-31T23:59:59"
}]
 * 
 * @returns {array} - an array of LinkedArt timespan objects
 */
export function getProductionTimespans(object) {
  return getFieldPartSubfield(object, PRODUCED_BY, TIMESPAN);
}
