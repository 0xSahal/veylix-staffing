/** @type {import("@commitlint/types").UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'chore',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'revert',
        'wip',
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    // Allow capitalized code identifiers (e.g. PageHero) in the subject; only block SHOUTING.
    'subject-case': [2, 'never', ['upper-case']],
    'subject-empty': [2, 'never'],
    'subject-max-length': [2, 'always', 72],
    // Don't fail commits over long body lines (URLs, lists, etc.).
    'body-max-line-length': [0],
    'header-max-length': [2, 'always', 80],
  },
}
