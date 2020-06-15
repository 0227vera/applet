const required = require('../utils/request')

module.exports = {
  getCode (data) {
    return required.post({
      url: '/passportUser/notice',
      data
    })
  },
  checkVerCode (data) {
    return required.post({
      url: '/passportUser/checkVerCode',
      data
    })
  },
  changePass (data) {
    return required.post({
      url: '/passportUser/forgetPass',
      data
    })
  },
  regLogin (data) {
    return required.post({
      url: '/passportUser/register',
      data
    })
  },
  /**
   * 用户注册
   * 检查注册验证码和员工码是否有效
   * @param {object} data
   * {
   *  mobile: 手机号,
   *  verCode: 短信验证码,
   *  employeeID: 员工工号
   * }
   */
  checkRegister(data) {
    return required.post({
      url: '/passportUser/registerCheck',
      data
    })
  },
  /**
   * 修改密码
   * @param {*} data 
   */
  updatePassword(data) {
    return required.post({
      url: '/passportUser/updatePass',
      data
    })
  },
  userPassLogin (data) {
    return required.post({
      url: '/passportUser/login',
      data
    })
  },
  userVercodeLogin (data) {
    return required.post({
      url: '/passportUser/smsLogin',
      data
    })
  },
  logout() {
    return required.get({
      url: '/passportUser/logout'
    })
  }
}