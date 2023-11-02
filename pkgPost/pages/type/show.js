/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// pkgType/pages/type/show.js
const app = getApp()
const postApi = require("../../../api/post")
const brokerApi = require("../../../api/broker")
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

    loadPostBrokerInfo: function (pid) {
        var _this = this
        var query = {
            post_id: pid
        }
        brokerApi.getPostDefaultBrokerDetail(query).then((res) => {
            var broker = res.data.data
            this.setData({
                broker: broker
            })
        })
    },

    loadPostInfo: function (pid) {
        var _this = this
        // √  
        postApi.getPostBaseInfo(
            pid
        ).then((res) => {
            var post = res.data.data
            var data = {
                post: post
            }
            // var user = app.globalData.userInfo
            // data.pageQuery = 'id=' + pid
            // if (user && user.is_broker) {
            //     data.pageQuery += '&broker_id=' + user.id
            // }

            // data.pageTitle = post.title + ' 户型介绍'
            // data.pageCover = post.cover
            var type = this.data.type
            var title = post.title + type.name + type.sale_status_name || ''
            wx.setNavigationBarTitle({ title: title, });
            _this.setData(data)
        })
    },

    loadType: function (tid) {
        var _this = this
        postApi.getPostTypeDetail(tid).then((resp) => {
            if (resp.data.status != 0) {
                return false
            }
            var type = resp.data.data
            // var post = resp.data.data.post
            var tags = []
            if (type.tags) {
                tags = type.tags.split(',')
            }

            _this.setData({
                loading: false,
                // post: resp.data.data.post,
                tags: tags,
                // broker: resp.data.data.broker,
                type: resp.data.data,
            })
            _this.loadPostInfo(type.post_id)
            _this.loadPostBrokerInfo(type.post_id)

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
        //brokerId指broker对应的userid
        var brokerId = this.data.broker.user_id
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