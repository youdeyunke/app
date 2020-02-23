// pkgType/pages/type/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: true,
        currentIndex: 0,
        postId: '',
        buildingId: '',
        item: {},
        items: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        this.setData({
            postId: q.post_id,
            buildingId: q.building_id || ''
        })
        this.loadBuildings()
    },

    viewImage: function () {
        // TODO
        var item = this.data.item
        wx.previewImage({
            current: item.image,
            urls: [item.image],
        });

    },

    updateCurrentItem: function () {
        var item = this.data.items[this.data.currentIndex]
        this.setData({ item: item })
    },

    saveHandle: function () {
        console.log('save handle', this.data.item)
        var url = this.data.item.image
        app.downloadImage(url, function (res) {
            // done
        })
    },


    onShareAppMessage: function () {
        var _this = this
        var item = this.data.item
        var title = '【' + this.data.post.title + '】' + '一房一价:'
        var image = item.image
        return {
            title: title,
            path: 'pkgBuilding/pages/building/index?post_id=' + _this.data.postId,
            imageUrl: image
        }
    },


    loadBuildings: function () {
        var _this = this
        var query = { post_id: this.data.postId }
        app.request({
            url: '/api/v1/buildings',
            data: query,
            success: function (resp) {
                if (resp.data.status != 0) {
                    return false
                }
                //  如果是带有building id进入的，则自动选中
                var items = resp.data.data.items
                var post = resp.data.data.post
                var data = {
                    items: items,
                    loading: false,
                    post: post,
                }
                items.forEach((item, i) => {
                    if (item.id.toString() == _this.data.buildingId.toString()) {
                        data.currentIndex = i
                    }
                })
                _this.setData(data)
                _this.updateCurrentItem()
            }
        })
    },

    itemChange: function (e) {
        var index = e.detail.name
        var item = this.data.items[index]
        this.setData({ currentIndex: index, item: item })
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

})