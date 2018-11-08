// components/need-house.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {type: Object, value: null},
    redirect: {type: Boolean, value: false},
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
      if(this.data.redirect){
        var url = '/pages/need/room-show?id=' + this.data.item.id
        wx.navigateTo({
          url: url
        })
      }
    },
  }
})
