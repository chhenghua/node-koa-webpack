
'use strict'

const {encrypt} = require('../lib/crypto')

const getSortedString = (params) => {

    const keys = getSortedKeys(params)

    let sortedString = ''
    keys.forEach((key) => {
        if (key !== 'sign') {
            sortedString = `${sortedString}&${key}=${params[key]}`
        }
    })
    return sortedString.substring(1)
}

const getSortedKeys = (params) => {
    return Object.keys(params).sort()
}



/**
 * 参数签名.
 * @param req
 * @returns {*}
 */
module.exports = (ctx) => {
    const method = ctx.request.method.toLowerCase()
    const params = Object.assign({}, method === 'get' ? ctx.request.query : ctx.request.body)
    const sign = encrypt(getSortedString(params))
    const key = method === 'get' ? 'query' : 'body'

    ctx.request[key].sign = sign

    return ctx

}
