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
const app = getApp()
const postApi = require("../../../api/post")
const brokerApi = require("../../../api/broker")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: true,
        brokerId: null,
        pid: null,
        tags: [],
        group: 0,
        items: [],
        primaryColor:'#2B78E4'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var _this = this 
        wx.setNavigationBarTitle({
            title: '全部户型列表'
        });
        var pid = q.post_id || q.id
        var brokerId = q.broker_id
        var color = app.globalData.myconfigs.color
        this.setData({
            pid: pid,
            brokerId: brokerId,
            primaryColor: color.primary
        })
        this.loadTypes(pid)
        this.loadPostInfo(pid)
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
            var user = app.globalData.userInfo
            data.pageQuery = 'id=' + pid
            if (user && user.is_broker) {
                data.pageQuery += '&broker_uid=' + user.id
            }

            data.pageTitle = post.title + ' 户型介绍'
            data.pageCover = post.cover
            _this.setData(data)
        })
    },

    loadTypes: function (pid) {
        var _this = this
        var query = {
            id: pid
        }
        postApi.getPostTypeList(query).then((resp) => {
            if (resp.data.status != 0) {
                return false
            }
            var items = resp.data.data

            // 标签
            var tags = [{
                name: '全部',
                group: 0
            }]
            var tagDict = {}
            items.forEach((item, i) => {
                item.cover = 'https://tcdn.udeve.net/fang/pkgPost/image-none.png'
                if (item.images && item.images_list.length >= 1) {
                    item.cover = item.images_list[0]
                }
                var key = item.s.toString() // 几室
                if (!tagDict[key] == true) {
                    tagDict[key] = true
                }
            })

            Object.keys(tagDict).forEach((key, i) => {
                var tag = {
                    name: key + '室',
                    group: key
                }
                tags.push(tag)
            })
            _this.setData({
                items: items,
                tags: tags,
                loading: false
            })

            if (items.length == 0) {
                wx.showToast({
                    icon: 'none',
                    title: '没有上传户型数据,无法显示',
                })
                setTimeout(() => {
                    wx.navigateBack({
                        delta: -1,
                    })

                }, 1500)

            }
        })
    },

    groupClick: function (e) {
        var g = e.target.dataset['group']
        if (g == this.data.group) {
            return false
        }
        this.setData({
            group: g
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
        this.setData({
            t0: new Date().getTime(),
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

        return {
            title: this.data.pageTitle,
            path: 'pkgBuilding/pages/type/index?' + this.data.pageQuery,
            imageUrl: this.data.pageCover
        }
    },



    onShareTimeline: function () {


        return {
            title: this.data.pageTitle,
            query: this.data.pageQuery,
            imageUrl: this.data.pageCover
        }
    }

})