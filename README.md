# aaf-rapid-connect-mock

Host a "mock" instance of [AAF Rapid Connect](https://rapid.aaf.edu.au).

## Installation

Install the package with NPM:

```bash
$ npm install aaf-rapid-connect-mock
```

## Usage

Example:

```js
import express from "express";
import bodyParser from "body-parser";
import mockRapidConnect from "../lib";

let app = express();

app.use(bodyParser.json());

if (process.env.NODE_ENV !== "production") {
  let options = {
    jwtSecret: "who cares",
    idpUrl: "/mock",
    spUrl: "who cares",
    federationUrl: "who cares",
    uiUrl: "http://localhost:9000"
  };
  let { get, post } = mockRapidConnect(options);
  app.get("/mock", get);
  app.post("/mock", post);
}

app.listen(3000, () => console.log("Web server started."));
```
