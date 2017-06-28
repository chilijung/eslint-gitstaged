
import * as chai from "chai";
import {mkdirSync, writeFileSync} from "fs";
import {resolve} from "path";
import {sync as rmSync} from "rimraf";
import EslintGitStatus from "../src/index";
const expect = chai.expect;

describe("index", () => {
  it("should provide Greeter", (done) => {
    rmSync(resolve(__dirname, "file"));
    mkdirSync(resolve(__dirname, "file"));
    writeFileSync(resolve(__dirname, "file/test.js"), "function test() { console.log('test'); }");
    new EslintGitStatus(resolve(__dirname, "./.eslintrc.js"), resolve(__dirname, "../"), ".js").start()
      .then((result) => {
        rmSync(resolve(__dirname, "file"));
        done("should lint fail");
      })
      .catch((err) => {
        rmSync(resolve(__dirname, "file"));
        done();
      });
  });
});
