import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from "rollup-plugin-terser";

export default {
    input: './src/index.ts',
    external: ['vue'],
    plugins: [
        typescript(),
        commonjs(),
        terser(),
    ],
    output: {
        format: 'es',
        file: './dist/index.js',
        globals: {
            vue: 'Vue'
        },
    },
}
