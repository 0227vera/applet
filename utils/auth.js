const TOKEN = 'TOKEN'
const INFO = 'USER_INFO'

const Auth = {
  setToken(val) {
    wx.setStorageSync(TOKEN, val)
  },
  getToken() {
    return wx.getStorageSync(TOKEN)
  },
  setInfo(val) {
    wx.setStorageSync(INFO, val)
  },
  getInfo(type) {
    let userInfo = wx.getStorageSync(INFO)
    if (type && userInfo) {
      return userInfo[type]
    }
    return userInfo
  },
  remove() {
    wx.removeStorageSync(TOKEN)
    wx.removeStorageSync(INFO)
  },
  isLogin() {
    return !!this.getToken()
  },
  checkLogin() {
    if (!this.isLogin()) {
      wx.redirectTo({ url: '/pages/login/login' })
      return false
    } else {
      return true
    }
  }
}

module.exports =  Auth
