// components/typepicker.js
const app = getApp()
const fitmentApi = require("../api/fitment")
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    ready: function () {
        this.loadData()
        console.log("readydioayong");
    },

    /**
     * 组件的初始数据
     */
    data: {
        items: [],
        value: [0],
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadData: function () {
            var _this = this
            fitmentApi.getBookingList(
            ).then((resp) => {
                _this.setData({
                    items: resp.data.data
                })
                console.log("readydioayong",resp);
            })
        },

        onShow: function () {
            this.setData({
                show: true
            })
        },

        onClose: function () {
            this.setData({
                show: false
            })
        },

        changeHandle: function (e) {
            var val = e.detail.value
            this.setData({
                value: val
            })
        },

        onConfirm: function (e) {
            var i = this.data.value[0]
            var item = this.data.items[i]
            this.triggerEvent('confirm', {
                fitment: item
            })
            this.onClose()
        },



    }
})