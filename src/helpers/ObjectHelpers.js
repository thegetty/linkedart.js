/**
 * @file LinkedArtHelpers
 * @author Adam Brin, Pamela Lam, Nabil Kashyap
 * @module ObjectHelpers
 * @description This class contains convneience helpers for working with linked.art objects
 */

import { normalizeFieldToArray } from "./BasicHelpers";
import * as linkedArtHelpers from "./LinkedArtHelpers";

const DIMENSION = "dimension";
const IDENTIFIED_BY = "identified_by";
const REFERRED_TO_BY = "referred_to_by";
const REPRESENTATION = "representation";
const SUBJECT_TO = "subject_to";
const CLASSIFIED_AS = "classified_as";

// TODO: remove once aat.json is added
const aat = {
  DIMENSIONS_DESCRIPTION: "http://vocab.getty.edu/aat/300435430",
  ACCESSION_NUMBERS: "http://vocab.getty.edu/aat/300312355",
  WIDTH: "http://vocab.getty.edu/aat/300055647",
  HEIGHT: "http://vocab.getty.edu/aat/300055644",
  DEPTH: "http://vocab.getty.edu/aat/300072633",
  WEIGHT: "http://vocab.getty.edu/aat/300056240",
  DIGITAL_IMAGE: "http://vocab.getty.edu/aat/300215302",
  RIGHTS_STATEMENT: "http://vocab.getty.edu/aat/300417696",
  COPYRIGHT: "http://vocab.getty.edu/aat/300435434",
};

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
  requestedClassification = aat.DIMENSIONS_DESCRIPTION,
  language = undefined,
  languageOptions = {}
) {
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
  requestedClassification = aat.ACCESSION_NUMBERS,
  language = undefined,
  languageOptions = {}
) {
  const identifiedBy = normalizeFieldToArray(submittedResource, IDENTIFIED_BY);

  return linkedArtHelpers.getValuesByClassification(
    identifiedBy,
    requestedClassification,
    language,
    languageOptions
  );
}

/**
 * 
 * @param {object|array} submittedResource 
 * @param {string|array} requestedClassification -- AAT digital image
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 
 * @returns {array} urls of AAT digital images
 */
export function getDigitalImages(
  submittedResource,
  requestedClassification = aat.DIGITAL_IMAGE,
  language = undefined,
  languageOptions = {}
) {
  const representations = normalizeFieldToArray(
    submittedResource,
    REPRESENTATION
  );

  let digitalImages = linkedArtHelpers.getClassifiedAs(
    representations,
    "http://vocab.getty.edu/aat/300215302",
    language,
    languageOptions
  );
  // return the digital image ids
  return digitalImages.map((img) => img.id);
}

/**
 * 
 * @param {object|array} submittedResource 
 * @param {string|array} requestedClassification -- AAT rights statement
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 
 * @returns {array} array of rights statements
 */
export function getRightsStatements(
  submittedResource,
  requestedClassification = aat.RIGHTS_STATEMENT,
  language = undefined,
  languageOptions = {}
) {
  const referredToBy = normalizeFieldToArray(submittedResource, REFERRED_TO_BY);

  const rights = linkedArtHelpers.getClassifiedAs(
    referredToBy,
    aat.RIGHTS_STATEMENT
  );

  return rights;
}

/**
 * 
 * @param {object|array} submittedResource 
 * @param {string|array} requestedClassification -- AAT copyright
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 
 * @returns {array} array of copyright objects
 */
export function getCopyright(
  submittedResource,
  requestedClassification = aat.COPYRIGHT,
  language = undefined,
  languageOptions = {}
) {
  const referredToBy = normalizeFieldToArray(submittedResource, REFERRED_TO_BY);

  const copyright = linkedArtHelpers.getClassifiedAs(
    referredToBy,
    aat.COPYRIGHT
  );

  return copyright;
}
/**
 * 
 * @param {object|array} submittedResource 
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 
 * @returns {array} array of rights assertion ids
 */
export function getRightsAssertions(
  submittedResource,
  language = undefined,
  languageOptions = {}
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
