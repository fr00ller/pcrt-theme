//const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
//const CopyWebpackPlugin = require('copy-webpack-plugin')

var distPath = __dirname + '/dist/'

module.exports = {
    //mode: 'development',

    entry: {
        utility: './src/utility.js'
    },
    output: {
        filename: '[name].js',
        path: distPath
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },

            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },

            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/dist/'
                        }
                    }
                ]
            },

            {
                test: /\.html/,
                loader: 'file-loader?name=[name].[ext]',
                options: {
                    publicPath: '/',
                    name: '[name].[ext]'
                }
            },

        ]
    },

    //devtool: '#eval-source-map',

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        /*new WebpackCleanupPlugin({
            exclude: [".gitkeep"],
        }),*/
        /*new CopyWebpackPlugin([
            {from:'./public/img', to: 'img'}
        ]),*/
    ],

    /*optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },*/

}
