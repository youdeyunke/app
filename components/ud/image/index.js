// components/ud/image/index.js
Component({
    /**
     * 组件的属性列表
     */
    extrenalClasses: ['custom-class'],
    properties: {
        src: { type: String, value: null },
        mode: { type: String, value: "fit" },
    },

    observers: {
        "src": function (src) {
            if (src.startsWith('http')) {
                // 外部地址
                this.setData({ imageUrl: src })
                return
            }
            // 内部地址，替换为cdn地址
            var cdn = 'https://qiniucdn.udeve.net/fang-weapp-2021-assets'
            var suffix = ''
            src = src.replace('/assets', cdn)
            var url = src + suffix
            this.setData({ imageUrl: url })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        imageUrl: null,

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
