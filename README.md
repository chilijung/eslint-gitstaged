# eslint-gitstatus

Using **current git status** to find out which files should pass eslint. To prevent lint the whole repository again and again.  This is a nice package to use along with `git precommit`.

## Install

```
npm install eslint-gitstatus
```

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
