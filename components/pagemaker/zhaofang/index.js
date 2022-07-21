// components/pagemaker/zhaofang/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: {
            type: Object, value: {},
        }

    },


    observers: {
        "config.data.message": function (v) {
            this.setData({
                message: v
            })
        }
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

    }
})