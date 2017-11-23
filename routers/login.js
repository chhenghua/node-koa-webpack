'use strict'

const router = require('koa-router')()
const login = require('../controller/login.js')

//密码登录
router.post('/api/admin/ManagerStorePWDLogin', async (ctx) => {
    return await login.apiManagerStorePWDLogin(ctx)
})

// 退出
router.post('/api/admin/ManagerStoreSignOut', async (ctx) => {
    return await login.ManagerStoreSignOut(ctx)
})

//短信登录
router.post('/api/admin/ManagerStoreLoginCode', async (ctx) => {
    let api = await login.apiManagerStoreLoginCode(ctx)
    console.log('##########################################')
    console.log(api)
    return api

})

// 微信绑定账号
router.post('/api/admin/ManagerStoreWxBind', async (ctx) => {
    return await login.ManagerStoreWxBind(ctx)

})

module.exports = router
