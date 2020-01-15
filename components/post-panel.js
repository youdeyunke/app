// components/post-panel.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object, value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    publicHandle: function(e){
      this.publicUpdate(true)
    },

    unpublicHandle: function(e){
      var _this = this
      wx.showModal({
        title: '操作提示',
        content: '确定要执行下架操作吗',
        success(res) {
          if (res.confirm) {
            _this.publicUpdate(false)
          }
        }
      })

    },

    doRefresh: function(e){
      var _this = this
      var item = this.data.item
      var data = {id: item.id}
      app.request({
        url: '/api/v2/posts/refresh',
        method: 'GET',
        data: data,
        success: function(resp){
          if(resp.data.status == 1){
            return
          }
          wx.showToast({
            icon: 'none',
            title: '刷新成功，房源将优先显示',
          })
        }
      })
    },

    publicUpdate: function(isPublic){
      var id = this.data.item.id
      var data = {id: id, is_public: isPublic ? 'true' : 'false'}
      var item = this.data.item
      var _this = this
      app.request({
        url: '/api/v2/posts/public',
        method: 'GET',
        data: data,
        success: function(resp){
          if(resp.data.status == 1){
            return
          }
          item.public = isPublic
          _this.setData({item: item})
          wx.showToast({
            title: '操作成功',
          })
        }
      })
    },

    comming: function(e){
      wx.showModal({
        title: '温馨提示',
        content: '功能正在完善中，即将发布，敬请期待',
      })
    },
    gotoPost: function(e){
      var id = this.data.item.id
      wx.navigateTo({
        url: '/pages/post/post?id=' + id
      })
    },
    gotoPoster: function(e){
      var id = this.data.item.id
      wx.navigateTo({
        url: '/pkgPoster/pages/post/post?id=' + id
      })
    },

    gotoVisitors: function(e){
      var id = this.data.item.id
      wx.navigateTo({
        url: '/pages/visitors/index?targetType=post&targetId=' + id 
      })
    },

    editHandle: function(e){
      var id = this.data.item.id
      wx.navigateTo({
        url: '/pages/post/form?id=' + id
      })
    },

    viewImage: function (e) {
      var urls = this.data.item.images_list
      wx.previewImage({
        urls: urls,
      })
    },    

  }
})
