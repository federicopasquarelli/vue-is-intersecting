import base from './rollup.config.base.js'

const config = Object.assign({}, base, {
    output: {
        format: 'umd',
        exports: 'named',
        name: 'vueIsIntersecting',
        file: './dist/index.umd.js',
        globals: {
            vue: 'Vue'
        },
    },
})

export default config