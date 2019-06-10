// components/typepicker.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: {type: Array, value: [] }, 
    show: {type: Boolean, value: false},
    key: { type: String, value: 'default'},
    position: {
      type: String, value: 'top'
    }
  },

  ready: function(){
  },

  /**
   * 组件的初始数据
   */
  data: {
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
      console.log('picker change ', item, 'index', index, 'key', this.data.key)
      this.triggerEvent('change', {item: item, index: index, key: this.data.key})
      this.onClose()
    },
  }
})
