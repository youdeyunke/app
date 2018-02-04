// components/topbar.js
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
    selectedCity: 0,
    cityList: ['上海', '北京', '广州'],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cityChangeHandle: function(e){
      this.setData({ selectedCity: e.detail.value})
    },

  }
})
