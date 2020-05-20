// components/new-version.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    ready: function () {
        var _this = this
        var configs = app.globalData.myconfigs
        var ext = app.globalData.EXT
        _this.setData({
            ext: app.globalData.EXT,
        })

        // 如果设置了开屏广告，就显示广告，否则检查版本更新
        if (configs.plugin_home_ad && configs.plugin_home_ad_desc) {
            this.setData({ show: true, mode: 2, ad_image: configs.plugin_home_ad_desc })
            // 延时关闭
            setTimeout(function () { _this.closeHandle() }, 10000)
            return false
        }

        var nowVersion = wx.getStorageSync('version');
        if (!nowVersion) {
            return false
        }

        if (nowVersion != ext.version) {
            console.log('检测到了新版本', ext.version)
            // 延迟显示版本升级
            setTimeout(function () { _this.setData({ show: true, mode: 1 }) }, 1000)
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        show: false,
        mode: 1, // 1:检查版本，2，开屏广告

    },

    /**
     * 组件的方法列表
     */
    methods: {
        adClick: function (e) {
            // 点击广告图片后
            var configs = app.globalData.myconfigs
            console.log('this.data.myconi', configs)
            var path = configs.plugin_home_ad_path_desc
            var opentype = configs.plugin_home_ad_opentype_desc
            switch (opentype.toLowerCase()) {
                case 'navigateto':
                    wx.navigateTo({
                        url: path
                    })
                    break;
                case 'switchtab':
                    wx.switchTab({ url: path })
                    break;
                case 'miniprogram':
                    console.log('打开小程序')
                    break;
            }

        },
        closeHandle: function () {
            this.setData({ show: false })
        },

        markNewVersion: function (e) {
            // 本地保存最新版本号，以便下次比对
            var _this = this
            wx.setStorage({
                key: 'version',
                data: _this.data.ext.version,
                success: function (res) {
                    _this.setData({
                        show: false
                    })
                }
            })
        },

    }
})