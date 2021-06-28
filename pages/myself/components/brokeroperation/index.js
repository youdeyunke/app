// pages/myself/components/brokeroperation/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    broker: {type: Object, value: null}

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
    Goprofile(){
      var userinfo = app.globalData.userInfo.post_id
      if(userinfo != null){
        wx.navigateTo({
          url: '/pkgAdmin/pages/admin/post?id='+userinfo,
        })
      }else{
        wx.showToast({
          title: '您还没有绑定楼盘，请联系系统管理员',
          icon:'none'
        })
      }

    }
  }
})
