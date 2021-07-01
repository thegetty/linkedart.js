# Change Log

All notable changes to this project will be documented in this file.

Changelog entries are classified using the following labels _(from [Keep a changelog](https://keepachangelog.com/en/1.0.0/)_):

Project versions conform to [Semantic Versioning](https://semver.org/)

- `Added`: for new features

* `Bumped`: updated dependencies, only minor or higher will be listed
* `Changed`: for changes in existing functionality

- `Deprecated`: for once-stable features removed in upcoming releases

* `Fixed`: for any bug fixes

- `Removed`: for deprecated features removed in this release

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
