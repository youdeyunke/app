// components/price-filter.js
let ranges = [
  {name: '不限', value: []},
  {name: '0元-1000元', value:[0,1000]}
]
for(var i=1000;i<=3500;i+=500){
  var j = i+ 500
  ranges.push({
    name: i+'元 - ' + j + '元',
    value: [i, j], 
  })
}
ranges.push({
  name: '4000元以上',
  value: [4000, 9999999],  
})

console.log('ranges', ranges)

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    key: {
      type: String, value: 'rent_price'
    },
    show: {
      type: Boolean, value: true,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ranges: ranges,
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancle: function(e){
      this.setData({
        currentIndex: 0,
      })
    },

    onConfirm: function(e){
      var i = this.data.currentIndex
      var r = this.data.ranges[i]
      this.triggerEvent('change', {rent_price: r})
    },

    onSelect: function(e){
      console.log('e', e)
      var i = e.currentTarget.dataset.index
      if(i != this.data.currentIndex ){
        this.setData({currentIndex: i})
      }
    },
  }
})
