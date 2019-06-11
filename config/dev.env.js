'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PORT: '8888',
  HOST: '"localhost"',
  API: '"http://localhost:8000"',
  CABLE: '"ws://localhost:8000"'
})
