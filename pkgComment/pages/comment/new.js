// pages/comments/new.js
const app = getApp()
var auth = require('../../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cat: 0,
        cats: [
            { name: '未实地看过', value: 0 },
            { name: '实地看过', value: 1 },
        ],
        user_id: null,
        content: '',
        images: '',
        scoreName: [
            '请点击五角星评分',
            '特别差',
            '不推荐',
            '还可以',
            '比较推荐',
            '非常推荐'
        ],
        allTags: [],
        maxLength: 300,
        minLength: 10,
        score: 0,
    },

    observers: {
        "content": function (val) {
            console.log('content observer', val)
        },

    },

    catHandle: function (e) {
        var cat = e.currentTarget.dataset.cat
        console.log('cat', cat)
        this.setData({ cat: cat })
    },

    initTags: function () {
        // 初始化标签列表
        var scoreTags = [
            [],
            ['位置较差', '交通不便', '楼盘密度过高', '配套不成熟', '周边落后', '封闭式管理', '周边吵闹', '绿化较差'],
            ['户型合理', '宜居生态', '绿化较差', '配套好', '刚需首选', '户型局促', '环境安静', '周边落后', '精装修', '位置较差'],
            ['周边落后', '独立庭院', '交通发达', '户型合理', '购物方便', '户型局促', '经济刚需', '环境安静', '性价比高'],
            ['近地铁', '改善型住宅', '独立庭院', '配套好', '封闭式管理', '位置较差', '绿化好', '周边繁华', '周边吵闹', '户型好'],
            ['周边繁华', '大开发商', '公摊少', '环境安静', '性价比高', '位置好', '配套好', '智能住宅', '适合婚房', '绿化好'],
        ]
        var tags = []
        scoreTags[this.data.score].forEach((tag, i) => {
            tags.push({
                name: tag,
                selected: false
            })
        })
        this.setData({ allTags: tags })
    },


    tagHandle: function (e) {
        var i = e.currentTarget.dataset.index
        // 记录点击tag的index
        var allTags = this.data.allTags
        allTags[i].selected = !allTags[i].selected
        this.setData({ allTags: allTags })
    },


    contentInput: function (e) {
        console.log('content input', e.detail.value)
        this.setData({ content: e.detail.value })
    },

    scoreChange: function (e) {
        var score = e.detail
        if (score == this.data.score) {
            return false
        }
        this.setData({ score: e.detail })
        // 打分变化后，刷新标签列表
        this.initTags()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.setData({
            target_id: q.target_id,
            target_type: q.target_type || 'post'
        })
    },

    imagesHandle: function (e) {
        var images = e.detail.value
        this.setData({
            imagesStr: images.join(','),
            images: images
        })
    },

    genTagsStr: function (e) {
        //  根据标签的选择情况，生成标签字符串
        if (this.data.cat == 0) {
            // 如果选择了没有实地看房，那么就不显示标签列表
            return ''
        }
        var tags = this.data.allTags.filter((item, i) => { return item.selected == true })
        tags = tags.map((item, i) => { return item.name })
        return tags.join(',')
    },

    submitHandle: function (e) {
        var comment = {
            content: this.data.content,
            tags: this.genTagsStr(),
            cat: this.data.cat,
            images: this.data.imagesStr,
            score: this.data.score,
            target_id: this.data.target_id,
            target_type: this.data.target_type

        }
        if (comment.cat == 1 && !comment.score) {
            // 如果选择了已经看房，但是没有评分
            wx.showToast({
                icon: 'none',
                title: '请选择评分',
            })
            return false
        }

        if (!comment.content) {
            wx.showToast({
                icon: 'none',
                title: '请输入评论内容',
            })
            return false
        }

        if (comment.length <= 5) {
            wx.showToast({
                icon: 'none',
                title: '评论内容太短了，请多些几个字吧',
            })
            return fasle
        }

        // do submit
        var _this = this
        app.request({
            url: '/api/v1/mycomments',
            method: 'POST',
            data: comment,
            success: function (resp) {
                // 页面卸载的收，会将this.data.comment写入globalData.newComment
                // 发布成功后，就清空
                _this.setData({ comment: '' })
                if (resp.data.status === 0) {
                    wx.setStorageSync('eventBus', { key: 'reloadComments', value: comment.target_id })
                    wx.showToast({ title: '提交成功。您的评论审核通过后将对外展示', duration: 2000, mask: true })
                    setTimeout(function () {
                        wx.navigateBack({ delta: -1 })
                    }, 2000)
                }
            }
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () { },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var _this = this
        auth.ensureUser((user) => {
            _this.setData({ user: user })
        })

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () { },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        app.globalData.newComment = this.data.comment
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () { },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () { },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () { }
})
