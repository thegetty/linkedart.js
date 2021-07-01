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
 * 1. if language is undefined, just return
 * 2. check whether the language of the object matches the language specified
 * 3. check wehther the language of the object is undefined, and whether we should treat that as a match
 *
 * @param {object} object -- the object to check the language for
 * @param {string} language -- limits the results to just a specific language (or leave undefined for all results)
 * @param {object} languageOptions -- any additional options when working with language(s)
 * 
 * @example with language options
 * doesObjectLanguageMatch({id: "1", content:"test"}, "en", { includeItemsWithNoLanguage: false } ) would return false

 * @example with a custom language map
 * doesObjectLanguageMatch({id: "1", content:"test", language:"http://vocab.getty.edu/languge/fr"}, "en", {languageMap: {fr: "en" } } ) would return true
 * 
 * @example with a fallback language
 * doesObjectLanguageMatch({id: "1", content:"test", language:"http://vocab.getty.edu/languge/fr"}, "en", {fallbackLanguage:'en' } ) would return true
 * 
 * @returns {boolean}
 */
export function doesObjectLanguageMatch(
  object,
  language,
  languageOptions = {}
) {
  // IF LANGUAGE IS UNDEFINED, RETURN ALL LANGUAGES
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
