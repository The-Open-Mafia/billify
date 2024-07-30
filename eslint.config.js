import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    ignores: [
      'coverage',
      '*/**/public',
      '*/**/dist',
      '*/**/build',
      'pnpm-lock.yaml',
      'pnpm-workspace.yaml',
    ],
  },
];
