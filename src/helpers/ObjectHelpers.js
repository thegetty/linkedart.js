/**
 * @file LinkedArtHelpers
 * @author Adam Brin, Pamela Lam, Nabil Kashyap
 * @module ObjectHelpers
 * @description This class contains convneience helpers for working with linked.art objects
 */

import * as linkedArtHelpers from "./LinkedArtHelpers";

const REFERRED_TO_BY = "referred_to_by";

// TODO: remove once aat.json is added
const aat = {
  DIMENSIONS_DESCRIPTION: "http://vocab.getty.edu/aat/300435430",
};

export function getDimensionsDescription(
  submittedResource,
  requestedClassification = aat.DIMENSIONS_DESCRIPTION,
  language = undefined,
  languageOptions = {}
) {
  let dimensionsDescription = linkedArtHelpers.getValueByClassification(
    submittedResource[REFERRED_TO_BY],
    requestedClassification,
    language,
    languageOptions
  );
  return dimensionsDescription;
}
