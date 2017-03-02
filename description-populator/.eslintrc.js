module.exports = {
  extends: 'eslint:recommended',
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6
  },
  rules: {
    'arrow-parens': 'error',
    'arrow-spacing': 'error',
    'brace-style': 'error',
    'comma-spacing': 'error',
    'comma-style': 'error',
    'eol-last': 'error',
    'indent': ['error', 2],
    'generator-star-spacing': ['error', {
      'before': false,
      'after': true
    }],
    'keyword-spacing': 'error',
    'no-constant-condition': 'off',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': ['error', {
      'max': 1,
      'maxEOF': 1
    }],
    'no-spaced-func': 'error',
    'no-trailing-spaces': 'error',
    'one-var': ['error', 'never'],
    'quotes': ['error', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true
    }],
    'semi': ['error', 'never'],
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never'
    }],
    'space-in-parens': 'error',
    'spaced-comment': 'error'
  }
}
