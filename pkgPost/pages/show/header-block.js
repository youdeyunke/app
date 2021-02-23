// pages/post/header-block.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Object, default: null }

    },

    /**
     * 组件的初始数据
     */
    data: {
        arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        gotoLocation: function () {
            var _this = this
            //先获取授权状态
            wx.getSetting({
                success: (res) => {
                    console.log(res.authSetting)
                    //如果scope.userLocation 为false 则引导用户授权
                    if (!res.authSetting['scope.userLocation']) {
                        _this.openSetting()
                    } else {
                        //如果为true 则直接获取地理位置
                        _this.openLocation()
                    }
                },
            });
        },

        openLocation: function () {
            wx.openLocation({
                latitude: Number(this.data.value.latitude),
                longitude: Number(this.data.value.longitude),
                name: this.data.value.title,
                address: this.data.value.address
            })
        },
        openSetting() {
            var _this = this
            wx.showModal({
                title: '定位权限',
                showCancel: false,
                content: "导航功能需要先允许使用您的地理位置",
                confirmText: "去授权",
                success(res) {
                    if (res.confirm) {
                        wx.openSetting({
                            success: (res) => {
                                _this.openLocation()
                            },
                        });
                    }
                }
            })
        },
    }
})
