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
// components/sub-district/items.js
const app = getApp();
const postApi = require("../../api/post")
import Notify from '../../vant/notify/notify.js';


Component({
    /**
     * 组件的属性列表
     */
    properties: {
        filter: {
            type: Object, value: {}, observer: "filterChange"
        },
        albumKey: { type: String, value: null },

    },

    /**
     * 组件的初始数据
     */
    data: {
        items: [],
        query: {},
        loading: true,
    },

    ready: function () { },

    /**
     * 组件的方法列表
     */
    methods: {

        filterChange: function (v) {
            var query = this.data.filter || {}
            if (Object.keys(query).length == 0) {
                return false;
            }
            for (let prop in query) {
              if (query[prop] === null) {
                delete query[prop];
              }
            }
            this.setData({ query: query })
            this.loadData()
        },

        loadData: function () {
            var _this = this
            var query = this.data.query
            if (!query) {
                return false
            }

            _this.setData({ loading: true })
            var query = this.data.query
            postApi.getPostList(query).then((resp) => {
                var meta = resp.data.data.page
                var p = _this.data.query.page || 1
                var i = p - 1
                var data = { meta: meta }
                if (p > 1) {
                    var key = 'items[' + i + ']'
                    data[key] = resp.data.data.result
                } else {
                    data['items'] = [resp.data.data.result]
                }
                _this.setData(data)
                _this.setData({
                  loading: false
                })


                for (var i = 0; i <= resp.data.data.result.length - 1; i++) {
                    var post = resp.data.data.result[i]
                    wx.setStorage({
                        key: 'post.' + post.id,
                        data: post,
                    })
                }
            })
        }
    }
})
