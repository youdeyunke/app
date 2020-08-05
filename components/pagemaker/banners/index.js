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
    },


    /**
     * 组件的初始数据
     */
    data: {
        imageRadius: 'none'

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
