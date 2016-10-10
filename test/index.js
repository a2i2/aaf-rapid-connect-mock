import request from "supertest";
import mockRapidConnect from "../lib";

describe("aaf-rapid-connect-mock", () => {
  it("should handle GET requests", done => {
    let options = { jwtSecret: "who cares", idpUrl: "/mock" };
    request(mockRapidConnect(options)).get("/").expect(200, done);
  });
});
