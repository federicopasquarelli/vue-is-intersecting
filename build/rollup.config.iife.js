import base from './rollup.config.base.js'
import { terser } from 'rollup-plugin-terser'

const config = Object.assign({}, base, {
    output: {
        format: 'iife',
        exports: 'named',
        name: 'vueIsIntersecting',
        file: './dist/index.life.js',
        globals: {
            vue: 'Vue'
        },
    },
})
config.plugins.push(terser())

export default config