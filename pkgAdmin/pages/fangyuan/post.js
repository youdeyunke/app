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
        media_cat_id: 0
    },


    onLoad: function (q) {
        var _this = this
        this.setData({ postId: q.id || q.post_id }, () => {
            _this.setData({ loading: true })
            _this.loadPost()
        })

    },

    gotoPost: function (e) {
        var id = this.data.postId
        wx.navigateTo({
            url: '/pkgPost/pages/show/index?id=' + id
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

    gotoXiang: function () {
        var id = this.data.media_cat_id
        var postid = this.data.postId
        wx.navigateTo({
            url: '/pkgAdmin/pages/admin/xiangce/index?target_type=post&target_id=' + postid
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
                _this.setData({ post: post, canEdit: r, media_cat_id: id })
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