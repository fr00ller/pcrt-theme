const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const webpack = require('webpack')

const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = merge(common, {
    mode: 'production',

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    output: {
                        comments: false,
                        beautify: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                },
            })
        ]
    },

    plugins: [
        //remove unused translations file for moment
        new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(it)|(en)$/)
    ]

})