import typescript from "rollup-plugin-ts"
import { lezer } from "@lezer/generator/rollup"

export default {
  input: "src/index.ts",
  external: ["@codemirror/language", "@lezer/highlight", "@lezer/lr", "@codemirror/autocomplete"],
  output: [
    { file: "dist/index.cjs", format: "cjs" },
    { dir: "./dist", format: "es" }
  ],
  plugins: [lezer(), typescript()]
}
