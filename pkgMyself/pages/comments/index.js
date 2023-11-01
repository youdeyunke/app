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
// pages/myself/comments.js
const app = getApp()
const mycommentApi = require("../../../api/mycomment")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageItems: [],
        loading: false,
        page: 1,
        per_page: 10,
        order: 'id desc'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.loadData()
    },

    reload: function () {
        this.setData({
            page: 1,
            pageItems: [],
        }, () => {
            this.loadData()
        })
    },

    loadData: function () {
        this.setData({
            loading: true
        })
        var _this = this
        var query = {
            page: _this.data.page,
            per_page: _this.data.per_page,
            order: _this.data.order,
        }
        mycommentApi.getMineCommentList(query).then((resp) => {
            _this.setData({
                loading: false,
                end: resp.data.end,
            })
            if (resp.data.status != 0) {
                return false
            }
            var i = _this.data.page - 1
            var data = {}
            var key = 'pageItems[' + i + ']'
            data[key] = resp.data.data.map((c) => {
                // 计算跳转路径
                var url = ''
                var tid = c.target_id
                switch (c.target_type) {
                    case 'post':
                        url = '/pkgPost/pages/show/index?id=' + tid
                        break

                    case 'event':
                        url = '/pkgEvent/pages/event/show?id=' + tid
                        break
                    case 'mycomment':
                        url = '/pkgComment/pages/comment/show?id=' + tid
                        break
                }
                c.target_url = url
                return c
            })
            _this.setData(data)
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

    doDelete: function (cid) {
        var _this = this
        mycommentApi.deleteComment(cid).then((res) => {
            _this.reload()
        })
    },

    deleteHandle: function (e) {

        const { cid } = e.currentTarget.dataset
        var _this = this

        // 删除评论
        wx.showModal({
            title: '删除',
            content: '确定要删除这条评论吗？',
            success: function (res) {
                if (!res.confirm) {
                    return
                }
                _this.doDelete(cid)
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
        var page = this.data.page + 1
        this.setData({
            page: page
        }, () => {
            this.loadData()
        })

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})