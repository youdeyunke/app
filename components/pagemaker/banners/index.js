// components/pagemaker/banners/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: { type: Object, default: null }

    },



    observers: {
        "config.imageRadius": function (v) {
            console.log('config radius', v)
            if (!v) {
                return
            }
            if (v.cat == 'off') {
                return
            }
            var rpx = v.value * 2 + 'rpx'
            this.setData({ imageRadius: rpx })

        },

        "config.height": function(h){
            // 图片的高度值
            var rpx = h.value * 2 + 'rpx'
            this.setData({heightValue: rpx})
        },

        "config.radius": function(v){
            // 是否开启图片圆角效果
            if(v == 'on'){
                this.setData({borderRadiusValue: '16rpx'})
            }
        },

        "config.widthSize": function(w){
            // 根据不同的宽度，设置具体的值
            var v = 710 // full 
            if(w == 'full'){
                v = 750
            }
            if(w == 'small'){
                v = 710
            }
            this.setData({widthValue: v + 'rpx'})
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
