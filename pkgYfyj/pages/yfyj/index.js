// pkgYfyj/pages/yfyj/index.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        postId: null,
        loading: false,
        buildings: [],
        rooms: [],
        floors: [], // 楼层数
        post: null,
        currentBuildingIndex: null,

    },

    tabChange: function (e) {
        console.log('e', e)
        // 点击顶部标签切换，滚动到指定未知
        var index = e.detail.index
        this.setData({ currentBuildingIndex: index })
        this.loadBuildingRooms()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var postId = q.id || q.post_id
        var _this = this
        this.setData({ postId: postId }, function () {
            _this.loadBuildings()
            _this.loadPost()
        })
        var floors = []

    },

    loadPost: function () {
        var _this = this
        app.request({
            url: '/api/v1/post_base_info/' + this.data.postId,
            success: function (resp) {
                _this.setData({ post: resp.data.data })
                wx.setNavigationBarTitle({
                    title: '房一价' + resp.data.data.title,
                });
            }
        })
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
                var buildings = resp.data.data.items
                var post = resp.data.data.post
                _this.setData({ buildings: buildings, post: post })

                // 第一次进入页面，自动加载第一个楼栋信息
                if (_this.data.currentBuildingIndex == null) {
                    _this.setData({ currentBuildingIndex: 0 }, function () {
                        _this.loadBuildingRooms()

                    })
                }

            }
        })
    },

    loadBuildingRooms: function () {
        // 加载置顶楼层下的房间信息
        var _this = this
        var b = this.data.buildings[this.data.currentBuildingIndex]
        if (!b) {
            console.log('buildings ', this.data.buildings, 'index', this.data.currentBuildingIndex)
            return false
        }
        var query = { building_id: b.id }
        app.request({
            url: '/api/v1/building_rooms',
            data: query,
            success: function (resp) {
                if (resp.data.status != 0) {
                    return false
                }
                // 先将rooms信息格式化
                // TODO 
                var rooms = resp.data.data.map((r, i) => {
                    // 格式化价格
                    r.average_price += '元/㎡'
                    var t = r.total_price
                    t = t.toFixed(2) + '万'
                    r.total_price = t
                    return r
                })
                // 分组
                var floors = rooms.map((r, i) => { return r.floor })
                floors = floors.sort((a, b) => {
                    if (a.floor < b.floor) {
                        return 1
                    } else {
                        return -1
                    }
                })
                console.log('floors is')
                var groups = []
                floors = Array.from(new Set(floors))
                // 对rooms按照floor分组
                floors.forEach((floor, i) => {
                    var g = { floor: floor, rooms: [] }
                    g.rooms = rooms.filter((r, i) => { return r.floor == floor })
                    g.rooms = g.rooms.sort((a, b) => {
                        if (a.number < b.number) {
                            return -1
                        } else {
                            return 1
                        }

                    })
                    groups.push(g)

                })
                console.log('groups', groups)
                _this.setData({ floorRooms: groups })

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
        return {
            title: this.data.post.title + '的一房一价 ',
        }

    }
})
