import typescript from 'rollup-plugin-typescript'
import minify from 'rollup-plugin-babel-minify';
import commonjs from "rollup-plugin-commonjs";

export default {
    input: './src/index.ts',
    external: ['vue'],
    plugins: [
        typescript(),
        commonjs(),
        minify({
            comments: false,
        }),
    ],
    output: {
        format: 'iife',
        file: './dist/index.js',
        globals: {
            vue: 'Vue'
        },
    },
}
