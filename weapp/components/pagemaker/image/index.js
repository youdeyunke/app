/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// components/pagemaker/banners/index.js
const link = require("../link")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    config: {
      type: Object,
      default: null
    }

  },



  observers: {

    "config.blocks": function (blocks) {
      var val = blocks.map((block, index) => {
        block.width = block.width + 'rpx'
        block.height = block.height + 'rpx'
        block.left = block.left + 'rpx'
        block.top = block.top + 'rpx'
        block.index = index + 1
        return block
      })
      this.setData({
        blocks: val
      })
    },

    "config.height": function (v) {
      // 图片的高度值
      if (!v || !v.value) {
        return false
      }

      if (v.value == 'auto') {
        return false
      }
      var value = v.value
      this.setData({
        heightValue: value + 'rpx'
      })
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

    linkHandle: function (e) {
      var index = e.currentTarget.dataset.index
      var block = this.data.blocks[index]
      link.clickHandle(block.link)
    }

  }
})