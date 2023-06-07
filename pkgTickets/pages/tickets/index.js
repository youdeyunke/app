// pkgTickets/pages/tickets/index.js
const app = getApp()
const baseInFoApi = require("../../../api/post")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cats: [
            {name: "摇号结果", id: 1}, 
            {name: '意向登记', id: -1},
        ],
        items: [],
        postId: null,
        posts: [],
        kw: '',
        tabIndex: 0,
        catId: null,
        loading: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    delHandle: function () {
        this.setData({
            kw: ''
        })
    },
    onLoad: function (q) {
        const {
            post_id
        } = q
        this.setData({
            postId: post_id
        })
    },
    onShow: function () {
        this.loadPostData()
        this.loadData()
    },
    tabChange(e) {
        this.setData({
            tabIndex: e.detail.index,
            items: [],
            page: 1
        })
        this.loadData()

    },
    loadPostData: function () {
        var _this = this
          // 有待检验
          baseInFoApi.getPostBaseInfo(this.data.postId
        ).then((resp)=>{
            var s = resp.data.data.ticket_summary 
            var tips = '暂无摇号结果，或数据还未录入'
            if(s.enable){
                tips = s.content + ' ' + "仅显示部分摇号数据，需要查询具体数据，请根据意向登记号或身份证尾号查询。"
            }

            _this.setData({
                post: resp.data.data,
                tips: tips,
            })
            wx.setNavigationBarTitle({
                title: resp.data.data.title + '摇号结果',
            })
        })
    },
    loadData() {
        var _this = this
        var scope = 'all'
        if(this.data.tabIndex==0){
            scope  = 'hit'
        }
   
        var params = {
            post_id: this.data.postId,
            page: 1,
            kw: this.data.kw,
            scope: scope, 
        }
        app.request({
            url: '/api/v1/post_tickets',
            data: params,
            success: function (res) {
                var items = res.data.data
                _this.setData({
                    items: items,
                })
            }
        })
    },
    onChange(e) {
        this.setData({
            kw: e.detail
        })
        console.log('e',e)
    },
    onSearch() {
        this.setData({
            items: [],
            page: 1
        })
        this.loadData()
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({
            items: [],
            page: 1
        })
        this.loadData()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // 不加载更多
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: this.data.post.title + '摇号结果'
        }
    },
    onShareTimeline: function () {
        return {
            title: this.data.post.title + '摇号结果'
        }
    }
})