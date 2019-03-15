// components/filter.js

const app = getApp()

let rentPriceRanges = [
  {label: '不限', value: []},
  {label: '1000元一下', value:[0,1000]}
]

let totalPriceRanges = [
  {label: '不限', value: []},
  {label: '30万以内', value:[0,30]},
  {label: '30-50万', value:[30,50]},
  {label: '50-100万', value:[50,100]},
  {label: '100-150万', value:[100,150]},
  {label: '150-200万', value:[150,200]},
  {label: '200万-250万', value:[200,250]},
  {label: '250万-300万', value:[250,300]},
  {label: '300万以上', value:[300,999999]},
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

var orderItems1 =  [
      {label: '默认排序', value: ['refresh_at', 'desc']},
      {label: '价格(从低到高)', value: ['rent_price', 'asc'] },
      {label: '价格(从高到低)', value: ['rent_price', 'desc']},
      {label: '面积(从大到小)', value: ['area', 'desc']},
      {label: '面积(从小到大)', value: ['area', 'asc'] },      
    ]

var orderItems2 =  [
      {label: '默认排序', value: ['refresh_at', 'desc']},
      {label: '均价(从低到高)', value: ['average_price', 'asc'] },
      {label: '均价(从高到低)', value: ['average_price', 'desc']},
      {label: '总价(从低到高)', value: ['total_price', 'asc'] },
      {label: '总价(从高到低)', value: ['total_price', 'desc']},
      {label: '面积(从大到小)', value: ['construction_area', 'desc']},
      {label: '面积(从小到大)', value: ['construction_area', 'asc'] },      
    ]


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
      {label: '默认排序', value: ['refresh_at', 'desc']},
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
      this.setData({priceItems: rentPriceRanges, orderItems: orderItems1})
    }
    if(this.data.group == 'ershoufang' || this.data.group == 'xinfang'){
      this.setData({priceItems: totalPriceRanges, orderItems: orderItems2})
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
        order: e.detail.item.value.join(' '),
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
