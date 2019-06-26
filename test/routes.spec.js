const chai = require("chai"),
  expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const app = require("../server");

describe("routes", function() {
  it("it should show the landing page w/o any errors", function(done) {
    chai
      .request(app)
      .get("/")
      .end(function(err, response) {
        expect(err).to.be.null;
        expect(response).to.have.status(200);
        expect(response).to.be.html;
        done();
      });
  });

  describe("/users", function(done) {
    it("GET /users/:id - fetches a user", function(done) {
      chai
        .request(app)
        .get("/users/1")
        .end(function(err, response) {
          expect(err).to.be.null;
          expect(response).to.have.status(200);
          expect(response).to.be.json;
          // console.log("user is ", response.body);
          done();
        });
    });

    it("POST /users - requires a username", function(done) {
      chai
        .request(app)
        .post("/users")
        .send({
          firstName: "bon",
          lastName: "bon",
          email: "bonquiqui@hotmail.com"
        })
        .end(function(err, response) {
          expect(response).to.have.status(422);
          expect(response.body.message).to.eql(
            "Please check inputs and resubmit."
          );
          done();
        });
    });

    it("POST /api/users - it creates a user", function(done) {
      chai
        .request(app)
        .post("/users")
        .send({
          userName: "bonbon",
          firstName: "bon",
          lastName: "bon",
          email: "bonquiqui@hotmail.com"
        })
        .end(function(err, response) {
          expect(err).to.be.null;
          expect(response).to.have.status(201);
          expect(response).to.be.json;
          expect(response.body).to.contain({
            userName: "bonbon",
            firstName: "bon",
            lastName: "bon",
            email: "bonquiqui@hotmail.com"
          });
          done();
        });
    });
  });
});
