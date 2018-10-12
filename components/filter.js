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
    priceRange: [
        [
          '不限', 0, 50, 100,150, 200,250, 300,350, 400, 450,500,550,  600, 650, 700,750, 800,850, 900,950, 1000, 1500, 2000,3000, 4000, 5000
        ],
        [
          '不限', 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1500, 2000, 3000, 4000, 5000
        ]
    ],

    districts: [],
    cities: [],    
    districtIndex: null,
    districtName: null,
    cityIndex: null,
    cityName: null,
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
          var data = [{id: null, name: '不限'}].concat(resp.data.data)

          _this.setData({cities: data})
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
          var data = [{ id: null, name: '不限' }].concat(resp.data.data)          
          _this.setData({districts: data})
        }
      })
    },

    cityHandle:function(e){
      console.log('e', e)   
      var i = e.detail.value
      var v = this.data.cities[i]
      if(i == 0){
        this.setData({
          cityIndex: 0,
          cityName: '',
          districts: [],
        })
        return false
      }
      
      this.setData({
        cityIndex: i,
        cityName: v.name,
        districts: [],
      }) 

      this.loadDistricts(v.id)
    },

    districtHandle: function(e){
      var i = e.detail.value
      var v = this.data.districts[i]
      console.log('i', i, 'v', v)
      this.setData({
        districtIndex: i,
        districtName: v.name,
      })       
    },

  }
})
