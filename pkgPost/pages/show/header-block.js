// pages/post/header-block.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        post: { type: Object, default: null },
        navs: { type: Array, default: null }
    },

    /**
     * 组件的初始数据
     */
    data: {
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
                latitude: Number(this.data.post.latitude),
                longitude: Number(this.data.post.longitude),
                name: this.data.post.title,
                address: this.data.post.address,
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
