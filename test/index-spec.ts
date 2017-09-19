
import * as chai from "chai";
import {execSync} from "child_process";
import {mkdirSync, writeFileSync} from "fs";
import {resolve} from "path";
import {sync as rmSync} from "rimraf";
import EslintGitStatus from "../src/index";
const expect = chai.expect;

describe("index", () => {
  before(() => {
    rmSync(resolve(__dirname, "file"));
  });

  beforeEach(() => {
    mkdirSync(resolve(__dirname, "file"));
  });

  afterEach(() => {
    rmSync(resolve(__dirname, "file"));
  });

  after(() => {
    execSync("git add .");
  });

  it("should provide use eslint settings and lint fail.", (done) => {
    writeFileSync(resolve(__dirname, "file/test.js"), "function test() { console.log('test'); }");
    execSync("git add .");
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

  it("should provide ignore lint test2.js file", (done) => {
    writeFileSync(resolve(__dirname, "file/test2.js"), "function test() { console.log('test'); }");
    execSync("git add .");
    new EslintGitStatus(resolve(__dirname, "./.eslintrc.js"), resolve(__dirname, "../"), ".js").start()
      .then((result) => {
        chai.expect(result).equals("Nothing to lint");
        rmSync(resolve(__dirname, "file"));
        done();
      })
      .catch((err) => {
        rmSync(resolve(__dirname, "file"));
        done("should lint nothing");
      });
  });
});
