### About Linked Art

[Linked Art](https://linked.art/) is a community project that created the linked open data [model](https://linked.art/model/) that provides a standard for the data representation to describe art. Examples of this model being implemented can be found at organizations such as [The Getty Museum](https://data.getty.edu/museum/collection/object/c88b3df0-de91-4f5b-a9ef-7b2b9a6d8abb), [The Georgia O'Keeffe Musem](https://collections.okeeffemuseum.org/data/object/6401.json) and [Nomisma](http://numismatics.org/collection/1944.100.51606.jsonld?profile=linkedart).

### About linkedart.js

linkedart.js is a JavaScript library of functions to help parse Linked Art data and integrate it into a project.


### Getting Started

You'll want to install linkedart.js and its peer-dependencies via npm:

    npm install @thegetty/linkedart.js

#### Usage

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

### License

ISC
