module.exports = {
  extends: [
    "next/core-web-vitals",
    "next/typescript",
    "prettier",
    "plugin:@next/next/recommended",
    "eslint:recommended",
    "unused-imports",
  ],
  rules: {
    "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
};
