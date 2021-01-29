// components/message/input.js
const app = getApp()
var timClient = require('../../tim/index.js')


Component({
    /**
     * 组件的属性列表
     */
    properties: {
        to: { type: Number },
    },

    /**
     * 组件的初始数据
     */
    data: {
        cyyList: [
            '在吗？想咨询下楼盘信息',
            '请问这个盘什么时候开盘？',
            '有哪些户型，什么价格呢？',
        ],
        content: '',
        audioMode: false,
        audioRes: null,
        audioMaxSeconds: 60,
        audioRecording: false,
        showTools: false,
        showCyy: false,
        pending: false,
    },

    ready: function () {
        console.log('components ready')
    },

    /**
     * 组件的方法列表
     */
    methods: {
        cyyToggle: function (e) {
            // 显示或者隐藏常用于列表
            this.setData({
                showCyy: !this.data.showCyy
            })

        },
        toolsToggle: function (e) {
            this.setData({
                showTools: !this.data.showTools
            })
        },
        inputHandle: function (e) {
            this.setData({
                content: e.detail.value,
                showTools: false,
            })
        },

        sendCyyHandle: function (e) {
            console.log('e', e)
            var _this = this
            var i = e.currentTarget.dataset.index
            var text = this.data.cyyList[i]
            this.setData({ pending: true, showTools: false, showCyy: false })
            timClient.sendTextMessage(this.data.to, text).then((resp) => {
                console.log('消息发送接口返回 resp', resp)
                if (resp.code == 0) {
                    _this.triggerEvent('success', resp.data.message)
                    _this.setData({ pending: false })
                }
            })
        },

        sendPositionHandle: function (e) {

        },


        sendNameCardHandle: function (e) {
            var _this = this
            var uid = app.globalData.userInfo.id
            console.log('send name card', uid, app.globalData.userInfo)
            timClient.sendNameCardMessage(this.data.to, uid).then((resp) => {
                // 发送成功
                _this.triggerEvent('success', resp.data.message)
                _this.setData({ showTools: false })
            })

        },

        sendMobileHandle: function (e) {
            var _this = this
            var uid = app.globalData.userInfo.id
            console.log('send name card', uid, app.globalData.userInfo)
            timClient.sendMobileMessage(this.data.to, uid).then((resp) => {
                // 发送成功
                _this.triggerEvent('success', resp.data.message)
                _this.setData({ showTools: false })
            })

        },


        sendImageHandle: function (e) {
            // 发送图片消息
            var _this = this
            wx.chooseImage({
                sourceType: ['album'], // 从相册选择
                count: 1, // 只选一张，目前 SDK 不支持一次发送多张图片
                success: function (res) {
                    _this.toolsToggle()
                    timClient.sendImageMessage(_this.data.to, res, _this.uploadingHandle).then((resp) => {
                        // 发送成功，追加消息
                        wx.hideLoading();
                        _this.triggerEvent('success', resp.data.message)
                    })
                }
            })
        },

        stopAudioHandle: function (e) {
            // 停止录音并发送
            wx.hideLoading();

            const recorderManager = wx.getRecorderManager();
            recorderManager.stop()
        },

        audioModeToggle: function (e) {
            this.setData({ audioMode: !this.data.audioMode, showTools: false })
        },

        startAudioHandle: function (e) {
            // 录音部分参数
            var _this = this
            const recorderManager = wx.getRecorderManager();
            if (this.data.audioRecording) {
                console.log('正在录音中')
                return false
            }
            this.setData({
                showToolsow: false,
            })
            const recordOptions = {
                duration: 6000 * 2, // 录音的时长，单位 ms，最大值 6000 = 1分钟
                sampleRate: 44100, // 采样率
                numberOfChannels: 1, // 录音通道数
                encodeBitRate: 192000, // 编码码率
                format: 'mp3' // 音频格式，选择此格式创建的音频消息，可以在即时通信 IM 全平台（Android、iOS、微信小程序和Web）互通
            };
            recorderManager.start(recordOptions)
            recorderManager.onStart((e) => {
                // 已经开始录音
                _this.setData({
                    audioRecording: true,
                })
                wx.showLoading({
                    title: '录音中...',
                    mask: false,
                });
                var count = _this.data.audioMaxSeconds
                setInterval(() => {
                    if (count == 0) { return }
                    if (!_this.data.audioRecording) { return }
                    //  倒计时
                    count -= 1
                    console.log('倒计时', count)
                    wx.showLoading({ title: '录音中，剩余' + count + '秒', mask: false })
                }, 1000);

                // 时间到了之后自动停止录音
                setTimeout(recorderManager.stop, _this.data.audioMaxSeconds * 1000)
            })
            recorderManager.onError(function (errMsg) {
                console.warn('recorder error:', errMsg);
                _this.setData({
                    audioRecording: false,
                    audioRes: null,
                })
                wx.hideLoading()
                wx.showToast({ title: '系统错误，无法进行录音', icon: 'none', });

            });
            recorderManager.onStop(function (res) {
                console.log('audio res', res)
                wx.hideLoading();
                _this.setData({ audioRes: res, audioRecording: false })
            });
        },

        cancleAudioHandle: function () {
            this.setData({
                audioRecording: false,
                audioRes: null
            })
        },

        sendAudioMessageHandle: function () {
            wx.showLoading({
                title: '发送中...',
                mask: true,
            });
            console.log('click send audio', this.data)

            var _this = this
            var res = this.data.audioRes
            let promise = timClient.sendAudioMessage(_this.data.to, res)
            promise.then(function (resp) {
                // 发送成功
                wx.hideLoading();
                console.log(resp);
                _this.triggerEvent('success', resp.data.message)
                _this.setData({ audioRes: null })

            }).catch(function (imError) {
                // 发送失败
                wx.hideLoading();
                console.warn('sendMessage error:', imError);
                wx.showToast({
                    title: '发送失败',
                    icon: 'none',
                    image: '',
                });

            });
        },

        uploadingHandle: function (event) {
            // 图片上传进度条更新
            console.log('image uploading event', event)
            wx.showLoading({
                title: '正在发送图片...',
                mask: true,
            });

        },

        sentHandle: function (e) {
            var _this = this
            var content = this.data.content
            if (content.length == 0) {
                wx.showToast({
                    title: '内容不能为空',
                    icon: 'none',
                    image: '',
                    duration: 800,
                    mask: true,
                });
                return false
            }
            this.setData({ pending: true, content: '' })
            timClient.sendTextMessage(this.data.to, content).then((resp) => {
                console.log('消息发送接口返回 resp', resp)
                if (resp.code == 0) {
                    _this.triggerEvent('success', resp.data.message)
                    _this.setData({ pending: false })
                }
            })
        }
    }
})
