// components/tags.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mini: {type: Boolean, value: false },
    max: {type: Number, value: 2},
    items: { type: Array, value: [] },
  },

  ready: function(){
    var safeItems =  this.data.items.slice(0, this.data.max)
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
