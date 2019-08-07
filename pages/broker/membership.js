// pages/broker/membership.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: [],
        currentItem: {},
        loading: false,
        radio: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.loadItems()
    },

    onChange: function (e) {
        console.log('e', e)
    },

    onClick: function (e) {
      var index = e.currentTarget.dataset.name
      var item = this.data.items[index]

      this.setData({
          radio: String(index),
          currentItem: item,
      })
    },

    loadItems: function () {
        var _this = this
        app.request({
            url: '/api/v1/broker_memberships',

            success: function (resp) {
                _this.setData({
                    items: resp.data.data
                })
            }
        })
    },


    requestPay: function (aid) {
        // 请求服务器支付参数，吊起支
        var _this = this
        var pid = this.data.currentItem.id
        if (!pid) {
            return false
        }
        this.setData({
            loading: true
        })

        app.request({
            url: '/api/v1/broker_membership_orders',
            method: 'POST',
            data: {
                pid: pid
            },
            success: function (resp) {
                // 支付成功了，刷新状态
                _this.setData({
                    loading: false
                })
                wx.switchTab({
                    url: '/pages/myself/index',
                })


            },
            fail: function (resp) {
                _this.setData({
                    loading: false
                })
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
        this.loadItems()
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
