// components/range_slider.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    min: {type: Number, value: 0},
    max: {type: Number, value: 10000},
    step: {type: Number, value: 100},
    unit: {type: String, value: '元'},
  },

  /**
   * 组件的初始数据
   */
  data: {
    value1: 1000,
    value2: 2000,
    currentValueText: '',
 
  },

  /**
   * 组件的方法列表
   */
  methods: {

    getCurrentValueText: function(v1, v2){
      var res = this.ensureValueOrder(v1, v2)
      var unit = this.data.unit
      v1 = res[0]
      v2 = res[1]
      var text = ''
      if(v1 == 0){
        text += '0'
      }else{
        text += v1 + unit
      }
      text += '-'
      text += v2 + unit
      return text
    },

    ensureValueOrder: function(v1, v2){
      if (v1 > v2) {
        // 交换大小
        var s = v1
        v1 = v2
        v2 = s
      }
      return [v1, v2]
    },

    sliderChange: function(e){
      var _this = this
      var res = this.ensureValueOrder(
        _this.data.value1,
        _this.data.value2
      )
    
      this.triggerEvent('change', {range:res, text: _this.data.currentValueText }, {})
    },

    sliderChangeing: function(e){
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
      this.setData(data)
    }
  }
})
