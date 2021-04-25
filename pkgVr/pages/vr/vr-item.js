// pkgVr/pages/vr/doc-item.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: { type: Object }
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
        openFile() {
            if (this.data.item.open_type == 'browser') {
                this.setClipboardData()
            } else if (this.data.item.open_type == 'weapp') {
                var url =  '/pkgVr/pages/vr/show?id=' + this.data.item.id
                wx.navigateTo({
                  url: url,
                })
            }
        },
        setClipboardData() {
            var _this = this
            wx.showModal({
                title: '提示',
                content: '请先复制网址,再在手机浏览器打开查看全景',
                confirmText: '复制网址',
                success: function (res) {
                    if (res.confirm) {
                        wx.setClipboardData({
                            data: _this.data.item.url,
                            success: function () {
                                wx.showToast({
                                    title: '复制成功',
                                    icon: 'success'
                                })
                            }
                        })
                    }
                }
            })
        }
    }
})
