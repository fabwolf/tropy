'use strict'

global.START_TIME = Date.now()

const decode = decodeURIComponent
const hash = window.location.hash.slice(1)

global.args = Object.freeze(JSON.parse(decode(hash)))

process.env.NODE_ENV = global.args.environment

require('common/log')(global.args.home, global.args.debug)
