import eslintConfigPrettier from 'eslint-config-prettier'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import importPlugin from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  ...nextCoreWebVitals,
  ...tseslint.configs.recommendedTypeChecked,
  eslintConfigPrettier,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        typescript: { alwaysTryTypes: true, project: './tsconfig.json' },
      },
    },
    rules: {
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
      'no-console': 'error',
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-warning-comments': [
        'warn',
        { terms: ['TODO', 'FIXME', 'HACK', 'XXX'], location: 'start' },
      ],
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
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',
      'spaced-comment': ['error', 'always'],
      eqeqeq: ['error', 'always'],
      'react/jsx-no-useless-fragment': 'warn',
      'react/self-closing-comp': 'error',
      'react/no-array-index-key': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    ignores: [
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
)
