// pkgCustomer/components/follow/index.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    createFollow(){
      var id = ''
      var type = ''
      var url = "/pkgCustomer/pages/createFollow/index?target_type=" + type + "&target_id=" + id
      wx.navigateTo({
        url: url,
      })
    },
  }
})
