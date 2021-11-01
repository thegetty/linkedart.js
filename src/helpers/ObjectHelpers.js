/**
 * @file LinkedArtHelpers
 * @author Adam Brin, Pamela Lam, Nabil Kashyap
 * @module ObjectHelpers
 * @description This class contains convneience helpers for working with linked.art objects
 */

import { normalizeFieldToArray, normalizeAatId } from "./BasicHelpers";
import * as linkedArtHelpers from "./LinkedArtHelpers";
import aat from "../data/aat.json";

const IDENTIFIED_BY = "identified_by";
const REFERRED_TO_BY = "referred_to_by";

/**
 * 
 * @param {object|array} submittedResource 
 * @param {string|array} requestedClassification -- AAT dimensions description
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 
 * @returns {string} content of AAT dimensions description
 */
export function getDimensionsDescription(
  submittedResource,
  {
    requestedClassification = aat.DIMENSIONS_DESCRIPTION,
    language,
    languageOptions = {},
  } = {}
) {
  requestedClassification = normalizeAatId(requestedClassification);
  const referredToBy = normalizeFieldToArray(submittedResource, REFERRED_TO_BY);

  return linkedArtHelpers.getValueByClassification(
    referredToBy,
    requestedClassification,
    language,
    languageOptions
  );
}

/**
 * 
 * @param {object|array} submittedResource 
 * @param {string|array} requestedClassification -- AAT accession numbers
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 
 * @returns {string} content of AAT dimensions description
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

  return linkedArtHelpers.getValueByClassification(
    identifiedBy,
    requestedClassification,
    language,
    languageOptions
  );
}
