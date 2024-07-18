/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
// pkgPost/pages/detail/index.js
const app = getApp()
const postApi = require("../../../api/post")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        postId: null,
        post: null,
        content: null,
        metaItems: [],

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var _this = this
        this.setData({
            postId: q.id || q.post_id,
        }, () => {
            _this.loadData()
        })
    },


    loadData: function () {
        this.setData({ loading: true })
        var _this = this
        postApi.getPostDetailContent(_this.data.postId).then((resp) => {
            var post = resp.data.data
            var metaItems = []
            if(post.meta){
                var meta = post.meta.replaceAll("：", ":")
                metaItems = meta.split('\n').map((line, index) => {
                    var res = line.split(':')
                    if (res.length == 1) {
                        // 解析错误
                        return { label: res[0], text: '-' }
                    }
                    var label = res.splice(0, 1)[0]
                    var text = res.join(':')
                    return { label: label, text: text }
                })
            }

            console.log('meta items', metaItems)
            _this.setData({ post: post, metaItems: metaItems })
            wx.setNavigationBarTitle({
                title: post.title,
            });
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
        var p = this.data.post
        return {
            title: p.title,
            imageUrl: p.cover,
        }

    }
})