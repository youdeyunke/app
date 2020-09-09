// pages/admin/index.js
const app = getApp()
var auth = require('../../../utils/auth.js');
/*

 TODO 独立的经纪人工作台页面，完成后，删除老的页面： /pages/admin/、/pages/myself/posts


*/


Page({

    /**
     * 页面的初始数据
     */
    data: {
        fixFormid: false,
        menuItems: [
            { name: '发布二手房', icon: 'new', color: '#0ddb0c', url: '/pages/post/form?group=old' },
            { name: '发布租房', icon: 'new', color: '#ff9501', url: '/pages/post/form?group=rental&rent_type=zhengzu' },
            { name: '发布商铺', icon: 'new', color: '#ff9501', url: '/pages/post/form?group=shop' },

            { name: '我的房源', icon: 'posts', color: '#59B8EB', url: './posts' },
            { name: '预约看房', icon: 'booking', color: '#59B8EB', url: '/pkgAdmin/pages/admin/booking' },
            { name: '访客足迹', icon: 'visitors', color: '#59B8EB', url: '/pages/visitors/index' },

            { name: '求购客源', icon: 'buy', color: '#4184AF', url: '/pages/need/room?cat=buy' },
            { name: '求租客源', icon: 'rent', color: '#E15C32', url: '/pages/need/room?cat=rent' },
            { name: '我的客源', icon: 'customers', color: '#5857CE', url: '/pages/need/room?cat=myself' },
            { name: '我的档案', icon: 'profile', color: '#', url: '/pkgBroker/pages/broker/join' },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
    },

    formidHandle: function (e) {
        var _this = this
        app.uploadFormId(e, function (data) {
            var c = data.data.can_use_count
            if (c >= 30) {
                _this.setData({ fixFormid: false })
            } else {

                wx.showToast({
                    title: '可接收：' + c + '条，请继续点击按钮',
                    icon: 'none', image: '',
                    duration: 1000,
                    mask: false,
                });
            }
            console.log('可推送消息数：', c)
        })
    },

    subMessageHandle: function (e) {
        wx.navigateTo({ url: '/pages/myself/submessage' })
    },

    menuItemClickHandle: function (e) {
        var user = this.data.userInfo
        if (!user.is_broker) {
            wx.showToast({
                title: '没有权限',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: true,
            });
            return false;
        }
        var url = e.currentTarget.dataset.url
        wx.navigateTo({
            url: url,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    checkFormids: function (e) {
        var _this = this
        app.request({
            url: '/api/v1/formid', success: function (resp) {
                if (resp.data.status == 1) {
                    return false;
                }
                var c = resp.data.data.count || 0
                if (c <= 20) {
                    // 开启修复按钮
                    _this.setData({ fixFormid: true })
                }
                console.log('enable form ids count', c)
            }
        })

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var ext = app.globalData.EXT
        var _this = this
        auth.getRemoteUserInfo(function (user) {
            _this.setData({ userInfo: user })
            if (!user.is_broker) {
                wx.showModal({
                    title: '没有权限',
                    content: '你不是经纪人，没有权限进入工作台界面',
                    confirmText: '申请入驻',
                    confirmColor: '#00ae66',

                    success(res) {
                        if (res.confirm) {
                            wx.navigateTo({
                                url: '/pkgBroker/pages/broker/join',
                            })
                            return
                        }
                        console.log('cancle')
                        wx.switchTab({ url: '/pages/home/home' })
                    }
                })
            }
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
