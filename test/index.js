import express from "express";
import bodyParser from "body-parser";
import request from "supertest";
import mockRapidConnect from "../lib";

describe("aaf-rapid-connect-mock", () => {
  it("should be mountable as an Express route", done => {
    let app = express().use(bodyParser.json());
    let options = { jwtSecret: "who cares", idpUrl: "/mock" };
    let { get, post } = mockRapidConnect(options);
    app.get("/mock", get);
    app.post("/mock", post);

    request(app).get("/mock").expect(200, done);
  });
});
