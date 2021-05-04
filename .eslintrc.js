module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'semi' : 0, 
    'quotes': 0,
    'indent': 0,
    'no-multiple-empty-lines': 0,
    'camelcase': 0,
    'spaced-comment': 0, 
    "space-before-blocks": 0,
    "no-constant-condition":0,
    "no-cond-assign":0,
    "no-trailing-spaces":0,
    "no-unused-vars":0,
    "no-undef":0,
    "block-spacing":0,
    "padded-blocks":0,
    "no-multi-spaces":0,
    "semi-spacing":0,

    "keyword-spacing":0,
    "eqeqeq":0,
    "brace-style":0,
    "space-before-function-paren":0,
    "no-empty":0,
    
     // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
