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
  getProductionTimespans,
  getAttributedBy,
  getAssignedBy,
} from "./helpers/LinkedArtHelpers";

import { normalizeAatId, normalizeFieldToArray } from "./helpers/BasicHelpers";
import {
  doesObjectLanguageMatch,
  getLanguageId,
  normalizeLanguageId,
  lookupAatFromIso,
  lookupIsoFromAat,
} from "./helpers/LanguageHelpers";

export {
  normalizeFieldToArray,
  getClassifiedAs,
  getClassifiedBy,
  getClassifiedAsWithClassification,
  getClassifiedByWithClassification,
  doesObjectLanguageMatch,
  getObjectsClassifiedByWithClassification,
  getObjectsClassifiedAsWithClassification,
  getPrimaryName,
  getPrimaryNames,
  getProductionTimespans,
  getValueByClassification,
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
