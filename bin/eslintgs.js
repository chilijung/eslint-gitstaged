#!/usr/bin/env node

const args = require('args');
const {resolve} = require('path');
const chalk = require('chalk');
const EslintGitStatus = require('../lib/index').default;

args
  .option('eslint', 'eslint.json file path', './.eslintrc.json')
  .option('git', 'your git directory, where your .git exist', '.')
  .option('ext', 'extension names, can use multiple extensions seperate with comma', 'js,jsx');

const flags = args.parse(process.argv);

new EslintGitStatus(
  resolve(process.cwd(), flags.eslint),
  resolve(process.cwd(), flags.git),
  flags.ext.split(',').map(val => `.${val.trim()}`)
)
  .start()
  .then(() => {
    console.log(chalk.underline.green("esLint all pass!"));
  })
  .catch(err => {
    // err, when lint failed
    process.exit(1);
    throw new Error(err);
  });