// components/ud/checkbox/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Boolean, value: false },
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

        toggleHandle: function (e) {
            var _this = this
            this.setData({
                value: !_this.data.value
            })
        },

    }
})
