/**
 * @file LinkedArtHelpers
 * @author Adam Brin, Pamela Lam, Nabil Kashyap
 * @module ObjectHelpers
 * @description This class contains convenience helpers for working with linked.art objects
 */

import {
  getFieldPartSubfield,
  getValuesByClassification,
} from "./LinkedArtHelpers";
import { normalizeFieldToArray, normalizeAatId } from "./BasicHelpers";
import aat from "../data/aat.json";

import {
  CARRIED_OUT_BY,
  IDENTIFIED_BY,
  PRODUCED_BY,
  REFERRED_TO_BY,
  TIMESPAN,
} from "../data/constants.json";

/**
 * @description Gets descriptive statement(s) about the physical extent of an object if available.
 * @param {object} submittedResource -- JSON-LD object
 * @param {Object} options - additional options
 * @param {string|array} options.requestedClassification -- AAT dimensions description (default: {@link http://vocab.getty.edu/aat/300435430|aat.DIMENSIONS_DESCRIPTION})
 * @param {string} options.language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} options.languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example gets dimensions descriptions using defaults getDimensionsDescriptions(object)
 * @example gets dimensions descriptions in Welsh getDimensionsDescriptions(object, {language:'cy'})
 * @example gets dimensions descriptions using a different AAT term getDimensionsDescriptions(object, {requestedClassifications: 'http://vocab.getty.edu/aat/300266036'})
 *
 * @returns {array} content of AAT dimensions descriptions
 */
export function getDimensionsDescriptions(
  submittedResource,
  {
    requestedClassification = aat.DIMENSIONS_DESCRIPTION,
    language,
    languageOptions = {},
  } = {}
) {
  requestedClassification = normalizeAatId(requestedClassification);
  const referredToBy = normalizeFieldToArray(submittedResource, REFERRED_TO_BY);

  return getValuesByClassification(
    referredToBy,
    requestedClassification,
    language,
    languageOptions
  );
}

/**
 * @description Gets accession number(s) associated with an object if available.
 * @param {object} submittedResource -- JSON-LD object
 * @param {Object} options - additional options
 * @param {string|array} options.requestedClassification -- AAT accession numbers (default: {@link http://vocab.getty.edu/aat/300312355|aat.ACCESSION_NUMBERS})
 * @param {string} options.language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} options.languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example gets accession numbers using defaults getAccessionNumbers(object)
 * @example gets accession numbers in Hindi getAccessionNumbers(object, {language:'hi'})
 * @example gets accession numbers using a different AAT term getAccessionNumbers(object, {requestedClassifications: 'http://vocab.getty.edu/aat/300444185'})
 *
 * @returns {array} content of AAT accession numbers
 */
export function getAccessionNumbers(
  submittedResource,
  {
    requestedClassification = aat.ACCESSION_NUMBERS,
    language,
    languageOptions = {},
  } = {}
) {
  requestedClassification = normalizeAatId(requestedClassification);
  const identifiedBy = normalizeFieldToArray(submittedResource, IDENTIFIED_BY);

  return getValuesByClassification(
    identifiedBy,
    requestedClassification,
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
 * @description Gets the culture(s) associated with an object if available.
 * @param {object} submittedResource -- JSON-LD object
 * @param {Object} options - additional options
 * @param {string|array} options.requestedClassification -- AAT culture (default: {@link http://vocab.getty.edu/aat/300055768|aat.CULTURE})
 * @param {string} options.language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} options.languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example gets culture(s) using defaults getCultures(object)
 * @example gets culture(s) in French getCultures(object, {language:'fr'})
 *
 * @returns {array} content of AAT culture(s)
 */
export function getCultures(
  submittedResource,
  { requestedClassification = aat.CULTURE, language, languageOptions = {} } = {}
) {
  requestedClassification = normalizeAatId(requestedClassification);
  const referredToBy = normalizeFieldToArray(submittedResource, REFERRED_TO_BY);

  return getValuesByClassification(
    referredToBy,
    requestedClassification,
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
