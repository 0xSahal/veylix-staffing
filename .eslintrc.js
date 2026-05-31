/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'unused-imports', 'import'],
  rules: {
    // ─── TypeScript Strict Rules ────────────────────────────────
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-misused-promises': 'error',

    // ─── No Console / No Debugger ────────────────────────────────
    'no-console': 'error',
    'no-debugger': 'error',
    'no-alert': 'error',

    // ─── No Comments (enforced by convention — warn on TODO/FIXME) ─
    'no-warning-comments': [
      'warn',
      { terms: ['TODO', 'FIXME', 'HACK', 'XXX'], location: 'start' },
    ],

    // ─── Unused Imports & Variables ──────────────────────────────
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    // ─── Import Order ─────────────────────────────────────────────
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
          { pattern: 'next/**', group: 'external', position: 'before' },
          { pattern: '@/**', group: 'internal', position: 'before' },
        ],
        pathGroupsExcludedImportTypes: ['react', 'next'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/no-duplicates': 'error',
    'import/first': 'error',
    'import/no-default-export': 'off',

    // ─── Code Quality ─────────────────────────────────────────────
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    'spaced-comment': ['error', 'always'],
    eqeqeq: ['error', 'always'],

    // ─── React / JSX ──────────────────────────────────────────────
    'react/jsx-no-useless-fragment': 'warn',
    'react/self-closing-comp': 'error',
    'react/no-array-index-key': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },

  settings: {
    'import/resolver': {
      typescript: { alwaysTryTypes: true, project: './tsconfig.json' },
    },
  },

  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'public/',
    '*.config.js',
    '*.config.ts',
    'jest.config.ts',
    'commitlint.config.js',
  ],
}
