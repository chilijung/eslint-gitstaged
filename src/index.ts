import * as chalk from "chalk";
import {ChildProcess, spawn} from "child_process";
import {existsSync, statSync} from "fs";
import GitStatusFilterFile, {IFileStatus} from "git-status-filter-file-extension";
import {isAbsolute, resolve} from "path";

const log = console.log;

export default class EslintGitStatus {
  constructor(readonly eslintPath: string, readonly gitDirPath: string, readonly ext: (string | string[]) = "js") {
  }

  public start(): Promise<string> {
    const gitStatusFiles = new GitStatusFilterFile(this.gitDirPath, this.ext);
    return gitStatusFiles.start()
      .then((files) => {
        const fileArr: string[] = [];
        const eslintConfig = resolve(__dirname, this.eslintPath);
        const eslint = resolve(__dirname, this.gitDirPath, "./node_modules/.bin/eslint");
        files.forEach((file) => {
          if (file.isNew || file.isModified) {
            fileArr.push(resolve(__dirname, this.gitDirPath, file.path()));
          }
        });

        if (fileArr.length === 0) {
          return Promise.resolve("Nothing to lint");
        }

        let lintCmd: ChildProcess;
        if (existsSync(eslint)) { // tslint:disable-line
          lintCmd = spawn(eslint, ["-c", eslintConfig].concat(fileArr));
        } else {
          lintCmd = spawn("eslint", ["-c", eslintConfig].concat(fileArr));
        }

        lintCmd.on("error", (err) => {
          return Promise.reject(`Execute eslint failed: ${err}`);
        });

        lintCmd.stdout.on("data", (data) => {
          // print pretty log
          const result = data.toString().split("\n");
          result.forEach((line, i) => {
            if (isAbsolute(line)) {
              log(chalk.underline(line));
            } else if (line.match(/^\s*\d*\:\d*/g)) {
              log(chalk.red(line));
            } else if (line.match(/^✖/g)) {
              log(chalk.bgRed(line));
            } else {
              log(line);
            }
          });
        });

        lintCmd.stderr.on("data", (data) => {
          console.log(`stderr: ${data.toString()}`);
        });

        return new Promise((resolve, reject) => {
          lintCmd.on("close", (code) => {
            if (code === 1) {
              return reject("Lint fail");
            }
            return resolve(code);
          });
        });
      });
  }
}
