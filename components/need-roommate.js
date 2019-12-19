// components/need-roommate.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mode : {
      type: String, value: 'index',
    },
    item : {
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

    itemClick: function(e){
      if(this.data.mode != 'index'){
        return false
      }

      var url = '/pages/need/roommate-show?id=' + this.data.item.id
      wx.navigateTo({
        url: url,
      })
    },

  }
})
