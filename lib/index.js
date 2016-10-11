import express from "express";
import bodyParser from "body-parser";
import template from "lodash.template";
import { encode as encodeJWT } from "jwt-simple";
import fs from "fs";
import path from "path";

const html = template(fs.readFileSync(path.resolve(__dirname, "..", "templates", "index.html"), "utf8"));
const defaultOptions = { appUrl: "https://example.com", authUrl: "/auth", jwtSecret: "secret" };

export default function(options = {}) {
  let { appUrl, authUrl, jwtSecret } = Object.assign({}, defaultOptions, options);

  if (!appUrl) throw new Error(`Option "appUrl" is undefined.`);
  if (!authUrl) throw new Error(`Option "authUrl" is undefined.`);
  if (!jwtSecret) throw new Error(`Option "jwtSecret" is undefined.`);

  let app = express();

  app.get("/", (req, res) => {
    let { baseUrl } = req;
    res.send(html({ baseUrl, authUrl }));
  });

  app.post("/", bodyParser.json(), (req, res) => {
    let { name, email } = req.body;
    let jwt = {
      iss: "https://rapid.aaf.edu.au",
      aud: appUrl,
      nbf: Math.round(Date.now() / 1000) - 60,
      exp: Math.round(Date.now() / 1000) + 60,
      jti: Date.now().toString(),
      "https://aaf.edu.au/attributes": {
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
