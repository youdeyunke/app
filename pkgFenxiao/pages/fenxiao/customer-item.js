// pages/fenxiao/customer-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      dealStatus: {type: Array, value: []},
      item: {type: Object, value: null},
  },

  observers: {
      "item.id": function(val){
      },
      "dealStatus.**": function(val){
          console.log('observers ', val)
          var steps = []
          var _this = this
          for(var i=0;i<=this.data.dealStatus.length-1;i++){
              var item = _this.data.dealStatus[i]
              steps.push({
                  text: item['name'],
              })
          }
          this.setData({
              steps: steps
          })
      },
  },

  /**
   * 组件的初始数据
   */
  data: {
    steps: [],
    isPending: null,
    isPass: null,
    isReject: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }

})
