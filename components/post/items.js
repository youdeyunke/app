// components/sub-district/items.js
const app = getApp();
import Notify from '../../vant/notify/notify.js';


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showTotalCount: {type: Boolean, value: false},
    filter: {
      type: Object, value: {}, observer: "filterChange"
    },
    page: {
      type: Number, value: 1, observer: "pageChange"
    },
    kw: {
      type: String, value: '', observer: "kwChange"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    query: {},
    loading: true,
  },

  ready: function(){

  },

  /**
   * 组件的方法列表
   */
  methods: {

    pageChange: function(){
      // 如果已经到底，则不能翻页
      if (this.data.meta.total_pages == this.data.meta.current_page) {
        return false
      }      

      console.log('page change')
      var query = this.data.filter
      query.kw = this.data.kw
      query.page = this.data.page
      this.setData({query: query})
      this.loadData()
    },

    filterChange: function(){
      console.log('filter change')
      var query = this.data.filter || {}
      if(Object.keys(query).length == 0){
        return false;
      }

      query.page = 1
      query.kw = this.data.kw
      this.setData({query: query})
      this.loadData()
    },

    kwChange: function(){
      console.log('kw change')
      var query = {}
      query.page = 1
      query.kw = this.data.kw
      this.setData({query: query})
      this.loadData()
    },

    loadData: function () {
      var _this = this
      var query = this.data.query
      console.log('load data with query', query)

      if (!query) {
        return false
      }

      _this.setData({loading: true})
      var query = this.data.query
      app.request({
        url: '/api/v2/posts/',
        hideLoading: true,
        data: query,
        complete: function (r) {
          _this.setData({loading: false})
        },
        success: function (resp) {
          var meta = resp.data.meta
          var p = _this.data.query.page || 1
          var i = p - 1
          var data = { meta: meta}
          if (p > 1) {
            var key = 'items[' + i + ']'
            data[key] = resp.data.data
          } else {
            data['items'] = [resp.data.data]
          }
          _this.setData(data)

          if(_this.data.showTotalCount > 0 && _this.data.query.page == 1  && meta.total_entries > 0 ){
            var notifyText = '找到' + meta.total_entries + '套房源'
            Notify({
              text: notifyText,
              duration: 1000,
              selector: '#van-notify',
              backgroundColor: '#1989fa'
            });
            console.log(notifyText);
          }

          for (var i = 0; i <= resp.data.data.length - 1; i++) {
            var post = resp.data.data[i]
            wx.setStorage({
              key: 'post.' + post.id,
              data: post,
            })
          }          
        }
      })
    }
  }
})
