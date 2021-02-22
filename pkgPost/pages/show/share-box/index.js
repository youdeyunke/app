// pkgPost/components/share-box/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show: { type: Boolean, value: false },
        postInfo: { type: Object, value: null },

    },

    /**
     * 组件的初始数据
     */
    data: {
        showTips: false,
        showCopy: false,

    },

    /**
     * 组件的方法列表
     */
    methods: {
        wechatHandle: function () {

        },

        copyHandle: function () {
            // 复制到剪贴板
            var p = this.data.postInfo
            var text = ""
            text += "【项目名称】" + p.title
            text += "\n【参考均价】" + p.average_price
            text += "\n【项目亮点】" + p.tags.join(',')
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
