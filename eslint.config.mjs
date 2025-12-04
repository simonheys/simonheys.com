import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import tseslint from '@typescript-eslint/eslint-plugin';
import jestPlugin from 'eslint-plugin-jest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: false,
  allConfig: false,
});

const jestGlobals = jestPlugin.environments?.globals?.globals ?? {};

export default [
  {
    ignores: ['next-env.d.ts', '**/.next/**', '**/node_modules/**'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['eslint.config.mjs'],
    rules: {
      'import/no-anonymous-default-export': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      'react/jsx-curly-brace-presence': 'error',
    },
  },
  ...compat
    .extends(
      'plugin:jest/recommended',
      'plugin:jest/style',
      'plugin:testing-library/react',
    )
    .map((config) => ({
      ...config,
      files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
      languageOptions: {
        ...(config.languageOptions ?? {}),
        globals: {
          ...(config.languageOptions?.globals ?? {}),
          ...jestGlobals,
        },
      },
      rules: {
        ...(config.rules ?? {}),
        'jest/prefer-to-be': 'off',
      },
    })),
];
