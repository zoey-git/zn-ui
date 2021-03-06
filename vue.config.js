const path = require('path')

module.exports = {
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', path.resolve('examples'))
            .set('~', path.resolve('packages'))
            .set('src', path.resolve('src'))
        config.module
            .rule('js')
            .include.add('/packages/').end()
            .include.add('/examples/').end()
            .use('babel')
            .loader('baber-loader')
            .tap(options => {
                return options
            })
    }
}