// components/pagemaker/header/module-box.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: { type: Object, default: null },
    },

    observers: {
        "config.height": function (height) {
            if (!height) {
                return
            }
            var h = height.cat == 'default' ? height.default : height.value
            if (h != 'auto' && typeof h == 'number') {
                // conver px to rpx
                h = h * 2 + 'rpx'
            }
            this.setData({ height: h })
        },
        "config.background": function (bg) {
            if (!bg) {
                return
            }
            // 设置背景
            var bgColor = ''
            var bgImage = ''
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
                    break;
            }

            this.setData({ bgColor: bgColor, bgImage: bgImage })
        },
        "config.padding": function (padding) {
            if (!padding) {
                return false
            }
            var v = 20
            var items = [0, 0, 0, 0] // top,right,bottom,left
            padding.right = padding.left // right == left
            items[0] = padding.top == true ? v : 0
            items[1] = padding.right == true ? v : 0
            items[2] = padding.bottom == true ? v : 0
            items[3] = padding.left == true ? v : 0
            items = items.map((n, i) => {
                return n + 'rpx'
            })
            var s = items.join(" ")
            this.setData({ padding: s })
        },

        "config.margin": function (margin) {
            /*  margin 只需要考虑top,bottom*/
            var v = 20
            var items = [0, 0, 0, 0] // top,right,bottom,left
            items[0] = margin.top == true ? v : 0
            items[2] = margin.bottom == true ? v : 0
            items = items.map((n, i) => {
                return n + 'rpx'
            })
            var s = items.join(" ")
            this.setData({ margin: s })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        bgColor: '',
        bgImage: '',
        height: 'auto',
        padding: 'none',
        margin: 'none',
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
