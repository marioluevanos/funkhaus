module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ["eslint:recommended", "plugin:vue/recommended"],
  // extends: [
  //   '@nuxtjs',
  //   'plugin:nuxt/recommended'
  // ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    // override/add rules settings here, such as:
    indent: ["error", 4, { SwitchCase: 1 }],
    "vue/html-indent": ["error", 4],
    semi: [2, "never"]
  }
}
