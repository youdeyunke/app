/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自有软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// components/comments.js
const app = getApp()
const mycommentApi = require('../../api/mycomment')

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        mini: { type: Boolean, value: false },
        items: { type: Array, value: [] },
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
        commentlikeHandle: function (e) {

            var i = e.currentTarget.dataset.index
            var cid = this.data.items[i].id
            var key = 'liked_comment.' + cid
            if (wx.getStorageSync(key)) {
                console.log('重复点击', key)
                return false
            }
            this.data.items[i].like_nums += 1
            this.setData({ items: this.data.items })
            mycommentApi.likeComment(cid).then((res) => {
                wx.setStorage({
                    key: key,
                    data: true,
                })
            })
        },

    }
})
