/**
 * @file LinkedArtHelpers
 * @author Adam Brin, Pamela Lam, Nabil Kashyap
 * @module ObjectHelpers
 * @description This class contains convneience helpers for working with linked.art objects
 */

import * as linkedArtHelpers from "./LinkedArtHelpers";
import { normalizeFieldToArray, normalizeAatId } from "./BasicHelpers";
import aat from "../data/aat.json";

const REFERRED_TO_BY = "referred_to_by";

export function getDimensionsDescription(
  submittedResource,
  {
    requestedClassification = aat.DIMENSIONS_DESCRIPTION,
    language,
    languageOptions = {},
  } = {}
) {
  requestedClassification = normalizeAatId(requestedClassification);
  let dimensionsDescription = linkedArtHelpers.getValueByClassification(
    submittedResource[REFERRED_TO_BY],
    requestedClassification,
    language,
    languageOptions
  );
  return dimensionsDescription;
}
