// pages/post/brokage-block.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Object, value: null }
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
        showDetail: function (e) {
            var _this = this
            wx.showModal({
                title: '佣金规则介绍',
                content: _this.data.value.brokage_desc,
            })
        },

    }
})
