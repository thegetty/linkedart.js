# linkedart.js

[Site](https://data.getty.edu/) |
[Docs](https://data.getty.edu/) |
[Contributing](https://github.com/thegetty/linkedart.js/blob/master/.github/CONTRIBUTING.md)

Linkedart.js is a library of functions for parsing [Linked Art](https://linked.art/), which is a Linked Open Data model used to describe art.

## Installation

Using npm:

```shell
$ npm install @thegetty/linkedart.js --save
```

## Use

```js
// import a single helper
import { getClassifiedAs } from "@thegetty-private/linkedart";

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

const result = getClassifiedAs(
  linkedArtObject["identified_by"],
  "http://vocab.getty.edu/aat/300404670"
);

// result should equal: "Young Woman Picking Fruit"
```

## License

This software is licensed under the [BSD-3](https://opensource.org/licenses/BSD-3-Clause) license.
