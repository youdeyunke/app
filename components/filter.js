// components/filter.js

const app = getApp()

let rentPriceRanges = [
  {label: '不限', value: []},
  {label: '1000元一下', value:[0,1000]}
]

let totalPriceRanges = [
  {label: '不限', value: []},
  {label: '0-50万', value:[0,50]}
]

for(var i=1000;i<=3500;i+=500){
  var j = i+ 500
  rentPriceRanges.push({
    label: i+'元 - ' + j + '元',
    value: [i, j], 
  })
}
rentPriceRanges.push({
  label: '4000元以上',
  value: [4000, 9999999],  
})


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    group: {type: String, value: ''},
    text: {type: String, value: ''}
  },

  /**
   * 组件的初始数据
   */
  data: {
    city: {},
    priceRange: null,
    s:  null,
    district:{},
    showCitySelect: false,
    priceItems: [],
    orderItems: [
      {label: '最新发布', value: ['id', 'desc']},
      {label: '价格(从低到高)', value: ['rent_price', 'asc'] },
      {label: '价格(从高到低)', value: ['rent_price', 'desc']},
      {label: '面积(从大到小)', value: ['area', 'desc']},
      {label: '面积(从小到大)', value: ['area', 'asc'] },      
    ],

    typeItems: [
      {label: '不限', value: ''},
      {label: '一室', value: 1},
      {label: '两室', value: 2 },
      {label: '三室', value: 3 },
      {label: '四室', value: 4 },
      {label: '五室及以上', value: 5 },    
    ]
  },

  ready: function(){
    this.setData({
      cities: app.globalData.cities
    })
    if(this.data.group == 'zufang'){
      this.setData({priceItems: rentPriceRanges})
    }
    if(this.data.group == 'ershoufang'){
      this.setData({priceItems: totalPriceRanges})
    }
  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    typeChange: function(e){
      this.setData({
        s: e.detail.item,
      })
      this.onChange()
    },

    clearHandle: function(e){
      this.triggerEvent('clear', {}, {})
    },

    orderClick: function(e){
      this.selectComponent('#order').onShow()
    },

    typeFilterClick: function(e){
      this.selectComponent('#type-filter').onShow()
    },

    orderChange: function(e){
      this.setData({
        order: e.detail.item.value.join(','),
      })
      this.onChange()
    },

    onChange: function(){
      // 过滤器选项改变
      var c = this.data.city
      var d = this.data.district
      var s = this.data.s
      var filter = {}
      if(s && s.value){
        filter['s'] = s.value
      }
      if(c && c.id){
        filter['city_id'] = c.id
      }
      if(d && d.id){
        filter['district_id'] = d.id
      }
      if (this.data.priceRange){
        var v = this.data.priceRange.value.join(',')
        var k = this.data.group == 'zufang' ?  'rent_price'  : 'total_price'
        filter[k] = v
      }
      var order = this.data.order
      this.triggerEvent('change', {filter: filter, order: order}, {})
      
    },

    priceChange: function(e){
      this.setData({
        priceRange: e.detail.item
      })
      this.onChange()
    },

    cityChange: function(e){
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
      this.selectComponent('#price-filter').onShow()
    },

    cityFilterClick: function(e){
      var v = this.data.showCitySelect
      this.setData({
        showCitySelect: !v
      })
    },

  }
})
