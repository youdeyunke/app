// components/comments/comment-item.js
const app = getApp()
const mycommentApi = require("../../api/mycomment")

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            type: Object
        },
        images: {
            type: Boolean,
            value: true
        },
        isLink: {
            type: Boolean,
            value: true
        },
        border: {
            type: Boolean,
            value: true
        },
        showReplyBtn: {
            type: Boolean,
            value: false
        },
    },

    observers: {
        "item.target_type": function (t) {
            // 如果是回复，就不显示五角星
            this.setData({
                showStars: t == 'post'
            })
        },
        "item.like_nums": function (c) {
            var _this = this
            this.setData({
                likeNums: c
            })
            var key = 'liked_comment.' + this.data.item.id
            if (wx.getStorageSync(key)) {
                _this.setData({
                    liked: true
                })
            }
        },
    },


    data: {
        likeNums: 0,
        liked: false,
    },

    methods: {
        gotoAtUser: function (e) {
            // 点击at的用户，如果对方是经纪人，就跳转
            if (!this.data.item.at_user.is_broker) {
                return false
            }
            var pid = this.data.item.at_user.id
            wx.navigateTo({
                url: '/pkgBroker/pages/broker/profile?id=' + pid
            })
        },
        replyClickHandle: function (e) {
            // 点击回复按钮
            if (this.data.isLink) {
                this.gotoDetail()
                return false
            }
            this.triggerEvent('replyclick', {
                comment: this.data.item
            })
        },
        gotoDetail: function (e) {
            if (!this.data.isLink) {
                return false
            }
            wx.navigateTo({
                url: '/pkgComment/pages/comment/show?id=' + this.data.item.id
            })
        },
        previewHandle: function (e) {
            var i = e.currentTarget.dataset.index
            var url = this.data.item.images_list[i]
            var urls = this.data.item.images_list
            wx.previewImage({
                current: url, // 当前显示图片的http链接
                urls: urls // 需要预览的图片http链接列表
            })
        },
        likeHandle: function (e) {
            var cid = this.data.item.id
            var key = 'liked_comment.' + cid
            if (wx.getStorageSync(key)) {
                console.log('重复点击', key)
                return false
            }
            this.setData({
                likeNums: this.data.item.like_nums + 1,
                liked: true,
            })
            // 有待检测
            // app.request({
            //     url: '/api/v1/mycomments/like有待检测',
            //     hideLoading: true,
            //     method: 'POST',
            //     data: { id: cid },
            //     success: function (resp) {
            //         console.log('resp')
            //         wx.setStorage({
            //             key: key,
            //             data: true,
            //         })
            //     }
            // })
            mycommentApi.likeComment(cid).then((res) => {
                wx.setStorage({
                    key: key,
                    data: true,
                })
            })
        },

    }
})