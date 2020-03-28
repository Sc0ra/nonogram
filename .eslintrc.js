module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],

  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'linebreak-style': 0
  },

  'extends': [
    'plugin:vue/recommended',
    '@vue/airbnb',
    '@vue/typescript/recommended'
  ]
};
