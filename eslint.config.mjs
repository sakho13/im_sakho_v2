import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  // Global ignores (equivalent to `globalIgnores()` from "eslint/config",
  // which requires ESLint >= 9.22). Overrides eslint-config-next defaults.
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "coverage/**",
      "next-env.d.ts",
    ],
  },
]

export default eslintConfig
