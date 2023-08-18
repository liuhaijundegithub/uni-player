import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import { readFileSync } from "fs";
import { terser } from "rollup-plugin-terser";
import alias from "@rollup/plugin-alias";
import postcss from 'rollup-plugin-postcss';

const packageJson = JSON.parse(readFileSync("./package.json", "utf8")); // 读取UMD全局模块名，在package中定义了
const pkgName = packageJson.umdModuleName;
export default {
  input: "src/main.ts",
  output: [
    {
      file: "dist/esm/index.js",
      format: "esm",
    },
    {
      file: "dist/bundle/index.js",
      format: "iife",
      name: pkgName,
      plugins: [terser()],
    },
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    alias({
      resolve: [".js"],
    }),
    resolve(),
    postcss(),
  ],
};