// https://eslint.org/docs/user-guide/configuring
var OFF = 0, WARN = 1, ERROR = 2;

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'key-spacing': [ERROR, {
      "mode": "minimum",
      "align": "value"
    }],
    // allow async-await
    'generator-star-spacing': OFF,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
