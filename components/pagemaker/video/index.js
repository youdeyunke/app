// components/pagemaker/banners/index.js
const link = require("../link")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      config: { type: Object, default: null }

  },



  observers: {

    "config.blocks": function(blocks){
        if(!blocks){
          return
        }
        var val = blocks.map((block,index) => {
            block.width = block.width + 'rpx'
            block.height = block.height + 'rpx'
            block.left = block.left + 'rpx'
            block.top = block.top + 'rpx'
            block.index = index + 1
            return block
        })
        this.setData({blocks: val})
    },

      "config.height": function(v){
          // 图片的高度值
          if(!v || !v.value){
              return false
          }
        
        var  value = v.value
        this.setData({heightValue: value + 'rpx'})
        return
          
      },

  


    
  },


  /**
   * 组件的初始数据
   */
  data: {
      imageRadius: 'none', 
      heightValue: 'auto',
      borderRadiusValue: '0',
      blocks: [],

  },

  /**
   * 组件的方法列表
   */
  methods: {

    linkHandle: function(e){
        var index = e.currentTarget.dataset.index 
        var block = this.data.blocks[index]
        link.clickHandle(block.link)
    }

  }
})
