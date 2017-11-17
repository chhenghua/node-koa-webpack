
'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        'index': [
            'eventsource-polyfill',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            './src/entry.html'
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/')
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    {loader: 'style-loader!css-loader'}
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, 'src'),
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}
