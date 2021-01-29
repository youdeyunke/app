// pages/messages/chat-item.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: { type: Object },

    },
    observers: {
        "item.conversationID": function (cid) {
            var userId = cid.split('.')[1]
            this.setData({ userId: userId })
        },
        "item.lastMessage.lastTime": function (s) {
            // 处理时间格式
            // format datetime
            var date = new Date(this.data.item.lastMessage.lastTime*1000)
            var y = ''
            var m = date.getMonth() + 1
            var d = date.getDate()
            var h = date.getHours()
            var mi = date.getMinutes()
            var value = m + '月' + d + '日 ' + h + ':' + mi
            this.setData({ timeStr: value })
        },
        "item.userProfile.userID": function (timUid) {
            // 缓存用户头像url
            var uid = timUid.split('.')[1]
            // 获取用户信息
            var _this = this
            var key = 'user.' + uid
            var user = wx.getStorageSync(key);
            if (user) {
                _this.setData({ user: user })
                return false
            }
            // 重新加载
            // 重新加载
            app.request({
                url: '/api/v1/users/' + uid,
                hideLoading: true,
                success: function (resp) {
                    var user = resp.data.data
                    _this.setData({ toUser: user })
                    // 缓存用户数据
                    wx.setStorage({ key: key, data: user, });
                }
            })

        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        user: {},
        timeStr: '',
        userId: '',

    },


    /**
     * 组件的方法列表
     */
    methods: {

    }
})
