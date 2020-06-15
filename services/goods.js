const { get, post } = require('../utils/request')

module.exports = {
  /* 查询banner图以及商品分类 */
  getGoodsList() {
    return get({
      url: '/goods/index'
    })
  },
  /**
   * 查询指定分类下的商品集合
   * @param {number | string} category
   */
  getGoodsCategory(category, page = 1, size = 20) {
    return get({
      url: '/goods/items',
      data: { category, page, size }
    })
  },
  /**
   * 查询指定商品详情
   * @param {number | string} itemId 
   */
  getGoodsDetail(itemId) {
    return get({
      url: '/goods/detail',
      data: { itemId }
    })
  },
  addGoodstoCar (data) {
    return post({
      url: '/order/addCart',
      data
    })
  }
}
