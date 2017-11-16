
'use strict'

const fs = require('fs')
const routerPath = __dirname

const getRouters = (routerList, path) => {
    const files = fs.readdirSync(path)
    files.forEach((each) => {
        const state = fs.statSync(`${path}/${each}`)
        if (state.isFile()) {
            routerList.push(`${path}/${each}`)
        }
        if (state.isDirectory()) {
            getRouters(routerList, `${path}/${each}`)
        }
    })
    return routerList
}

module.exports = (app) => {

    const routerList = getRouters([], routerPath)
    console.log('################ <Router load start .....> ##################')
    routerList.forEach( (file) => {
        file = `.${file.split(routerPath)[1]}`
        if (file !== './index.js') {
            console.log(`router: ${file} ......`)
            const eachRouter = require(`${file}`)
            app.use(eachRouter.routes(), eachRouter.allowedMethods())
        }
    })
    console.log('################ <Router load success .....> ################')
}
