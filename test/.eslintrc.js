module.exports = {
  "extends": [
    "google"
  ],
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module"
  },
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "new-cap": [2, {capIsNewExceptions: ["CSSModules", "express.Router", "CONFIG.Api", "CONFIG.Controllers", "CONFIG.Views", "CONFIG.Models", "CONFIG.Common", "redisCli.HGETALLAsync", "redisCli.HMSETAsync"]}],
    "curly": [2, "multi-or-nest", "consistent"],
    "operator-linebreak": [2, "before", { "overrides": { "?": "after" } }],
    "require-jsdoc": 0,
    "no-use-before-define": 0,
    "quote-props": 0,
    "max-len": 0,
    "no-return-assign": 0,
    "no-implicit-coercion": 0,
    "no-negated-condition": 0
  }
};