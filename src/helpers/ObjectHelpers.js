/**
 * @file LinkedArtHelpers
 * @author Adam Brin, Pamela Lam, Nabil Kashyap
 * @module ObjectHelpers
 * @description This class contains convneience helpers for working with linked.art objects
 */

import * as linkedArtHelpers from "./LinkedArtHelpers";
import { normalizeAatId } from "./BasicHelpers";
import aat from "../data/aat.json";

const REFERRED_TO_BY = "referred_to_by";

/**
 * 
 * @param {object|array} submittedResource 
 * @param {string|array} requestedClassification -- AAT dimensions description
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 
 * @returns {string} content of AAT dimensions description
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
