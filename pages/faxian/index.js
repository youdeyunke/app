// pages/faxian/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            { name: '楼市资讯', id: 'news' },
            { name: '买房问答', id: 'qa' },
           // { name: '活动', id: 'tour' },
        ],
        newsCats: [], //  资讯分类
        page: 1,
        kw: '',
        loading: true,
        tabIndex: 0,
        value:''
    },

    tabChangeHandle: function (e) {
        var tabs = this.data.tabs
        var index = this.data.tabIndex
        var name = tabs[index].id
        // 防止重复点击 
        if (name == this.data.tab) {
            return
        }
        this.setData({
             tab: name,
             kw:'',
             page:1,
             value:''
        })
    },
    kwChange: function (e) {
        var kw = e.detail
        this.setData({
            kw:kw
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        wx.setNavigationBarTitle({ title: '发现', });
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
        // 触底加载更多
        var page = this.data.page
        page = page + 1
        this.setData({
            loading:true,
            page:page
        })
        // console.log("page",this.data.page)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})