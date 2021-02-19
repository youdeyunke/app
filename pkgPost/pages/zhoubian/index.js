// pkgAmbitus/pages/ambitus/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        postId: null,
        pois: [],
        post: null,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var _this = this
        var pid = q.post_id || q.id
        this.setData({
            postId: pid
        }, () => {
            _this.loadData()

        })

    },
    loadData() {
        var _this = this
        // 拉取楼盘的基本信息：坐标、名称、id
        app.request({
            url: '/api/v1/post_base_info/' + _this.data.postId,
            success: function (res) {
                //console.log(res.data.data);
                var post = res.data.data
                _this.setData({
                    post: post
                })
                wx.setNavigationBarTitle({ title: post.title + '的周边配套' });
            }
        })
    },
    getMyevent(e) { //e为子组件传过来的值
        //console.log(e.detail)
        this.setData({
            pois: e.detail //这里是改变Page中data上的值
        })
    },
    onShareAppMessage: function () {

    },
})
