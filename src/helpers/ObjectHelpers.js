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
import { normalizeAatId } from "./BasicHelpers";
import aat from "../data/aat.json";

import {
  REFERRED_TO_BY,
  TIMESPAN,
  PRODUCED_BY,
  CARRIED_OUT_BY,
} from "../data/constants.json";

/**
 *
 * @param {object} submittedResource
 * @param {string|array} requestedClassification -- AAT dimensions description
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
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
  let dimensionsDescription = getValuesByClassification(
    submittedResource[REFERRED_TO_BY],
    requestedClassification,
    language,
    languageOptions
  );
  return dimensionsDescription;
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
 * Gets the timespan(s) for a production
 * 
 * @description This this gets the timespan object(s) for the production information regardless of whether the production has parts or not.
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
