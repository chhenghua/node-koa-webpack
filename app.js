const Koa = require('koa')
const serve  = require('koa-static')
const app = new Koa()

const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const logger = require('koa-logger')

const routers = require('./routers')
const paramsSign = require('./middleware/sign')
const config = require('./config')
// const webpack = require('./webpack/webpack')

app.use(serve('./src'))
app.use(serve('./dist'))

// 请求body解析
app.use(bodyParser())

// session
app.keys = ['im a session keys']
app.use(session(config.sessConfig, app))

// 日志模块
app.use(logger())

// 参数签名
app.use(async (ctx, next) => {
    paramsSign(ctx)
    await next()
})

// if (process.env.GGB_ENV === 'DEV') {
//     webpack(app)
// }

// 错误处理
app.use(async (ctx, next) => {
    try {
        ctx.body = await next()
    } catch (e) {
        ctx.status = e.statusCode || e.status || 500
        ctx.body = {
            status: 'error',
            msg: e.message
        }
    }
})

routers(app)

app.listen(3000)
console.log('listening on port 3000')
