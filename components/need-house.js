// components/need-house.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: { type: Object, value: null },
        user: { type: Object, value: {} },
        hideBtn: { type: Boolean, value: false },
        viewMobile: { type: Boolean, value: false },
        redirect: { type: Boolean, value: false },
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    ready: function () {
        var r = wx.getStorageSync('viewMobile.' + this.data.item.id) || ''
        console.log('r is', r)
        this.setData({ viewMobile: r == 'yes' })
    },

    /**
     * 组件的方法列表
     */
    methods: {


        viewMobile: function (e) {

        },

    }
})
