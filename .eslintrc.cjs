module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'google',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    arraysInObjects: false,
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': 'off',
    'max-len': 'off',
    'require-jsdoc': 'off',
  },
};
