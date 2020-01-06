// pages/post/html-block.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      block: {type: Object, default: {}}

  },

  /**
   * 组件的初始数据
   */
  data: {
      minicontent: true,

  },

  /**
   * 组件的方法列表
   */
  methods: {
      contentHandle: function(e){
        this.setData({
          minicontent: ! this.data.minicontent 
        })
      },
  }
})
