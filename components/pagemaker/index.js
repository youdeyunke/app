// components/pagemaker/index.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pageId: { type: Number, default: 1 },
        pageKey: { type: Number, default: null },
    },

    /**
     * 组件的初始数据
     */
    data: {
        modules: [],
        paddingSmall: 10,
        paddingLarge: 20,
        paddingValue: 0,
        loading: true,
        config: null,
    },

    observers: {
        'pageId': function () {
            this.setData({ loading: true })
            this.loadData()
        },
        "config.padding": function (v) {
            console.log('observers.padding', v)
        },
    },

    refresh: function () {
        // 用于父组件调用，刷新页面
        this.setData({ loading: true })
        this.loadData()
    },


    /**
     * 组件的方法列表
     */
    methods: {

        reload: function () {
            this.setData({ loading: true })
            this.loadData()
        },

        loadData: function (cb) {
            var _this = this
            var pageId = this.data.pageId
            var pageKey = this.data.pageKey
            var v = pageKey || pageId

            app.request({
                url: '/api/v1/pages/' + v,
                hideLoading: true,
                success: function (resp) {
                    var data = resp.data.data
                    _this.setData({
                        loading: false,
                        modules: data.modules,
                        pageConfig: data.config,
                    })
                    _this.setNavbar(data.config)
                    _this.setPadding(data.config)
                    _this.triggerEvent('ready', data.config)
                }
            })

        },

        // 设置页面的边距
        setPadding: function (config) {
            // TODO move to observers 
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

            this.setData({
                paddingValue: padding,
                moduleWidth: moduleWidth,
            })

        },


        // 设置导航栏颜色、文字、背景
        setNavbar: function (config) {
            var bgColor = config.title.bgColor || '#F0F0F0'
            var fontColor = config.title.color || '#333333'
            var title = config.title.value || ''
            wx.setNavigationBarColor({
                frontColor: fontColor,
                backgroundColor: bgColor,
                success: (err) => {
                },
            });
            wx.setNavigationBarTitle({
                title: title,
            });
        }

    }
})
