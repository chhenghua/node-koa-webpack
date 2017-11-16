
'use strict'

const fs = require('fs')
const routerPath = __dirname

module.exports = (app) => {

    const routerList = fs.readdirSync(routerPath)
    routerList.forEach( (file) => {
        if (file !== 'index.js') {
            const eachRouter = require(`./${file}`)
            app.use(eachRouter.routes(), eachRouter.allowedMethods())
        }
    })
}
