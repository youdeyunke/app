// components/map.js
const app = getApp()


Component({
    /**
     * 组件的属性列表
     */
    properties: {
        longitude: { type: Number },
        latitude: { type: Number },
        width: { type: Number, value: 750 },
        height: { type: Number, value: 320 },
        image: { type: String, value: '' },
        name: { type: String, value: null },
    },

    /**
     * 组件的初始数据
     */
    data: {
        ak: 'FdgWb2yDCALRFnQ1978WKpwztv4dHOHD',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        ready: function () {
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
    }
})
