// pages/map/index.js
const app = getApp()
const debug = false
const bgColor = '#1989fa'
const whiteColor = '#ffffff'
const SCALE_DICT = {
    'city': 8,
    'district': 10,
    'sub_district': 12,
    'post': 12,
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        level: 'city',
        cityId: null,
        scale: 8,
        map: null,
        filter: {
            group: 'new',
        },
        filterConfigs: [],
        districtId: null,
        subDistrictId: null,
        postId: null,
        markers: [],
        groupItems: [],
        tabShow: true,
        post: null,
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
        this.initFilter()
        app.checkForceLogin()
        const map = wx.createMapContext('map', this)
        this.setData({ map: map })
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

    renderPost: function (pid) {
        // 显示所选房源
        console.log('render post', pid)
        var _this = this
        app.request({
            url: '/api/v4/posts/' + pid,
            success: function (resp) {
                if (resp.data.status != 0) {
                    return false
                }
                var post = resp.data.data
                _this.setData({ post: resp.data.data })
                _this.moveTo(post.latitude, post.longitude)
                _this.popShow()
            }
        })

    },

    filterChange: function (e) {
        this.setData({ filter: e.detail })
        this.loadMarkers(this.data.level)
    },

    initFilter: function () {
        var items = [
            app.globalData.filterAreaItem,
            app.globalData.filterTotalPriceItem
        ]
        // 强制返回新房过滤配置
        this.setData({ filterConfigs: items })
    },


    popShow: function () {
        this.setData({
            popState: 1
        })
    },

    popClose: function () {
        var scale = SCALE_DICT['sub_district']
        console.log('pop close, set scale', scale)
        this.setData({ popState: 0, scale: scale })
    },

    loadCities: function () {
        // 第一次进入地图，先加载行政区信息
    },

    loadPosts: function () {
        // 点击
    },

    initMap: function (group) {
        // 初始化，第一次进入地图时候
        var filter = this.data.filter
        filter.group = group
        this.setData({ filter: filter })
        this.loadMarkers('city')
    },

    renderMarkers: function (markers) {

        // 将Markers 画在地图上
        // 根据不同的level，显示效果有所区别
        var _this = this
        var R = app.globalData.system.pixelRatio / 2.0
        var fontSize = app.globalData.system.fontSizeSetting * 0.8
        var padding = this.data.level == 'post' ? fontSize * 0.5 : fontSize * 2
        markers.map((m, i) => {
            m.id = m.level + '.' + m.id
            m.iconPath = '/assets/images/none.png',
                m.alpha = '0.6',
                m.width = 1,
                m.zIndex = 10,
                m.height = 1,
                m.callout = {
                    content: m.name,
                    display: 'ALWAYS',
                    borderRadius: fontSize,
                    borderColor: whiteColor,
                    bgColor: bgColor,
                    color: whiteColor,
                    borderWidth: R,
                    fontSize: fontSize,
                    padding: padding,
                    textAlign: 'center',
                }
            return m
        })
        var k = this.data.level
        var scale = SCALE_DICT[k]
        var m = markers[0]
        var _this = this
        this.moveTo(m.latitude, m.longitude)
        this.setData({ markers: markers, scale: scale })
        // 将视野移动到
        //this.data.map.includePoints({
        //    points: markers,
        //    padding: 10,
        //    success: function () {
        //    },
        //})
    },

    upLevel: function () {
        // 返回上级视野
        var _this = this
        switch (this.data.level) {
            case 'city':
                break;
            case 'district':
                _this.loadMarkers('city')
                break;
            case 'sub_district':
                _this.loadMarkers('district')
                break;
            case 'post':
                _this.loadMarkers('sub_district')
                break;
        }
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

    loadMarkers: function (level) {
        var _level = level || 'district'
        var data = {
            city_id: this.data.cityId,
            district_id: this.data.districtId,
            sub_district_id: this.data.subDistrictId,
            level: _level,
            filter: this.data.filter,
        }
        // merge filter

        var _this = this
        console.log('load markers with data', data)
        app.request({
            url: '/api/v1/map_markers',
            method: 'POST',
            data: data,
            success: function (resp) {
                console.log('markers resp', resp.data.data)
                if (resp.data.status != 0) {
                    return false
                }
                if (resp.data.data && resp.data.data.length > 0) {
                    _this.setData({ level: _level })
                    _this.renderMarkers(resp.data.data)
                    return false
                }
                wx.showToast({ title: '没有数据', icon: 'none' });
            }
        })
    },

    markertap: function (e) {
        console.log('marker click', e)
        var _this = this
        var markerId = e.markerId
        this.setData({ markerId: markerId })
        var res = markerId.split('.')
        var currentLevel = res[0]
        var nid = res[1]

        // 根据所点击的marker不同，加载不同数据
        var nextLevel = ''
        switch (currentLevel) {
            case 'city':
                this.setData({ cityId: nid })
                nextLevel = 'district'
                break;
            case 'district':
                this.setData({ districtId: nid })
                nextLevel = 'sub_district'
                break;
            case 'sub_district':
                this.setData({ subDistrictId: nid })
                nextLevel = 'post'
                break;
            case 'post':
                // 房源被点击
                // 改变被点击的marker的背景颜色
                this.markerColorHandle(markerId)
                this.setData({ postId: nid })
                nextLevel = 'post'
                return this.renderPost(nid)
                return

        }
        // 加载下一级markers
        _this.loadMarkers(nextLevel)

        // TODO 
        //this.popShow()
    },
    markerColorHandle: function (markerId) {
        var markers = this.data.markers
        markers.forEach((marker, i) => {
            var _bgColor = bgColor
            var _color = whiteColor
            if (marker.id == markerId) {
                _bgColor = '#ff911b'
            }
            marker['callout']['bgColor'] = _bgColor
            marker['callout']['color'] = _color
        })
        this.setData({ markers: markers, markerId: markerId })
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
                var scale = SCALE_DICT['post']
                _this.setData({ posts: res.data.data, total_posts: res.data.meta.total_entries, scale: scale })
            }
        })
    },


    regionchange: function (e) {
        console.log('视角变化', e.type, e.causedBy)
        return
        if (e.type == 'begin') {
            this.scaleHandleStart(e)
        }
        if (e.type == 'end') {
            this.scaleHandleEnd(e)
        }
    },


    scaleHandleEnd: function (e) {
        if (this.data.scaleHandleEnable != true || e.causedBy != 'scale') {
            return false
        }
        // 地图被拖放
        console.log('处理手势拖动缩放的情况', e)
        // 注意： 只需要处理用户手动缩放的情况
        // update的情况不需要处
        //  doc : https://developers.weixin.qq.com/miniprogram/dev/component/map.html
        this.popClose()
        var _this = this
        this.data.map.getScale({
            success(res) {
                console.log('scale', res.scale)
                // 视野级别： 0~8：城市， 8~10：行政区， 10~12：商圈， 12~16：小区
                // 当视野扩大，自动显示上一级

                if (res.scale <= 10 && _this.data.level == 'district') {
                    _this.loadMarkers('city')
                    return
                }

                if (res.scale <= 12 && _this.data.level == 'sub_district') {
                    _this.loadMarkers('district')
                    return
                }

                if (res.scale <= 16 && _this.data.level == 'post') {
                    _this.loadMarkers('sub_district')
                    return
                }

            },
        })

    },



    groupClick: function (e) {
        var g = e.currentTarget.dataset.group
        this.setData({ currentPostGroup: g })
        this.popClose()
    },


    moveTo: function (latitude, longitude) {
        this.setData({ center: { longitude: longitude, latitude: latitude } })
        this.data.map.moveToLocation({
            longitude: longitude,
            latitude: latitude,
            success() { }
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
