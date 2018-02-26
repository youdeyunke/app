// components/topbar.js
const app = getApp()

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
    cityList: [],
  },

  ready: function(){
    var _this = this
    app.loadCities(function(data){
      console.log('load cities', data)
      _this.setData({cityList:data })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cityChangeHandle: function(e){
      var i = e.detail.value
      var city = this.data.cityList[i]
      this.setData({ selectedCity: i})

      this.triggerEvent('citychanged', {city: city})
    },

  }
})
