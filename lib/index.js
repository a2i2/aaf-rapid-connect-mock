import express from "express";
import bodyParser from "body-parser";
import template from "lodash.template";
import { encode as encodeJWT } from "jwt-simple";
import fs from "fs";
import path from "path";

const html = template(fs.readFileSync(path.resolve(__dirname, "..", "templates", "index.html"), "utf8"));

export default function(options = {}) {
  let { spUrl, uiUrl, federationUrl, jwtSecret } = options;
  let app = express();

  app.get("/", (req, res) => {
    let { baseUrl } = req;
    res.send(html({ baseUrl }));
  });

  app.post("/", bodyParser.json(), (req, res) => {
    let { name, email } = req.body;
    let jwt = {
      iss: spUrl,
      aud: uiUrl,
      nbf: Math.round(Date.now() / 1000) - 60,
      exp: Math.round(Date.now() / 1000) + 60,
      jti: Date.now().toString(),
      [`${federationUrl}/attributes`]: {
        edupersontargetedid: new Buffer(email).toString("base64"),
        displayname: name,
        mail: email,
        edupersonscopedaffiliation: [
          "affiliate@deakin.edu.au",
          "staff@deakin.edu.au",
          "member@deakin.edu.au"
        ].join(";")
      }
    };
    let assertion = encodeJWT(jwt, jwtSecret);
    res.send({ assertion });
  });

  return app;
}
