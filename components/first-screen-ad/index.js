const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    ready: function () {
        var _this = this
        _this.loadData()

    },

    /**
     * 组件的初始数据
     */
    data: {
        show: false,
        second: '',
        url: '',
        id: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadData() {
            var _this = this
            app.request({
                url: '/api/v1/first_screen_ads',
                method: 'get',
                success: function (res) {
                    let value = res.data.data
                    let status = res.statusCode
                    if (value) {
                        _this.setData({
                            id: value.id,
                            second: value.second,
                            url: value.url,
                            show: true
                        })
                        _this.Timeout()
                    }
                }
            })
        },
        adClick: function (e) {
            // 点击广告图片后
            // TODO 
            wx.navigateTo({
                url: 'url',
            })
        },

        closeHandle: function () {
            this.setData({
                show: false
            })
        },
        Timeout() {
            var _this = this
            var second = _this.data.second - 1
            setTimeout(() => {
                _this.setData({
                    second: second
                })
                if (_this.data.second <= 0) {
                    this.closeHandle()
                    return
                } else {
                    this.Timeout()
                }
            }, 1000);

        },

    }
})