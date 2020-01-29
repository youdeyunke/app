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
  },

  ready: function () { 
   },

  /**
   * 组件的方法列表
   */
  methods: {


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
