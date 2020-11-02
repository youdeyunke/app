// components/range-input/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      value: {type: String, value: "" },
      unit: { type: String, value: ''},
  },



    observers: {
        value: function(value){
      var res = value.split(',')
      console.log('res is', res)
      this.setData({
          leftValue: res[0],
          rightValue: res[1],
      })
        },
    },

  /**
   * 组件的初始数据
   */
  data: {
      leftValue: null, 
      rightValue: null,

  },

  /**
   * 组件的方法列表
   */
  methods: {
      inputHandle: function(e){
          // 输入后，更新value
          console.log('e', e)
          var v = e.detail
          const { key } = e.currentTarget.dataset
          // update data 
          var  data = {} 
          data[key] = v 
          this.setData(data)

          // sync value
          var value = this.data.leftValue + ',' + this.data.rightValue
          this.setData({value: value})
        },

  }
})
