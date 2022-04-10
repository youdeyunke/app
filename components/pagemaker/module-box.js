// components/pagemaker/header/module-box.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    config: {
      type: Object,
      default: null
    },
    shadow: {
      type: String, 
      default: 'none',
    },
  },

  observers: {
    "shadow": function(v){
      if(!v){
        return 
      }
      v = v.replaceAll('px', 'rpx')
      v = v.replaceAll(';', '')
      this.setData({shadowValue: v})
    },

    "config.margin.top": function (v) {
      if (v == false) {
        this.setData({
          'marginTopValue': '0rpx'
        })
      }
    },

    "config.margin.bottom": function (v) {
      if (v == false) {
        this.setData({
          'marginBottomValue': '0rpx'
        })
      }
    },
    "config.shadow": function (v) {
      if (v == 'on') {
        this.setData({
          shadowEnable: true
        })

      }

    },


    "config.radius": function (r) {
      if (!r) {
        return
      }
      var val = r.value + 'rpx'
      this.setData({
        radiusValue: val
      })
    },

    "config.background": function (bg) {
      if (!bg) {
        return
      }
      // 设置背景
      var bgColor = '#ffffff'
      var bgImage = 'none'
      var bgWidth = '100%'
      var bgHeight = 'auto'

      switch (bg.cat) {
        case 'none':
          bgColor = 'none'
          bgImage = 'none'
          break;
        case 'default':
          bgColor = bg.default
          bgImage = 'none'
          break;
        case 'custom':
          bgColor = bg.color
          bgImage = "url('" + bg.image + "')"
          // bg size 

          if (bg.width == 'auto' || bg.width == '100%') {
            // 不是像素单位，不需要转换
            bgWidth = bg.width
          } else {
            // 像素单位转为rpx
            bgWidth = parseInt(bg.width) + 'rpx'
          }


          if (bg.height == 'auto' || bg.height == '100%') {
            // 不是像素单位，不需要转换
            bgHeight = bg.height
          } else {
            // 像素单位转为rpx
            bgHeight = parseInt(bg.height) + 'rpx'
          }
          var bgSize = bgWidth + ' ' + bgHeight

          var bgPosition = ''
          var x = bg.positionX || 0
          var y = bg.positionY || 0
          x = parseInt(x)
          y = parseInt(y)
          bgPosition = x + 'rpx ' + y + 'rpx'

          break;
      }

      this.setData({
        bgColor: bgColor,
        bgImage: bgImage,
        bgSize: bgSize,
        bgPosition: bgPosition
      })
    },


  },

  /**
   * 组件的初始数据
   */
  data: {
    bgColor: '',
    bgImage: '',
    height: 'auto',
    bgSize: '100% auto',
    bgPosition: '0 0',
    shadowEnable: false,
    shadowValue: 'none',
    widthSize: '750rpx',
    radiusValue: '2rpx',
    marginTopValue: '16rpx',
    marginBottomValue: '16rpx',
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})