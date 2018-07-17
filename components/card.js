// components/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {type: String, value: 'CARD标题'},
    number: {type: Number, value: 0,},
    action: { type: String, value: '查看更多'},
    path: { type: String, value: null},
    opentype: {type: String, value: 'redirectTo'}
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

    actionHandle: function(e){
      if(!this.data.path){
        return false
      }
      var _this = this
      wx.navigateTo({
        url: _this.data.path,
      })
    },

  }
})
