/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自有软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
Component({
    properties: {
        config: {
            type: Object,
            value: {},
        },
        preload: {  // 是否预下载图片资源
            type: Boolean,
            value: false,
        },
        hideLoading: {  // 是否隐藏loading
            type: Boolean,
            value: false,
        }
    },
    ready () {
        if (this.data.preload) {
            const poster = this.selectComponent('#poster');
            this.downloadStatus = 'doing';
            poster.downloadResource(this.data.config).then(() => {
                this.downloadStatus = 'success';
                this.trigger('downloadSuccess');
            }).catch((e) => {
                this.downloadStatus = 'fail';
                this.trigger('downloadFail', e);
            });
        }
    },
    methods: {
        trigger (event, data) {
            if (this.listener && typeof this.listener[event] === 'function') {
                this.listener[event](data);
            }
        },
        once (event, fun) {
            if (typeof this.listener === 'undefined') {
                this.listener = {};
            }
            this.listener[event] = fun;
        },
        downloadResource (reset) {
            return new Promise((resolve, reject) => {
                if (reset) {
                    this.downloadStatus = null;
                }
                const poster = this.selectComponent('#poster');
                if (this.downloadStatus && this.downloadStatus !== 'fail') {
                    if (this.downloadStatus === 'success') {
                        resolve();
                    } else {
                        this.once('downloadSuccess', () => resolve());
                        this.once('downloadFail', (e) => reject(e));
                    }
                } else {
                    poster.downloadResource(this.data.config)
                        .then(() => {
                            this.downloadStatus = 'success';
                            resolve();
                        })
                        .catch((e) => reject(e));
                }
            })
        },
        onCreate (reset = false) {
            if (!this.data.hideLoading) {
                wx.showLoading({ mask: true, title: '生成中' });
            }
            console.log('hide loading value is', this.data.hideLoading)
            return this.downloadResource(typeof reset === 'boolean' && reset).then(() => {
                if (!this.data.hideLoading) {
                    console.log('hide loading in poster')
                    wx.hideLoading();
                }

                const poster = this.selectComponent('#poster');
                poster.create(this.data.config);
            })
                .catch((err) => {
                    !this.data.hideLoading && wx.hideLoading();
                    wx.showToast({ icon: 'none', title: err.errMsg || '生成失败' });
                    console.error(err);
                    this.triggerEvent('fail', err);
                })
        },
        onCreateSuccess (e) {
            const { detail } = e;
            this.triggerEvent('success', detail);
        },
        onCreateFail (err) {
            console.error(err);
            this.triggerEvent('fail', err);
        }
    }
})