import request from "supertest";
import mockRapidConnect from "../lib";

describe("aaf-rapid-connect-mock", () => {
  it("should handle GET requests", done => {
    request(mockRapidConnect()).get("/").expect(200, done);
  });
});
