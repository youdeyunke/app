// pages/news/show.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tourId: null,
        homebtn: null,
        joined: false,
        html: '',
        item: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        app.checkForceLogin()
        this.setData({ tourId: q.id })
        this.loadData()
    },

    joinHandle: function (e) {
        if (!this.data.item.status.value == 1) {
            return false
        }

        this.setData({ joinLoading: true })
        var _this = this
        var url = '/api/v1/tour_members/'
        var data = { tour_id: this.data.item.id }
        var method = 'POST'
        var joined = this.data.joined
        if (joined == true) {
            url = '/api/v1/tour_members/0'
            method = 'DELETE'
        }
        app.request({
            url: url,
            method: method,
            data: data,
            success: function (resp) {
                if (resp.data.status == 0) {
                    _this.loadData((res) => {
                        console.log('cb res is', res)
                        if (res.joined) {
                            wx.showModal({
                                title: '报名成功',
                                content: '您已成功报名此次活动，我们的工作人员将在活动开始前与您来电确认，请留意接听。',
                                showCancel: false,
                                confirmText: '知道了',
                                confirmColor: '#1989fa',
                                success: (result) => {
                                    if (result.confirm) {
                                    }
                                },
                                fail: () => { },
                                complete: () => { }
                            });

                        }
                    })
                    _this.setData({ joinLoading: false })
                }
            }
        })

    },

    loadData: function (cb) {
        var _this = this
        app.request({
            url: '/api/v1/tours/' + _this.data.tourId,
            success: function (resp) {
                var tour = resp.data.data.tour
                var joined = resp.data.data.joined
                var html = tour['content'] || ''
                console.log('tour', tour, 'join', joined)
                if (html) {
                    html = html.replace(/\<img/gi, '<img class="rich-text-img" ')
                    html = html.replace(/\<p/gi, '<p class="rich-text-p" ')
                }
                _this.setData({
                    item: tour,
                    html: html,
                    loading: false,
                    joined: joined
                })
                wx.setNavigationBarTitle({
                    title: tour.title + ' ' + tour.status.name,
                });
                  
                return typeof cb == 'function' && cb(resp.data.data)
            }
        })
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    callHandle: function () {
        var m = this.data.item.server_mobile
        wx.makePhoneCall({
            phoneNumber: m,
        })
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        setTimeout(function () {
            wx.hideLoading()
        }, 500)
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
        return {
            title: this.data.item.title,
            imageUrl: this.data.item.cover + "?imageView2/1/w/500/h/400",
            path: '/pkgTour/pages/tour/show?id=' + this.data.tourId
        }
    }
})
