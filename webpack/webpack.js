
'use strict'

const webpack = require('webpack')
const {devMiddleware, hotMiddleware} = require('koa-webpack-middleware')
const config = require('./webpack.config')
const compile = webpack(config)

module.exports = (app) => {

    app.use(devMiddleware(compile, {
        noInfo: false,
        quiet: false,
        lazy: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        },
        publicPath: '/assets/',
        headers: {'X-Custom-Header': 'yes'},
        stats: {
            colors: true
        }
    }))
    app.use(hotMiddleware(compile, {}))
}