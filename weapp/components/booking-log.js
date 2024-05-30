/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: www.youdeyunke.com
* +----------------------------------------------------------------------
*/
// components/booking-log.js
const app = getApp()
const postApi = require("../api/post")
const bookingApi = require("../api/booking")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        userGroup: { type: String, value: 'broker' },
        item: { type: Object, value: {} },
    },

    /**
     * 组件的初始数据
     */
    data: {
        statusName: [
            "已预约",
            "已带看",
            "已取消",
            "已删除"
        ],
        actions: [],
        showMenu: false,
    },

    observers: {
        'item.status': function (statue) {
            console.log('status 变化')
            this.initUserActions()
        },
    },

    ready: function () {
        this.initActions()
        this.loadPost()
    },


    /**
     * 组件的方法列表
     */
    methods: {
        initActions: function () {
            if (this.data.userGroup == 'user') {
                this.initUserActions()
            } else {
                this.initBrokerActions()
            }

        },

        initUserActions: function () {
            // 0:新建，1：确认带看,2:取消,3：删除
            var _this = this
            var ac = [
                { name: '取消预约', method: 'cancle' },
                { name: '删除预约', method: 'delete', color: '#ff0000' },
            ]
            var status = this.data.item.status
            if (status == 0) {
                ac[0]['disabled'] = false
                ac[1]['disabled'] = false
            }
            if (status == 1) {
                ac[0]['disabled'] = true
                ac[1]['disabled'] = true
            }
            if (status == 2) {
                ac[0]['disabled'] = true
                ac[1]['disabled'] = false
            }

            if (status == 3) {
                ac[0]['disabled'] = true
                ac[1]['disabled'] = true
            }

            this.setData({ actions: ac })
        },

        initBrokerActions: function () {
            // 0:新建，1：确认带看,2:取消,3：删除
            var _this = this
            var ac = [
                { name: '取消预约', method: 'cancle' },
                { name: '确认已带看', method: 'confirm' },
                { name: '删除预约', method: 'delete', color: '#ff0000' },
            ]
            var status = this.data.item.status
            if (status == 1) {
                ac[0]['disabled'] = true
                ac[2]['disabled'] = true
            }
            if (status == 2) {
                ac[0]['disabled'] = true
                ac[1]['disabled'] = true
            }
            this.setData({ actions: ac })
        },


        loadPost: function () {
            var pid = this.data.item.post_id
            var post = wx.getStorageSync('post.' + pid) || null
            if (post) {
                this.setData({ post: post })
                return
            }
            var _this = this
            //   有待检测   父级页面不知道如何进入   输入路径参数未知
            postApi.getPostDetail(pid).then((resp) => {
                _this.setData({
                    post: resp.data.data
                })
            })
        },

        callHandle: function (e) {
            var m = this.data.item.mobile
            wx.makePhoneCall({
                phoneNumber: m,
            })
        },

        onSelect: function (e) {
            console.log('e', e)
            var method = e.detail['method']
            var _this = this
            console.log('m', method)
            switch (method) {
                case 'cancle':
                    console.log('cancle handle')
                    _this.cancleHandle()
                    break;
                case 'confirm':
                    _this.confirmHandle()
                    break;
                case 'delete':
                    _this.deleteHandle()
                    break;
            }
        },

        cancleHandle: function () {
            // 取消预约
            console.log('cancle handle exec')
            this.updateLogStatus(2)
        },

        menuToggle: function () {
            this.setData({
                showMenu: !this.data.showMenu
            })
        },

        updateLogStatus: function (status, cb) {

            var _this = this
            bookingApi.updateBookingStatus(
                this.data.item.id, status
            ).then((resp) => {
                if (resp.data.status == 0) {
                    var item = _this.data.item
                    item['status'] = status
                    _this.setData({ item: item })
                    return typeof cb == 'function' && cb(resp.data.data)
                }
            })
        },

        deleteHandle: function () {
            var _this = this
            wx.showModal({
                title: '操作提示',
                content: '确定要删除这条预约记录吗?',
                success (res) {
                    if (res.confirm) {
                        _this.updateLogStatus(3)
                    }
                }
            })

        },

        confirmHandle: function () {
            this.updateLogStatus(1)
        },
    }

})
