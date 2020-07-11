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
        showButton: false, // 控制出价按钮是否展示，只有满足条件才展示
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
                var rechargeBalance = res.data.recharge_balance || 0
                var d = res.data.data
                var minPrice = Math.max(d.trigger_price, d.current_price)
                var data = {
                    loading: false,
                    minPrice: minPrice,
                    auctionStatus: d.auction_status,
                }

                if (d.auction_status != 1) {
                    wx.showToast({
                        title: '拍卖未开始或已经结束，无法参与出价',
                        icon: 'none',
                        image: '',
                        duration: 2000,
                        mask: false,
                        success: (result) => {
                            wx.navigateBack({ delta: 1 });
                        },
                        fail: () => { },
                        complete: () => { }
                    });
                    return

                }

                // 判断是否需要充值保证金 
                if (rechargeBalance > 0) {
                    var path = '/pkgWallet/pages/wallet/recharge?amount=' + rechargeBalance
                    wx.showModal({
                        title: '账户保证金不足',
                        content: '您的账户保证金额度不足，需要充值' + rechargeBalance + '的保证金。',
                        showCancel: true,
                        cancelText: '取消',
                        cancelColor: '#000000',
                        confirmText: '去充值',
                        confirmColor: '#3CC51F',
                        success: (result) => {
                            if (result.confirm) {
                                wx.redirectTo({ url: path, });

                            } else {
                                // 回退
                                wx.navigateBack({ delta: 1 });
                            }
                        },
                        fail: () => { },
                        complete: () => { }
                    });
                    return true
                }
                data.showButton = true
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