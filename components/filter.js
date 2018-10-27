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
    city: {},
    district:{},
    showCitySelect: false,
    priceRange: [
        [
          '不限', 0, 50, 100,150, 200,250, 300,350, 400, 450,500,550,  600, 650, 700,750, 800,850, 900,950, 1000, 1500, 2000,3000, 4000, 5000
        ],
        [
          '不限', 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1500, 2000, 3000, 4000, 5000
        ]
    ],


  },

  ready: function(){
  
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onChange: function(){
      // 过滤器选项改变
      var c = this.data.city
      var d = this.data.district
      var filter = {}
      if(c && c.id){
        filter['city_id'] = c.id
      }
      if(d && d.id){
        filter['district_id'] = d.id
      }

      this.triggerEvent('change', {filter: filter}, {})
      
    },

    cityChange: function(e){
      console.log('city chage', e)
      var c = e.detail.city
      var d = e.detail.district
      var cityDistrictName = ''
      if(c.id){
        cityDistrictName += c.name
      }
      if(d.id){
        cityDistrictName += ' '
        cityDistrictName += d.name
      }
     
      this.setData({
        city: e.detail.city,
        district: e.detail.district,
        showCitySelect: false,
        cityDistrictName: cityDistrictName,
      })

      this.onChange()
    },

    cityFilterClick: function(e){
      var v = this.data.showCitySelect
      this.setData({
        showCitySelect: !v
      })
    },

  }
})
