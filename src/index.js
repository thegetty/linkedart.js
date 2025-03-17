/**
 * This is the main entrypoint for the module. We import the functions we want to expose
 * from the appropriate helper and then export them as part of the module.
 */
import {
  getClassifiedAs,
  getClassifiedBy,
  getClassifiedAsWithClassification,
  getClassifiedByWithClassification,
  getClassified,
  getObjectsClassifiedByWithClassification,
  getObjectsClassifiedAsWithClassification,
  getValueByClassification,
  getValuesByClassification,
  getValueOrContent,
  getReferredToByClassification,
  getPrimaryName,
  getPrimaryNames,
  getAttributedBy,
  getAssignedBy,
  getFieldValuesByClassifications,
  getFieldPartSubfield,
  getObjectParts
} from "./helpers/LinkedArtHelpers";

import {
  normalizeAatId,
  normalizeFieldToArray,
  normalizeFieldWithParts
} from "./helpers/BasicHelpers";

import {
  doesObjectLanguageMatch,
  getLanguageId,
  normalizeLanguageId,
  lookupAatFromIso,
  lookupIsoFromAat
} from "./helpers/LanguageHelpers";

import {
  getCultures,
  getDimensionsDescriptions,
  getAccessionNumbers,
  getCarriedOutBy,
  getDigitalImages,
  getRightsStatements,
  getCopyrightStatements,
  getRightsAssertions,
  getAcknowledgementStatements,
  getMaterialStatements,
  getProductionTimespans,
  getWorkTypes,
  getClassifications
} from "./helpers/ObjectHelpers";

export {
  normalizeFieldToArray,
  getClassifiedAs,
  getClassifiedBy,
  getClassifiedAsWithClassification,
  getClassifiedByWithClassification,
  getCultures,
  doesObjectLanguageMatch,
  getObjectsClassifiedByWithClassification,
  getObjectsClassifiedAsWithClassification,
  getPrimaryName,
  getPrimaryNames,
  getValueByClassification,
  getFieldPartSubfield,
  getValueOrContent,
  getValuesByClassification,
  getObjectParts,
  getReferredToByClassification,
  getAttributedBy,
  getAssignedBy,
  getLanguageId,
  normalizeLanguageId,
  normalizeFieldWithParts,
  normalizeAatId,
  getFieldValuesByClassifications,
  getClassified,
  lookupAatFromIso,
  lookupIsoFromAat,
  getDimensionsDescriptions,
  getAccessionNumbers,
  getCarriedOutBy,
  getDigitalImages,
  getRightsStatements,
  getCopyrightStatements,
  getRightsAssertions,
  getAcknowledgementStatements,
  getMaterialStatements,
  getProductionTimespans,
  getWorkTypes,
  getClassifications
};
