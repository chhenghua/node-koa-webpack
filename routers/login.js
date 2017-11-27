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

router.post('/api/lottery_manage/login', async (ctx) => {
    return await login.lotteryLogin(ctx)
})

router.post('/api/mp/login', async (ctx) => {
    return await login.mpLogin(ctx)
})

router.post('/api/mp/logout', async (ctx) => {
    return await login.mpLoginOut(ctx)
})

router.post('/api/invitation/login', async (ctx) => {
    return await login.invitationLogin(ctx)
})

router.post('/api/ydm_xc_new/phone_login', async (ctx) => {
    return await login.phoneLogin(ctx)
})

module.exports = router
