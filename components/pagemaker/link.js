module.exports = {
    functionHandle: function (config) {
        switch (config.function) {
            case 'location':
                // 导航到位置
                wx.openLocation({
                    name: config.locationName,
                    latitude: config.locationLat,
                    longitude: config.locationLng,
                })
                break;
            case 'call':
                var phone = config.phone
                if (!phone) {
                    return
                }
                wx.makePhoneCall({
                    phoneNumber: phone,
                    fail: function (res) {
                        // pass
                    }
                });
                break;
            case 'modal':
                wx.showModal({
                    title: config.modalTitle || '提示',
                    content: config.modalContent,
                    showCancel: false,
                })
                break;
        }
    },

    weappHandle: function (config) {
        //  打开另外一个小程序
        var appid = config.appid
        var path = config.apppath
        wx.navigateToMiniProgram({
            appid: appid,
            path: path,
        })
    },

    webHandle: function (config) {
        var url = config.url
        app.gotoWebview(url)
    },

    pageHandle: function (config) {
        var path = config.path
        var ot = config.opentype || 'navigateTo'

        switch (ot) {
            case 'switchTab':
                wx.switchTab({
                    url: path,
                });
                break;

            case 'navigateBack':
                wx.navigateBack({
                    delta: -1,
                })
                break;

            case 'navigateTo':
                wx.navigateTo({
                    url: path,
                    fail: function () {
                        wx.showToast({
                            icon: 'none',
                            title: '页面不存在',

                        })
                    },
                });
                break;

            case 'redirectTo':
                wx.redirectTo({
                    url: path,
                    fail: function () {
                        wx.showToast({
                            icon: 'none',
                            title: '页面不存在',
                        })
                    }
                })
                break;
        }
    },

    clickHandle: function (config) {
        // 点击按钮后，根据link对象，决定做和操作
        if (!config) {
            return
        }

        switch (config.cat) {
            case 'page':
                this.pageHandle(config)
                break;
            case 'web':
                this.webHandle(config)
                break;
            case 'weapp':
                this.weappHandle(config);
                break;
            case 'function':
                this.functionHandle(config)
                break;
        }
    },
}