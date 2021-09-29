import chai from "chai";
import chaiHttp from "chai-http";
import chaiJson from "chai-json-schema";
import server from "../src/index.js";

import userSchema from "../src/schemas/userSchema.js";
import errorSchema from "../src/schemas/errorSchema.js";

chai.use(chaiHttp);
chai.use(chaiJson);

const { expect } = chai;

describe("Application Tests", () => {
  it("the server and the Database are up and running!", (done) => {
    chai
      .request(server)
      .get("/users")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
  it("Should Create five users", (done) => {
    chai
      .request(server)
      .post("/users")
      .send({
        name: "Lucas",
        age: 19,
        email: "lucas@gmail.com",
      })
      .send({
        name: "Lucas 2",
        age: 19,
        email: "lucas@gmail.com",
      })
      .send({
        name: "Lucas 3",
        age: 19,
        email: "lucas@gmail.com",
      })
      .send({
        name: "Lucas 4",
        age: 19,
        email: "lucas@gmail.com",
      })
      .send({
        name: "Lucas 5",
        age: 19,
        email: "lucas@gmail.com",
      })
      .send({
        name: "Lucas 6",
        age: 19,
        email: "lucas@gmail.com",
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
  it("Should response an array with users", (done) => {
    chai
      .request(server)
      .get("/users")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.have.length.above(0);
        expect(res).to.have.status(200);
        done();
      });
  });
  it("Can acesses new user index", (done) => {
    chai
      .request(server)
      .get("/users/1")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.user).to.be.jsonSchema(userSchema);
        done();
      });
  });
  it("the dontexist user should not exist in the storage", (done) => {
    chai
      .request(server)
      .get("/users/dontexist")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });
  it("Should delete the user created", (done) => {
    chai
      .request(server)
      .delete("/users/1")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
  it("Should have at least 5 users in storage", (done) => {
    chai
      .request(server)
      .get("/users")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.length.above(5);
        done();
      });
  });
});

describe("Pagination Test", () => {
  it("Pagination with one page and 3 users", (done) => {
    chai
      .request(server)
      .get("/users?page=1&quantity=3")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.users).to.have.length(3);
        done();
      });
  });
});
