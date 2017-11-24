
'use strict'

const request = require('request')

const reqMethod = async (opt, ctx, method) => {
    opt = opt || {}
    if (!opt.url) {
        throw new Error({
            statusCode: 403,
            message: 'url is required.'
        })
    }
    opt.method = method
    opt.timeout = opt.timeout || 10e3
    opt.headers = Object.assign({}, opt.headers, ctx.headers, {Authorization: `Bearer ${ctx.session.web_token}`})
    return new Promise((resolve, reject) => {
        request(opt, (err, res, body) => {
            if (err) {
                return reject({
                    statusCode: 500,
                    message: err
                })
            }
            if (res.statusCode !== 200) {
                return reject({
                    statusCode: res.statusCode,
                    message: `http code ${res.statusCode}`
                })
            }
            return resolve(typeof body === 'string' ? JSON.parse(body) : body)
        })
    })
}

module.exports = {
    post: async (opt, ctx = {session: {}}) => {
        return await reqMethod(opt, ctx, 'post')
    },
    get: async (opt, ctx = {session: {}}) => {
        return await reqMethod(opt, ctx, 'get')
    }
}

