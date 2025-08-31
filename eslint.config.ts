import vue from 'eslint-plugin-vue'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-config-prettier'

export default [
  // Ignore build outputs and deps
  {
    ignores: ['dist', 'node_modules', '*.d.ts'],
  },

  // Vue 3 recommended base (flat config)
  ...vue.configs['flat/recommended'],

  // TypeScript for .ts files
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // If you want type-aware rules, uncomment the next line
        // project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Common TS tweaks (adjust to taste)
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },

  // TypeScript inside .vue SFCs
  {
    files: ['**/*.vue'],
    languageOptions: {
      // Vue SFC parser, which will delegate <script> to TS parser below
      parser: await import('vue-eslint-parser'),
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        // For type-aware rules inside .vue, also add:
        // project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Example Vue/TS niceties
      'vue/multi-word-component-names': 'off',
    },
  },

  // Keep Prettier last to disable conflicting rules
  prettier,
]
