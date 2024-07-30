export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    //   TODO Add Scope Enum Here
    'scope-enum': [
      2,
      'always',
      ['frontend', 'pdf-generator', 'config', 'ui'],
    ],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'chore',
        'style',
        'refactor',
        'ci',
        'test',
        'revert',
        'perf',
      ],
    ],
  },
};
