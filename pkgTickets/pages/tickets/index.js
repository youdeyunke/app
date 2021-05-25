// pkgTickets/pages/tickets/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cats: [],
        items: [],
        postId: null,
        posts: [],
        kw: '',
        tabIndex: 0,
        page: 1,
        pageSize: 10,
        catId: null,
        loading: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    delHandle:function(){
        this.setData({
            kw:''
        })
    },
    onLoad: function (q) {
        const { post_id } = q
        this.setData({ postId: post_id })
    },
    onShow: function () {
        this.loadPostData()
        this.loadData()
    },
    tabChange(e) {
        this.setData({
            tabIndex:e.detail.index,
            items:[],
            page:1
        })
        this.loadData(this.data.cats[e.detail.index].id)
        // TODO 切换cat
    },
    loadPostData: function(){
        var _this = this  
        app.request({
            url: '/api/v1/post_base_info/' + this.data.postId, 
            success: function(resp){
                _this.setData({post: resp.data.data})
                wx.setNavigationBarTitle({
                    title: resp.data.data.title+'摇号结果',
                  })
            }
        })
    },
    loadData() {
        var _this = this
        var id = id || 10
        var params = {
            post_id: this.data.postId,
            page: this.data.page,
            cat_id:id,
            
            per_page: this.data.pageSize,
            kw:this.data.kw
        }
        app.request({
            url: '/api/v1/post_tickets',
            data: params,
            success: function (res) {
                var items = _this.data.items
                var arr = [...items, ...res.data.data]
                _this.setData({
                    items: arr,
                    cats: res.data.cats, 
                })
            }
        })
    },
    onChange(e) {
        this.setData({ kw: e.detail.value })
    },
    onSearch() {
        this.setData({
            items:[],
            page:1
        })
        this.loadData(this.data.cats[this.data.tabIndex].id)
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({
            items:[],
            page:1
        })
        this.loadData(this.data.cats[this.data.tabIndex].id)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var page = this.data.page
        page = page + 1
        this.setData({ page: page })
        this.loadData()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    }
})
