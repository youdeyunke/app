const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: true,
        pid: null,
        tags: [],
        group: 0,
        items: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        wx.setNavigationBarTitle({ title: '全部户型列表' });
        var pid = q.post_id || q.id
        this.setData({ pid: pid })
        this.loadTypes(pid)
        this.loadPostInfo(pid)
    },

    loadPostInfo: function (pid) {
        var _this = this
        app.request({
            url: '/api/v1/post_base_info/' + pid,
            success: function (res) {
                //console.log(res.data.data);
                var post = res.data.data
                _this.setData({
                    post: res.data.data
                })
                wx.setNavigationBarTitle({ title: post.title + '的全部户型' });
            }
        })
    },

    loadTypes: function (pid) {
        var _this = this
        var query = { id: pid }
        app.request({
            url: '/api/v1/types',
            data: query,
            success: function (resp) {
                if (resp.data.status != 0) {
                    return false
                }
                var items = resp.data.data
                // 标签
                var tags = [{ name: '全部', group: 0 }]
                var tagDict = {}
                items.forEach((item, i) => {
                    item.cover = '../../images/image-none.png'
                    if (item.images && item.images_list.length >= 1) {
                        item.cover = item.images_list[0]
                    }
                    var key = item.s.toString() // 几室
                    if (!tagDict[key] == true) {
                        tagDict[key] = true
                    }
                })

                Object.keys(tagDict).forEach((key, i) => {
                    var tag = { name: key + '室', group: key }
                    tags.push(tag)
                })
                _this.setData({ items: items, tags: tags, loading: false })
            }
        })
    },

    groupClick: function (e) {
        var g = e.target.dataset['group']
        if (g == this.data.group) {
            return false
        }
        this.setData({ group: g })
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
        var _this = this
        var title = '户型介绍'
        return {
            title: title,
            path: 'pkgBuilding/pages/type/index?pid=' + _this.data.pid,
            imageUrl: image
        }
    },
})