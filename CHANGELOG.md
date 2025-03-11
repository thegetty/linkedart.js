# Change Log

All notable changes to this project will be documented in this file.

Changelog entries are classified using the following labels _(from [Keep a changelog](https://keepachangelog.com/en/1.0.0/)_):

Project versions conform to [Semantic Versioning](https://semver.org/)

- `Added`: for new features

- `Bumped`: updated dependencies, only minor or higher will be listed

- `Changed`: for changes in existing functionality

- `Deprecated`: for once-stable features removed in upcoming releases

- `Fixed`: for any bug fixes

- `Removed`: for deprecated features removed in this release

## [0.21.0]

### Changed

- updated build environment to use Vite/Vitest
- updated Eslint / prettier environment to remove babel and remove other dependencies

## [0.20.0]

### Changed

- `attributed_by` does not require an `assigned_property` so adjusting the logic to allow for it to be null

## [0.19.0]

### Added

- added a few more examples of LinkedArt data from the PMA

### Changed

- adjusted the logic around 'getPrimaryName' to fallback to `Name` entries when a qualified name isn't used and no qualification is entered

## [0.18.0]

### Added

- Added a few more constants to the constants file

### Changed

- adjusts the readme to link to the issues and contributions section on GitHub
- exposed the constants and the AAT file to the standard export. This is useful for those who want to use AND/OR or other internal constants as well as common LinkedArt fields e.g.:

```
// import all the constants
import aat from "@thegetty/linkedart.js/aat";
import constants from "@thegetty/linkedart.js/constants";

// import selected constants
import { REFERRED_TO_BY } from "@thegetty/linkedart.js/constants";
```

## [0.17.2]

### Changed

- adjusted the `carriedOutBy` logic to be able to support more general relationships than just production

### Added

- added constants for `encountered_by`
- added a sample record from yale

## [0.17.1]

### Fixed

- fixed a bug with `_getAssignedProperty` where we were expecting an object to always be returned but the new data model includes an array instead.

## [0.17.0]

### Changed

- modified many of our mid-level functions to take an options object instead of feeding in optional params. This is a potentially breaking change for `getClassified`, `getClassifiedBy`, `getClassifiedAs`, `getClassifiedAsWithClassification`, `getClassifiedByWithClassification`, `getFieldValuesByClassification`, `getObjectsClassifiedAsWithClassification`, `getObjectsClassifiedByWithClassification`, `getValueByClassification`, and `getValuesByClassification`. This change introduces the ability to pass in an `operator` as well as the `language`, and `languageOptions`.

## [0.16.4]

### Changed

- exported all public functions from ObjectHelpers

## [0.16.3]

### Changed

- updated JSDoc

## [0.16.2]

### Added

- added `getWorkTypes` to ObjectHelpers
- added `getClassifications` to ObjectHelpers

## [0.16.1]

### Added

- added `getMaterialStatements` to ObjectHelpers

## [0.16.0]

### Added

- added `getDescriptions` to LinkedArtHelpers
- added test cases from the LinkedArt Showcase

### Changed

- Changed `getValuesByClassification` to return [] when nothing's found instead of `undefined`

## [0.15.2]

### Added

- added `getCultures` to ObjectHelpers

## [0.15.1]

### Added

- `getDigitalImages`: added function for getting URLs to digital images
- `getRightsStatement`: added function for getting rights statements
- `getCopyrightStatements`: added function for getting copyright/licensing statements
- `getRightsAssertion`: added function for getting rights assertions, (e.g., from https://rightsstatements.org/)
- `getAcknowledgementStatements`: added function for getting acknowledgment/credit statements
- added tests and test data

## [0.15.0]

### Added

- added a function for getting the production date for an object `getProductionTimespans`

### Changed

- refactored shared methods to separate out constants into a dedicated file
- refactored imports to be specific to more easily facilitate bundling

## [0.14.3]

### Added

- added `getAccessionNumbers` to ObjectHelpers

## [0.14.2]

### Added

- added a function for managing fields with parts in BasicHelpers `normalizeFieldWithParts`
- added a function to get a field out of a production `getFieldPartSubfield` which can be used for similar top-level fields (like creation)

## [0.14.1]

### Added

- adds `ObjectHelpers.js` with initial `getDimensionDescriptions` helper and tests

## [0.14.0]

### Added

- added functions for handling primary names of objects `getPrimaryName` and `getPrimaryNames`, configurable with different language and aat values
- added a function for normalizing AAT values `normalizeAatId` between aat:#### and http://vocabs.getty.edu/aat/####

## [0.13.1]

- fixed duplicate content in the jsdoc

## [0.13.0]

- updated JSDoc theme to make it easier to read

## [0.12.0]

### Added

- added additional languages to the `DEFAULT_LANGUAGE_LOOKUP`
- added dedicated `lookupAatFromIso` and `lookupIsoFromAat` methods to help with resolution of languages.

## [0.11.0]

### Changed

- updated the license to be BSD-3
- updated some of the intro text

## [0.10.3]

### Added

- Added a .github/CONTRIBUTING.md file with some pull request guidelines, and added a link in the readme so that users can navigate to it easily
- Added information to jsdoc_home.md

### Changed

- Replaced the default readme with one more specific to our library
- Jsdoc for helper descriptions have been updated and more @examples have been added

## [0.10.2]

### Changed

- changed `_getClassificationsWithNestedClass` and `_getObjectWithNestedClass` to use a helper function `_getObjectsAndClassificationsWithNestedClass` to avoid repetitive logic
- moved all private helper functions used in `LinkedArtHelpers.js` to the end of the file to avoid clutter among exported functions

## [0.10.1]

### Added

- expanded test coverage

## [0.10.0]

### Changed

- renamed the following functions to fit naming convention:

  - resourcesByClassifications -> getClassified
  - classfiedAs -> getClassifiedAs
  - classifiedBy -> getClassifiedBy
  - checkEmptyField -> normalizeFieldToArray
  - normalizeLanguage -> normalizeLanguageId
  - doesLanguageMatch -> doesObjectLanguageMatch

- the following functions were renamed and made @private as well
  - resourceParamToArray ->\_convertToArrayIfNeeded
  - classificationsByNestedClass -> \_getClassificationsWithNestedClass
  - objectsByNestedClass -> \_getObjectWithNestedClass

### Added

- getClassifiedAsWithClassification and getClassifiedByWithClassification were added as public helpers for \_getClassificationsWithNestedClass which help get a classification that is classified by a specified value.
- getObjectsClassifiedAsWithClassification and getObjectsClassifiedByWithClassification were added as public helpers for \_getObjectWithNestedClass which help get an object with a classification that is classified by a specified value.

### Removed

- checkEmptyArray was removed as it is no longer needed and it's inconsistent return could be confusing, use normalizeFieldToArray instead

## [0.9.2]

### Added

- Added `getObjectParts` to LinkedArtHelpers - this helper takes in a LinkedArt object and a requested field. It checks to see if that field exists and if it has any `part` values. It will either return an array of parts, the requested field or an empty array.

## [0.9.1]

- This version was `unpublished`.

## [0.9.0]

- Initial fork from Getty LinkedArt Library.

```

```
