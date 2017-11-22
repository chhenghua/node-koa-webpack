
'use strict'

const default_conf = require('./default.js')

const env = '' //process.env.GGB_ENV
let config = {}

switch (env) {
    case 'DEV':
        config = Object.assign(default_conf, require('./development'))
        break
    case 'TEST':
        config = Object.assign(default_conf, require('./testenv'))
        break
    default:
        config = Object.assign(default_conf, require('./release'))
}

module.exports = config
