module.exports = {
  root: true,
  extends: ["universe/native"],
  plugins: ["import", "eslint-plugin-unused-imports"],
  rules: {
    "prettier/prettier": ["error", { printWidth: 100 }],
    "no-empty": ["error", { allowEmptyCatch: true }],
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
