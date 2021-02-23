// components/map.js
const app = getApp()


Component({
    /**
     * 组件的属性列表
     */
    properties: {
        longitude: { type: Number },
        latitude: { type: Number },
        enableScroll: { type: Boolean, value: false },
        width: { type: Number, value: 750 },
        height: { type: Number, value: 320 },
        scale: { type: Number, value: 15 },
        name: { type: String, value: null },
        pois: { type: Array, value: null }
    },

    /**
     * 组件的初始数据
     */
    data: {
        markers: [],
        map: null,
        points: []
    },
    ready: function () {
        this.setMarker()
    },
    attached: function () {
        var map = wx.createMapContext('map', this);
        this.setData({
            map: map
        })
    },
    observers: {
        'pois': function (pois) {
            if (!this.data.map) {
                return
            }
            this.getMapContext()
            this.setMarker()
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        setCenter: function () {
            var _this = this
            this.setData({ center: { longitude: _this.data.longitude, latitude: _this.data.latitude } })
        },
        setMarker: function () {
            var pois = this.data.pois
            var markers = []
            var _this = this
            const bgColor = '#1989fa'
            const whiteColor = '#ffffff'
            var R = app.globalData.system.pixelRatio / 2.0
            var fontSize = app.globalData.system.fontSizeSetting * 0.8
            var padding = fontSize * 1
            var marker = {
                iconPath: '',
                alpha: '0.5',
                latitude: _this.data.latitude,
                longitude: _this.data.longitude,
                width: "40rpx",
                height: "50rpx",
                zIndex: 10,
                callout: {
                    content: _this.data.name,
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
            }
            markers.push(marker)
            pois.forEach(v => {
                var marker = {
                    iconPath: '/assets/icons/zhoubian.png',
                    alpha: '0.5',
                    latitude: v.location.lat,
                    longitude: v.location.lng,
                    width: "50rpx",
                    height: "50rpx",
                    zIndex: 10
                }
                markers.push(marker)
            })
            this.setData({ markers: markers })
            //console.log('markers', this.data.markers)
        },

        clickHandle: function () {
            console.log('map click')
            var _this = this
            wx.showLoading({ title: '正在打开地图', mask: true })
            wx.getLocation({
                type: 'wgs84', //返回可以用于wx.openLocation的经纬度
                success(res) {
                    const latitude = _this.data.latitude
                    const longitude = _this.data.longitude
                    wx.openLocation({
                        latitude,
                        longitude,
                        scale: 18
                    })
                },
                complete: function (res) {
                    wx.hideLoading()
                },
                fail: function (res) {
                    console.log('没有权限', res)
                    // 没有获取到权限
                    wx.showModal({
                        title: '请先授权',
                        content: '您没有允许获取位置权限，无法完成定位和导航操作，请先开启位置权限',
                        showCancel: true,
                        cancelText: '取消',
                        cancelColor: '#000000',
                        confirmText: '知道了',
                        confirmColor: '#3CC51F',
                        success: (result) => {
                            if (result.confirm) {
                                wx.openSetting()
                            }
                        },
                        fail: () => { },
                        complete: () => { }
                    });
                },
            })
        },
        getMapContext() {

            var _this = this
            var arr = []
            arr.push({ longitude: this.data.longitude, latitude: this.data.latitude })
            var pois = this.data.pois
            pois.forEach(v => {
                var obj = {}
                obj.longitude = v.location.lng
                obj.latitude = v.location.lat
                arr.push(obj)
            })
            // //缩放视野展示所有经纬度 此方法传入的数组不能为空 所以手动进行非空验证
            // if(pois.length ==0){
            //     return
            // }
            this.data.map.includePoints({
                points: arr,
                padding: [50, 50, 50, 50]
            });
        }
    }
})
