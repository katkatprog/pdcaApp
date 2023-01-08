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
  overrides: [
    // Next.js needs default exports for pages and API points
    {
      files: ["src/App.tsx"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "import"],
  rules: {
    "react/jsx-uses-react": "off", //「React' must be in scope when using JSX」を防止
    "react/react-in-jsx-scope": "off", //「React' must be in scope when using JSX」を防止
    "import/no-default-export": 1, // default exportを防止
  },
  // React version not specified in eslint-plugin-react settings...を防止
  settings: {
    react: {
      version: "detect",
    },
  },
};
