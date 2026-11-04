import js from "@eslint/js";
import angular from "angular-eslint";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default tseslint.config({
    files: ["src/**/*.ts"],

    extends: [
        js.configs.recommended,
        ...tseslint.configs.recommended,
        ...angular.configs.tsRecommended,
        prettierRecommended,
    ],

    processor: angular.processInlineTemplates,

    plugins: {
        "simple-import-sort": simpleImportSort,
    },

    languageOptions: {
        parserOptions: {
            project: ["./tsconfig.json", "./tsconfig.spec.json"],
        },
    },

    rules: {
        "@typescript-eslint/ban-ts-comment": 0,
        "no-console": ["error"],

        "max-lines-per-function": [1, {
            max: 40,
        }],

        "max-lines": [1, {
            max: 150,
        }],

        "@angular-eslint/directive-selector": ["error", {
            type: "attribute",
            prefix: "app",
            style: "camelCase",
        }],

        "@angular-eslint/component-selector": ["error", {
            type: "element",
            prefix: "app",
            style: "kebab-case",
        }],

        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
    },
});
