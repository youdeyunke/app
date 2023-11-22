// pkgCustomer/components/follow/index.js
const followApi = require("../../../api/follow")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    target_id: {type:Number, value: null},
    target_type: {type:String, value: 'thread'}
  },

  /**
   * 组件的初始数据
   */
  data: {
    followList:[]
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
    loadFollow(threadid){
      var _this = this
      var data = {
        target_id: _this.data.target_id,
        target_type: _this.data.target_type
      }
      followApi.getCustomerFollows(data).then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        this.setData({
          followList: resp.data.data
        })
      })
    },
  }
})
