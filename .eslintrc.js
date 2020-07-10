const commonRules = require('./.eslint-common-rules');

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  overrides: [
    // Client
    {
      files: ['./src/client/**'],
      settings: {
        react: {
          pragma: 'React',
          version: 'detect'
        },
        'import/resolver': {
          node: {}, // To fix issue: https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-511007063
          webpack: {
            config: {
              resolve: {
                extensions: ['.js', '.jsx']
              }
            }
          }
        }
      },
      parser: 'babel-eslint',
      parserOptions: {
        sourceType: 'module'
      },
      plugins: ['react', 'react-hooks', 'import'],
      rules: {
        ...commonRules,
        'react/self-closing-comp': [
          'error',
          {
            component: true,
            html: false
          }
        ],
        'react/jsx-space-before-closing': 'off',
        'react/jsx-tag-spacing': 'error',
        'react/prop-types': 'off',
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            'js': 'never',
            'jsx': 'never',
          }
        ]
      },
      extends: ['airbnb']
    },

    // Server
    {
      files: ['./src/server/**'],
      parser: 'babel-eslint',
      parserOptions: {
        ecmaVersion: 2020
      },
      rules: {
        ...commonRules
      },
      extends: [
        "airbnb-base"
      ]
    }
  ],
};
