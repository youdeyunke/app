// pkgYfyj/pages/yfyj/show.js
const app = getApp()
const postApi = require("../../../api/post")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        room: null,
        post: null,
        building: null,
        roomType: null,
        roomId: null,
        loading: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        wx.setNavigationBarTitle({
            title: '户型详情',
        });
        var roomId = q.id || q.room_id
        var _this = this
        this.setData({ roomId: roomId }, function () {
            _this.loadData()
        })

    },


    loadData: function () {
        var _this = this
        postApi.getBuildingRoomDetail(_this.data.roomId).then((resp)=>{
            if (resp.data.status != 0) {
                return flase
            }
            var room = resp.data.data.room
            // 计算首付不同情况下的价格
            var showfuItems = []
            var ns = [3, 5, 8]
            ns.forEach((n, i) => {
                var v = n * 0.1
                var amount = room.total_price * v / 10000
                amount = amount.toFixed(2)
                showfuItems.push({ amount: amount, n: n })
            })
            // 处理价格
            room.average_price += '元/㎡'
            var t = room.total_price / 10000
            t = t.toFixed(2)
            t += '万'

            room.total_price = t
            var typeImage = 'https://qiniucdn.udeve.cn/wefang-sass/type-image-none.jpg'
            var rt = resp.data.data.room_type
            var imgs = rt.images || ''
            if (imgs.split(',').length > 0) {
                typeImage = imgs.split(',')[0]
            }
            _this.setData({
                room: room,
                showfuItems: showfuItems,
                building: resp.data.data.building,
                post: resp.data.data.post,
                roomType: resp.data.data.room_type,
                typeImage: typeImage,
            })
        })

    },

    gotoJisuan: function () {
        var url = '/pkgJisuanqi/pages/daikuan/index'
        wx.navigateTo({
            url: url,
        });
    },

    gotoType: function () {
        var url = '/pkgType/pages/type/show?id=' + this.data.roomType.id
        wx.navigateTo({
            url: url,
        });

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
        return {
            title: this.data.post.title + '的户型详情',
            imageUrl: this.data.typeImage
        }

    }
})
