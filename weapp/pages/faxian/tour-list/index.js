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
// pages/faxian/hd/index.js
const app = getApp()
const tourApi = require("../../../api/tour")
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
        tourItems: [],
        kw: '',
        page: 1,
    },

    /**
     * 组件的方法列表
     */
    methods: {

        reloadData: function () {
            this.setData({
                page: 1,
                tourItems: [],
            }, () => {
                this.loadData()
            })
        },

        search: function (kw) {
            console.log('search tour', kw)
            this.setData({
                kw: kw,
                page: 1,
                tourItems: []

            }, () => {
                this.loadData()
            })
        },

        loadMore: function () {
            var page = this.data.page + 1
            this.setData({
                page: page,
            }, () => {
                this.loadData()
            })
        },

        loadData: function () {
            var _this = this
            var query = {
                kw: this.data.kw,
                page: this.data.page,
            }
            tourApi.getTourList(query).then((resp) => {
                if (resp.data.status != 0) {
                    return
                }
                if (this.data.page == 1) {
                    _this.setData({
                        tourItems: resp.data.data
                    })
                } else if (this.data.page > 1) {
                    var oldData = _this.data.tourItems
                    var newData = resp.data.data
                    var Data = oldData.concat(newData)
                    _this.setData({
                        tourItems: Data
                    })
                }
                if (_this.data.tourItems.length == 0 && query.page === 1) {
                    wx.showToast({
                        title: '没有数据',
                        icon: 'none',
                    })
                }
            })
        },
    },
    ready: function () {

    },


})