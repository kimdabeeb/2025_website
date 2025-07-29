import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue', '**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        'requestAnimationFrame': 'readonly',
        'window': 'readonly',
        'document': 'readonly'
      }
    },
    rules: {
      // Vue 3 specific rules
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off', // Allow multiple root elements in Vue 3
      'vue/valid-template-root': 'off', // Disable template root validation for Vue 3
    }
  }
]