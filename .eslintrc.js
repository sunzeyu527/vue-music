<<<<<<< HEAD
// https://eslint.org/docs/user-guide/configuring
=======
// http://eslint.org/docs/user-guide/configuring
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
<<<<<<< HEAD
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
=======
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
<<<<<<< HEAD
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
=======
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c
    'eol-last': 0,
    'space-before-function-paren': 0
  }
}
