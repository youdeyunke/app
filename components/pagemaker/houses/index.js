const app = getApp()
const houseApi= require("../../../api/house")
// components/pagemaker/posts/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    config: {
      type: Object,
      default: null
    }
  },

  ready() {
    //console.log('posts.module.config is', this.data.config)
    this.loadPosts()
  },

  /**
   * 组件的初始数据
   */
  data: {
    morelink: {},
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


    filterOpen: function (e) {
      this.triggerEvent('filteropen', {})
      console.log('filter open 222')
    },

    filterClose: function () {
      this.triggerEvent('filterclose', {})
      console.log('filter close 2222')
    },

    filterChange: function (e) {
      var changes = []
      var q = e.detail

      if (q instanceof Array) {
        changes = q
      } else {
        changes = [q]
      }

      var query = this.data.query
      query.page = 1

      changes.forEach((cq) => {
        query[cq.key] = cq.value
        if (cq.value == 0 || cq.value == '' || cq.value == null || !cq.value) {
          delete query[cq.key]
        }
      })
      this.setData({
        query: query,
        page: 1,
        items: []
      }, () => {
        this.loadPosts()
      })
    },

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
      var ids = this.data.config.ids || []
      var albumId = this.data.config.albumId || 0
      var tagIds = this.data.config.tagIds || []
      var f = this.data.config.dataFrom || 'ids'
      var query = this.data.query
      query.page = this.data.page
      query.per_page = this.data.perPage

      if (f == 'ids') {
        query.ids = ids.join(',')
      }

      if (f == 'albumId') {
        query.album_id = albumId
      }

      if (f == 'tagIds') {
        query.tag_ids = tagIds.join(',')
      }
      var cc = wx.getStorageSync('cityCode') || ''
      if (cc) {
        query.cityCode = cc
      }
    //   √
      houseApi.getHouseList(query).then((resp)=>{
        _this.setData({loading: false })
        var res = resp.data.data.list
        var filters = resp.data.filters
        var config = _this.data.config
        // TODO setData items
        res = res.sort((p1, p2) => {
          var index1 = config.ids.findIndex((v) => v === p1.id)
          var index2 = config.ids.findIndex((v) => v === p2.id)
          return index1 - index2
        })

        var items = _this.data.items 
        if(res.length > 0){
          items = items.concat(res)
          _this.setData({items: items })
        }

        _this.setData({
          end: resp.data.end, 
        })

        if (!_this.data.filters) {
          _this.setData({
            filters: filters,
          })
        }
      })
    },
  },

  observers: {
    "config.ids": function (v) {
      return
      if(v){
        this.loadPosts()
      }
    }
  }
})