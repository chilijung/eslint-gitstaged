# eslint-gitstatus

Using **current git status** to find out modfied and added files passing eslint, to prevent lint the whole repository again and again.  This is a nice package to use along with `git precommit`.

## Install

```
npm install eslint-gitstatus
```

## API

### EslintGitStatus(<eslintrc path>, <git repo path>, <extension name>)

- eslintPath: path to your eslintrc file
- git repo: path to your `.git`
- extension `string | string[]`: which kind of extensions do you want to lint with eslint.

## Usage

```js
// EslintGitStatus(<eslintrc path>, <git repository path>, <extension default 'js'>)
new EslintGitStatus(resolve(__dirname, "./.eslintrc.js"), resolve(__dirname, "../"), ".js").start()
      .then((result) => {
        // success no lint error, done lint
      })
      .catch((err) => {
        // err, when lint failed
      });
```

## License

MIT
