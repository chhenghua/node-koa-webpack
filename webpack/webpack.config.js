
'use strict'

const path = require('path')

module.exports = {
    entry: '../src/entry.js',
    output: {
        filename: 'bundle.js',
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
                loader: 'babel',
                query: {
                    presets: ['es5015', 'stage-0']
                },
                include: path.resolve(__dirname, '../src/')
            }
        ]
    }
}
