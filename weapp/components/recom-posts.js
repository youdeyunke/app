/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
// components/recom-posts.js
//
const app = getApp()
const postApi = require("../api/post")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        subDistrictId: {
            type: Number, value: 0,
        },
        title: {
            type: String, value: '猜你喜欢',
        },
        idNe: {
            type: Number, value: 0,
        },
        count: {
            type: Number, value: 5,
        },
    },


    ready: function () {
        this.loadRecoms()
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
        loadRecoms: function () {
            var _this = this
            //？？  qa页未使用
            postApi.getPostList({
                per_page: _this.data.count,
                sub_district_id: _this.data.subDistrictId || '',
                order: 'id desc',
                id_ne: _this.data.idNe || 0,
            }).then((resp) => {
                var posts = resp.data.data
                _this.setData({ posts: posts })
                app.cachePosts(posts)
            })
        },

    }
})
