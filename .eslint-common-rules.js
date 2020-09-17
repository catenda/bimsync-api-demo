module.exports = {
  'comma-dangle': ['error', 'never'],
  'default-case': 'off',
  'eol-last': ['error', 'always'],
  eqeqeq: ['warn', 'always'],
  'func-names': 'off',
  'import/prefer-default-export': 'off',
  
  indent: [
    'error',
    2,
    {
      SwitchCase: 1
    }
  ],
  'linebreak-style': ['error', 'unix'],
  'lines-between-class-members': ['error', 'always'],
  'max-len': ['warn', { 'code': 120 , ignoreComments: true}],
  'no-console': ['warn'],
  'no-constant-condition': [
    'error',
    {
      checkLoops: false
    }
  ],
  'no-multiple-empty-lines': [
    'error',
    {
      max: 1,
      maxBOF: 0,
      maxEOF: 0
    }
  ], // For some reason maxEOF have to be 0 to allow max 1 newline
  'no-param-reassign': 'error',
  'no-underscore-dangle': 'off',
  'no-unused-expressions': 'off',
  'no-unused-vars': 'error',
  'object-curly-newline': 'off',
  'operator-linebreak': 'off',
  'prefer-const': 'error',
  'space-before-function-paren': ['error', 'never'],
  'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
  'import/no-cycle': 'error'
};
