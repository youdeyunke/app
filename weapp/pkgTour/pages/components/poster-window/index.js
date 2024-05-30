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
// pkgTour/pages/components/poster-window/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        show: false,
        palette: {
            background: '#f4f4f4',
            width: '600rpx',
            height: '980rpx',
            views: [
                {
                    type: 'image',
                    url: '',
                    css: {
                        width: '600rpx',
                        height: '800rpx',
                    },
                },
                {
                    type: 'text',
                    text: "长按识别二维码",
                    css: {
                        fontSize: "28rpx",
                        bottom: '72rpx',
                        left: '46rpx'
                    }
                },
                {
                    type: 'image',
                    url: '',
                    css: {
                        width: '120rpx',
                        height: '120rpx',
                        bottom: '30rpx',
                        right: '40rpx',
                        borderRadius: '60rpx',
                        background: '#ffffff'
                    },
                },
            ],
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        showPopup (e) {
            var _this = this
            var palette = this.data.palette
            var views = this.data.palette.views
            views[0].url = e.poster
            views[2].url = e.qr
            palette.views = views
            this.setData({ palette: palette },
                setTimeout(() => {
                    _this.setData({
                        show: true
                    })
                }, 500)
            );
        },
        onClose () {
            this.setData({ show: false });
        },
        onImgOK (e) {
            this.imagePath = e.detail.path;
            this.setData({
                image: this.imagePath,
            });
            if (this.isSave) {
                this.saveImage(this.imagePath);
            }
        },
        onImgErr (e) {
            console.log('error:', e)
        }
    }
})
