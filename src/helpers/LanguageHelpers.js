/**
 * @file LanguageHelpers
 * @author Adam Brin, Pamela Lam, Alyx Rossetti, Charles Webb, Selina Zawacki
 * @module LanguageHelpers
 * @description This class contains helpers for working with Languages in Linked.art
 */

export const DEFAULT_LANGUAGE_LOOKUP = {
  en: "http://vocab.getty.edu/aat/300388277",
  fr: "http://vocab.getty.edu/aat/300388306",
  de: "http://vocab.getty.edu/aat/300388344",
  es: "http://vocab.getty.edu/aat/300389311",
  zh: "http://vocab.getty.edu/aat/300388113",
  hi: "http://vocab.getty.edu/aat/300388412",
  af: "http://vocab.getty.edu/aat/300387782",
  sq: "http://vocab.getty.edu/aat/300387803",
  ar: "http://vocab.getty.edu/aat/300387843",
  bg: "http://vocab.getty.edu/aat/300388034",
  bs: "http://vocab.getty.edu/aat/300388023",
  ca: "http://vocab.getty.edu/aat/300388072",
  pt: "http://vocab.getty.edu/aat/300389115",
  bn: "http://vocab.getty.edu/aat/300387971",
  ru: "http://vocab.getty.edu/aat/300389168",
  nl: "http://vocab.getty.edu/aat/300388256",
  fi: "http://vocab.getty.edu/aat/300388299",
  is: "http://vocab.getty.edu/aat/300388449",
  ga: "http://vocab.getty.edu/aat/300388467",
  it: "http://vocab.getty.edu/aat/300388474",
  fa: "http://vocab.getty.edu/aat/300388296",
  el: "http://vocab.getty.edu/aat/300389734",
  gu: "http://vocab.getty.edu/aat/300388371",
  ko: "http://vocab.getty.edu/aat/300388633",
  la: "http://vocab.getty.edu/aat/300388693",
  lt: "http://vocab.getty.edu/aat/300388723",
  mk: "http://vocab.getty.edu/aat/300388760",
  ja: "http://vocab.getty.edu/aat/300388486",
  hr: "http://vocab.getty.edu/aat/300388185",
  cs: "http://vocab.getty.edu/aat/300388191",
  da: "http://vocab.getty.edu/aat/300388204",
  el: "http://vocab.getty.edu/aat/300388361",
  ka: "http://vocab.getty.edu/aat/300388343",
  he: "http://vocab.getty.edu/aat/300388401",
  hu: "http://vocab.getty.edu/aat/300388770",
  no: "http://vocab.getty.edu/aat/300388992",
  pl: "http://vocab.getty.edu/aat/300389109",
  ro: "http://vocab.getty.edu/aat/300389157",
  sk: "http://vocab.getty.edu/aat/300389290",
  sl: "http://vocab.getty.edu/aat/300389291",
  sr: "http://vocab.getty.edu/aat/300389247",
  sv: "http://vocab.getty.edu/aat/300389336",
  tr: "http://vocab.getty.edu/aat/300389470",
  cy: "http://vocab.getty.edu/aat/300389555",
};

export const NO_LANGUAGE = "NO_LANGUAGE";

/**
 * Checks whether the object matches the language specified in it's language declaration
 *
 * True cases:
 * 1. if language is undefined, return true
 * 2. if the language parameter matches the language of the object, return true
 * 3. if the language parameter doesn't match the language of the object the, but the
 *   languageOptions.fallbackLanguage parameter matches the language of the object, return true
 * 4. if the language of the object is not defined and languageOptions.includeItemsWithNoLanguage
 *   is true, return true
 *
 * @param {object} object -- the object to check for a matching language
 * @param {string} language -- limits the results to just a specific language (or leave undefined to match all objects)
 * @param {object} languageOptions -- optional object with expected attributes 'fallbackLanguage',
 *   'includeItemsWithNoLanguage', and 'lookupMap' (see normalizeLanguageId)
 *
 * @example object without a 'language' attribute
 * doesObjectLanguageMatch({id:"1",content:"test"},"en") would return true
 *
 * @example object without a 'language' attribute and with languageOptions.includeItemsWithNoLanguage == false
 * doesObjectLanguageMatch({id:"1",content:"test"},"en",{includeItemsWithNoLanguage:false}) would return false
 *
 * @example with languageOptions.lookupMap
 * doesObjectLanguageMatch({id:"1",content:"test",language:"fr"},"en",{lookupMap:{fr: "en"}}) would return true
 *
 * @example with languageOptions.fallbackLanguage
 * doesObjectLanguageMatch({id:"1",content:"test",language:"fr"},"en",{fallbackLanguage:'fr'}) would return true
 *
 * @returns {boolean}
 */
