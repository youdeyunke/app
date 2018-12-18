// components/gyroscope-image.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String, value: '',
    },
    width: {
      type: Number, value: 750,
    },
    height: {
      type: Number, value: 320,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    delta: 200,
    paddingValue: '0 0 0 0',
  },



  /**
   * 组件的方法列表
   */

    methods: {

      logIt: function(x){
        return x * 0.95 - 100;
      },

      safeX: function(x){
        var min = -100
        var max = 100
        x = x < min ? min : x
        x = x > max ? max : x
        return x
      },
    },
  
    ready: function(){
      console.log('gimage ready')
      var _this = this
      wx.onGyroscopeChange(function (res) {
        console.log('监听陀螺仪变化1')

        var x = _this.logIt(res.x)
        var y = _this.logIt(res.y)
        console.log('x', x)
        console.log('y', y)

        x = _this.safeX(x)
        y = _this.safeX(y)
        _this.setData({
          leftValue: y + 'rpx',
          topValue: x + 'rpx',
        })

      })

      wx.startGyroscope({
        interval: 'game',
        success: function (res) {
          console.log('开始监听陀螺仪', res)
        }
      })      
    },

})
