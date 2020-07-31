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
            }
        })

    },

    /**
     * 组件的方法列表
     */
    methods: {
        setNavbar: function (config) {
            // 设置导航栏颜色、文字、背景
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
