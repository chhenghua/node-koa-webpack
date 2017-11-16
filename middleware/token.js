
'use strict'

const jwt = require('jsonwebtoken')

const config = require('../config')

exports.getToken = async (params) => {
    return new Promise((resolve, reject) => {
        jwt.sign({
            data: JSON.stringify(params),
            algorithm: 'HS512'
        }, config.secret, {expiresIn: config.expireTime}, (err, token) => {
            if (err) {
                reject(err)
            } else {
                resolve(token)
            }
        })
    })
}

exports.verifyToken = async ({token}) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secret, {algorithm: 'HS512'}, (err, decoded) => {
            if (err) {
                reject(err)
            } else {
                resolve(decoded)
            }
        })
    })
}
