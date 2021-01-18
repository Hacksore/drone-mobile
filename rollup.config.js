import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: {
    exports: 'auto',
    format: 'cjs',
    name: 'index',
    file: 'dist/index.js',
    banner: '/* @preserve drone-mobile / MIT License / https://github.com/Hacksore/drone-mobile */',
  },
  external: [...Object.keys(pkg.dependencies || {}), 'events', 'aws-sdk/global'],
  plugins: [
    typescript({}),
    json(),
    commonjs(),
    terser(),
  ],
};
