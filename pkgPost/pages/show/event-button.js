/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// pages/post/event-button.js
const app = getApp()
var auth = require('../../../utils/auth.js');
const eventApi = require("../../../api/event")

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pid: {
            type: Number
        },
        color: {
            type: String,
            value: '#000000'
        }
    },
    //监听事件
    observers: {
        "pid": function (val) {
            if (val) {
                this.loadStatus()
            }
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        loading: false,
        showDialog: false,
        title: '',
        btnIcon: {
            open: {
                name: 'clock-o'
            },
            price: {
                name: 'chart-trending-o'
            },
        },
        nameDict: {
            title: ['订阅楼盘动态提醒', '已订阅!'],
            desc: ['一键订阅楼盘动态，开盘、变价、优惠活动等楼盘信息将会通过短信通知您，让您抢占买房先机', '已订阅，楼盘动态将会通过短信通知您'],
            btn: ['+订阅', '已订阅']
        },
        fid: null,
        status: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        confirmHandle: function (e) {
            this.setData({
                confirm: !this.data.confirm
            })
        },


        closeHandle: function () {
            this.setData({
                showDialog: false
            })
        },




        openHandle: function () {
            // 如果没有登陆，则弹窗登陆窗口 
            if (!app.globalData.token) {
                this.selectComponent('.loginwindow').openWindow()
                return
            }

            wx.showLoading({
                title: '处理中',
                mask: true,
            });
            var _this = this
            wx.hideLoading();
            // 如果是新订阅
            if (_this.data.status == 0) {
                _this.setData({
                    showDialog: true
                })
                return
            }
            _this.subHandle()

        },
        cancleSub: function () {
            var _this = this
            var pid = this.data.pid
            //   √
            eventApi.deleteEventFollow(pid).then((res) => {
                wx.removeStorage({
                    key: this.data.pid + "_ef",
                })
                _this.loadStatus()
                wx.showToast({
                    title: '已取消订阅楼盘动态通知，系统将不会给您发送任何该楼的动态通知',
                    icon: 'none',
                    image: '',
                    duration: 1500,
                    mask: true,
                });
            })
        },

        createSub: function () {
            var _this = this
            // √
            eventApi.createEventFollow(_this.data.pid).then((res) => {
                wx.setStorage({
                    key: _this.data.pid + "_ef",
                    data: 'ok'
                })
                // 提交后刷新状态
                _this.loadStatus()
            })
        },
        subHandle: function () {
            if (this.data.status == 1) {
                // 取消订阅
                this.cancleSub()
                return
            }
            this.createSub()
        },

        loadStatus: function () {
            var _this = this
            // 查询订阅状态
            var value = wx.getStorageSync(this.data.pid + "_ef")
            if (value == 'ok') {
                _this.setData({
                    status: 1
                })
            } else {
                _this.setData({
                    status: 0
                })
            }
        },

    }
})