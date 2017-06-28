
import * as chai from "chai";
import EslintGitStatus from "../src/index";
const expect = chai.expect;

describe("index", () => {
  it("should provide Greeter", (done) => {
    new EslintGitStatus("../canner-web/.eslintrc.js", "../canner-web", ".js").start()
      .then((result) => {
        console.log(result);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
