
'use strict'

module.exports = {
    keyAndIV: {
        key: 'H,GA(kv_m:.Eg%gsY8AG^VRbnCXt3_^U9aC)y|w$df$q=X?A*><O?PocQRyrZ@.i9T);Iv)%;+laG8j8rRbl5ro2S_rACNeKqYkv>vT/*ndNh$LespL2?,*n=nd,o(-<',
        iv: ''
    },
    host: '192.168.30.235:9090',
    sessConfig: {
        key: 'koa:sess',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false
    },
    secret: 'sQCnYmb_PXA<r@%j(;Np?39-<MP4ECA%Qn672AOnG$M8Q|fpTPn%NWGEux2whw2BM7$=JshV39:O8D^vt/.Be@J56b488o.IX4npYTTn:oy12bKOWn9<(Y|>^ty/Ifm@'
}
