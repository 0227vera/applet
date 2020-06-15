// pages/goods/goods.wxml.js
const services = require('../../services/services')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    bannerList: [],
    tabList: [],
    active: 1,
    goodsList: [],
    evenGoods: [],
    oddGoods: [],
    page: 1,
    freeGoodsList: [],
    type: '',
    name: '',
    phone: '',
    employeeId: '',
    time: ''
  },
  
  onChange(event) {
    wx.showLoading({
      title: '加载中',
    })
    this.getGoodsCategory(event.detail.name, 1)
    this.setData({ active: event.detail.name })
    app.globalData.goods = { active: event.detail.name }
  },

  getActiveGoodsType() {
    const { goods } = app.globalData
    if (goods && goods.active) {
      this.setData({ active: goods.active })
    }
  },

  spliceGoodsList() {
    const goodsList = this.data.goodsList
    const evenGoods = goodsList.filter((item, index) => index%2 === 0)
    const oddGoods = goodsList.filter((item, index) => index%2 !== 0)
    this.setData({
      evenGoods,
      oddGoods
    })
  },
  
  /* 查询指定分类下的商品集合 */
  getGoodsCategory(id, page = 1) {
    services.getGoodsCategory(id, page).then(res => {
      const goodsList = res.data
      this.setData({
        goodsList,
        page
      }, () => {
        this.spliceGoodsList()
        wx.hideLoading()
        wx.stopPullDownRefresh()
        this.setData({ loading: false })
      })
    })
  },

  /* 查询banner图以及商品分类 */
  getGoodsList() {
    wx.showLoading()
    services.getGoodsList().then(res => {
      const { goods } = app.globalData
      const { urlMember, bannerList, categoryList, saleFreeItemList: freeGoodsList } = res.data
      this.setData({
        bannerList,
        tabList: categoryList,
        freeGoodsList,
        active: (goods && goods.active) || categoryList[0].id
      })
      app.globalData.externalUrl = { urlMember }
      this.getGoodsCategory(this.data.active)
    })
  },

  // 加载更多
  loadMoreGoods(id, page = 1) {
    services.getGoodsCategory(id, page).then(res => {
      const goodsList = this.data.goodsList.concat(res.data)
      this.setData({
        goodsList,
        page
      }, () => {
        this.spliceGoodsList()
        wx.hideLoading()
      })
    })
  },
  
  onClickBanner(e) {
    const { bannerurl: bannerUrl, goodsid: goodsId } = e.currentTarget.dataset
    if (bannerUrl) {
      app.globalData.externalUrl = Object.assign({ bannerUrl })
      wx.navigateTo({
        url: '/pages/banner/banner'
      })
      return
    }
    wx.navigateTo({
      url: `/pages/goods-detail/goods-detail?goodsId=${goodsId}`
    })
  },

  toGoodsDetail(e) {
    const goodsId = e.currentTarget.dataset.id
    console.log(e, '==========')
    wx.navigateTo({
      url: `/pages/goods-detail/goods-detail?goodsId=${goodsId}`
    })
  },

  getUserInfo() {
    services.getUserInfo().then(res => {
      const { realName, mobile, vipLevel, vipDate, employeeId } = res.data
      this.setData({
        name: realName || this.data.name,
        phone: mobile,
        employeeId,
        type: Number(vipLevel) === 2 ? 1 : 0,    // vipLevel普通会员 1 vip会员 2
        time: Number(vipLevel) === 2 && vipDate
      })
    })
  },

  toPoster() {
    wx.navigateTo({
      url: '/pages/poster/poster'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsList()
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
    this.getActiveGoodsType()
    this.getUserInfo()
    // this.getGoodsList()
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
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({ title: '加载中...' })
    let page = (this.data.page) + 1
    this.loadMoreGoods(this.data.active, page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})