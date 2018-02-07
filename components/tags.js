// components/tags.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: { type: Array, value: [] },
    right: {type: Boolean, value: false}
  },

  attached: function(){
    console.log('this.data, ', this.data)
    var safeItems =  this.data.items.slice(0, 2)
    this.setData({safeItems: safeItems})
  },

  /**
   * 组件的初始数据
   */
  data: {
    safeItems: null,

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
