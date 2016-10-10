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
  federationUrl: "who cares",
  uiUrl: "http://localhost:9000"
};

mockRapidConnect(options).listen(3000);
```

As shown, the package exposes a function that is passed `options` and returns an [Express](http://expressjs.com) application instance.
