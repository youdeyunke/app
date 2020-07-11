// pkgAuction/pages/auction/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        postId: null,
        post: null,
        currentPrice: 0,
        triggerPrice: 0,
        auctionStatus: 0,
        bidItems: null,
        testItems: [1, 2, 3, 4],
        loading: false,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.setData({
            postId: q.post_id,
            loading: true,
        })

    },

    formatDatetime: function (v) {
        var res = v.split('T')
        var date = res[0]
        var time = res[1].split('.')[0]
        return date + ' ' + time
    },

    loadData: function () {
        // 根据post id 加载拍卖信息
        var _this = this
        app.request({
            url: '/api/v1/bids',
            data: { post_id: _this.data.postId },
            success: function (res) {
                if (res.data.status != 0) {
                    return false
                }
                var d = res.data.data
                var bids = d.bids.map((item, i) => {
                    item.created_at = _this.formatDatetime(item.created_at)
                    return item

                })
                var auctionStatusName = ''
                switch (d.auction_status) {
                    case 0:
                        auctionStatusName = '竞拍还未开始'
                        break;
                    case 1:
                        auctionStatusName = '火热竞拍中'
                        break;
                    case 2:
                        auctionStatusName = '竞拍已结束'
                        break;
                }
                var data = {
                    loading: false,
                    currentPrice: d.current_price,
                    triggerPrice: d.trigger_price,
                    deposit: d.deposit,
                    startsAt: _this.formatDatetime(d.starts_at),
                    endsAt: _this.formatDatetime(d.ends_at),
                    bidItems: bids,
                    auctionStatus: d.auction_status,
                    auctionStatusName: auctionStatusName,
                }
                console.log('set data', data)
                _this.setData(data)
            },
        })

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
        var user = app.globalData.userInfo
        this.setData({ user: user })
        var _this = this
        if (!this.data.postId) {
            setTimeout(_this.loadData(), 500)
            return
        }
        this.loadData()
    },

    gotoBid: function () {
        var pid = this.data.postId
        wx.navigateTo({
            url: '/pkgAuction/pages/auction/bid?post_id=' + pid,
        });
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