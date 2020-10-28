// pages/faxian/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            { name: '资讯', id: 'news' },
            { name: '问答', id: 'qa' },
            { name: '活动', id: 'tour' },
        ],
        tab: 'news',
        newsItems: [],
        newsCatId: '',
        tourItems: [],
        page: 1,
        per_page: 10,
        loading: true,
    },

    tabChangeHandle: function (e) {
        // 切换tab
        var name = e.detail.name
        // 防止重复点击 
        if (name == this.data.tab) {
            return
        }
        this.setData({ tab: name }, () => {
            this.reloadPage()
        })
    },

    reloadPage: function () {

        // 切换tab后刷新页面 
        var data = { page: 1, loading: true }
        var tab = this.data.tab
        switch (tab) {
            case 'news':
                data.newsItems = []
                this.loadNews()
                break;
            case 'qa':
                data.qaItems = []
                this.loadQas()
                break;
            case 'tour':
                data.tourItems = []
                this.loadTours()
                break;
        }
        this.setData(data)
    },

    loadTours: function () {
        var _this = this
        var query = this.data.tourFilter || {}
        query.page = this.data.page
        query.per_page = this.data.per_page || 10
        app.request({
            url: '/api/v1/tours/',
            data: query,
            success: function (resp) {
                if (resp.data.status != 0) {
                    return
                }
                var items = _this.data.tourItems.concat(resp.data.data)
                _this.setData({ tourItems: items, loading: false })
                if (items.length == 0 && query.page === 1) {
                    wx.showToast({
                        title: '没有数据',
                        icon: 'none',
                    })
                }
            }
        })

    },
    loadQas: function () {
        // 加载问答
        var _this = this

        var query = this.data.qaFilter || {}
        query.page = this.data.page
        query.per_page = this.data.per_page || 10
        app.request({
            url: '/api/v1/questions/',
            data: query,
            success: function (resp) {
                if (resp.data.status != 0) {
                    return
                }
                var items = _this.data.qaItems.concat(resp.data.data)
                _this.setData({ qaItems: items, loading: false })
                if (items.length == 0 && query.page === 1) {
                    wx.showToast({
                        title: '没有数据',
                        icon: 'none',
                    })
                }
            }
        })
    },


    newsCatChange: function (e) {
        var cat = e.detail
        console.log('c', e, 'cat', cat)
        var data = {
            newsCatId: cat.id,
            page: 1,
            newsItems: [],
            loading: true
        }
        this.setData(data, () => {
            this.loadNews()
        })
    },

    loadNews: function () {

        var _this = this
        var query = {
            page: this.data.page,
            is_top: false,
            cat_id: this.data.newsCatId,
            per_page: 30
        }
        app.request({
            url: '/api/v1/news',
            data: query,
            success: function (resp) {
                if (resp.data.status != 0) {
                    return
                }
                var items = _this.data.newsItems.concat(resp.data.data)
                _this.setData({ newsItems: items, loading: false })
                if (items.length == 0 && query.page === 1) {
                    wx.showToast({
                        title: '没有数据',
                        icon: 'none',
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        wx.setNavigationBarTitle({ title: '发现', });
        this.loadNews()

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
        this.reloadPage()

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // 触底加载更多
        var data = { loading: true }
        var page = this.data.page
        data.page = page + 1
        this.setData(data, () => {

            switch (this.data.tab) {
                case 'news':
                    this.loadNews()
                    break;
                case 'qa':
                    this.loadQas()
                    break;
                case 'tour':
                    this.loadTours()
                    break;
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})