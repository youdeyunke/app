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
// pkgPost/components/share-box/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show: { type: Boolean, value: false },
        postInfo: { type: Object, value: null },

    },

    observers: {
        "postInfo": function (p) {
            if (!p) {
                return
            }
            var tags = p.tags.map((t, i) => {
                return t.name
            })
            this.setData({ tags: tags })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        showTips: false,
        showCopy: false,
        tags: [],

    },

    /**
     * 组件的方法列表
     */
    methods: {
        wechatHandle: function () {

        },

        posterHandle: function () {
            var url = '/pkgPoster/pages/poster/index?post_id=' + this.data.postInfo.id
            wx.navigateTo({
                url: url,
            })
        },

        copyHandle: function () {
            // 复制到剪贴板
            var p = this.data.postInfo
            var text = ""
            var tags = this.data.tags.join(',')
            text += "【项目名称】" + p.title
            text += "\n【参考均价】" + p.average_price
            text += "\n【项目亮点】" + tags
            text += "\n【项目地址】" + p.address
            // TODO 联系电话服务端还没完成
            var phone = p.phone
            if (p.sub_phone && p.sub_phone.length >= 1) {
                phone += '转' + p.sub_phone
            }
            text += "\n【咨询热线】" + phone
            wx.setClipboardData({
                data: text,
            });
            this.setData({ showCopy: true, show: false })

        },

        closeCopy: function () {
            this.setData({ showCopy: false })
        },

        closeTips: function () {
            this.setData({ showTips: false })
        },

        timelineHandle: function () {
            // TODO 作图
            this.setData({ showTips: true, show: false })
        },
        closeHandle: function (e) {
            this.setData({ show: false })
        }

    }
})
