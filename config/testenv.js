
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
    },
    secret: 'h;Da|>@sET-S=>F|DdnZvh8W/)!.i_LZc/2lDaB_n+fa2!6&Zv%v5U2gxgB>FCK;$,Td5&PRPObZw>4Y^)@HAmNu)=g<I6e73s4.Gou>9OB@/:I1-rOiA6qi^7Buy:e,'
}
