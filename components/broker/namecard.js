// components/broker/namecard.js
const app = getApp()


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo: {type: Object, value: {}},
    isLink: {type: Boolean, value: false}
  },

  /**
   * 组件的初始数据
   */
  data: {
    visitors: [],
    visitorsMeta: {total: 0},
  },

  ready: function () { 
      this.loadVisitors()
   },

  /**
   * 组件的方法列表
   */
  methods: {

    loadVisitors: function () {
        var _this = this
        app.request({
            url: '/api/v1/visitors/',
            data: {
                target_id: _this.data.userInfo.id,
                target_type: 'user',
                per_page: 5,
            },
            success: function (resp) { 

                _this.setData({
                    visitors: resp.data.data,
                    visitorsMeta: resp.data.meta
                })
            }
        })
    },


    gotoUser: function(){
      if(!this.data.isLink){
        return false;
      }
      var path = 'pages/user/user?id=' + this.data.userInfo.id
      wx.navigateTo({url: path})
    },

    showAvatar: function(){
        var _this =this
        wx.previewImage({
            current: _this.data.userInfo.avatar,
            urls: [_this.data.userInfo.avatar],
            success: (result) => {
                
            },
            fail: () => {},
            complete: () => {}
        });
          
    },

  }
})
