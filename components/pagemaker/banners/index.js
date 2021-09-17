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

        "config.height": function(v){
            // 图片的高度值
            var value = v ?  v.value * 2 + 'rpx' : 'auto'
            this.setData({heightValue: value})
        },



    },


    /**
     * 组件的初始数据
     */
    data: {
        widthValue: '710rpx',
        heightValue: 'auto',


    },

    /**
     * 组件的方法列表
     */
    methods: {
        goto: function(e){
            var index = e.currentTarget.dataset.index 
            var block = this.data.config.items[index]
            link.clickHandle(block.link)
        },
    }
})
