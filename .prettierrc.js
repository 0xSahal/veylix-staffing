/** @type {import("prettier").Config} */
module.exports = {
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'es5',
  tabWidth: 2,
  useTabs: false,
  printWidth: 90,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts',
  tailwindFunctions: ['clsx', 'cn', 'cva', 'twMerge'],
}
