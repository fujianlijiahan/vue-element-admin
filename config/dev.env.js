'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://www.easy-mock.com/mock/5b46a39a41643028d19e8d1c/oaweb/api"',
  BASE_API_OF_SYS_MANAGE: '"https://www.easy-mock.com/mock/5b46a39a41643028d19e8d1c/oaweb/api"',
})
