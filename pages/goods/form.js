// pages/goods/form.js
const app = getApp()
var auth = require('../../utils/auth.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        topic: {},
        meansList:[
            {name: '邮寄'},
            {name: '见面交易'},
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (params) {
        var _this = this
        auth.ensureUser(function (user) {
            _this.setData({
                user: user
            })
            if (params.id) {
                auth.ensureUser(function (user) {
                    _this.loadTopic(params.id)
                    wx.setNavigationBarTitle({title: '修改二手交易'})
                })
            }else{
                wx.setNavigationBarTitle({title: '发布二手交易'})

            }
        })
    },

    meansClick: function (e) {
        var name = e.target.dataset.name
        this.updateTopicField('meta_means', name)
    },

    validate: function(){
        var topic = this.data.topic
        if(!topic.meta_means){
            wx.showToast({
                icon: 'fail',
                title: '请选择交易方式'
            })
            return false
        }
        return true
    },

    loadTopic: function (tid) {
        var _this = this
        app.request({
            url: '/api/v1/topics/' + tid,
            success: function (resp) {
                if (resp.data.status != 0) {
                    return false;
                }
                var topic = resp.data.data
                _this.setData({ topic: topic })
            },
        })
    },

    updateTopicField: function (key, value) {
        var d = {}
        var key = 'topic.' + key
        d[key] = value
        this.setData(d)
    },

    imagesChanged: function (e) {
        this.updateTopicField('meta_images', e.detail.images)
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    contentHandle: function(e){
        console.log('e', e)
    },

    chooseLocation: function (e) {
        var _this = this
        app.chooseLocation(function (sub) {
            _this.updateTopicField('sub_district', sub)
            _this.updateTopicField('sub_district_id', sub.id)
            console.log('sub', sub)
        })
    },

    submitHandle: function (e) {
        console.log('form data is', e.detail.value)
        var formData = e.detail.value
        var _this = this
        Object.keys(formData).forEach(function (k, i) {
            var v = formData[k]
            _this.updateTopicField(k, v)
        })
        this.doSubmit(this.data.topic)
    },

    doSubmit: function (data) {
        var isok = this.validate()
        if(!isok){
            return false;
        }

        var _this = this
        data['meta_images_is_multi'] = 'true'
        data['test'] = 'true'
        data['cat'] = 'gooditem'
        data['sub_district_id']  = data['sub_district']['id']
        app.request({
            url: '/api/v1/topics',
            method: 'POST',
            data: data,
            success: function (resp) {
              if(resp.data.status == 1){
                return false;
              }
              wx.navigateTo({url: '/pages/goods/show?id=' + resp.data.data.id})
            }
        })

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
