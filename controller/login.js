'use strict'

const request = require('../lib/dispatcher')
const config = require('../config')

//密码登录
exports.apiManagerStorePWDLogin = async (ctx) => {
    const query = ctx.request.query
    const body = ctx.request.body
    return await request.post({
        url: `${config.host}/api/admin/ManagerStorePWDLogin`,
        form: body
    })
}

//短信登录
exports.apiManagerStoreLoginCode = async (ctx) => {
    let api = await request.post({
        url: `${config.host}/api/admin/ManagerStoreLoginCode`,
        form: ctx.request.body
    })
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
    console.log(api)
    return api
}
