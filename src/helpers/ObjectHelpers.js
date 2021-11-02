/**
 * @file LinkedArtHelpers
 * @author Adam Brin, Pamela Lam, Nabil Kashyap
 * @module ObjectHelpers
 * @description This class contains convenience helpers for working with linked.art objects
 */

import * as linkedArtHelpers from "./LinkedArtHelpers";
import { normalizeAatId } from "./BasicHelpers";
import aat from "../data/aat.json";

const REFERRED_TO_BY = "referred_to_by";

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
  let dimensionsDescription = linkedArtHelpers.getValuesByClassification(
    submittedResource[REFERRED_TO_BY],
    requestedClassification,
    language,
    languageOptions
  );
  return dimensionsDescription;
}
