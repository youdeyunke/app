const app = getApp()
const mapApi = require("../api/map")
module.exports = {

    setCity: function () {
        // 根据获取到的位置信息自动判断用户所在城市
        // 如果无法获取位置信息，或者关闭了权限，则设置默认位置
        var _this = this

        wx.getFuzzyLocation({
            type: 'gcj02 ',
            altitude: false,
            isHighAccuracy: false,
            success: function (poi) {
                // 解析地址
                console.log("获取当前地理位置", poi)
                _this.setCityFromPoi(poi)
            },
            fail: function (res) {
                // TODO 获取位置信息失败
                console.log("无法获取当前定位信息", res)
            },
        })
    },


    setCityFromPoi: function (poi) {
        // 解析经纬度坐标，并提示是否需要切换城市
        var _this = this
        const app = getApp()
        mapApi.geocoder(poi.latitude, poi.longitude).then((resp) => {
            if (resp.data.status != 0) {
                return
            }
            var info = resp.data.result.ad_info
            console.log('解析到当前行政区划代码 adinfo ', info.adcode)
            // 从城市列表中查找
            var oldCityCode = wx.getStorageSync('cityCode')
            var city = app.globalData.cities.filter((c) => {
                return c.adcode && c.adcode.toString() === info.adcode.toString()
            })[0]

            // 是否需要切换城市
            if (city && oldCityCode && city.accode.toString() != oldCityCode.toString()) {
                // 定位到城市跟默认城市不是同一个
                console.log('定位到用户城市', city)
                wx.showModal({
                    title: '系统提示',
                    confirmText: "切换城市",
                    content: '系统检测到您的当前城市是' + city.name + '，是否切换到' + city.name + '?',
                    success: function (res) {
                        if (res.confirm) {
                            wx.setStorageSync('cityCode', city.adcode)
                            wx.reLaunch({
                                url: '/pages/home/home',
                            })
                        }
                    }
                })
                return
            }
            // 写入本地存储
            wx.setStorageSync('cityCode', info.adcode)
        })
    },
}