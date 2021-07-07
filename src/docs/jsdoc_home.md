### About Linked Art

[Linked Art](https://linked.art/) is a community project that created the linked open data [model](https://linked.art/model/) that provides a standard for the data representation to describe art.

### About linkedart.js

linkedart.js is a JavaScript library of functions to help parse Linked Art data and integrate it into a project.


### Getting Started

You'll want to install linkedart.js and its peer-dependencies via npm:

    npm install @thegetty/linkedart.js

#### Usage

    import { getClassifiedAs } from "@thegetty/linkedart.js";

    const references = getClassifiedAs(object, classification);

### License

ISC
