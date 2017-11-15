
'use strict'

module.exports = {
    keyAndIV: {
        key: 'P)4.XW_CuFdXTXmA=0A|)UbF@?hlsob*Jv@ImSS^Ryb%GCj=9$yV!#KLe_gAq-Epp?ZD>Jku7da69W6b6PJvbEl#(a0vvJkj@h:cij6d-I&%q;&oed>#Waqw;4^5vYi>',
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
