'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  baseUrl:'http://localhost:6000/api',
  //baseUrl:'http://localhost:6000/api',
  // baseUrl:'http://118.178.125.110:33001/XXXXXX',
})
