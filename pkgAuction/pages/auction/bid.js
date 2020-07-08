// pkgAuction/pages/auction/bid.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        amount: 0,
        minPrice: 0,
        user: null,
        postId: null,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.setData({ postId: q.post_id })
        this.loadData()

    },

    loadData: function () {
        var _this = this
        var pid = this.data.postId
        app.request({
            url: '/api/v1/bids',
            data: { post_id: pid },
            success: function (res) {
                var d = res.data.data
                var minPrice = Math.max(d.trigger_price, d.current_price)
                var data = {
                    loading: false,
                    minPrice: minPrice,
                    auctionStatus: d.auction_status,
                }
                _this.setData(data)
            }
        })

    },
    amountInput: function (e) {
        var v = e.detail.value
        this.setData({ amount: v })
    },

    submitHandle: function () {
        var _this = this
        if (this.data.amount <= this.data.minPrice) {
            wx.showToast({
                title: '出价不能少于' + _this.data.minPrice + '万元',
                icon: 'none',
            });
            return false
        }
        app.request({
            url: '/api/v1/bids/',
            method: 'POST',
            data: { post_id: _this.data.postId, amount: _this.data.amount },
            success: function (res) {
                if (res.data.status == 0) {
                    wx.showToast({
                        title: '出价成功！',
                        icon: 'none',
                        image: '',
                        duration: 1500,
                        mask: true,
                        success: (result) => {
                            wx.navigateBack({
                                delta: 1
                            });

                        },
                    });
                    return

                }
            }
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