// components/post/hot-posts.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        items: [],
    },

    ready: function () {
        this.loadData()
    },

    /**
     * 组件的方法列表
     */
    methods: {

        loadData: function () {
            var _this = this
            var query = {}
            app.request({
                url: '/api/v1/posts/hot',
                data: query,
                success: function (resp) {
                    _this.setData({
                        items: resp.data.data,
                    })
                },
            })
        }

    }
})
