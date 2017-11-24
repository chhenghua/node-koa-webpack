'use strict'

const request = require('../lib/dispatcher')
const config = require('../config')

//密码登录
exports.apiManagerStorePWDLogin = async (ctx) => {
    // const query = ctx.request.query
    const body = ctx.request.body

    const loginRlt = await request.post({
        url: `${config.host}/api/admin/ManagerStorePWDLogin`,
        form: body
    })

    // 将从后端拿到的token写到session
    ctx.session.web_token = loginRlt.token

    return loginRlt
}

// 退出
exports.ManagerStoreSignOut = async (ctx) => {
    const rlt = await request.post({
        url: `${config.host}/api/admin/ManagerStorePWDLogin`,
        form: body
    }, ctx)

    // 删除session
    delete ctx.session.web_token
    return rlt
}

//短信登录
exports.apiManagerStoreLoginCode = async (ctx) => {
    let api = await request.post({
        url: `${config.host}/api/admin/ManagerStoreLoginCode`,
        form: ctx.request.body
    }, ctx)
    return api
}

// 微信绑定账号
exports.ManagerStoreWxBind = async (ctx) => {
    const rlt = await request.post({
        url: `${config.host}/api/admin/ManagerStoreWxBind`,
        form: body
    }, ctx)

    // 将从后端拿到的token写到session
    ctx.session.web_token = rlt.token
    return rlt
}

exports.lotteryLogin = async (ctx) => {
    const rlt = await request.post({
        url: `${config.host}/api/lottery_manage/login`,
        form: body
    }, ctx)

    // 将从后端拿到的token写到session
    ctx.session.web_token = rlt.token
    return rlt
}

exports.mpLogin = async (ctx) => {
    const rlt = await request.post({
        url: `${config.host}/api/mp/login`,
        form: body
    }, ctx)

    // 将从后端拿到的token写到session
    ctx.session.web_token = rlt.token
    return rlt
}

exports.mpLoginOut = async (ctx) => {
    const rlt = await request.post({
        url: `${config.host}/api/mp/logout`,
        form: body
    }, ctx)

    // 将从后端拿到的token写到session
    delete ctx.session.web_token
    return rlt
}
