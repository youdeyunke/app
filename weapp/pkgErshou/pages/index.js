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
// pkgErshou/pages/index.js
const houseApi = require("../../api/house")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [],
        page: 1,
        business: '',
        kw: '',
        filterOption: {},
        filter: {
            page: 1,
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad (options) {
        var _this = this
        var business = options.business || '出租'
        var filter = this.data.filter
        filter.business = business
        wx.setNavigationBarTitle({
            title: business,
        })
        this.setData({
            business: business,
            filter: filter
        }, () => {
            _this.loadData()
            _this.loadPostFilter()
        })

    },

    kwSearch (e) {
        var filter = this.data.filter
        var kw = e.detail
        if (kw) {
            filter.kw = kw
        } else {
            delete filter.kw
        }
        filter.page = 1
        this.setData({
            filter: filter,
            items: []
        }, () => {
            this.loadData()
        })
    },

    filterChange (e) {
        var _this = this
        var filter = e.detail
        console.log(filter);
        filter.page = 1
        this.setData({
            filter: filter,
            items: []
        }, () => {
            _this.loadData()
        })
    },

    loadPostFilter () {
        var _this = this
        var business = this.data.business
        console.log("loadfilter", business);
        houseApi.getHouseFilter(business).then((resp) => {
            _this.setData({
                filterOption: resp.data.data
            })
        })
    },

    loadData: function () {
        var _this = this
        var query = this.data.filter
        houseApi.getHouseList(query).then((res) => {
            if (res.data.data.result.length > 0) {
                var item = _this.data.items
                res.data.data.result.map((ritem) => {
                    item.push(ritem)
                })
                _this.setData({
                    items: item
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom () {
        // var page = this.data.filter.page || 1
        var filter = this.data.filter
        filter.page = filter.page + 1
        this.setData({
            filter: filter,
        }, () => {
            this.loadData()
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage () {

    }
})