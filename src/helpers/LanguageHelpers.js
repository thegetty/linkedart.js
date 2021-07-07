/**
 * @file LanguageHelpers
 * @author Adam Brin, Pamela Lam, Alyx Rossetti, Charles Webb, Selina Zawacki
 * @module LanguageHelpers
 * @description This class contains helpers for working with Languages in Linked.art
 */

export const DEFAULT_LANGUAGE_LOOKUP = {
  en: "http://vocab.getty.edu/aat/300388277",
  es: "http://vocab.getty.edu/aat/300389311",
  fr: "http://vocab.getty.edu/aat/300388306",
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
 * @example object without a 'language' attribute and with languageOptions.includeItemsWithNoLanguage == true
 * doesObjectLanguageMatch({id: "1", content:"test"}, "en", { includeItemsWithNoLanguage: true } ) would return true
 * 
 * @example object without a 'language' attribute and no languageOptions
 * doesObjectLanguageMatch({id: "1", content:"test"}, "en" ) would return false
 * 
 * @example with languageOptions.lookupMap
 * doesObjectLanguageMatch({id: "1", content:"test", language:"fr"}, "en", {lookupMap: {fr: "en" } } ) would return true
 * 
 * @example with languageOptions.fallbackLanguage
 * doesObjectLanguageMatch({id: "1", content:"test", language: "fr"}, "en", {fallbackLanguage:'fr' } ) would return true
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

  // if the langaugeId matches the specified language
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

  // if the langageId matches "no language" or there are no languages
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
 * Normalize the language presented to deal with the following cases:
 * 1. an AAT language code: http://vocab.getty.edu/language/en
 * 2. an ISO code (2 letter): en
 * 3. an AAT Language id: e.g. http://vocab.getty.edu/aat/300388277
 *
 * @param {string} lang_id -- the language id to normalize
 * @param {object} languageOptions -- any additional options when working with language(s)
 *
 * @returns {string} the normalized version of the language (ideally, an aat URL), or if no match, it reverts to what was passed through
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
