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
        openFile () {
            if (this.data.item.open_type == 'browser') {
                this.setClipboardData()
            } else if (this.data.item.open_type == 'weapp') {
                var url = '/pkgVr/pages/vr/show?id=' + this.data.item.id
                wx.navigateTo({
                    url: url,
                })
            }
        },
        setClipboardData () {
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