export function doesObjectLanguageMatch(
  object,
  language,
  languageOptions = {}
) {
  // If the language parameter is undefined, return true
  if (language == undefined) {
    return true;
  }
  // Get the normalized LANGUAGE_IDs for the result
  let lang_ids = getLanguageId(object, languageOptions);

  // if the languageId matches the specified language
  if (lang_ids.includes(normalizeLanguageId(language, languageOptions))) {
    return true;
  }

  // handle fallback for language
  if (
    languageOptions.fallbackLanguage != undefined &&
    lang_ids.includes(
      normalizeLanguageId(languageOptions.fallbackLanguage, languageOptions)
    )
  ) {
    return true;
  }

  // if the languageId matches "no language" or there are no languages
  if (lang_ids.includes(NO_LANGUAGE) || lang_ids.length == 0) {
    if (languageOptions.includeItemsWithNoLanguage == false) {
      return false;
    }

    return true;
  }

  return false;
}

/**
 * Get the LanguageId(s) for a given object and returns the unique list of languages (normalized)
 *
 * @param {object} obj -- the object to look for the language block in
 * @param {object} languageOptions -- any additional options when working with language(s)
 *
 * @example object with a string value in its 'language' attribute and no languageOptions
 * getLanguageId({language: 'en'}) would return "http://vocab.getty.edu/aat/300388277"
 *
 * @example object with an object in its 'language' attribute and languageOptions.lookupMap defined
 * getLanguageId({language: {id: 'http://vocab.getty.edu/language/en'}}, {lookupMap: {'en': 'fr'}})
 * would return 'fr'
 *
 * @example object without a 'language' attribute and languageOptions.lookupMap defined
 * getLanguageId({}, {lookupMap: {'en': 'fr'}}) would return "NO_LANGUAGE"
 *
 * @returns {array} the unique list of languages represented in the data
 */
export function getLanguageId(obj, languageOptions) {
  if (obj == undefined || obj.language == undefined) {
    return [NO_LANGUAGE];
  }
  if (typeof obj.language === "string") {
    return [normalizeLanguageId(obj.language, languageOptions)];
  }
  let toReturn = new Set();

  // if we have an array, get all of the values
  obj.language.forEach((lang) => {
    if (lang == undefined) {
      toReturn.add(NO_LANGUAGE);
    } else if (typeof lang === "string") {
      toReturn.add(lang);
    } else if (lang.id) {
      toReturn.add(lang.id);
    }
  });

  // convert the set to an array and then normalize the results
  toReturn = Array.from(toReturn).map((item) =>
    normalizeLanguageId(item, languageOptions)
  );

  return toReturn;
}

/**
 * Normalize a language id string to the corresponding AAT ID defined in the
 * DEFAULT_LANGUAGE_LOOKUP or to something else defined by languageOptions.lookupMap
 *
 * Algorithm summary:
 * 1. simplifies an AAT language code or other URL ending in ISO code (e.g. http://vocab.getty.edu/language/en)
 * to just the ISO code (2 letter) (e.g. en) before checking for that code in the lookupMap.
 * 2. if the simplified lang_id param can't be found in the lookupMap, returns the original lang_id
 *
 * @param {string} lang_id -- the language id to normalize
 * @param {object} languageOptions -- any additional options when working with language(s)
 *
 * @example AAT language code URL
 * normalizeLanguageId('http://vocab.getty.edu/language/en') would return "http://vocab.getty.edu/aat/300388277"
 *
 * @example ISO code in DEFAULT_LANGUAGE_LOOKUP
 * normalizeLanguageId('en') would return "http://vocab.getty.edu/aat/300388277"
 *
 * @example ISO code in languageOptions.lookupMap
 * normalizeLanguageId('en', {lookupMap: {'el': 'greek'}}) would return "greek"
 *
 * @returns {string} the normalized version of the language (by default, an AAT URL), or if no match,
 * reverts to the original lang_id parameter
 */
export function normalizeLanguageId(lang_id, languageOptions) {
  if (lang_id == undefined) {
    return NO_LANGUAGE;
  }

  let lookupMap = DEFAULT_LANGUAGE_LOOKUP;
  // if there's a custom lookup map, use that, otherwise use the default
  if (languageOptions && languageOptions.lookupMap) {
    lookupMap = languageOptions.lookupMap;
  }

  // if we have a vocab url, grab just the end of it
  let lang = lang_id.toLowerCase();

  // (ends with /en , e.g.)
  if (lang.match(/\/[a-zA-Z]+$/)) {
    lang = lang.substring(lang.lastIndexOf("/") + 1);
  }

  // if the lookup map contains the language, return the result (which should be an AAT ID)
  let lookup = lookupMap[lang];
  if (lookup != undefined) {
    return lookup;
  }

  // return what was sent
  return lang_id;
}

/**
 * Looks up the ISO language code from the full AAT URL
 *
 * @param {String} aat
 * @returns
 */
export function lookupIsoFromAat(aat) {
  let iso = undefined;
  Object.keys(DEFAULT_LANGUAGE_LOOKUP).forEach((key) => {
    if (DEFAULT_LANGUAGE_LOOKUP[key] == aat) {
      iso = key;
    }
  });
  return iso;
}

/**
 * Looks up the AAT Language Code from the ISO Code
 *
 * @param {string} iso
 *
 * @returns {string} the full AAT URL
 */
export function lookupAatFromIso(iso) {
  return DEFAULT_LANGUAGE_LOOKUP[iso];
}
