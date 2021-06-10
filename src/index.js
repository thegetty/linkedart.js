/**
 * This is the main entrypoint for the module. We import the methods we want to expose
 * from the appropriate helper and then export them as part of the module.
 */
import {
  classifiedAs,
  classifiedBy,
  classificationsByNestedClass,
  resourcesByClassifications,
  objectsByNestedClass,
  getValueByClassification,
  getValuesByClassification,
  getValueOrContent,
  getReferredToByClassification,
  getAttributed,
  getAssigned,
} from "./helpers/LinkedArtHelpers";

import { checkEmptyArray, checkEmptyField } from "./helpers/BasicHelpers";
import {
  doesLanguageMatch,
  getLanguageId,
  normalizeLanguage,
} from "./helpers/LanguageHelpers";

export {
  checkEmptyArray,
  checkEmptyField,
  classifiedAs,
  classifiedBy,
  classificationsByNestedClass,
  doesLanguageMatch,
  objectsByNestedClass,
  getValueByClassification,
  getValueOrContent,
  getValuesByClassification,
  getReferredToByClassification,
  getAttributed,
  getAssigned,
  getLanguageId,
  normalizeLanguage,
  resourcesByClassifications,
};
