
'use strict'

const request = require('../../lib/dispatcher')
const config = require('../../config')

exports.apiTest = async (ctx) => {

    //get
    const query = ctx.request.query
    //post
    const body = ctx.request.body

    console.log(query)
    console.log(body)
    //密码登录
    return await request.post({
        url: `${config.host}/api/admin/ManagerStorePWDLogin`,
        form: body
    })
    //短信登录
    return await request.post({
        url: `${config.host}/api/admin/ManagerStoreLoginCode`,
        form: body
    })
}

exports.getOrder = async (ctx) => {
    return {
        order: '111',
        status: 100,
        msg: '来呀来呀'
    }
}
