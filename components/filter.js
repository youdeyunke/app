// components/filter.js

const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    group: {type: String, value: ''}
  },

  /**
   * 组件的初始数据
   */
  data: {
    city: {},
    showPriceFilter: false,
    priceRange: null,
    district:{},
    showCitySelect: false,
  },

  ready: function(){
    this.setData({
      cities: app.globalData.cities
    })
  
  },

  /**
   * 组件的方法列表
   */
  methods: {

    orderClick: function(e){
      this.setData({
        showOrder: true
      })
    },

    orderChange: function(e){
      console.log('e.detail', e)
      this.setData({
        order: e.detail.order.value.join(','),
        showOrder: false,
      })
      this.onChange()
    },

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
      if (this.data.priceRange){
        console.log('this.data.priceRange.value', this.data.priceRange.value)
        filter['rent_price'] = this.data.priceRange.value.join(',')
      }
      console.log('filter.onchange ', filter)
      var order = this.data.order
      this.triggerEvent('change', {filter: filter, order: order}, {})
      
    },

    priceChange: function(e){
      console.log('e', e)
      this.setData({
        showPriceFilter:false,
        priceRange: e.detail.rent_price
      })
      this.onChange()
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

    priceFilterClick: function(e){
      var v = this.data.showPriceFilter
      this.setData({
        showPriceFilter: !v
      })
    },

    cityFilterClick: function(e){
      var v = this.data.showCitySelect
      this.setData({
        showCitySelect: !v
      })
    },

  }
})
