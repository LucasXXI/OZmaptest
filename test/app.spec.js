import chai from "chai";
import chaiHttp from "chai-http";
import chaiJson from "chai-json-schema";
import server from "../src/index.js";

import userSchema from "../src/schemas/userSchema.js";

chai.use(chaiHttp);
chai.use(chaiJson);

const { expect } = chai;

const createManyUsers = async () => {
  await chai.request(server).post("/users").send({
    name: "Raupp",
    age: 19,
    email: "raupp@exemple.com",
  });
};

for (let i = 0; i < 6; i++) createManyUsers();

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
  it("Should Create a new user", (done) => {
    chai
      .request(server)
      .post("/users")
      .send({
        name: "Lucas",
        age: 19,
        email: "lucas@exemple.com",
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.be.jsonSchema(userSchema);
        expect(res).to.have.status(200);
        done();
      });
  });
  it("Should response the list of users", (done) => {
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
      .get("/users/7")
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
      .delete("/users/7")
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
  it("Should update a user's atribute", (done) => {
    chai
      .request(server)
      .patch("/users/6")
      .send({
        name: "Lucas",
        age: 19,
        email: "lucas@gmail.com",
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.user).to.contain({
          name: "Lucas",
          age: 19,
          email: "lucas@gmail.com",
        });

        done();
      });
  });
});

describe("Pagination Test", () => {
  it("Pagination with one page and 3 users", (done) => {
    chai
      .request(server)
      .get("/users")
      .query({ page: 1, quantity: 2 })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body.users).to.have.length(2);
        expect(res).to.have.status(200);
        done();
      });
  });
});
