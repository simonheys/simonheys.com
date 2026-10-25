import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import jestPlugin from 'eslint-plugin-jest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: false,
  allConfig: false,
});

const jestGlobals = jestPlugin.environments?.globals?.globals ?? {};
const disableUnsupportedEslint10Rules = (rules = {}) =>
  Object.fromEntries(
    Object.entries(rules).map(([rule, value]) => [
      rule,
      rule.startsWith('react/') ? 'off' : value,
    ]),
  );
const nextConfig = nextCoreWebVitals.map((config) => {
  const nextRules = disableUnsupportedEslint10Rules(config.rules);

  if (
    config.languageOptions?.parser?.meta?.name !== 'eslint-config-next/parser'
  ) {
    return {
      ...config,
      rules: nextRules,
    };
  }

  return {
    ...config,
    rules: nextRules,
    languageOptions: Object.fromEntries(
      Object.entries(config.languageOptions).filter(([key]) => key !== 'parser'),
    ),
  };
});

export default [
  {
    ignores: ['next-env.d.ts', '**/.next/**', '**/node_modules/**'],
  },
  ...nextConfig,
  {
    files: ['eslint.config.mjs'],
    rules: {
      'import/no-anonymous-default-export': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
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
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/set-state-in-effect': 'off',
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
