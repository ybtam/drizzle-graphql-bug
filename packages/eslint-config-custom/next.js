const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:perfectionist/recommended-natural',
    'plugin:prettier/recommended',
  ],
  // globals: {
  //   React: true,
  //   JSX: true,
  // },
  env: {
    node: true,
    browser: true,
  },
  plugins: ['perfectionist', 'prettier'],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': ['error', './app/'],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react-hooks/exhaustive-deps': 'off',
  },
};
