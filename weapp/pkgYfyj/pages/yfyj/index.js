/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// pkgYfyj/pages/yfyj/index.js
const app = getApp()
const postApi = require("../../../api/post")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        postId: null,
        loading: true,
        buildings: [],
        rooms: [],
        currentRoomId: null,
        floors: [], // 楼层数
        post: null,
        currentBuildingIndex: 0,
        currentBuild: '',
        primaryColor: '',
    },


    itemClick: function (e) {
        var item = e.detail
        this.setData({ currentRoomId: item.id })
        this.selectComponent('#room-detail').onShow(item)
        // 点击了一房一价中的具体房间
        var t = '点击:' + this.data.post.title + '房间：' + item.name + '的一房一价'
        app.markVisitorAction(t, item.id, 0)
    },

    tabChange: function (e) {
        // 点击顶部标签切换，滚动到指定未知
        var index = e.detail.index
        this.setData({ currentBuildingIndex: index })
        this.formatRoomsData()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var postId = q.id || q.post_id
        var _this = this
        this.setData({ postId: postId , primaryColor: app.globalData.color.primary}, function () {
            _this.loadData()
        })
        var floors = []
    },

    buildClick(e){
      var build = e.detail
      var currentBuildingIndex = this.data.buildings.findIndex((b) => b === build)
      if (currentBuildingIndex === -1) {
        return
      }
    this.setData({ currentBuildingIndex: currentBuildingIndex })
      console.log(e);
    },

    formatRoomsData: function () {
        var rooms = this.data.rooms
        // 去重
        // 取出buildings
        var buildings = rooms.map((room) => {
            return room.building;
        });
        buildings = Array.from(new Set(buildings)).sort();
        buildings = buildings.filter((building) => building);

        // 取出floors
        var floors = rooms.map((room) => {
            return room.floor;
        });
        floors = Array.from(new Set(floors)).sort().reverse();

        // 以floor分组
        var groupsData = [];
        buildings.forEach((building) => {
            var bitem = { building: building, floors: [] };
            floors.forEach((floor, i) => {
                var g = { floor: floor, rooms: [] };
                g.rooms = rooms.filter((r, i) => {
                    return r.floor == floor && r.building === building;
                });
                g.rooms = g.rooms.sort((a, b) => {
                    if (a.number < b.number) {
                        return -1;
                    } else {
                        return 1;
                    }
                });
                if (g.rooms.length > 0) {
                    bitem.floors.push(g);
                }
            });
            groupsData.push(bitem);
        });
        var cindex = this.data.currentBuildingIndex
        this.setData({
            buildings: buildings,
            groupsData: groupsData,
            currentBuild: buildings[cindex]
        })
    },


    loadData: function () {
        // 加载置顶楼层下的房间信息
        var _this = this
        var query = { post_id: this.data.postId }
        postApi.getBuildingRoomList(query).then((resp) => {
            if (resp.data.status != 0) {
                return false
            }

            var rooms = resp.data.data.data

            wx.setNavigationBarTitle({
              title: resp.data.data.post.title + '一房一价',
          });

            _this.setData({ loading: false, post: resp.data.data.post, rooms: rooms }, () => {
                _this.formatRoomsData()
            })
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
        var t1 = new Date().getTime()
        var t = t1 - this.data.t0
        var name = "浏览：" + this.data.post.title + '的一房一价 '
        app.markVisitorAction(name, null, t)

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
        var path = '/pkgYfyj/pages/yfyj/index?id=' + this.data.postId
        return {
            title: this.data.post.title + '的一房一价 ',
            path: path,
        }

    },
    onShareTimeLine: function () {
        var _this = this
        var query = 'id=' + this.data.postId
        return {
            title: this.data.post.title + '的一房一价 ',
            imageUrl: this.data.post.cover,
            query: query
        }
    },

})
