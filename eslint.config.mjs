import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import customEslintPlugin from 'custom-eslint-plugin';

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      'node_modules/*',
      'govuk/*',
      'public/*',
      'app/assets/javascripts/*.js',
      'allure-report/*',
      'allure-results/*',
      'allure-bootstrap-report/*',
      'allure-bootstrap-results/*',
      'allure-functional-report/*',
      'allure-functional-results/*',
      'src/*',
      'coverage',
      '*.min.js',
      '**/*.js',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: { customEslintPlugin },
    rules: {
      indent: ['error', 2, { SwitchCase: 1 }],
      'linebreak-style': ['error', 'unix'],
      'comma-dangle': ['error', 'always-multiline'],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      '@typescript-eslint/no-var-requires': 0,
      'no-empty-pattern': 0,
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'warn',
    },
  },
  {
    files: ['playwright/pages/**/*', 'playwright/steps/**/*'],
    rules: {
      'customEslintPlugin/no-duplicate-class-names': 'error',
    },
  },
  { languageOptions: { globals: globals.node } },
  eslintConfigPrettier,
];
