
'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
    // devtool: 'eval-source-map',
    entry: {
        'index': [
            'eventsource-polyfill',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            './src/index.js'
        ]
    },
    output: {
        filename: 'bundle-[hash].js',
        path: path.resolve(__dirname, '../dist/')
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
                query: {
                    presets: ['es2015', 'stage-0']
                },
                include: path.resolve(__dirname, '../src/')
            }
        ]
    },
    resolve: {
        modules: ['bower_components', 'node_modules']
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin()
        // new webpack.ProvidePlugin({
        //     '$': 'jquery',
        //     'jquery': 'jQuery'
        // })
        // new ExtractTextPlugin('style.css'),
        // new bowerWebpackPlugin({
        //     modulesDirectories: ['bower_components'],
        //     manifestFile: '../bower.json'
        // })
        // new webpack.ResolverPlugin([
        //     new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('./../bower.json', ['main'])
        // ])
    ]
}
