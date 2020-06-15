var $auth = require('./auth.js')

function get ({ url, data, header } = {}) {
  return all({ url, data, header, method: 'GET' })
}

function post ({ url, data, header, notToLogin } = {}) {
  return all({ url, data, header, method: 'POST', notToLogin })
}

function all (opt) {
  let wholeUrl = `${config.domain}${opt.url}`
  let authHeader = opt.header || { 'content-Type': 'application/x-www-form-urlencoded' } // 'application/json'

  let auth = $auth.getToken()
  if (auth) authHeader['cookie'] = auth

  return new Promise((resolve, reject) => {
    wx.request({
      url: wholeUrl,
      header: authHeader,
      data: opt.data,
      method: opt.method,
      success: res => {
        if (res.statusCode === 200 || res.statusCode === 304) {
          resolve(res.data)
          if (res.cookies && res.cookies.length) {
            // console.log(res.cookies, '---cookies---')
            let str = res.cookies[0].split(';')[0]
            // $auth.setToken(str.split('=')[1])
            $auth.setToken(str)
          }
          if (res.data.resCode === 403 && !opt.notToLogin) {
            $auth.remove()
            wx.redirectTo({ url: `/pages/login/login?tag=unauth` })
          }
          // 身份验证失败
          if (res.data.code === 'B503') {
            // console.log(res, '---res---')
            wx.showLoading({
              title: `${res.data.msg}`,
              icon: 'none'
            })
            $auth.remove()
            wx.redirectTo({ url: `/pages/login/login?tag=unauth` })
            wx.hideLoading()
          }
        } else {
          if (res.statusCode === 401) wx.redirectTo({ url: `/pages/login/login?tag=unauth` })
          reject(res)
        }
      },
      fail: err => reject(err)
    })
  })
}
let config = {
  domain: 'https://mall.fulidd.com', // 生产环境
  // domain: 'http://47.101.154.126:58080', // 服务器信息
  openId: '' // 微信用户标识，小程序支付必传
}

function request (opt) { return all(opt) }
request.get = get
request.post = post
request.config = config

module.exports = request
