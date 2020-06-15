// pages/login/login.js
const services = require('../../services/services')
const { vaiPhone } = require('../../utils/common')
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    pass: '',
    vaiCode: '',
    noSendCode: true,
    friClick: false,
    SurTime: 60,
    loginMethod: 0, // 0 --> 帐号密码  1---> 验证码
    passType: 1, // 0 ---> 密码 1 ---> 明文
  },
  changeMethod (e) {
    const key = e.currentTarget.id
    const value = [1, 0][this.data[key]]
    console.log(key,value)
    this.setData({ [key]: value })
    if (key === 'loginMethod') {
      this.setData({
        pass: '',
        vaiCode: ''
      })
    }
  },
  bindName (e) {
    if (/\s/g.test(e.detail.value)) {
      Toast('空格符不是有效字符')
    }
    this.setData({
      [e.target.id]: e.detail.value.replace(/\s/g, '')
    })
  },
  clearValue (e) {
    const key = e.currentTarget.id
    this.setData({ [key]: '' })
  },
  login () {
    if (!vaiPhone(this.data.phone)) {
      Toast('请输入正确电话')
      return
    }
    const type = this.data.loginMethod
    let data = {
      mobile: this.data.phone
    }
    data[['password', 'verCode'][type]] = this.data[['pass', 'vaiCode'][type]]
    let method = ['userPassLogin', 'userVercodeLogin'][type]
    services[method](data).then(res => {
      if (res.code.slice(1) > 200) {
        Toast(res.msg)
        return
      }
      services.getUserInfo().then(res => {
        if (res.code === 'B200') {
          wx.switchTab({ url: '/pages/goods/goods' })
        }
      }).catch(err => {
        wx.redirectTo({ url: `/pages/login/login` })
      })
    }).catch(err => {
      Toast(err)
    })
  },
  getVaiCode () {
    if (!vaiPhone(this.data.phone)) {
      Toast('请输入正确电话')
      return
    }
    const data = {
      mobile: this.data.phone,
      operationType: 4
    }
    services.getCode(data).then(res => {
      if (res.code.slice(1) > 200) {
        Toast(res.msg)
        return
      }
      app.globalData.useInfo = {
        mobile: this.data.phone
      }
      this.setData({
        noSendCode: false,
        friClick: true
      })
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        const SurTime = --this.data.SurTime
        SurTime ? this.setData({ SurTime }) : clearInterval(this.timer)
        !SurTime && this.setData({ noSendCode: true })
      }, 1000)
    }).catch(err => {
      Toast(err.msg)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})