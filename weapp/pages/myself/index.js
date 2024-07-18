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
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageTitle: '',
        shareTitle: '个人中心',
        shareCover: '',
        LOGIN_FLAG: 0,
        btnlist: [{
                "size": 100,
                "public": true,
                "name": "浏览足迹",
                "link": "{\"cat\":\"page\",\"opentype\":\"navigateTo\",\"path\":\"/pkgMyself/pages/history/index\",\"appid\":\"\",\"apppath\":\"\",\"function\":\"\",\"url\":\"\",\"customPath\":true}",
                "iconUrl": "https://tcdn.udeve.net/udyk/myself_history.png",
                "url": "/pkgMyself/pages/history/index"
            },
            {
                "size": 100,
                "public": true,
                "name": "我的收藏",
                "link": "{\"cat\":\"page\",\"opentype\":\"navigateTo\",\"path\":\"/pkgMyself/pages/favposts/index\",\"appid\":\"\",\"apppath\":\"\",\"function\":\"\",\"url\":\"\",\"customPath\":true}",
                "iconUrl": "https://tcdn.udeve.net/udyk/myself_fav.png",
                "url": "/pkgMyself/pages/favposts/index"
            },
            {
                "size": 100,
                "public": true,
                "name": "我的预约",
                "link": "{\"cat\":\"page\",\"opentype\":\"navigateTo\",\"path\":\"/pkgMyself/pages/booking/index\",\"appid\":\"\",\"apppath\":\"\",\"function\":\"\",\"url\":\"\",\"customPath\":true}",
                "iconUrl": "https://tcdn.udeve.net/udyk/myself_booking.png",
                "url": "/pkgMyself/pages/booking/index"
            }
        ],
        toollist: [{
                "innerText": "",
                "size": 100,
                "public": true,
                "dynamicInnerText": false,
                "name": "买房问答",
                "link": "{\"cat\":\"page\",\"opentype\":\"navigateTo\",\"path\":\"/pkgMyself/pages/qa/index\",\"appid\":\"\",\"apppath\":\"\",\"function\":\"\",\"url\":\"\",\"customPath\":true}",
                "iconUrl": "https://tcdn.udeve.net/udyk/myself_qa.png",
                "badgeText": "",
                "url": "/pkgMyself/pages/history/index"
            },
            {
                "size": 100,
                "public": true,
                "name": "顾问入驻",
                "link": "{\"cat\":\"page\",\"opentype\":\"navigateTo\",\"path\":\"/pkgBroker/pages/broker/join?group_value=broker\",\"appid\":\"\",\"apppath\":\"\",\"function\":\"\",\"url\":\"\",\"customPath\":true}",
                "iconUrl": "https://tcdn.udeve.net/udyk/myself_join.png",
                "url": "/pkgMyself/pages/favposts/index"
            },
            {
                "size": 100,
                "public": true,
                "name": "帮我找房",
                "link": "{\"cat\":\"page\",\"opentype\":\"navigateTo\",\"path\":\"/pages/want/index\",\"appid\":\"\",\"apppath\":\"\",\"function\":\"\",\"url\":\"\",\"customPath\":true}",
                "iconUrl": "https://tcdn.udeve.net/udyk/help_find_post.png",
                "url": "/pkgMyself/pages/booking/index"
            },
            {
                "size": "100",
                "public": true,
                "link": "{\"cat\":\"page\",\"opentype\":\"navigateTo\",\"path\":\"/pkgJisuanqi/pages/daikuan/index\",\"appid\":\"\",\"apppath\":\"\",\"function\":\"\",\"url\":\"\"}",
                "name": "房贷计算",
                "iconUrl": "https://tcdn.udeve.net/udyk/loan_calc.png"
            },
            {
                "size": 100,
                "public": true,
                "link": "{\"cat\":\"page\",\"opentype\":\"navigateTo\",\"path\":\"/pkgNews/pages/news/index\",\"appid\":\"\",\"apppath\":\"\",\"function\":\"\",\"url\":\"\",\"customPath\":true}",
                "name": "资讯列表",
                "iconUrl": "https://tcdn.udeve.net/udyk/65f282498eca49f426f5c9c1.png"
            }
        ],
        commonlist:[
            {
                "size": 100,
                "public": true,
                "name": "关于我们",
                "link": "{\"cat\":\"page\",\"opentype\":\"navigateTo\",\"path\":\"/pkgAbout/pages/about/index\",\"appid\":\"\",\"apppath\":\"\",\"function\":\"\",\"url\":\"\",\"customPath\":true}",
                "iconUrl": "https://tcdn.udeve.net/udyk/myself_about.png",
                "url": "/pkgMyself/pages/history/index"
            },
            {
                "size": 100,
                "public": true,
                "name": "联系客服",
                "link": "{\"cat\":\"page\",\"opentype\":\"navigateTo\",\"path\":\"/pkgAbout/pages/about/index\",\"appid\":\"\",\"apppath\":\"\",\"function\":\"\",\"url\":\"\",\"customPath\":true}",
                "iconUrl": "https://tcdn.udeve.net/udyk/contact_customer_service.png",
                "url": "/pkgMyself/pages/favposts/index"
            },
            {
                "size": 100,
                "public": true,
                "name": "问题反馈",
                "link": "{\"cat\":\"page\",\"opentype\":\"navigateTo\",\"path\":\"/pkgFeedback/pages/Feedback/index\",\"appid\":\"\",\"apppath\":\"\",\"function\":\"\",\"url\":\"\",\"customPath\":true}",
                "iconUrl": "https://tcdn.udeve.net/udyk/problem_feedback.png",
                "url": "/pkgMyself/pages/coupons/index"
            },
            {
                "size": 100,
                "public": true,
                "name": "权限设置",
                "link": "{\"cat\":\"function\",\"opentype\":\"navigateTo\",\"path\":\"/pkgBrokers/pages/brokers/index\",\"appid\":\"\",\"apppath\":\"\",\"function\":\"authsetting\",\"url\":\"\",\"customPath\":true}",
                "iconUrl": "https://tcdn.udeve.net/udyk/myself_quanxian.png",
                "url": "/pkgMyself/pages/booking/index"
            }
        ],
        logoutBtn:{
            "size": "100",
            "public": true,
            "link": "{\"cat\":\"function\",\"opentype\":\"\",\"path\":\"\",\"appid\":\"\",\"apppath\":\"\",\"function\":\"logout\",\"url\":\"\"}",
            "name": "退出登录",
            "iconUrl": "https://tcdn.udeve.net/udyk/myself_logout.png"
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var _this = this
        app.ensureConfigs((myconfigs) => {
            _this.setData({
                btnColor: myconfigs.color.primary_btn,
                color: myconfigs.color.primary,
            })
            var bgColor = myconfigs.color.primary
            wx.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: bgColor,
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
        this.selectComponent('.myselflogin').onShow()
        this.setData({
            LOGIN_FLAG: app.globalData.LOGIN_FLAG
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
        var _this = this
        return {
            title: _this.data.shareTitle,
            imageUrl: _this.data.shareCover,
            path: '/pages/myself/index'
        }
    },

    onShareTimeline: function () {
        var _this = this
        return {
            title: _this.data.shareTitle,
            imageUrl: _this.data.shareCover
        }
    }
})