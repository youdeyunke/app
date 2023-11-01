/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自有软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// pkgEvent/pages/event/new.js
const app = getApp()
var eventApi = require('../../../api/event');
var auth = require('../../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: false,
        push: false,
        pid: null,
        currentCatIndex: 0,
        title: '',
        content: '',
        images: '',
        pub_time: '',
        author: '',
        cats: [],

    },

    pushHandle: function (e) {
        this.setData({
            push: !this.data.push
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var _this = this
        auth.ensureUser((user) => {
            // pass
            _this.setData({ author: user.name })
        })

        var pid = q.id || q.post_id
        this.setData({
            pid: pid
        })
        this.loadCats()
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
        // 自动生成pub time 
        var d = new Date()
        var y = d.getFullYear()
        var m = d.getMonth() + 1
        var d = d.getDate()
        var date = y + '-' + m + '-' + d
        this.setData({
            pub_time: date,
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

    cancleHandle: function (e) {
        wx.navigateBack({
            delta: -1
        })
    },

    catClickHandle: function (e) {
        var i = e.currentTarget.dataset.index
        this.setData({ currentCatIndex: i })
    },

    contentHandle: function (e) {
        var c = e.detail.value
        console.log('e', e)
        this.setData({ content: c })
    },
    textInput: function (e) {
        var value = e.detail
        var key = e.target.dataset.name
        var data = {}
        data[key] = value
        this.setData(data)
    },

    imagesHandle: function (e) {
        console.log('iamges handle ', e)
        var images = e.detail.value
        let urlsAsString = images.map(obj => obj.url).join(',');
        this.setData({
            images: urlsAsString,
        })
    },

    submitHandle: function (e) {
        if (this.data.loading) {
            return false
        }
        var _this = this
        // 提交发布动态
        var catId = this.data.cats[this.data.currentCatIndex].id
        var data = {
            post_id: this.data.pid,
            title: this.data.title,
            content: this.data.content,
            author: this.data.author,
            pub_time: this.data.pub_time,
            images: this.data.images,
            push_enable: this.data.push == true,
            cat_id: catId
        }
        // validate
        if (data.title.length <= 4) {
            wx.showToast({
                icon: 'none',
                title: '标题长度不能少于4个字',
            })
            return false
        }
        if (!data.pub_time) {
            wx.showToast({
                icon: 'none',
                title: '发布时间不能为空',
            })
            return false
        }

        var len = data.content.length
        if (len < 10) {
            wx.showToast({
                icon: 'none',
                title: '内容长度不能少于10个字',
            })
            return false
        }

        this.setData({ loading: true })
        // √
        eventApi.createEvent(data).then((resp) => {
            _this.setData({ loading: false })
            if (resp.data.status != 0) {
                return false
            }

            wx.showToast({
                title: '提交成功，等待管理员审核',
                icon: 'success',
                mask: true,
                duration: 1500,
            })
            setTimeout(function () {
                wx.navigateBack({ delta: -1 })
            }, 1500)
        })
    },

    loadCats: function () {
        var _this = this
        eventApi.getEventCatList().then((resp) => {
            _this.setData({
                cats: resp.data.data
            })
        })
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