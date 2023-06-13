// pkgType/pages/type/show.js
const app = getApp()
const postApi = require("../../../api/post")
var auth = require('../../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: null,
        post: null,
        broker: null,
        loading: true,
        tid: null,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.setData({ tid: q.id })
        this.loadType(q.id)

    },

    loadType: function (tid) {
        var _this = this
        // 有待检测
        // app.request({
        //     url: '/api/v1/types/有待检测' + tid,
        //     success: function (resp) {
              
        //     }
        // })
        postApi.getPostTypeDetail(tid).then((res)=>{
            if (resp.data.status != 0) {
                return false
            }
            var type = resp.data.data.type
            var post = resp.data.data.post
            var tags = []
            if(type.tags){ 
              tags = type.tags.split(',')
            }

            _this.setData({
                loading: false,
                post: resp.data.data.post,
                tags: tags, 
                broker: resp.data.data.broker,
                type: resp.data.data.type,
            })
            var title = post.title + type.name + type.sale_status_name || ''
            wx.setNavigationBarTitle({ title: title, });
        })
    },

    viewImage: function (e) {
        var urls = this.data.type.images_list
        var index = e.currentTarget.dataset.index
        var url = urls[index]
        wx.previewImage({
            current: url,
            urls: urls,
        })
    },

    callHandle: function () {
        var m = this.data.broker.mobile
        wx.makePhoneCall({
            phoneNumber: m,
        })
    },

    chatHandle: function () {
        var _this = this
        auth.ensureUser(function (user) {
            // 不能和自己聊天
            if (user.id == _this.data.broker.id) {
                wx.showToast({ icon: 'none', title: '不能和自己聊天' })
                return false
            }
            return _this._chatHandle()
        })
    },

    _chatHandle: function () {
        // 先调用打招呼接口
        wx.showLoading({ title: '正在打开', icon: 'none', mask: true })
        var pid = this.data.post.id
        var brokerId = this.data.broker.id
        var _this = this
            // √
            postApi.sendPostCard({
                id: pid,
                receiver_id: brokerId
            }).then((resp) => {
                if (resp.data.status == 0) {
                    // 跳转到消息列表
                    wx.navigateTo({
                        url: '/pages/messages/show?target_user_id=' + brokerId,
                    })
                }
            })
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var color = app.globalData.myconfigs.color  
        this.setData({  
            primaryBtnColor: color.primary_btn,  
            secondaryBtnColor: color.secondary_btn, 
        })

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({ t0: new Date().getTime(), })
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
        var t1 = new Date().getTime()
        var t = t1 - this.data.t0
        var name = "浏览：" + this.data.post.title + "的户型：" + this.data.type.name
        app.markVisitorAction(name, t)
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
        var _this = this
        var title = this.data.post.title + this.data.type.name
        var path = 'pkgPost/pages/type/show?id=' + this.data.tid
        var image = this.type.images_list[0]
        return {
            title: title,
            path: path,
            imageUrl: image
        }

    }
})