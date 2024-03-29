/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// pages/faxian/qa/index.js
const app = getApp()
const qaApi = require("../../../api/qa")
Component({
    /**
     * 组件的属性列表
     */


    ready: function () {

    },

    /**
     * 组件的初始数据
     */
    data: {
        qaItems: [],
        page: 1,
        kw: '',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadMore: function () {
            var page = this.data.page + 1
            this.setData({
                page: page,
            }, () => {
                this.loadData()
            })
        },

        reloadData: function () {
            this.setData({
                kw: '',
                page: 1,
                qaItems: [],
            }, () => {
                this.loadData()
            })
        },

        search: function (kw) {
            this.setData({
                kw: kw,
                page: 1,
                qaItems: [],
            }, () => {
                this.loadData()
            })
        },


        loadData: function () {
            var _this = this
            var query = {
                kw: this.properties.kw,
                page: this.properties.page
            }
            qaApi.getQuestionList(query).then((resp) => {
                if (query.page == 1) {
                    _this.setData({
                        qaItems: resp.data.data
                    })
                } else if (query.page > 1) {
                    var oldData = _this.data.qaItems
                    var newData = resp.data.data
                    var Data = oldData.concat(newData)
                    _this.setData({
                        qaItems: Data
                    })
                }
                if (_this.data.qaItems.length == 0 && query.page === 1) {
                    wx.showToast({
                        title: '没有数据',
                        icon: 'none',
                    })
                }
            })
        },
    },


})