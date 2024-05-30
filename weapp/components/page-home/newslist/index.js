/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
// components/pagemaker/newslist/index.js
const app = getApp()
const newsApi = require("../../../api/news")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    page: 1,
    newsItems: [],
    newCatActive: 0,
    newsCats: [],
    kw: '',
  },

  ready() {
    var color = app.globalData.color
    this.setData({
      primaryColor: color.primary || '#9e1d1d',
    })
    this.loadNewsCats()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadNewsCats: function () {
      var _this = this
      newsApi.getNewsCatList().then((resp) => {
        if (resp.data.status == 0) {
          var newcat = {
            id: 0,
            name: '全部'
          }
          var cats = resp.data.data
          cats.unshift(newcat)
          _this.setData({
            newsCats: cats,
          }, () => {
            _this.loadNews()
          })
        }
      })
    },
    loadNews: function () {
      //楼盘资讯
      var _this = this
      var query = {
        page: this.data.page,
        // is_top: false,
        per_page: 10,
        kw: this.data.kw,
      }

      if (this.data.newCatActive) {
        query.cat_id = this.data.newsCats[this.data.newCatActive].id
      }
      newsApi.getNewsList(query).then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        if (this.data.page == 1) {
          _this.setData({
            newsItems: resp.data.data
          })
        } else if (this.data.page > 1) {
          var oldData = _this.data.newsItems
          var newData = resp.data.data
          var Data = oldData.concat(newData)
          _this.setData({
            newsItems: Data
          })
        }
      })
    },
    loadMore: function () {

      var _this = this
      this.setData({
        page: _this.data.page + 1
      }, () => {
        _this.loadNews()
      })
    },
    catHandle(e) {
      var i = e.currentTarget.dataset.i
      console.log(i, e);
      var _this = this
      this.setData({
        newCatActive: i,
        page: 1,
        newsItems: [],
      }, () => {
        _this.loadNews()
      })
    },
  }
})