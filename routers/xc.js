
'use strict'

const router = require('koa-router')()

const xcController = require('../controller/xc')

router.get('/api/test', async (ctx) => {
    return await xcController.apiTest(ctx)
})

router.get('/api/getOrder', async (ctx) => {
    return await xcController.getOrder(ctx)
})

router.get('/api/getOrder', async (ctx) => {
    return await xcController.getOrder(ctx)
})

module.exports = router
