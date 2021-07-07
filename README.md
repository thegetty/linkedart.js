# linkedart.js

Linkedart.js is a library of functions for parsing [Linked Art](https://linked.art/), which is a Linked Open Data model used to describe art.

## Installation

Using npm:

```shell
$ npm install @thegetty/linkedart.js --save
```

## Use

In Node.js:

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

// result should equal "Young Woman Picking Fruit"
```

## License

License info will go here
