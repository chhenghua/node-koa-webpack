
'use strict'

const router = require('koa-router')()

const xcController = require('../controller/saas')
//密码登录
router.post('/api/admin/ManagerStorePWDLogin', async (ctx) => {
    return await xcController.apiTest(ctx)
})
//短信登录
router.post('/api/admin/ManagerStoreLoginCode', async (ctx) => {
    return await xcController.apiTest(ctx)
})

module.exports = router
