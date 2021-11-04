// pkgZhuli/pages/zhuli/thanks/index.js
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
    show: false, 

  },

  /**
   * 组件的方法列表
   */
  methods: {

    openDialog: function(){
      this.setData({show: true })
    },

    onClose: function(){
      this.setData({show: false })
    },

  }
})
