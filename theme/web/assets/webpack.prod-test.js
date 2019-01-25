const merge = require('webpack-merge')
//const common = require('./webpack.common.js')
const prod = require('./webpack.prod.js')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(prod, {
    plugins: [
        new BundleAnalyzerPlugin({analyzerPort: 9999})
    ]
})