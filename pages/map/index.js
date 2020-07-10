// pages/map/index.js
const app = getApp()
const debug = false
var map = null
const greenColor = '#00ae66'
const whiteColor = '#ffffff'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        markers: [],
        groupItems: [],
        tabShow: true,
        posts: [],
        center: {},
        sid: null,
        mapViewHeight: app.globalData.system.windowHeight,
        loading: false,
        postGroup: 'old',
        resultViewState: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        app.checkForceLogin()
        map = wx.createMapContext('map', this)
        wx.setNavigationBarTitle({ title: '地图找房' })
        var _this = this
        app.ensureConfigs((configs) => {
            var currentPostGroup = q.group || configs['post_groups'][0].value
            _this.setData({
                groupItems: configs['post_groups'],
                currentPostGroup: currentPostGroup
            })
            _this.initMap(currentPostGroup)
            // 如果只开启了一个房源模块，或者带有参数进入，那就不显示房源类型切换标签
            if (_this.data.groupItems.length == 1 || q.group) {
                _this.setData({ tabShow: false })
            }

        })
    },

    popShow: function () {
        this.setData({
            popState: 1
        })
    },

    popClose: function () {
        this.setData({
            sid: null,
            popState: 0,
            posts: [],
        })
    },

    initMap: function (group) {
        // 初始化，第一次进入地图时候
        console.log('init map')
        var pointsDict = { 'old': [], 'new': [], 'rental': [] }
        var points = []
        var query = {}
        if (group) {
            query['group_v2'] = group
        }

        var _this = this
        app.request({
            url: '/api/v2/posts',
            data: query,
            success: function (resp) {
                // 第一次加载,根据房源所在的位置，自动定位视野，防止出现定位到其他国家的问题
                console.log('load posts success')
                var group = _this.data.currentPostGroup
                var points = []
                resp.data.data.forEach((post, i) => {
                    var sub = post.sub_district
                    var point = { longitude: sub.longitude, latitude: sub.latitude }
                    if (post.group == group) {
                        points.push(point)
                    }
                })

                map.includePoints({
                    points: points.slice(0, 2),
                    padding: 10,
                    success: function () {
                        // 注意，这里需要延时执行，否则在真机上加载不到标记点
                        // 因为获取屏幕范围时地图视野还未更新，
                        // 获取到的视野还是初始状态下的数据
                        setTimeout(_this.loadSubs, 500)
                    },
                })
            },
        })

    },

    loadSubs: function () {
        // 获取屏幕范围内的经纬度，用于查询数据接口参数
        var _this = this
        map.getRegion({
            success(res) {
                // northeast : 东北，  southwest: 西南
                var latitude = res.southwest.latitude + ',' + res.northeast.latitude
                var longitude = res.southwest.longitude + ',' + res.northeast.longitude
                _this._loadSubs(latitude, longitude)
            }
        })
    },

    _loadSubs: function (latitude, longitude) {
        var group = this.data.currentPostGroup

        // 加载小区数据
        var _this = this
        // 标记点时候，将中心点也标记上
        var query = {
            group: group,
            region_latitude: latitude,
            region_longitude: longitude,
        }
        var markers = []
        app.request({
            url: '/api/v1/map_subs/',
            data: query,
            success: function (resp) {
                _this.setMarkers(resp.data.data, group)
            }
        })

    },

    setMarkers: function (subs, group) {
        console.log('set markers, group is ', group)
        var R = app.globalData.system.pixelRatio / 2.0
        var fontSize = app.globalData.system.fontSizeSetting * 0.8
        var markers = []
        subs.forEach((sub, i) => {
            var marker = {
                iconPath: '/assets/images/none.png',
                id: sub.id,
                alpha: '0.6',
                latitude: sub.latitude,
                longitude: sub.longitude,
                width: 1,
                zIndex: 10,
                height: 1,
                callout: {
                    content: sub.name,
                    display: 'ALWAYS',
                    borderRadius: fontSize,
                    borderColor: greenColor,
                    bgColor: greenColor,
                    color: whiteColor,
                    borderWidth: R,
                    fontSize: fontSize,
                    padding: fontSize * 0.5,
                    textAlign: 'center',
                }
            }
            markers.push(marker)
        })
        console.log('markers is', markers)
        this.setData({ markers: markers })
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

    markertap: function (e) {
        var sid = e.markerId
        if (sid == this.data.sid) {
            return false;
        }

        // 改变marker的背景颜色
        var markers = this.data.markers
        markers.forEach((marker, i) => {
            var _borderColor = greenColor
            var _bgColor = greenColor
            var _color = whiteColor
            if (marker.id == sid) {
                _bgColor = '#ff911b'
                _borderColor = '#ff911b'
            }
            marker['callout']['borderColor'] = _borderColor
            marker['callout']['bgColor'] = _bgColor
            marker['callout']['color'] = _color
        })

        this.setData({ markers: markers, sid: sid })
        this.loadPosts(sid)
        this.popShow()
    },

    loadPosts: function (sid) {
        // 根据小区id查询下面的房源数据
        var pGroup = this.data.currentPostGroup
        var query = {
            sub_district_id: sid,
            group_v2: pGroup,
            order: 'id desc',
            per_page: 999,
        }
        var _this = this
        app.request({
            url: '/api/v2/posts',
            data: query,
            success(res) {
                _this.setData({ posts: res.data.data, total_posts: res.data.meta.total_entries })
            }
        })
    },


    regionchange: function (e) {
        // 视野变化，重新加载sub数据
        // 由于数据的变化会导致地图视野频繁更新，这里记录下最后更新的时间，用于判断短时间内不重复更新
        var tNew = e.timeStamp
        var tOld = this.data.regionChangeTime || 0
        if (tNew - tOld <= 100) {
            return false
        }

        this.popClose()

        if (e.detail.type != 'end') {
            return false
        }

        if (e.causedBy == 'update') {
            return false
        }

        this.setData({ regionChangeTime: e.timeStamp })
        this.loadSubs()

    },


    groupClick: function (e) {
        var g = e.currentTarget.dataset.group
        this.setData({ currentPostGroup: g })
        this.popClose()
        this.loadSubs()
    },

    poiHandle: function (e) {
        // 点击位置点，更新中心点

        var p = e.detail
        // 将位置移动到中心
        this.moveTo(p.latitude, p.longitude)
    },

    moveTo: function (latitude, longitude) {
        map.moveToLocation({
            longitude: longitude,
            latitude: latitude,
            success() {
                // TODO 
            },
        })
    },

    getLocation: function () {
        // 定位到当前位置

        var _this = this
        // 检查是否有位置权限
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.userLocation']) {
                    wx.openSetting({

                    })
                } else {
                    _this._getLocation()
                }
            }
        })
    },

    _getLocation: function () {
        var _this = this
        wx.getLocation({
            success(res) {
                const latitude = res.latitude
                const longitude = res.longitude
                if (debug) {
                    _this.moveTo(31.19143, 121.31641)
                    return false;
                }
                _this.moveTo(res.latitude, res.longitude)
            }
        })
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

    chooseLocation: function () {
        var _this = this
        wx.chooseLocation({
            success: function (res) {
                _this.moveTo(res.latitude, res.longitude)
            },
        })
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
