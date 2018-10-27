// components/city-picker.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean, value: false
    },
    

  },

  /**
   * 组件的初始数据
   */
  data: {
    cities: [],
    cityIndex: 0,
    district: {name: '不限', id:0}
  },

  ready: function(){
    console.log('global cities', app.globalData.cities)
    this.setData({cities: app.globalData.cities})
  },

  /**
   * 组件的方法列表
   */
  methods: {


    onReset: function () {
      this.setData({
        cityIndex: 0,
        district: {id:0, name: '不限'},
      })
    },

    onConfirm: function (e) {
      var cityIndex = this.data.cityIndex
      var c = this.data.cities[cityIndex]
      var city = {id: c.id, name: c.text}
      var district = this.data.district

      this.triggerEvent("change", {
        city: city,
        district: district,
      }, {})
    },

    cityClick: function (e) {
      var i = e.detail.index
      this.setData({
        cityIndex: i,
        district: {name: '不限', id: 0},
      })
    },

    districtClick: function (e) {
      var d = {
        id: e.detail.id,
        name: e.detail.text,
      }
      this.setData({
        district: d
      })
    } 
  }
})
