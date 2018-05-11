// components/range_slider.js
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

    minValue: 0,
    maxValue: 1000,
    value1: 100,
    value2: 500,
    currentValueText: '100万-500万',
 
  },

  /**
   * 组件的方法列表
   */
  methods: {

    getCurrentValueText: function(v1, v2){
      var res = this.ensureValueOrder(v1, v2)
      v1 = res[0]
      v2 = res[1]
      console.log('return ensure v1', v1, 'v2', v2)

      var text = ''
      if(v1 == 0){
        text += '0'
      }else{
        text += v1 + '万'
      }

      text += '-'

      if(v2 == 1000){
        text += '1000万以上'
      }else{
        text += v2 + '万'
      }
      return text
    },

    ensureValueOrder: function(v1, v2){
      if (v1 > v2) {
        // 交换大小
        var s = v1
        v1 = v2
        v2 = s
      }
      console.log('ensure v1', v1, 'v2', v2)
      return [v1, v2]
    },

    sliderChange: function(e){
      console.log('v1,', this.data.value1, 'v2', this.data.value2)
      this.triggerEvent('change', {}, {})
    },

    sliderChangeing: function(e){
      console.log('change', e)
      var v = e.detail.value
      var n = e.target.dataset.name
      if(n == 'slider1'){
        var v1 = v 
        var v2 = this.data.value2

      }else{
        var v2 = v 
        var v1 = this.data.value1
      }
      var currentValueText = this.getCurrentValueText(v1, v2)

      var data = {value1: v1, value2: v2, currentValueText: currentValueText}
      console.log('currentValueText', currentValueText)
      this.setData(data)
    }
  }
})
