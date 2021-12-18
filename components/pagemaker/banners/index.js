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
            var value = v ?  v.value  + 'rpx' : 'auto'
            this.setData({heightValue: value})
        },

        "config.imageWidth": function(v){
            if(!v){ 
                return
            }
            else{
                v = parseInt(v) 
            }
            v = v + 'rpx'
            this.setData({imageWidth: v})
        },
        "config.imageRadius": function(v){
            if(!v){ 
                v = '0'
            }
            else{
                v = parseInt(v) 
            }
            v = v + 'rpx'
            this.setData({imageRadius: v})
        }


    },


    /**
     * 组件的初始数据
     */
    data: {
        widthValue: '710rpx', // 盒子宽度
        heightValue: 'auto',
        imageWidth: '100%',  // 图片宽度
        imageRadius: '0rpx', 

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
