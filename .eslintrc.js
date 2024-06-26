module.exports = {
  'env': { 'browser': true, 'es6': true, 'node': true, 'codeceptjs/codeceptjs': true},
  'extends': ['eslint:recommended'],
  'globals': { 'Atomics': 'readonly', 'SharedArrayBuffer': 'readonly' },
  'parserOptions': {
    'ecmaVersion': 2018,
    'requireConfigFile': false,
    'sourceType': 'module',
  },
  'rules': {
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'semi': ['error', 'always'],
    'no-multiple-empty-lines': ['error', {'max': 1}],
  },
  'overrides': [
    {
      'files': ['**/*.ts', '**/*.tsx'],
      'env': { 'browser': true, 'es6': true, 'node': true },
      'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      'globals': { 'Atomics': 'readonly', 'SharedArrayBuffer': 'readonly' },
      'parser': '@typescript-eslint/parser',
      'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module',
        'project': './tsconfig.json',
      },
      'plugins': ['@typescript-eslint', 'codeceptjs'],
      'rules': {
        'no-empty-pattern': 0,
        'no-unused-vars': 'warn',
        'indent': ['error', 2, { 'SwitchCase': 1 }],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single', { 'avoidEscape': true }],
        'comma-dangle': ['error', 'always-multiline'],
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],

};
