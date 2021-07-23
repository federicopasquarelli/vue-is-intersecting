import base from './rollup.config.base.js'

const config = Object.assign({}, base, {
    output: {
        format: 'esm',
        name: 'vueIsIntersecting',
        file: './dist/index.esm.js',
        globals: {
            vue: 'Vue'
        },
    },
})

export default config