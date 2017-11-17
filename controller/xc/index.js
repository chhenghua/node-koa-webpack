
'use strict'

const request = require('../../lib/dispatcher')
const config = require('../../config')

exports.apiTest = async (ctx) => {

    // const query = ctx.request.query
    // const body = ctx.request.body

    console.log('ctx........................')
    console.log(ctx.request.query)

    // return await request.get({
    //     url: `${config.host}/api/admin/ManagerStoreBossRegCode`,
    //     form: {
    //         account: '17688831541'
    //     }
    // })

}

exports.getOrder = async (ctx) => {
    return {
        order: '111',
        status: 100,
        msg: '来呀来呀'
    }
}
