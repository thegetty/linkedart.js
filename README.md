# linkedart.js

[Docs](http://linkedartjs.org/) |
[Contributing](https://github.com/thegetty/linkedart.js/blob/master/.github/CONTRIBUTING.md)

## What is LinkedArt?

LinkedArt is a Linked Open Data model which is used to describe cultural heritage materials. Much more information about the model, and the community that is building it, can be found at [https://linked.art/](https://linked.art/)

## What is the LinkedArt.js Library?

This library includes a set of methods for working with [linked.art](https://linked.art) data. Easily manipulate and access rich, complexly nested linked data from any LinkedArt source. This library includes different types of functions or methods:

- _Basic Helpers_: for things like getting the Title, Name, Identifier, or other common properties from a LinkedArt Object. Please see the helpers, or examples in our tests.
- _Document Navigation and Filters_: to use when building custom functions and queries -- this includes filtering data by multiple classifications, traversing the JSON-LD structure, and working with languages.

## Why did we create this?

This project evolved out of Getty's implementation of the [Research Collections Viewer](https://www.getty.edu/research/collections/), the [Museum Collection Pages](https://www.getty.edu/art/collection/), and other projects. Reuse of code between projects led to the creation of a library to share between projects, and provides a foundation for the community to continue to build upon.

## Common Terms

- **AAT** - The Getty Art and Architecture Thesaurus. URLs or ids for term entries are commonly used to classify parts of a LinkedArt Record
- **Helpers** - used synonymously with functions or methods.
- **Modules** - in the context of this documentation, modules refer to specific files in this Library

## How Does it Work?

The library includes a number of methods or helpers for working with LinkedArt’s basic JSON-LD patterns.

### Simple Helpers for Simple Functions

While we cannot imagine every possible use, we've created some simple helpers to facilitate the request of common data fields (Title, Name, Accession #, Description, Materials, Cultures, Dimensions, Rights Statements, and Images, for example).

Note, full examples of many of these functions are available by browsing the "[specs](https://github.com/thegetty/linkedart.js/tree/main/src/specs)" folder in the source, or the links on the left of [this page](https://www.linkedartjs.org).

#### Example: Find the Title of this Record

This method, when passed a LinkedArt document (e.g. a `HumanMadeObject`, or `Actor`) will return the title:

```javascript
//gets the primary name using defaults
let name = getPrimaryName(object);
```

It's also possible to be more specific, using a different classification for how "Name" is defined:

```javascript
// gets the primary name using a different AAT, and specifies to return the version where the specified language is in french
getPrimaryName(object, {
  requestedClassifications: "http://vocab.getty.edu/aat/300417193",
  language: "fr",
});
```

_In the background, this is using a number of built-in functions to look in the `identified_by` section of the LinkedArt document for entries with a `classified_as` that matches the AAT Term, and has a `language` of French, and returns the first matching value._

### Working with Arrays, Objects, Parts, and Values

LinkedArt has historically had a couple of patterns that have unpredictable structures. While by convention, a developer may expect that data will be consistently structured, the reality may depend on whether a part of a record has one ore multiple values. To that end, we created a few basic helpers:

#### Normalizing a Field to an Array

One example is when requesting a field (`identified_by`, `classified_as`, etc.), there are likely four potential return values -- `undefined`, a `literal`, an `object`, or an `array` of objects. By normalizing these values to an array, we can allow the function to be easily chained with other functions.

```javascript
// field doesn't exist
let result = normalizeFieldToArray({ id: "1234" }, "type");
// would return an empty array ([])

// field value is not an array
result = normalizeFieldToArray({ id: "1234" }, "id");
// would return ["1234"]
```

#### Normalizing parts

Another common pattern with creations, productions, and other more complex relationships is that they _may_ contain multiple parts, or just have one. Here again, it can be useful to normalize the pattern so that the results can be processed consistently.

```javascript
// with a production without parts:
let parts = normalizeFieldWithParts({produced_by: { carried_out_by: {id:123}}}, 'produced_by');
// it would return an array with 1 item [{ carried_out_by: {id:123}}}]


// with a production with parts:
parts = normalizeFieldWithParts({produced_by: { part: [{carried_out_by: {id:123}}}]}, 'produced_by');
//  it would return an array with one item [{ carried_out_by: {id:123}}}]

```

#### Working with Values

Lastly, a field in LinkedArt will stores numeric data differently than textual data. Numeric data is stored in a `value` field, while strings are stored in a `content` field. We provide a single method to retrieve this information.

```javascript
// gets the value
let value = getValueOrContent({ value: 123 });
// would return 123

// gets the content
value = getValueOrContent({ content: "abc" });
// would return abc
```

### Working with Classifications

One of the most common patterns in LinkedArt is to have a list of similar entries that have classification that distinguish them. An example, you might have a Display Title, Alternate Title, and Series Title for a work. All would be in the `identified_by` section of the record and be a `Name`. The distinguishing bit, would be a different classification. There are a number of different ways we can filter by classification outlined below.

#### Find all of the things classified by X

The simplest pattern is simply filtering on a single classification, this is exactly how the simple helpers work under the hood.

```javascript
let classification = getValueByClassification(
  [{ content: "Irises", classified_as: [{ id: "title" }] }],
  "title"
);

// would return {content: 'Irises', classified_as: [{id: 'title'}]}
```

We can also ask for the value directly

```javascript
let title = getValueByClassification(
  [{ content: "Irises", classified_as: [{ id: "title" }] }],
  "title"
);
// would return 'Irises'
```

**Note**: We also provide [`getValuesByClassification`](/module-LinkedArtHelpers.html#.getValueByClassification) if you want more than just the 1st encountered.
There are also lower level function like [`getClassified`](/module-LinkedArtHelpers.html#.getClassified) which provide even more customization.

#### Find all of the things with both of these classifications

With more complex data, multiple classifications may be required in order to properly distinguish between records. Thinking about the 'title' example above, a title might be classified as a 'title' and as a 'alternate title.' To that end, while slightly contrived, you might need to filter by both. This can be done too:

```javascript
// get the fields classified by BOTH AAT terms
let fields = getClassifiedBy(titan.referred_to_by, [
  "http://vocab.getty.edu/aat/300435430",
  "http://vocab.getty.edu/aat/300418049",
]);

// this example is performed with the lower level getClassified, (getClassifiedBy is just a wrapper)
fields = getClassified(titan.referred_to_by, [
  "http://vocab.getty.edu/aat/300435430",
  "http://vocab.getty.edu/aat/300418049",
  { classificationField: "classified_by" },
]);

// or just get the values
let values = getValuesByClassification(titan.referred_to_by, [
  "http://vocab.getty.edu/aat/300435430",
  "http://vocab.getty.edu/aat/300418049",
]);
```

#### Find all of the things with both of these classifications

Alternately, it may be useful to get fields or values that match `either` AAT term instead of matching both, using the same examples as above:

```javascript
// get the fields classified by BOTH AAT terms
let fields = getClassifiedBy(titan.referred_to_by, [
  "http://vocab.getty.edu/aat/300435430",
  "http://vocab.getty.edu/aat/300418049",
  { operator: "OR" },
]);

// this example is performed with the lower level getClassified, (getClassifiedBy is just a wrapper)
fields = getClassified(titan.referred_to_by, [
  "http://vocab.getty.edu/aat/300435430",
  "http://vocab.getty.edu/aat/300418049",
  { classificationField: "classified_by", operator: "OR" },
]);

// or just get the values
let values = getValuesByClassification(titan.referred_to_by, [
  "http://vocab.getty.edu/aat/300435430",
  "http://vocab.getty.edu/aat/300418049",
  { operator: "OR" },
]);
```

#### Find all of the things that have a classification that's classified by this

The last classification pattern is when classifications are classified. A good example of this might be an very specific classification (e.g. a rights or permissions statement), which is further classified by a broader term. We can filter by these too, allowing you to find the statement classified by the broader term:

```javascript
// in this contrived example (for ease of reading), we have description that's further classified as descriptive title
let classification = getClassifiedByWithClassification(
  {
    content: "Van Gogh painting",
    classified_as: [{ id: "description", classified_as: "descriptive title" }],
  },
  "descriptive title"
);
// would return the classification with 'id': 'descriptive title' from the 'classified_as'

// you could alternately get the parent object instead of the classification
let objects = getObjectsClassifiedAsWithClassification(
  {
    content: "Van Gogh painting",
    classified_as: [{ id: "description", classified_as: "descriptive title" }],
  },
  "descriptive title"
);
// would return an array with the object with classification with 'id': 'descriptive title' from the 'classified_as'
```

### Working with Languages

You can do basic things like getting values based on a classification or set of classifications, as well as more advanced tasks like working with languages and other elements of the LinkedArt model. Almost every function can be passed a `language` attribute to filter on the language returned.

Want to know more, take a look at the [examples below](#getting started).

## More Examples & Documentation

The links on the left of [this page](https://www.linkedartjs.org) will take you to detailed documentation for each of the methods in this library. Furthermore, the [specs](https://github.com/thegetty/linkedart.js/tree/main/src/specs) folder in the source repository shows some practical examples using data from the community.

## What this Library doesn't do

One of the big challenges with JSON-LD and serializing Linked Data is determining where to place the boundaries between documents. Different implementations will maintain different boundaries -- for example there may be good reasons to embed a `LinguisticObject` inside a `HumanMadeObject` or separate it.

To that end, this library does not make HTTP requests or attempt to resolve links between documents, it leaves that to the code implementing it.

## Contributing

We know this library does not include every use-case, or a simple helper for accessing every LinkedArt property. We’d love feedback or pull-requests to continue to broaden and deepen the library to better support the community.

## What Do I Need to Use It?

You will need to be comfortable with javascript and npm (Node Package Manager). You will also need data that is formatted to the LinkedArt model. Example sets you can work with can be found at [https://linked.art/cookbook/](https://linked.art/cookbook/)

## How do I install it?

Using npm:

```shell
$ npm install @thegetty/linkedart.js --save
```

## Getting Started

Below is a simple example of how to use the LinkedArt library, for more examples, please see the tutorials [Understanding Linked Art](https://observablehq.com/@jrladd/linked-art-1), [Working with Linked Art](https://observablehq.com/@jrladd/linked-art-2), [Exploring Linked Art](https://observablehq.com/@jrladd/linked-art-3) for using LinkedArt with the Getty Museum’s linked open data APIs.

### A Simple Example to get the title of an object:

```js
// import a single helper
import { getClassifiedAs, getPrimaryName } from "@thegetty-private/linkedart";

const linkedArtObject = {
  identified_by: [
    {
      type: "Name",
      content: "Young Woman Picking Fruit",
      classified_as: [
        {
          id: "http://vocab.getty.edu/aat/300404670",
          _label: "preferred terms",
          type: "Type",
        },
      ],
    },
  ],
};

// get the title using the built-in helper
const title = getPrimaryName(linkedArtObject);

// get the title using the lower-level methods which allow you to specify a different classification, or other settings
const result = getClassifiedAs(
  linkedArtObject["identified_by"],
  "http://vocab.getty.edu/aat/300404670"
);

// result should equal: "Young Woman Picking Fruit"
```

## License

This software is licensed under the [BSD-3](https://opensource.org/licenses/BSD-3-Clause) license.
