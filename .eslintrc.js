module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
  extends: ["plugin:react/recommended", "plugin:prettier/recommended"],
  plugins: [],
  // add your custom rules here
  rules: {
    "react/prop-types": 0,
    "no-console": "error", //unused consoles
    "no-eval": "error",
    "no-dupe-keys": "error",
    "no-var": "error", //unused variables
    "no-useless-constructor": "error", //unused variables
    "react/display-name": "off",
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
    "spaced-comment": [2, "always"],
    // "eqeqeq": "error", // Example ==== instrad  ==,
  },
  settings: {
    react: {
      pragma: "React",
      version: "16.13.1",
    },
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx"],
      },
    },
  },
};
