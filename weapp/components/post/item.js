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
// components/post.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        home: { type: Boolean, value: false },
        range: {
            type: Number, value: -1,
        },
        album: {
            type: Object, value: { id: null, key: null }
        },
        type: {
            type: String, value: 'normal',
        },
        border: {
            type: Boolean, value: true,
        },
        shadow: {
            type: Boolean, value: true,
        },
        width: {
            type: Number, value: 690,
        },
        item: {
            type: Object, value: {},
        }
    },

    observers: {
        "item.sub_district.street": function (val) {
            if (!val) {
                return false
            }
            var val = sub.street
            var val = val.replace('江苏省', '')
            var val = val.replace('苏州市', '')
            this.setData({ address: val })
        },
        "album.id": function (aid) {
            // 根据album id  取出需要显示的tag信息
            if (!aid) {
                return false
            }
            var item = this.data.item
            var key = 'meta_tag_' + aid
            // 根据album 判断是否需要显示排行信息
            var value = item[key]
            if (this.data.album.key != 'remen') {
                this.setData({ album_tag: value })
                return
            }

            // 如果是热门楼盘，那么tag要根据规则取出
            var albumIds = [2, 3, 4, 5]
            var isOk = false
            albumIds.forEach((aid, i) => {
                var key = 'meta_tag_' + aid
                if (!isOk && item[key]) {
                    value = item[key]
                    isOk = true
                }
            })
            this.setData({ album_tag: value })
        },
        "album.key": function (key) {
            if (!key) {
                return false
            }
            // 根据album 判断是否需要显示排行信息
            var res = false
            switch (key) {
                case 'remen':
                    res = true
                    break;
                case 'gongyu':
                    res = true
                    break;
            }
            this.setData({ showNumber: res })
        },
        "item.tags": function (tags) {
            if (!tags) {
                return
            }
            tags.splice(0, 1)
            this.setData({ tags: tags })
        },
    },

    ready: function () {
    },

    /**
     * 组件的初始数据
     */
    data: {
        'album_key': null,
        album_tag: null,
        tags: [],
        showNumber: false,

    },

    /**
     * 组件的方法列表
     */
    methods: {
        callHandle: function () {
            var b = this.data.item.brokers[0]
            wx.makePhoneCall({
                phoneNumber: b.mobile,
            })
        },

        formHandle: function (e) {

        },

    }
})
