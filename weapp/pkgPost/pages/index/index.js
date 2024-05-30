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
// pages/sub-districts/index.js
const app = getApp()
const albumApi = require("../../../api/album")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        kw: '',
        kwInput: '',
        mode: 'list', // or map
        pageTitle: '楼盘列表',
        pageCover: '',
        album: null,
        albumId: null,
        filter: {},
    },

    gotoMap: function () {
        wx.navigateTo({
            url: '/pkgMap/pages/map/index'
        })
    },

    modeToggle: function () {
        this.setData({
            mode: this.data.mode == 'list' ? 'map' : 'list'
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var _this = this
        var data = {}
        var filter = q || {}
        var fkeys = Object.keys(filter)
        // global city id , 如果查询参数中city id 有传，则以查询参数为准
        if (!fkeys.includes('city_id')) {
            filter.city_id = app.globalData.cityId
        }
        // 如果是加载主题房源列表
        if (q.album_id) {
            filter.album_id = q.album_id
            data.albumId = q.album_id
        }

        filter.page = 1 // 强制设置为第一页
        data['filter'] = filter
        this.setData(data, (res) => {
            _this.loadAlbum()
            _this.setPageTitle()
        })
    },

    setPageTitle: function () {
        // 如果是主题楼盘，就跳过
        if (this.data.albumId) {
            return
        }

        var g = this.data.filter.group || this.data.filter.group_v2
        var title = '楼盘列表'
        this.setData({ pageTitle: title })
        wx.setNavigationBarTitle({
            title: title,
        });

    },

    loadAlbum: function () {
        // 如果不是主题楼盘就跳过
        var albumId = this.data.albumId
        if (!albumId) {
            return false
        }

        // 根据专辑Id加载分类信息
        var _this = this
        albumApi.getAlbumDetail(
            albumId
        ).then((resp) => {
            var album = resp.data.data
            _this.setData({
                album: album,
                pageTitle: album.name,
                pageCover: album.cover
            })
            wx.setNavigationBarTitle({
                title: album.name,
            });
        })
    },



    kwChange: function (e) {
        this.setData({ kwInput: e.detail })
    },

    onSearch: function (e) {
        var kwInput = this.data.kwInput
        if (kwInput && kwInput.length >= 2) {
            var filter = this.data.filter
            filter.page = 1
            filter.kw = kwInput
            this.setData({ filter: filter })
        } else {
            wx.showToast({
                title: '关键词不能少于2个字符',
                icon: 'none',
            });
        }
    },

    kwClear: function (e) {
        var filter = this.data.filter
        filter.kw = ''
        filter.page = 1
        this.setData({ filter: filter })
    },


    filterChange: function (e) {
        var filter = e.detail
        filter.page = 1
        this.setData({ filter: filter })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var filter = this.data.filter
        filter.page = filter.page === null ? 1 : filter.page
        filter.page += 1
        this.setData({ filter: filter })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var _this = this
        return {
            title: _this.data.pageTitle,
            imageUrl: _this.data.pageCover,
        }
    },

    onShareTimeLine: function () {
        var qs = []
        if (this.data.albumId) {
            qs.push('album_id=' + this.data.albumId)
        }

        if (this.data.filter.city_id) {
            qs.push('city_id=' + this.data.filter.city_id)
        }
        var query = qa.join('&')
        var _this = this
        return {
            title: _this.data.pageTitle,
            imageUrl: _this.data.pageCover,
            query: query
        }
    },
})
