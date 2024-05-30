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
const app = getApp()
const houseApi= require("../../../api/house")
// components/pagemaker/posts/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // config: {
    //   type: Object,
    //   default: null
    // }
  },

  ready() {
    //console.log('posts.module.config is', this.data.config)
    this.loadPosts()
  },

  /**
   * 组件的初始数据
   */
  data: {
    morelink: {
      cat: 'page',
      opentype: 'navigateTo',
      path: '/pkgErshou/pages/index?business=出售',
      customPath: true,
    },
    items: [],
    query: {},
    page: 1,
    perPage: 10,
    loading: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {

    loadMore: function () {
      var page = this.data.page
      this.setData({
        page: page + 1,
      }, () => {
        this.loadPosts()
      })
    },

    loadPosts: function () {
      this.setData({loading: true})
      var _this = this
      // var ids = this.data.config.items || []
      // // var albumId = this.data.config.data.albumId || 0
      // // var tagIds = this.data.config.tagIds || []
      // var f = this.data.config.data.dataFrom || 'ids'
      // var pagesize = parseInt(this.data.config.data.pageSize)
      // console.log(pagesize);
      
      var query = this.data.query
      // if (pagesize >= 0){
      //   console.log(pagesize,1);
      //   query.per_page = pagesize
      // } else {
      //   console.log(pagesize,2);
        query.per_page = this.data.perPage
      // }

      query.page = this.data.page

      // if (f == 'ids') {
      //   query.ids = ids.join(',')
      // }

      // var cc = wx.getStorageSync('cityCode') || ''
      // if (cc) {
      //   query.cityCode = cc
      // }
    //   √
      houseApi.getHouseList(query).then((resp)=>{
        _this.setData({loading: false })
        var res = resp.data.data.result

        var items = _this.data.items 
        if(res.length > 0){
          items = items.concat(res)
          _this.setData({items: items })
        }

      })
    },
  },

  observers: {

  }
})