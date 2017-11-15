
'use strict'

const jwt = require('jsonwebtoken')

const expire = 30 * 60

const secret = '*#$xc9/5`0,=2X$%4/dYE_C_NyO59t>Qn#P<RBD$comwKNv|^.`(p7^O<P+|0GeJ'

exports.getToken = async (params) => {
    return new Promise((resolve, reject) => {
        jwt.sign({
            data: JSON.stringify(params),
            algorithm: 'HS512'
        }, secret, {expiresIn: expire}, (err, token) => {
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
        jwt.verify(token, secret, {algorithm: 'HS512'}, (err, decoded) => {
            if (err) {
                reject(err)
            } else {
                resolve(decoded)
            }
        })
    })
}
