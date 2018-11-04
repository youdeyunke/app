// components/typepicker.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: {type: Array, value: [] }, 
  },

  ready: function(){
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    currentIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShow: function(){
      this.setData({show: true})
    },

    onClose: function(){
      this.setData({show: false})
    },

    changeHandle: function(e){
      var val = e.detail.value
      this.setData({currentIndex: val})
    },

    onConfirm: function(e){
      var index = this.data.currentIndex
      var item = this.data.items[index]
      this.triggerEvent('change', {item: item, index: index})
      this.onClose()
    },
  }
})
