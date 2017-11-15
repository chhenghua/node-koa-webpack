
'use strict'

module.exports = {
    keyAndIV: {
        key: 'H,GA(kv_m:.Eg%gsY8AG^VRbnCXt3_^U9aC)y|w$df$q=X?A*><O?PocQRyrZ@.i9T);Iv)%;+laG8j8rRbl5ro2S_rACNeKqYkv>vT/*ndNh$LespL2?,*n=nd,o(-<',
        iv: ''
    },
    host: 'http://saas.ydm01.top',
    sessConfig: {
        key: 'koa:sess',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false
    }
}
