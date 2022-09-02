module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': ['error', 'windows'],
    'max-len': ['error', { code: 1000 }],
    'consistent-return': ['error', { treatUndefinedAsUnspecified: true }],
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
  },
};
