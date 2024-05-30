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
// pages/post/info-block.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: Object, value: null },
        color: { type: String, value: '#3A6BDD' },
        theme: { type: String }
    },

    observers: {
        "value.meta": function (meta) {
            // 格式化楼盘参数信息
            if (!meta) {
                return
            }

            // 先将中文冒号替换为英文
            meta = meta.replaceAll("：", ":")
            var items = meta.split('\n').map((line, index) => {
                var res = line.split(':')
                if (res.length == 1) {
                    // 解析错误
                    return { label: res[0], text: '-' }
                }
                var label = res.splice(0, 1)[0]
                var text = res.join(':')
                return { label: label, text: text }
            })
            this.setData({ metaItems: items })
        },
        "value.albums": function (albums) {
            if (!albums) {
                return
            }
            var data = {}
            data.albums = albums.filter((a, i) => {
                if (a.items_count > 0) {
                    return true
                }
            })
            this.setData(data)
        },
        "value.point_title": function (val) {
            if (val !== null && val !== undefined) {
                //将val中的中英文：都转为英文:
                var point_title = val.replace(/：/g, ':')
                //将point_title按英文:分割成数组
                var point_title_arr = point_title.split(':')
                //如果数组长度大于1，说明有中英文:，将数组第一个元素赋值给point_title，将数组剩余元素以:连接为字符串后赋值给point.content
                var point = { }
                if (point_title_arr.length > 1) {
                    point.title = point_title_arr[0]
                    point.content = point_title_arr.slice(1).join(':')
                } else {
                    point.title = '楼盘亮点'
                    point.content = val
                }
                this.setData({
                  point: point
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        metaItems: [],
        albums: [],
        point: null,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        gotoGzh: function () {
            var url = this.data.value.gzh_url || 'https://mp.weixin.qq.com/s/wEehQbSRrYzIl-eX7CCTcQ'
            app.gotoWebview(url)
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
                latitude: Number(this.data.value.latitude),
                longitude: Number(this.data.value.longitude),
                name: this.data.value.post_title,
                address: this.data.value.address
            })
        },
    }
})
