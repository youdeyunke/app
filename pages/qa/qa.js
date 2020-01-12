// pages/qa/qa.js
const app = getApp()
var util = require('../../utils/util.js');
var auth = require('../../utils/auth.js');

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
        wx.showLoading({ title: '正在打开', icon: 'none', mask: true })
        var _this = this
        wx.navigateTo({
            url: '/pages/messages/show?target_user_id=' + bid,
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
        this.setData({ id: qid, chatEnable: chatEnable })
        var _this = this
        this.loadData()
    },

    loadData: function () {
        var _this = this
        app.request({
            url: '/api/v1/questions/' + _this.data.id,
            success: function (resp) {
                if (resp.data.status != 0) {
                    _this.setData({ loading: false })
                    return false
                }
                var item = resp.data.data
                var answers = []
                item['created_at_pretty'] = util.prettyTime(item['created_at'])
                item['updated_at_pretty'] = util.prettyTime(item['updated_at'])
                item['answers'].forEach((a, i) => {
                    // 查询是否点过赞
                    var cacheKey = 'answer.' + a.id + '.liked'
                    var liked = wx.getStorageSync(cacheKey) == 'liked'
                    a['created_at_pretty'] = util.prettyTime(a['created_at'])
                    a['likes'] = a['likes'] || 0
                    a['liked'] = liked
                    answers.push(a)
                })
                _this.setData({ item: item, answers: answers, loading: false })

            }
        })

    },

    gotoTarget: function (e) {
        var _this = this
        wx.navigateTo({
            url: _this.data.item.target_url
        })

    },


    addHandle: function (e) {
        // 点击我来回答按钮
        var _this = this
        auth.ensureUser(function (userInfo) {
		wx.navigateTo({
			url: '/pages/qa/reply?qid=' + _this.data.item.id
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
        app.uploadFormId(e)
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
            item: null, answers: null
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
            path: 'pages/qa/qa?id=' + _this.data.item['id']
        }
    },


})
