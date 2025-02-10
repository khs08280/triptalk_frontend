// .eslintrc.flat.js (또는 .eslintrc.config.js)
// ESLint가 ESM 형식의 Flat Config 파일을 읽도록 파일명을 지정합니다.
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";

export default [
  {
    // 폴더 무시 (예: dist)
    ignores: ["dist"],
    // 언어 옵션: parser, ECMAScript 버전, JSX 등
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parser: "@typescript-eslint/parser",
      ecmaFeatures: {
        jsx: true,
      },
      globals: globals.browser,
    },
    // 환경 설정
    env: {
      browser: true,
      node: true,
      es2021: true,
    },
    // 이 설정이 적용될 파일 범위 (CRA에서 사용하던 src/ 폴더 등)
    files: ["**/*.{js,jsx,ts,tsx}"],
    // 추가 설정: import resolver와 React 관련 설정
    settings: {
      react: {
        version: "detect",
        runtime: "automatic",
      },
      "import/resolver": {
        node: {
          moduleDirectory: ["node_modules", "src"],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    // 사용 플러그인 (Flat Config에서는 객체 형태로 등록)
    plugins: {
      "@typescript-eslint": tseslint,
      react: react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
      prettier: prettier,
    },
    // 확장(extends): Flat Config에서는 기존 추천 설정 헬퍼를 사용하여 추가할 수 있습니다.
    // 여기서는 @eslint/js와 typescript-eslint의 추천 설정을 포함합니다.
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      // 추가로, 기존 .eslintrc에서 사용했던 아래 확장은
      // Flat Config로 바로 가져오기 어려울 수 있으므로(예: plugin:react/recommended),
      // 필요한 규칙은 rules에 수동으로 추가하거나 별도 헬퍼가 있다면 사용하세요.
      // 'plugin:import/recommended', 'plugin:import/typescript',
      // 'plugin:react/recommended', 'plugin:react-hooks/recommended',
      // 'plugin:prettier/recommended'
    ],
    // 규칙 설정: 기존 규칙과 플러그인 추천 규칙들을 병합합니다.
    rules: {
      // 기존 설정: React 17 이상에서는 JSX 사용 시 React import 불필요
      "react/react-in-jsx-scope": "off",
      // react-hooks 추천 규칙
      ...reactHooks.configs.recommended.rules,
      // react-refresh 관련 규칙
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
