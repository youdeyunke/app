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
// pkgRanking/pages/ranking/index.js
const app = getApp()
const postApi = require("../../../api/post")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [],
        currentTabIndex: 0,
        tabs: [
            { name: '综合榜', value: 'all' },
            { name: '搜索榜', value: 'search' },
            { name: '人气榜', value: 'hot' },
            { name: '关注榜', value: 'like' },
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.loadData()
    },

    loadData: function () {
        var query = {
            cat: this.data.tabs[this.data.currentTabIndex].value,
        }
        var _this = this
        postApi.getPostRank(query).then((res) => {
            if (res.data.status != 0) {
                return
            }

            if (res.data.data.length == 0) {
                wx.showToast({
                    icon: 'none',
                    title: '数据暂未生成',
                })
            }
            _this.setData({ items: res.data.data })
        })
    },


    tabClick: function (e) {
        var i = e.currentTarget.dataset.index
        if (i == this.data.currentTabIndex) {
            return
        }
        this.setData({
            currentTabIndex: i
        }, () => {
            this.loadData()
        })

    },



    shareHandle () {

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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})