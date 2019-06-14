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
        .get("/api/users/1")
        .end(function(err, response) {
          expect(err).to.be.null;
          expect(response).to.have.status(200);
          expect(response).to.be.html;
          done();
        });
    });
  });
});
