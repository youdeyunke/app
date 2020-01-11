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
        submiting: false,
        showForm: false,
        qas: null,

    },


    likeHandle: function (e) {
        console.log('e', e)
        var index = e.currentTarget.dataset.index
        var answer = this.data.answers[index]
        // 检查一下是否点过赞
        var cacheKey = 'answer.' + answer.id + '.liked'
        var liked = wx.getStorageSync(cacheKey) == 'liked'
        if (liked) {
            return false;
        }
        // 没有点过赞
        var _this = this
        app.request({
            method: 'PUT',
            url: '/api/v1/answers/' + answer.id,
            data: { do: 'like' },
            success: function (resp) {
                var likes = resp.data.data
                // 更新likes
                answer.liked = true
                answer.likes = likes || 0
                var key = 'answers[' + index + ']'
                var data = {}
                data[key] = answer
                _this.setData(data)
                wx.setStorageSync(cacheKey, 'liked');

            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('qa onload')
        var qid = options.id
        this.setData({ id: qid })
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

    submitHandle: function (e) {
        console.log('submit ', e)
        // 点击提交
        var _this = this
        if (_this.data.answer && _this.data.answer.length < 10) {
            wx.showModal({
                title: '温馨提示',
                content: '答案字数不能少于10个字',
            })
            return false
        }
        this.setData({ submiting: true })
        app.request({
            url: '/api/v1/answers',
            method: 'POST',
            data: {
                question_id: _this.data.item.id,
                content: _this.data.answer,
            },
            success: function (resp) {
                _this.setData({ submiting: false })
                if (resp.data.status == 0) {
                    _this.setData({ showForm: false })
                    wx.showToast({ title: '发布成功', })
                    _this.loadData()
                }
            }
        })
    },

    addHandle: function (e) {
        // 点击我来回答按钮
        var _this = this
        auth.ensureUser(function (userInfo) {
            if (!userInfo.is_broker) {
                wx.showModal({
                    title: '温馨提示',
                    content: '你不是经纪人，不能回复此问题',
                })
                return false
            }
            _this.setData({ showForm: true })
        })
    },

    cancleHandle: function (e) {
        this.setData({ showForm: false })
    },


    answerInput: function (e) {
        console.log(e)
        this.setData({ answer: e.detail.value })
    },

    loadPost: function (cb) {
        var pid = this.data.item.post_id
        var key = 'post.data.' + pid
        var post = wx.getStorageSync(key)
        return cb(post)
    },

    gotoNew: function (e) {
        console.log('submit', e)
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
            item: null, answers: null, showForm: false
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
