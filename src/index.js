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
  getAttributedBy,
  getAssignedBy,
} from "./helpers/LinkedArtHelpers";

import { normalizeFieldToArray } from "./helpers/BasicHelpers";
import {
  doesObjectLanguageMatch,
  getLanguageId,
  normalizeLanguageId,
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
  getValueByClassification,
  getValueOrContent,
  getValuesByClassification,
  getReferredToByClassification,
  getAttributedBy,
  getAssignedBy,
  getLanguageId,
  normalizeLanguageId,
  getClassified,
};
