// pages/sub-districts/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        kw: '',
        kwInput: '',
        album: null,
        filter: {},
        page: 1,
        filterConfigs: [
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        app.checkForceLogin()
        var data = {}
        var filter = q || {}
        var fkeys = Object.keys(filter)
        // global city id , 如果查询参数中city id 有传，则以查询参数为准
        if (!fkeys.includes('city_id')) {
            filter.city_id = app.globalData.cityId
        }
        filter.page = 1 // 强制设置为第一页
        data['filter'] = filter
        this.setData(data)
        this.setPageTitle()
        this.loadAlbum(q.album_id)
    },

    setPageTitle: function () {
        var g = this.data.filter.group || this.data.filter.group_v2
        var title = '房源列表'
        switch (g) {
            case 'new':
                title = '楼盘'
                break;
            case 'old':
                title = '二手房'
                break;
            case 'auction':
                title = '法拍房'
                break;
            case 'shop':
                title = '商铺'
                break;
            case 'rental':
                title = '租房'
                break;
        }
        wx.setNavigationBarTitle({
            title: title,
        });

    },

    loadAlbum: function (albumId) {
        if (!albumId) {
            return false
        }
        // 根据专辑Id加载分类信息
        var _this = this
        app.request({
            url: '/api/v1/albums/' + albumId,
            method: 'GET',
            success: function (resp) {
                var album = resp.data.data
                _this.setData({ album: album })
                wx.setNavigationBarTitle({
                    title: album.name,
                });
            }
        })
    },


    configFilter: function (q) {
        var items = [{ name: '位置', type: 'citypicker', },
        app.globalData.filterAreaItem,
        app.globalData.filterRentPriceItem,
        app.globalData.filterOrderItem2,
        ]
        var g = q.group || q.group_v2

        if (g == 'rental') {
            items = [{ name: '位置', type: 'citypicker', },
            app.globalData.filterTypeItem,
            app.globalData.filterRentPriceItem,
            app.globalData.filterAreaItem,
            app.globalData.filterOrderItem1,
            ]
        }

        if (g == 'shop') {
            items = [{ name: '位置', type: 'citypicker', },
            app.globalData.filterAreaItem,
            app.globalData.filterRenttypeItem,
            ]
        }

        if (g == 'old') {
            items = [{ name: '位置', type: 'citypicker', },
            app.globalData.filterTypeItem,
            app.globalData.filterTotalPriceItem,
            app.globalData.filterAreaItem,
            app.globalData.filterOrderItem2,
            ]
        }
        if (g == 'auction') {
            items = [{ name: '位置', type: 'citypicker', },
            app.globalData.filterTypeItem,
            app.globalData.filterTotalPriceItem,
            app.globalData.filterAreaItem,
            app.globalData.filterOrderItem2,
            ]
        }

        if (g == 'new') {
            items[2] = app.globalData.filterTotalPriceItem
        }
        this.setData({ filterConfigs: items })


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
        this.setData({ filter: e.detail })
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
        var page = this.data.page || 1
        var filter = this.data.filter
        filter.page = page
        this.setData({ filter: filter })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    }
})
