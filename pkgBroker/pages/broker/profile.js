// pages/user/user.js
const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        broker: null,
        userId: null,
 
    },
    showPopup() {
        this.setData({
            show: true
        });
    },

    onClose() {
        this.setData({
            show: false
        });
    },
    chatHandle: function () {
        // 先调用打招呼接口
        wx.showLoading({
            title: '正在打开',
            icon: 'none',
            mask: true
        })
        var _this = this
        wx.navigateTo({
            url: '/pages/messages/show?target_user_id=' + _this.data.userId,
            success: function () {
                wx.hideLoading()
            }
        })
        return
    },
    callphone: function (e) {
        var mobile = this.data.brokerProfile.mobile
        if (!mobile) {
            return false
        }
        wx.makePhoneCall({
            phoneNumber: mobile
        })
    },




    callMe: function (e) {
        var mobile = this.data.brokerProfile.mobile
        if (!mobile) {
            return false
        }

        wx.makePhoneCall({
            phoneNumber: mobile
        })
    },




    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var _this = this
        _this.setData({
            userId: q.id,
        }, function () {
            _this.loadBrokerProfile()
        })
        var qrdata= app.globalData.qrdata 
        if(qrdata){
            app.globalData.qrdata = null 
            if(qrdata.referrer_id){
                wx.setStorage({
                    key: 'referrer_id', 
                    data: qrdata.referrer_id
                })
            }
        }
        this.viewHandle()
        
        app.markVisitor(null, q.id, 'user')
     
    },

    viewHandle: function () {
        var bid = this.data.userId
        var _this = this
        app.request({
            method: 'POST',
            hideLoading: true,
            data: {
                user_id: bid
            },
            url: '/api/v1/brokers/view',
            success: function (res) {
                if (res.data.status != 0) {
                    return
                }
                _this.setData({
                  viewNums: res.data.data
                })
            }
        })
  
    },

    loadBrokerProfile: function () {
        var uid = this.data.userId
        var _this = this
        app.request({
            url: '/api/v1/brokers/show' ,
            data: {user_id: uid},
            success: function (resp) {
                // 有可能没有开通个人主页
                if (resp.data.status != 0) {
                    // TODO 显示未开通主页的情况
                    return
                }
                var u = resp.data.data
                _this.setData({
                    broker: u,
                })
                // _this.viewHandle()
                var title = u.name + "的主页"
                wx.setNavigationBarTitle({
                    title: title
                })

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
        var _this = this 
        setTimeout(() => {
            if(!this.data.brokerProfile){
                this.loadBrokerProfile()
            }
           
        }, 1000)

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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var _this = this
        return {
            title: _this.data.brokerProfile.name + '的名片',
            desc: '帮你找好房',
            path: 'pkgBroker/pages/broker/profile?id=' + _this.data.userId,
            imageUrl: _this.data.brokerProfile.avatar,
        }
    },
    onShareTimeline() {
        var _this = this
        return {
            title: _this.data.brokerProfile.name + '的名片',
            path: 'pkgBroker/pages/broker/profile?id=' + _this.data.userId,
            imageUrl: _this.data.brokerProfile.avatar
        }
    },
    lookphoto:function(e){
        var myavatar = e.currentTarget.dataset.src
        var imgList = [e.currentTarget.dataset.src]
        wx.previewImage({
            current: 'myavatar',
            urls:imgList
        })
    }
})