/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自有软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
const app = getApp()
// pkgPost/components/flash-image/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        postInfo: { type: Object, value: null },
    },
    /**
     * 组件的初始数据
     */
    data: {
        hide: false,
        countDownNum: 10, // 倒计时初始值
        timer: null // 定义定时器对象
    },
    // 监听
    observers: {
        'postInfo': function (newVal, oldVal) {
            if (this.data.countDownNum == 10) {
                if (newVal && newVal.flash_enable) {
                    this.setData({
                        hide: newVal.flash_enable
                    })
                }
            }
        },
    },
    ready: function () {
        let that = this;
        let countDownNum = that.data.countDownNum; // 初始值
        that.setData({
            timer: setInterval(function () {
                countDownNum--;
                that.setData({
                    countDownNum: countDownNum
                });
                if (countDownNum == 0) { // 倒计时结束，清除定时器
                    that.setData({
                        hide: false
                    })
                    clearInterval(that.data.timer);
                }
            }, 1000)
        });
    },
    detached: function () {
        clearInterval(this.data.timer);
    },
    /**
     * 组件的方法列表
     */

    methods: {
        close: function () {
            // console.log("点击进入",this.data.postInfo.flash_enable);
            this.setData({
                hide: false
            })
        },
        phone: function () {
            // console.log("1234点击电话",this.data.postInfo);
            var phone = this.data.postInfo.phone
            // var sub = this.data.post.sub_phone
            var postId = this.data.postInfo.id
            // 弹出文本提示
            var n = app.globalData.myconfigs.xcx_name
            var t = '接通后请告知来自：【' + n + '小程序】'
            wx.showModal({
                confirmText: '拨打',
                cancelText: '取消',
                title: '提示',
                content: t,
                success: (res) => {
                    if (res.confirm) {
                        app.bindPostCustomer(postId, '拨打了楼盘资讯电话')
                        app.markVisitorAction('点击拨打楼盘联系电话:' + phone, 0)
                        wx.makePhoneCall({
                            phoneNumber: phone,
                            success: (result) => {
                            },
                        });
                    }
                }
            })
        },
        getLocation: function () {
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
        openSetting () {
            var _this = this
            wx.showModal({
                title: '权限不足',
                showCancel: false,
                content: "请先打开“使用我的地理位置”开关",
                confirmText: "去授权",
                success (res) {
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
        openLocation: function () {
            wx.openLocation({
                latitude: Number(this.data.postInfo.latitude),
                longitude: Number(this.data.postInfo.longitude),
                name: this.data.postInfo.title,
                address: this.data.postInfo.address
            })
        },
    }
})
