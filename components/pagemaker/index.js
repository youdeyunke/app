// components/pagemaker/index.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pageId: { type: Number, default: 1 }
    },

    /**
     * 组件的初始数据
     */
    data: {
        modules: [],
        paddingSmall: 10,
        paddingLarge: 20,
        paddingValue: 0,
        config: null,
    },


    ready: function () {
        var _this = this
        var pageId = this.data.pageId
        app.request({
            url: '/api/v1/pages/' + pageId,
            success: function (resp) {
                var data = resp.data.data
                _this.setData({
                    modules: data.modules,
                    pageConfig: data.config,
                })
                _this.triggerEvent('ready', data.config)
                _this.setNavbar(data.config)
                _this.setPadding(data.config)
            }
        })

    },

    /**
     * 组件的方法列表
     */
    methods: {

        // 设置页面的边距
        setPadding: function (config) {
            var padding = this.data.paddingValue
            var moduleWidth = 750 // rpx
            switch (config.padding) {
                case "small":
                    padding = this.data.paddingSmall
                    break;
                case "large":
                    padding = this.data.paddingLarge
                    break;
            }
            moduleWidth -= padding * 2
            console.log('padding value', padding)
            this.setData({
                paddingValue: padding + 'rpx',
                moduleWidth: moduleWidth + 'rpx'
            })

        },


        // 设置导航栏颜色、文字、背景
        setNavbar: function (config) {
            var bgColor = config.title.bgColor
            var fontColor = config.title.color
            var title = config.title.value
            console.log('bg', bgColor, 'font', fontColor)
            wx.setNavigationBarColor({
                frontColor: fontColor,
                backgroundColor: bgColor,
                success: (err) => {
                    console.log('set nav error', err)
                },
            });

            wx.setNavigationBarTitle({
                title: title,
            });
        }

    }
})
