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
// pages/user/user.js
const app = getApp()
const tourApi = require("../../../api/tour")
const brokerApi = require("../../../api/broker")
const postApi = require("../../../api/post")

Page({
    /**
     * 页面的初始数据
     */
    data: {
        broker: null,
        bg: null,
        userId: null,
        tagList: [],
        primaryBtnColor: "#ff9600",
        secondaryBtnColor: "#3a67c0",
    },
    showPopup () {
        this.setData({
            show: true
        });
    },

    onClose () {
        this.setData({
            show: false
        });
    },

    callMe: function (e) {
        var mobile = this.data.broker.mobile
        if (!mobile) {
            return false
        }

        wx.makePhoneCall({
            phoneNumber: mobile
        })
    },

    copyWeixin () {
        wx.setClipboardData({
            data: this.data.broker.wechat,
            success (res) {
                wx.getClipboardData({
                    success (res) {
                        // console.log(res.data) // data
                    }
                })
            }
        })
    },

    saveNumber () {
        wx.addPhoneContact({
            firstName: this.data.broker.name,
            mobilePhoneNumber: this.data.broker.mobile
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        
        var _this = this
        var color = app.globalData.myconfigs.color
        _this.setData({
            t0: new Date().getTime(),
            primaryBtnColor: color.primary_btn,
            secondaryBtnColor: color.secondary_btn,
          userId: q.id || q.user_id,
        }, function () {
            _this.loadbroker()
        })
        this.viewHandle()
        this.showLogin()
        this.loadRecomPost()
        //wx.setStorageSync('bindBrokerId', q.user_id || q.id)

    },

    showLogin: function () {
        // 弹出登录授权窗口
        if (app.globalData.token) {
            return
        }

        setTimeout(() => {
            this.selectComponent('.loginwindow').openWindow()
            return

        }, 3000)
    },

    loadTours: function (pid) {
        var _this = this
        var query = {post_id: pid}
        query.cityCode = wx.getStorageSync('cityCode') || ''
        tourApi.getTourList(query).then((resp) => {
            if (resp.data.status != 0) {
                return
            }
            _this.setData({
                tours: resp.data.data,
            })
        })
    },

    viewHandle: function () {
        var uid = this.data.userId
        var _this = this
        //  √ 
        brokerApi.updateBrokerViewsCount(
            uid
        ).then((res) => {
            if (res.data.status != 0) {
                return
            }
            _this.setData({
                viewNums: res.data.data
            })
        })
    },

    loadPostInfo: function (pid) {
        var _this = this
        // √  
        postApi.getPostBaseInfo(
            pid
        ).then((res) => {
            var post = res.data.data
            _this.setData({
                post: post
            })
        })
    },

    loadRecomPost: function () {
        var _this = this
        var query = {
            page: 1,
            per_page: 10
        }
        postApi.getPostList(query).then((resp) => {
            // console.log("2333", resp);
            if (resp.data.code != 0) {
                return
            }
            var postList = resp.data.data.result
            var recomPostList = _this.getRandomItems(postList, 3)
            _this.setData({
                recom_posts: recomPostList
            })
        })
    },

    // 从返回的楼盘数组中随机取三项
    getRandomItems (arr, num) {
        if (arr.length <= num) {
            return arr;
        } else {
            const result = [];
            const copyArr = [...arr];

            while (result.length < num) {
                const randomIndex = Math.floor(Math.random() * copyArr.length);
                const randomItem = copyArr.splice(randomIndex, 1)[0];
                result.push(randomItem);
            }

            return result;
        }
    },

    loadbroker: function () {
        var uid = this.data.userId
        var _this = this
        brokerApi.getBrokerShowDetail({
            user_id: uid
        }).then((resp) => {
            // 有可能没有开通个人主页
            if (resp.data.status != 0) {
                // TODO 显示未开通主页的情况
                return
            }
            var u = resp.data.data
            _this.setData({
                broker: u,
            })
            _this.loadPostInfo(u.post_id)
            _this.loadTours(u.post_id)
            if (resp.data.data.tags) {
                var tagList = resp.data.data.tags.split(',')
                _this.setData({
                    tagList: tagList
                })
            }
            // _this.viewHandle()
            var title = u.name + "的电子名片"
            wx.setNavigationBarTitle({
                title: title
            })
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
        var _this = this
        setTimeout(() => {
            if (!this.data.broker) {
                this.loadbroker()
            }

        }, 1000)

        var color = app.globalData.myconfigs.color
        this.setData({
            primaryBtnColor: color.primary_btn,
            secondaryBtnColor: color.secondary_btn,
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
        var t = new Date().getTime() - this.data.t0
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },



    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var _this = this
        return {
            title: _this.data.broker.name + '的名片',
            desc: '帮你找好房',
            imageUrl: _this.data.broker.avatar,
        }
    },
    onShareTimeline () {
        var _this = this
        return {
            title: _this.data.broker.name + '的名片',
            imageUrl: _this.data.broker.avatar
        }
    },

})