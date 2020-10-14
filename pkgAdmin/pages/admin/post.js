// pkgAdmin/pages/admin/post.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        postId: null,
        loading: null,
        post: null,
        canEdit: false,
        media_cat_id:0
    },


    onLoad: function (q) {
        var _this = this
        this.setData({ postId: q.id }, () => {
            _this.setData({ loading: true })
            _this.loadPost()
        })

    },



    publicHandle: function (e) {
        this.publicUpdate(true)
    },

    unpublicHandle: function (e) {
        var _this = this
        wx.showModal({
            title: '操作提示',
            content: '确定要将该房源下架吗，下架后访客无法浏览该房源信息。',
            success(res) {
                if (res.confirm) {
                    _this.publicUpdate(false)
                }
            }
        })

    },

    doRefresh: function (e) {
        var _this = this
        var item = this.data.post
        var data = { id: item.id }
        app.request({
            url: '/api/v2/posts/refresh',
            method: 'GET',
            data: data,
            success: function (resp) {
                if (resp.data.status == 1) {
                    return
                }
                wx.showToast({
                    icon: 'none',
                    title: '刷新成功，房源将优先显示',
                })
            }
        })
    },

    publicUpdate: function (isPublic) {
        var id = this.data.postId
        var data = { id: id, is_public: isPublic ? 'true' : 'false' }
        var item = this.data.post
        var _this = this
        app.request({
            url: '/api/v2/posts/public',
            method: 'GET',
            data: data,
            success: function (resp) {
                if (resp.data.status == 1) {
                    return
                }
                item.public = isPublic
                _this.setData({ item: item })
                wx.showToast({
                    title: '操作成功',
                })
            }
        })
    },

    numberTapHandle: function (e) {
        console.log('e', e)
        const { index } = e.currentTarget.dataset
        var c = this.data.post.count_info[index]
        var key = c.key
        switch (key) {
            case 'today_views_count':
                this.gotoVisitors('today_items')
                break;
            case 'views_count':
                this.gotoVisitors('all')
                break;
            case 'favs_count':
                this.gotoPost()
                break;

            case 'today_customers_count':
                this.gotoCustomers(1);
                break;
            case 'pending_customers_count':
                this.gotoCustomers(1);
                break;
            case 'valid_customers_count':
                this.gotoCustomers(2);
                break;
        }
    },

    gotoCustomers: function (status) {
        var url = '/pkgAdmin/pages/admin/customers?post_id=' + this.data.postId + '&status=' + status
        wx.navigateTo({ url: url });
    },

    gotoPost: function (e) {
        var id = this.data.postId
        wx.navigateTo({
            url: '/pages/post/post?id=' + id
        })
    },

    newEventHandle: function (e) {
        wx.navigateTo({
            url: '/pkgEvent/pages/event/new?id=' + this.data.postId
        })
    },

    gotoPoster: function (e) {
        var id = this.data.postId
        wx.navigateTo({
            url: '/pkgPoster/pages/poster/index?id=' + id
        })
    },

    gotoVisitors: function (scope) {
        var id = this.data.postId
        wx.navigateTo({
            url: '/pages/visitors/index?targetType=post&targetId=' + id + '&scope=' + scope
        })
    },
    gotoXiang:function(){
        var id  = this.data.media_cat_id
        wx.navigateTo({
            url: '/pkgAdmin/pages/admin/xiangce/index?media_cat_id='+id
        })
    },
    editHandle: function (e) {
        var id = this.data.postId
        wx.navigateTo({
            url: '/pages/post/form?id=' + id
        })
    },

    loadPost: function () {
        var _this = this
        app.request({
            url: '/api/v1/admin_posts/' + _this.data.postId,
            success: function (resp) {
                var id = resp.data.data.media_cat_id
                if (resp.data.status != 0) {
                    return false
                }
                var post = resp.data.data
                wx.setNavigationBarTitle({
                    title: post.title,
                });
                var items = ["old", "rental", "shop"]
                var r = items.includes(post.group)
                _this.setData({ post: post, canEdit: r,media_cat_id:id })
            }
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

    }
})