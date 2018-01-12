<<<<<<< HEAD
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
=======
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
