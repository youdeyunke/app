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
// pages/faxian/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
            name: '楼市资讯',
            id: 'news'
        },
        {
            name: '买房问答',
            id: 'qa'
        },
            // { name: '活动', id: 'tour' },
        ],
        configs: null,
        kw: '',
        loading: true,
        active: 'tour',
        primaryColor: ''
    },

    kwChange: function (e) {
        var kw = this.data.kw
        var ele = this.selectComponent('#' + this.data.active + '-list')
        console.log('ele', this.data.active)
        ele.search(kw)
    },

    tabChange: function (e) {
        console.log('e', e)
        var tab = e.detail.name
        if (tab == this.data.active) {
            return false
        }
        this.setData({
            active: tab,
            kw: '',
        }, () => {
            var ele = this.selectComponent('#' + tab + '-list')
            console.log('tab ', tab)
            ele.reloadData()
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) { 
      var _this = this
      var color = app.globalData.color
      this.setData({
        primaryColor: color.primary || '#9e1d1d',
      })
      app.ensureConfigs(function (configs) {
        _this.setData({
            configs: configs
        })
      })
      var tab = this.data.active  
      var ele = this.selectComponent('#' + tab + '-list')
      console.log('tab ', tab)
      ele.loadData()
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
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setPage('/pages/faxian/index')
        }
        this.setData({
            tabs: app.globalData.myconfigs.faxian_tabs
        })

        this.setData({
            btnColor: app.globalData.myconfigs.color.primary_btn,
        })
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
        var tab = this.data.active
        var ele = this.selectComponent('#' + tab + '-list')
        console.log('tab ', tab)
        ele.reloadData()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // 触底加载更多
        var ele = this.selectComponent('#' + this.data.active + '-list')
        ele.loadMore()
        // console.log("page",this.data.page)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})