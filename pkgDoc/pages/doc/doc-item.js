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
// pkgDoc/pages/doc/doc-item.js
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
        showFile () {
            wx.showLoading({ title: '加载中', mask: 'true' })
            var _this = this
            wx.getStorage({
                key: "doc." + _this.data.item.id,
                success (res) {
                    wx.openDocument({
                        filePath: res.data,
                        fileType: _this.data.item.file_type,
                        success: function () {
                            setTimeout(() => {
                                wx.hideLoading()
                            }, 3000);
                        },
                        fail: function () {
                            wx.showToast({
                                title: '文件下载失败',
                                duration: 3000
                            })
                        }
                    })
                },
                fail () {
                    _this.downloadFile()
                }
            })
        },
        downloadFile () {
            var _this = this
            wx.downloadFile({
                url: _this.data.item.url,
                filePath: wx.env.USER_DATA_PATH + '/' + this.data.item.name,
                success: function (res) {
                    console.log(res);
                    const filePath = res.filePath
                    wx.setStorage({
                        key: "doc." + _this.data.item.id,
                        data: filePath
                    })
                    wx.openDocument({
                        filePath: filePath,
                        fileType: _this.data.item.file_type,
                        success () {
                            setTimeout(() => {
                                wx.hideLoading()
                            }, 2000);
                        },
                        fail: function () {
                            wx.showToast({
                                title: '文件下载失败',
                                duration: 3000
                            })
                        }
                    })
                },
                fail: function () {
                    wx.showToast({
                        title: '文件下载失败',
                        duration: 3000
                    })
                }
            })
        },

    }
})
