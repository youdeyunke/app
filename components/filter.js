// components/filter.js

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
    current_panel: '',
    districts: [],
    cities: [],
    keys: [
      ['城市', 'city'],
      ['区县', 'district'],
      ['总价', 'total_price'],
      ['户型', 'type'],
    ],

  },

  ready: function(){
    this.loadCities()
  },

  /**
   * 组件的方法列表
   */
  methods: {

    loadCities: function(){
      var _this = this
      app.request({
        url: '/api/v1/cities/',
        data: {},
        hideLoading: true,
        success: function(resp){
          _this.setData({cities: resp.data.data})
          _this.loadDistricts(resp.data.data[0].id)
        }
      })
    },

    loadDistricts: function(cityId){
      var _this = this
      app.request({
        url: '/api/v1/districts/',
        hideLoading: true,
        data: {city_id: cityId},
        success: function(resp){
          _this.setData({districts: resp.data.data})
        }
      })
    },


    districtHandle: function (e) {
      var i = e.currentTarget.dataset.index
      var v = this.data.districts[i]
      var d = {}
      var k = 'keys[1][0]'
      d[k] = v.name
      d.district = v
      d.current_panel = ''
      this.setData(d)
    },

    cityHandle:function(e){
      var i = e.currentTarget.dataset.index  
      var city = this.data.cities[i]
      var d = {}
      var k = 'keys[0][0]'
      d[k] = city.name

      var k = 'keys[1][0]'
      d[k] = '区县'

      d.city = city
      d.district = {}
      d.current_panel = ''
      this.setData(d)
      console.log('d', d)
      this.loadDistricts(city.id)
    
    },

    filterItemHandle: function(e){
      var p = e.currentTarget.dataset.target 
      this.setData({current_panel: p})
    },

  }
})
