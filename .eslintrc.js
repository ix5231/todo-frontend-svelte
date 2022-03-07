module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.svelte'],
  },
  plugins: [
    'svelte3',
    '@typescript-eslint',
  ],
  rules: {
  },
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        "import/no-extraneous-dependencies": ["error", {
          devDependencies: true
        }],
        "import/prefer-default-export": "off",
        "import/no-mutable-exports": "off",
        "import/no-unresolved": "off",
      }
    },
  ],
  settings: {
    'svelte3/typescript': true,
  }
};
