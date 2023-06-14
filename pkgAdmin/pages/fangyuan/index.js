/// pages/myself/posts.js
const app = getApp()
var auth = require('../../../utils/auth.js');
const postApi = require("../../../api/post")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: false,
        modulees: [],
        showModules: false,
        moduleIndex: 0,
        popShow: false,
        userInfo: null,
        searchText: '',
        postItems: [], // 新房返回结果 
        houseItems: [],  
        rentalItems: [],
        shopItems: [] ,
    },

    /**
     * 生命周期函数--监听页面加载
     */

    onLoad: function (q) {
        var _this = this
        var modules = app.globalData.myconfigs['module_configs'].map((g, i) => {
            g.value = g.key
            return g
        })
        var data = {showmodules: modules.length >= 2, modules: modules }
        this.setData(data)
        this.loadData() 

    },

    loadData: function(){
        this.loadPosts() 
        // TODO loadHouses()
        
    },


    loadPosts: function () {
        /* 拉取我的房源 */
        this.setData({ loading: true })
        var _this = this
        var data={
            per_page: 999,
            kw: _this.data.searchText,
        }
        // 有待检测
        // app.request({
        //     url: '/api/v1/admin_posts/有待检测',
        //     data: {
        //         per_page: 999,
        //         kw: _this.data.searchText,

        //     },
        //     success: function (resp) {
              
        //     }
        // })
        postApi.getAdminPostList(data).then((resp)=>{
            _this.setData({ loading: false })
            if (!resp.data.status == 0) {
                return false
            }
            var posts = resp.data.data.map((p, i) => {
                return p
            })
            _this.setData({
                postItems: resp.data.data,
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
        wx.setNavigationBarTitle({
            title: '我的房源',
        })
        var _this = this 
        auth.ensureUser((userInfo) => {
            _this.setData({userInfo: userInfo})
        })  
        if(app.globalData.backToReload){
            this.loadData()  
            app.globalData.backToReload = false
        }  
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
        var _this = this
        this.loadData() 
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
