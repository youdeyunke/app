// components/comments/comment-item.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: { type: Object },
        stars: { type: Boolean, value: true },
        images: { type: Boolean, value: true},
        cat: { type: Boolean, value: true },
        border: { type: Boolean, value: true },
    },

    observers: {
        "item.like_nums": function (c) { 
            var _this = this
            this.setData({likeNums: c})
            var key = 'liked_comment.' + this.data.item.id
            if (wx.getStorageSync(key)) {
                _this.setData({liked: true})
            }
        },
    },


    data: {
        likeNums: 0,
        liked: false,
    },

    methods: {
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

            app.request({
                url: '/api/v1/mycomments/like',
                hideLoading: true,
                method: 'POST',
                data: { id: cid },
                success: function (resp) {
                    console.log('resp')
                    wx.setStorage({
                        key: key,
                        data: true,
                    })
                }
            })
        },

    }
})
