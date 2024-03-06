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
// pkgDoc/pages/doc/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        postId: 111,
        docItem: [],
        title: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.loadData()
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.loadData()
    },
    loadData () {
        var _this = this
        app.request({  //已删除该功能
            url: '/api/v1/post_docs?post_id=' + this.data.postId,
            success: function (res) {
                _this.setData({
                    docItem: res.data.data,
                    title: res.data.post.title + '的楼盘资料'
                })
                wx.setNavigationBarTitle({ title: _this.data.title, });
            }
        })
    },
    onShareAppMessage () {
        return {
            title: this.data.title,
            path: 'pkgDoc/pages/doc/indexpost_id=' + this.data.postId
        }
    },
    onShareTimeline () {
        return {
            title: this.data.title,
            path: 'pkgDoc/pages/doc/indexpost_id=' + this.data.postId
        }
    }
})