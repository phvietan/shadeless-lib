module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
    'eslint-plugin-jsdoc',
  ],
  'rules': {
    'max-len': 0,
    'eol-last': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    'jsdoc/require-jsdoc': ['error', {
      'contexts': [
        'MethodDefinition',
        'ClassDeclaration',
        'FunctionExpression',
        'FunctionDeclaration',
        'TSInterfaceDeclaration',
        'TSTypeAliasDeclaration',
        'TSEnumDeclaration',
      ],
    }],
    '@typescript-eslint/no-explicit-any': 0,
    'no-trailing-spaces': 0,
  },
};
