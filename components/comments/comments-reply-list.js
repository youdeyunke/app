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
// components/comments/comments-reply-list.js
const app = getApp()
const mycommentApi = require("../../api/mycomment")

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        mycommentId: {
            type: Number, value: 0, observer: "loadData"
        }
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

        loadData: function () {
            var _this = this
            mycommentApi.getAllCommentList(_this.data.mycommentId).then((resp) => {
                var items = resp.data.data
                if (items.length == 0) {
                    return false
                }
                _this.setData({
                    items: items
                })
            })
        },

    }
})
