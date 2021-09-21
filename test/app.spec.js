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
  it("the server is up and running!", (done) => {
    chai
      .request(server)
      .get("/users")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
  it("Should response an array with items", (done) => {
    chai
      .request(server)
      .get("/users")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.users).to.have.length.above(0);
        expect(res).to.have.status(200);
        done();
      });
  });
  it("Should Create a new user", (done) => {
    chai
      .request(server)
      .post("/users")
      .send({
        name: "Luciano",
        age: "19",
        email: "luciano@gmail.com",
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
  it("Can acesses new user index", (done) => {
    chai
      .request(server)
      .get("/users/5")
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
      .delete("/users/5")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
  it("the deleted user is not in the storage", (done) => {
    chai
      .request(server)
      .get("/users/5")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.be.jsonSchema(errorSchema);
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
        expect(res.body.users).to.have.length(5);
        done();
      });
  });
});

describe("Pagination Test", () => {
  it("Pagination with one page and quantity of 3 items", (done) => {
    chai
      .request(server)
      .get("/users/?page=1&quantity=3")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.users).to.have.length.above(0);
        done();
      });
  });
});


//verificar a delecao de um user que nao existe
//verificar um update com dados diferentes dos ja existentes
//validar entrada da criacao de user
//pasar tipo diferente do que esta no schema
//json schema pattern para validar
