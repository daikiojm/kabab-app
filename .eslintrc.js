module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  env: {
    'react-native/react-native': true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-native', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // TypeScript strict mode の要件
    '@typescript-eslint/no-explicit-any': 'warn', // error から warn に緩和
    '@typescript-eslint/explicit-function-return-type': 'off', // 一時的に無効化
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-floating-promises': 'warn', // error から warn に緩和
    '@typescript-eslint/no-misused-promises': 'warn', // error から warn に緩和
    '@typescript-eslint/no-unsafe-assignment': 'warn', // error から warn に緩和
    '@typescript-eslint/no-unsafe-member-access': 'warn', // error から warn に緩和
    '@typescript-eslint/require-await': 'warn', // error から warn に緩和
    '@typescript-eslint/no-unsafe-enum-comparison': 'warn', // error から warn に緩和

    // React のベストプラクティス
    'react/prop-types': 'off', // TypeScript を使用するため不要
    'react/react-in-jsx-scope': 'off', // React 17以降では不要
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // React Native のパフォーマンス関連
    'react-native/no-inline-styles': 'warn', // error から warn に緩和
    'react-native/no-color-literals': 'off', // 一時的に無効化
    'react-native/no-raw-text': [
      'error',
      {
        skip: ['Text'],
      },
    ],
    'react-native/no-unused-styles': 'error',
    'react-native/sort-styles': 'off', // 一時的に無効化

    // コード品質
    'prettier/prettier': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
  },
}
