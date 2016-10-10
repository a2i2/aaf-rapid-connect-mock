# aaf-rapid-connect-mock [![NPM version](http://img.shields.io/npm/v/aaf-rapid-connect-mock.svg?style=flat-square)](https://www.npmjs.org/package/aaf-rapid-connect-mock) [![Build status](http://img.shields.io/travis/dstil/aaf-rapid-connect-mock.svg?style=flat-square)](https://travis-ci.org/dstil/aaf-rapid-connect-mock)

Host a "mock" instance of [AAF Rapid Connect](https://rapid.aaf.edu.au).

## Installation

Install the package with NPM:

```bash
$ npm install aaf-rapid-connect-mock
```

## Usage

Example:

```js
import mockRapidConnect from "aaf-rapid-connect-mock";

let options = {
  jwtSecret: "who cares",
  spUrl: "who cares",
  uiUrl: "http://localhost:9000"
};

mockRapidConnect(options).listen(3000);
```

As shown, the package exposes a function that is passed `options` and returns an [Express](http://expressjs.com) application instance.

## Tip

To integrate the package into an *existing* Express application, simply mount it at a path:

```js
import express from "express";
import mockRapidConnect from "aaf-rapid-connect-mock";

let app = express();

if (process.env.NODE_ENV !== "production") {
  let options = {
    jwtSecret: "who cares",
    spUrl: "who cares",
    uiUrl: "http://localhost:9000"
  };

  app.use("/mock", mockRapidConnect(options));
}

app.listen(3000);
```
