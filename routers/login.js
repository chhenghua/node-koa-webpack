'use strict'

const router = require('koa-router')()
const login = require('../controller/login.js')

//密码登录
router.post('/api/admin/ManagerStorePWDLogin', async (ctx) => {
    return await login.apiManagerStorePWDLogin(ctx)
})

//短信登录
router.post('/api/admin/ManagerStoreLoginCode', async (ctx) => {
    return await login.apiManagerStoreLoginCode(ctx)
})


module.exports = router
