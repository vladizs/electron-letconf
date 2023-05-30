module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/base',
    'airbnb-base',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'debug'],
      },
    ],
    'lines-between-class-members': [
      'error', 'always', { exceptAfterSingleLine: true },
    ],
    'import/no-unresolved': [
      2,
      { ignore: ['\\.vue$'] },
    ],
  },
};
