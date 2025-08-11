import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue', '**/*.js', '**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsparser,
      globals: {
        'requestAnimationFrame': 'readonly',
        'window': 'readonly',
        'document': 'readonly',
        'setInterval': 'readonly',
        'clearInterval': 'readonly',
        'console': 'readonly',
        'HTMLElement': 'readonly',
        'Element': 'readonly',
        'Date': 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      // Vue 3 specific rules
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/valid-template-root': 'off',
      
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // JavaScript rules 비활성화 (TypeScript가 처리)
      'no-unused-vars': 'off',
      'no-undef': 'off'
    }
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: pluginVue.parsers['vue-eslint-parser'],
      parserOptions: {
        parser: tsparser,
        extraFileExtensions: ['.vue']
      }
    }
  }
]