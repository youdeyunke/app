// components/pagemaker/banners/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      config: { type: Object, default: null }

  },



  observers: {

      "config.height": function(v){
          // 图片的高度值
  
          if(v && v.value != 'auto'){
            value = v.value * 2
            this.setData({heightValue: value + 'rpx'})
            return
          }
       
          this.setData({heightValue: 'auto'})
      },

      "config.radius": function(v){
          // 是否开启图片圆角效果
          var value = v ?  v.value * 2 + 'rpx' : '0rpx'
          this.setData({borderRadiusValue: value}) 
      },

      "config.width": function(v){
          // 根据不同的宽度，设置具体的值
          var value = v ?  v.value * 2 + 'rpx' : '710rpx'
          this.setData({widthValue: value})
          console.log('计算图片宽度指', value)
      }
  },


  /**
   * 组件的初始数据
   */
  data: {
      imageRadius: 'none', 
      widthValue: '710rpx',
      heightValue: 'auto',
      borderRadiusValue: '0'

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
