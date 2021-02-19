// components/broker/hot-brokers.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    externalClasses: ['custom-class'],
    properties: {
        item: { type: Object }
    },

    observers: {

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    ready: function () {
    },

    /**
     * 组件的方法列表
     */
    methods: {
        chatHandle: function () {
            // 先调用打招呼接口
            wx.showLoading({ title: '正在打开', icon: 'none', mask: true })
            var _this = this
            if (!this.data.postId) {
                wx.navigateTo({
                    url: '/pages/messages/show?target_user_id=' + _this.data.item.id,
                    success: function () {
                        wx.hideLoading()
                    }
                })
                return
            }

            var data = { receiver_id: _this.data.item.id, id: this.data.postId || '' }
            app.request({
                url: '/api/v1/posts/hello',
                data: data,
                success: function (resp) {
                    if (resp.data.status == 0) {
                        // 跳转到消息列表
                        wx.navigateTo({
                            url: '/pages/messages/show?target_user_id=' + _this.data.item.id,
                        })
                    }
                },
                complete: function () {
                    wx.hideLoading()
                },
            })
        },
    }
})
