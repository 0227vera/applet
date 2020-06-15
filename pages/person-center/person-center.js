// pages/login/login.js
const services = require('../../services/services')
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1, // 0大众，1黄金
    name: '未设置昵称',
    phone: '13899930502',
    avatar: '',
    time: '2020-04-06',
    item: [
      {
        name: '待付款',
        index: 1,
        idx: 'a'
      },
      {
        name: '待收货',
        index: 2,
        idx: 'aa'
      },
      {
        name: '已完成',
        index: 3,
        idx: 'aaa'
      },
      {
        name: '退货',
        index: 4,
        idx: 'aaaa'
      }
    ],
    list: [
      // {
      //   title: '悟空互助',
      //   index: 1,
      //   idx: 'b',
      //   url: '/pages/wukong/wukong'
      // },
      {
        title: '我的卷码',
        index: 2,
        idx: 'bb',
        url: '/pages/coupon/coupon'
      },
      {
        title: '收货地址',
        index: 3,
        idx: 'bbb',
        url: '/pages/address/address'
      },
      {
        title: '修改密码',
        index: 4,
        idx: 'bbbb',
        url: '/pages/password/password?type=2'
      },
      {
        title: '关于我们',
        index: 5,
        idx: 'bbbbb',
        url: '/pages/about/about'
      }
    ]
  },
  gotoMember () {
    wx.navigateTo({
      url: '/pages/member-center/member-center?type=' + this.data.type
    })
  },
  gotoMoney () {
    // 只有是会员的时候才可能有这个按钮
    wx.navigateTo({
      url: '/pages/neworgoto-member/neworgoto-member'
    })
  },
  getUserInfo() {
    services.getUserInfo().then(res => {
      const { realName, mobile, avatarUrl, vipLevel, vipDate, urlAboutMe, urlWuKong, urlCouponView } = res.data
      this.setData({
        name: realName || this.data.name,
        phone: mobile,
        avatar: avatarUrl,
        type: Number(vipLevel) === 2 ? 1 : 0,
        time: Number(vipLevel) === 2 && vipDate
      })
      app.globalData.externalUrl = {
        urlAboutMe,
        urlWuKong,
        urlCouponView
      }
    })
  },

  chooseOrder(e) {
    const { type } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/order/order?type=${type}`
    })
  },

  logout() {
    Dialog.confirm({
      title: '提示',
      message: '确定退出登录吗？'
    }).then(() => {
      wx.showLoading({
        title: '退出登录...'
      })
      services.logout().then(res => {
        if (res.code === 'B200') {
          wx.clearStorageSync()
          wx.hideLoading()
          wx.navigateTo({
            url: '/pages/login/login'
          })
        } else {
          wx.showToast({title: res.msg, icon: 'none'})
        }
      })
    }).catch(() => {})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
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
    this.getUserInfo()
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