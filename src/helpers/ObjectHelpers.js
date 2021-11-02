/**
 * @file LinkedArtHelpers
 * @author Adam Brin, Pamela Lam, Nabil Kashyap
 * @module ObjectHelpers
 * @description This class contains convenience helpers for working with linked.art objects
 */

import { normalizeFieldToArray, normalizeAatId } from "./BasicHelpers";
import * as linkedArtHelpers from "./LinkedArtHelpers";
import aat from "../data/aat.json";

const IDENTIFIED_BY = "identified_by";
const REFERRED_TO_BY = "referred_to_by";
const REPRESENTATION = "representation";
const SUBJECT_TO = "subject_to";
const CLASSIFIED_AS = "classified_as";

/**
 *
 * @param {object} submittedResource
 * @param {string|array} requestedClassification -- AAT dimensions description
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example gets dimensions descriptions using defaults: getDimensionsDescriptions(object)
 * @example gets dimensions descriptions in Welsh: getDimensionsDescriptions(object, {language:'cy'})
 * @example gets dimensions descriptions using a different AAT term: getDimensionsDescriptions(object, {requestedClassifications: 'http://vocab.getty.edu/aat/300266036'})
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

  return linkedArtHelpers.getValuesByClassification(
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
 *
 * @example gets accession numbers using defaults: getAccessionNumbers(object)
 * @example gets accession numbers in Hindi: getAccessionNumbers(object, {language:'hi'})
 * @example gets accession numbers using a different AAT term: getAccessionNumbers(object, {requestedClassifications: 'http://vocab.getty.edu/aat/300444185'})
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
 * @param {string|array} requestedClassification -- AAT digital images {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example gets digital images using defaults: getDigitalImages(object)
 * @example gets digital images in Polish: getDigitalImages(object, {language:'pl'})
 * @example gets digital images using a different AAT term: getDigitalImages(object, {requestedClassifications: 'http://vocab.getty.edu/aat/300412188'})
 *
 * @returns {array} urls of AAT digital images
 */
export function getDigitalImages(
  submittedResource,
  {
    requestedClassification = aat.DIGITAL_IMAGES,
    language,
    languageOptions = {},
  } = {}
) {
  requestedClassification = normalizeAatId(requestedClassification);
  const representations = normalizeFieldToArray(
    submittedResource,
    REPRESENTATION
  );

  let digitalImages = linkedArtHelpers.getClassifiedAs(
    representations,
    requestedClassification,
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
 *
 * @example gets rights statements using defaults: getRightsStatements(object)
 * @example gets rights statements in Catalan: getRightsStatements(object, {language:'ca'})
 * @example gets rights statements using a different AAT term: getRightsStatements(object, {requestedClassifications: 'http://vocab.getty.edu/aat/300055617'})
 *
 * @returns {array} array of rights statements
 */
export function getRightsStatements(
  submittedResource,
  {
    requestedClassification = aat.RIGHTS_STATEMENT,
    language,
    languageOptions = {},
  } = {}
) {
  requestedClassification = normalizeAatId(requestedClassification);
  const referredToBy = normalizeFieldToArray(submittedResource, REFERRED_TO_BY);

  const rights = linkedArtHelpers.getClassifiedAs(
    referredToBy,
    requestedClassification,
    language,
    (languageOptions = {})
  );

  return rights;
}

/**
 *
 * @param {object|array} submittedResource
 * @param {string|array} requestedClassification -- AAT copyright
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example gets copyright using defaults: getCopyright(object)
 * @example gets copyright in Catalan: getCopyright(object, {language:'ca'})
 * @example gets copyright using a different AAT term: getCopyright(object, {requestedClassifications: 'http://vocab.getty.edu/aat/300055617'})
 *
 * @returns {array} array of copyright objects
 */
export function getCopyright(
  submittedResource,
  {
    requestedClassification = aat.COPYRIGHT,
    language,
    languageOptions = {},
  } = {}
) {
  requestedClassification = normalizeAatId(requestedClassification);
  const referredToBy = normalizeFieldToArray(submittedResource, REFERRED_TO_BY);

  const copyright = linkedArtHelpers.getClassifiedAs(
    referredToBy,
    aat.COPYRIGHT,
    language,
    (languageOptions = {})
  );

  return copyright;
}

/**
 *
 * @param {object|array} submittedResource
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s) @see LanguageHelpers.doesObjectLanguageMatch
 *
 * @example gets rights assertions using defaults: getRightsAssertions(object)
 * @example gets rights assertions in Macedonian: getRightsAssertions(object, {language:'mk'})
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
