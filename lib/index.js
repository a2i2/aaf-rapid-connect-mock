import template from "lodash.template";
import { encode as encodeJWT } from "jwt-simple";
import fs from "fs";
import path from "path";

const html = template(fs.readFileSync(path.resolve(__dirname, "..", "templates", "index.html"), "utf8"));

export default function(options = {}) {
  let { idpUrl, spUrl, uiUrl, federationUrl, jwtSecret } = options;

  return {
    get(req, res) {
      res.send(html({ idpUrl }));
    },

    post(req, res) {
      let { name, email } = req.body;

      // Construct a fake JWT to be sent to the /auth endpoint.
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
    }
  };
}
