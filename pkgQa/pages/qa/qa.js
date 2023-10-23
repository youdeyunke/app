// pages/qa/qa.js
const app = getApp()
const qaApi = require("../../../api/qa")
var util = require('../../../utils/util.js');
var auth = require('../../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        item: null,
        answers: [],
        loading: true,
    },

    callHandle: function (e) {
        var index = e.currentTarget.dataset.index
        var answer = this.data.answers[index]
        var mobile = answer.user.mobile
        if (!mobile) {
            return false
        }
        wx.makePhoneCall({
            phoneNumber: mobile
        })

    },

    chatHandle: function (e) {
        var index = e.currentTarget.dataset.index
        var answer = this.data.answers[index]
        var bid = answer.user.id

        // 先调用打招呼接口
        wx.showLoading({
            title: '正在打开',
            icon: 'none',
            mask: true
        })
        var _this = this
        wx.navigateTo({
            url: '/pkgQa/pages/messages/show?target_user_id=' + bid,
            success: function () {
                wx.hideLoading()
            }
        })
    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var ext = wx.getExtConfigSync()
        var chatEnable = ext['chat_enable'] != false
        var qid = options.id
        var user = app.globalData.userInfo
        this.setData({
            id: qid,
            chatEnable: chatEnable,
            user: user
        })
        var _this = this
        this.loadData()
    },

    loadData: function () {
        var _this = this
        qaApi.getQuestionList(_this.data.id).then((resp) => {
            if (resp.data.status != 0) {
                _this.setData({
                    loading: false
                })
                return false
            }
            var item = resp.data.data
            var answers = []
            item['created_at_pretty'] = util.prettyTime(item['created_at'])
            item['updated_at_pretty'] = util.prettyTime(item['updated_at'])
            if(item['answer']){
              item['answer'].forEach((a, i) => {
                // 查询是否点过赞
                var cacheKey = 'answer.' + a.id + '.liked'
                var liked = wx.getStorageSync(cacheKey) == 'liked'
                a['created_at_pretty'] = util.prettyTime(a['created_at'])
                a['likes'] = a['likes'] || 0
                a['liked'] = liked
                answers.push(a)
              })
            }
            _this.setData({
                item: item,
                answers: answers,
                loading: false
            })
            wx.stopPullDownRefresh()
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh() //停止下拉刷新    
        })

    },

    gotoTarget: function (e) {
        var _this = this
        wx.navigateTo({
            url: _this.data.item.target_url
        })

    },


    followHandle: function (e) {
        // 点击关注问题
        var _this = this
        if (this.data.item.followed) {
            // 先改变按钮状态，再发送请求
            var item = this.data.item
            item.followed = !item.followed
            this.setData({
                item: item
            })
            qaApi.cancleFollowQuestion(this.data.item.id).then((resp) => {
                if (resp.data.status != 0) {
                    return false
                }
                // 关注成功, 重新加载数据
                _this.loadData()
            })
        } else {
            // 先改变按钮状态，再发送请求
            var item = this.data.item
            item.followed = !item.followed
            this.setData({
                item: item
            })
            qaApi.followQuestion(_this.data.item.id).then((resp) => {
                if (resp.data.status != 0) {
                    return false
                }
                // 关注成功, 重新加载数据
                _this.loadData()
            })
        }

    },



    addHandle: function (e) {
        // 点击我来回答按钮
        var _this = this
        auth.ensureUser(function (userInfo) {
            wx.navigateTo({
                url: '/pkgQa/pages/qa/reply?qid=' + _this.data.item.id
            })
        })
    },


    loadPost: function (cb) {
        var pid = this.data.item.post_id
        var key = 'post.data.' + pid
        var post = wx.getStorageSync(key)
        return cb(post)
    },

    gotoNew: function (e) {
        wx.navigateTo({
            url: '/pages/qa/new'
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
        this.loadData()
        var color = app.globalData.myconfigs.color
        this.setData({
            primaryColor: color.primary,
            primaryBtnColor: color.primary_btn,
        })
    },

    deleteHandle: function (e) {
        var _this = this
        wx.showModal({
            title: '操作提示',
            content: '确定要删除这条回答吗？',
            success(res) {
                if (res.confirm) {
                    _this.doDelete()
                }
            }
        })
    },

    doDelete: function () {
        var _this = this
        qaApi.deleteQuestion(_this.data.item.id).then((resp) => {
            if (resp.data.status != 0) {
                return false
            }
            wx.showToast({
                title: '已删除',
                icon: 'none',
                mask: true,
                duration: 1500,
                success: function () {
                    setTimeout(function () {
                        wx.navigateBack({
                            delta: -1
                        })
                    }, 1500)
                },
            })
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
        this.setData({
            loading: true,
            item: null,
            answers: null
        })
        this.loadData()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    onShareAppMessage: function () {
        var _this = this
        return {
            desc: _this.data.item['content'],
            title: '',
            path: 'pkgQa/pages/qa/qa?id=' + _this.data.item['id']
        }
    },


})