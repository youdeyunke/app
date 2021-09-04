// pkgTickets/pages/tickets/item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{type:Object}
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

    gotoDetail: function(){
      if(this.data.item.status != 1){
        return
      }
      var path = '/pkgTickets/pages/tickets/show?id=' + this.data.item.id 
      wx.navigateTo({
        url: path, 
      })
    },

  },
})
