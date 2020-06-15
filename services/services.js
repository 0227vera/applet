const loginReg = require('./login-reg')
const goods = require('./goods')

module.exports = { 
  ...loginReg,
  ...goods
}
