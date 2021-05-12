// pkgTickets/pages/tickets/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cats: [],
        items: [],
        postId: '',
        posts: [],
        kw: '',
        tabIndex: 0,
        page: 1,
        pageSize: 10,
        loading: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        const { post_id } = q
        this.setData({ postId: post_id })
        this.loadData()
        this.loadPostData()
    },
    tabChange(name) {
        const { index } = name.detail
        // TODO 切换cat
    },

    loadPostData: function(){
        var _this = this  
        app.request({
            url: '/api/v1/post_base_info/' + this.data.post_id, 
            success: function(resp){
                _this.setData({post: resp.data.data})
            }
        })
    },
    loadData(status) {
        var _this = this
        var status = status || 0
        
        var cat_id = '' 
        if(this.data.cats.length > 0){
           cat_id = this.data.cats[this.data.tabIndex].id
        }
        var params = {
            post_id: this.data.postId,
            page: this.data.page,
            cat_id:cat_id,
            per_page: this.data.pageSize,
            status: status
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
                console.log('res.cats', res.data.cats)
            }
        })
    },
    onChange(e) {
        this.setData({ kw: e.detail })
    },
    onSearch() {
        var _this = this
        if (!this.data.kw) {
            this.setData({ page: 1, posts: [] })
            this.loadData()
            return
        } 
        var data = {}
        data.post_id = this.data.post_id
        data.kw = this.data.kw
        data.status = this.data.titles[this.data.tabIndex].status
        app.request({
            url: '/api/v1/post_tickets',
            data: data,
            success: function (res) {
                _this.setData({ posts: res.data.data })
            }
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        var page = 1
        this.setData({ page: page, posts: [] })
        this.loadData(this.data.titles[this.data.tabIndex].status)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var page = this.data.page
        page = page + 1
        this.setData({ page: page })
        this.loadData(this.data.titles[this.data.tabIndex].status)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        setTimeout((res) => {
            this.loadData(0)
        }, 1500)

    }
})
