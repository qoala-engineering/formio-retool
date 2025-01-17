/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@packages/eslint-config/react.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.lint.json',
    tsconfigRootDir: __dirname
  }
};
