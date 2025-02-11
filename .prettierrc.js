export default {
  printWidth: 80,
  tabWidth: 2,
  semi: true, // 세미콜론 사용
  // trailingComma: "all", // 객체, 배열 등의 마지막 요소 뒤에 콤마 추가
  bracketSpacing: true, // 객체 리터럴의 괄호 안에 공백 추가 ({ foo: bar } vs {foo: bar})
  jsxBracketSameLine: false, // JSX 닫는 괄호를 다음 줄에 (deprecated)
  arrowParens: "always", // 화살표 함수 매개변수가 하나일 때도 괄호 사용 (always)
  endOfLine: "lf", // 줄바꿈 문자 (LF, CRLF) - 유닉스/리눅스는 lf, 윈도우는 crlf.
  jsxSingleQuote: false, // JSX에서 작은 따옴표 대신 큰 따옴표("") 사용 여부
  plugins: ["prettier-plugin-tailwindcss"],
};
