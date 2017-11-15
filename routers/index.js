
'use strict'

const xcRouter = require('./xc')

module.exports = (app) => {
    app.use(xcRouter.routes(), xcRouter.allowedMethods())
}
