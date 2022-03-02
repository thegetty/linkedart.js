# linkedart.js

[Site](http://linkedartjs.org/) |
[Docs](http://getty-linkedart-js.netlify.app) |
[Contributing](https://github.com/thegetty/linkedart.js/blob/master/.github/CONTRIBUTING.md)

## What is the LinkedArt.js Library?

This library includes a set of methods for working with [linked.art](https://linked.art) data. Easily manipulate and access rich, complexly nested linked data from any Linked.Art source. This library includes two different types of methods:

Basic Helpers for things like getting the Title, Name, Identifier, or other common properties from a Linked.Art Object. Please see the helpers, or examples in our tests.
It also includes a more robust set of tools for navigating the Linked.Art JSON-LD to create custom functions and queries -- this includes filtering data by multiple classifications, traversing the JSON-LD structure, and working with languages.

## What is Linked.Art?

You probably know this if you’ve made it this far but just in case: Linked.Art is a Linked Open Data model which is used to describe cultural heritage materials. Much more information about the model, and the community that is building it, can be found at [https://linked.art/](https://linked.art/)

## How Does it Work?

The library includes a number of helpers for working with Linked.Art’s basic JSON-LD patterns. You can do basic things like normalize a field to an array and filter by classification, as well as more advanced tasks like working with languages and other elements of the Linked.Art model.

## Contributing

We know this library does not include every use-case, or a simple helper for accessing every Linked.Art property. We’d love feedback, or contributions to continue to broaden and deepen the library to better support the community.

## What Do I Need to Use It?

You will need to be comfortable with javascript and npm (Node Package Manager). You will also need data that is formatted to the Linked.Art model. Example sets you can work with can be found at [https://linked.art/cookbook/data-sources/](https://linked.art/cookbook/data-sources/)

##How do I install it?
Using npm:

```shell
$ npm install @thegetty/linkedart.js --save
```

## A Simple Example to get the title of an object:

For more examples, please see the tutorials for using Linked.Art with the Getty Museum’s linked open data APIs.

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
const title = getPrimaryName(linketArtObject);

// get the title using the lower-level methods which allow you to specify a different classification, or other settings
const result = getClassifiedAs(
  linkedArtObject["identified_by"],
  "http://vocab.getty.edu/aat/300404670"
);

// result should equal: "Young Woman Picking Fruit"
```

## License

This software is licensed under the [BSD-3](https://opensource.org/licenses/BSD-3-Clause) license.
