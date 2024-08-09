import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  splitting: true,
  treeshake: true,
  sourcemap: true,
  minify: true,
  clean: true,
  cjsInterop: true,
  tsconfig: './tsconfig.json'
});