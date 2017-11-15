
'use strict'

module.exports = {
    keyAndIV: {
        key: '9-omo-+9R>T;e&/oZ.ach/Knh^$!t_=x1!#OyH;x,jLur<01w&LOdnho>Rm&NmrC+O9CJW1^?%OEDdo^2ejar1JlPiabZmd,Pg3fHhPR,GqEK$S0.q?9?UkBoLl)Y(_$',
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
