import * as chalk from "chalk";
import {spawn} from "child_process";
import GitStatusFilterFile, {IFileStatus} from "git-status-filter-file-extension";
import {resolve} from "path";

const log = console.log;

export default class EslintGitStatus {
  constructor(readonly eslintPath: string, readonly gitDirPath: string, readonly ext: string) {
  }

  public start(): Promise<string> {
    const gitStatusFiles = new GitStatusFilterFile(this.gitDirPath, this.ext);
    return gitStatusFiles.start()
      .then((files) => {
        const fileArr: string[] = [];
        files.forEach((file) => {
          if (file.isNew || file.isModified) {
            fileArr.push(resolve(process.cwd(), this.gitDirPath, file.path()));
          }
        });

        const eslintConfig = resolve(process.cwd(), this.eslintPath);
        const eslint = resolve(process.cwd(), this.gitDirPath, "./node_modules/.bin/eslint");

        if (fileArr.length === 0) {
          return Promise.resolve("Nothing to lint");
        }

        const lintCmd = spawn(eslint, ["-c", eslintConfig].concat(fileArr));

        lintCmd.stdout.on("data", (data) => {
          // print pretty log
          const result = data.toString().split("\n");
          result.forEach((line, i) => {
            if (i === 1) {
              log(chalk.underline(result[1]));
            } else if (i === 2) {
              log(chalk.red(result[2]));
            } else if (i === 4) {
              log(chalk.bgRed(result[4]));
            } else {
              log(line);
            }
          });
        });

        lintCmd.stderr.on("data", (data) => {
          const result = data as string;
          console.log(`stderr: ${result.split("\n")}`);
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
