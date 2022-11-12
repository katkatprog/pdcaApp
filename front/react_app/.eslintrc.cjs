module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/jsx-uses-react": "off", //「React' must be in scope when using JSX」を防止
    "react/react-in-jsx-scope": "off", //「React' must be in scope when using JSX」を防止
  },
  // React version not specified in eslint-plugin-react settings...を防止
  settings: {
    react: {
      version: "detect",
    },
  },
};
