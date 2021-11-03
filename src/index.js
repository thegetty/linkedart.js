/**
 * This is the main entrypoint for the module. We import the methods we want to expose
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
  getFieldPartSubfield,
} from "./helpers/LinkedArtHelpers";

import { normalizeAatId, normalizeFieldToArray } from "./helpers/BasicHelpers";

import {
  doesObjectLanguageMatch,
  getLanguageId,
  normalizeLanguageId,
  lookupAatFromIso,
  lookupIsoFromAat,
} from "./helpers/LanguageHelpers";

import { getCultures } from "./helpers/ObjectHelpers";

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
  getReferredToByClassification,
  getAttributedBy,
  getAssignedBy,
  getLanguageId,
  normalizeLanguageId,
  normalizeAatId,
  getClassified,
  lookupAatFromIso,
  lookupIsoFromAat,
};
