// components/pagemaker/index.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pageId: { type: Number, default: 1 }
    },

    /**
     * 组件的初始数据
     */
    data: {
        modules: [],
    },


    ready: function () {
        var _this = this
        var pageId = this.data.pageId
        app.request({
            url: '/api/v1/pages/' + pageId,
            success: function (resp) {
                var data = resp.data.data
                _this.setData({
                    modules: data.modules
                })
                _this.triggerEvent('ready', data.config)

            }
        })

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
