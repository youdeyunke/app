// components/fav.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pid: {type: Number, value: null},
    showcount: {type: Boolean, value: false},
    showstatus: {type: Boolean, value: false,}
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 0, 
    status: 0,
  },

  ready: function () {
    // 查询状态
    console.log('ready.....', this.data)
    var _this = this
    wx.showToast({
      title: _this.data.pid,
    })
 
    app.request({
      url: '/api/v2/favs/',
      data: { post_id: _this.data.pid },
      success: function (resp) {
        console.log('fuck')
        _this.setData(resp.data.data)
      },
    })
  },



  /**
   * 组件的方法列表
   */
  methods: {

    clickHandle: function(e){
      var pid = this.data.pid
      var _this = this
      app.ensureUser(function(userInfo){
        _this.doSubmit(pid)
      })
    },

    doSubmit: function(pid){
      var _this = this
      app.request({
        url: '/api/v2/favs/',
        method: 'POST',
        data: { post_id: pid },
        success: function (resp) {
          _this.setData(resp.data.data)
        }
      })      
    },

  }

})
