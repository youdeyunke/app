// components/message/item.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        msg: { type: Object },
    },

    observers: {
        "msg.time": function (val) {
            if (!val) {
                return
            }
            val = val * 1000

            // 处理时间格式
            // format datetime
            var date = new Date(val)
            var y = date.getFullYear()
            var m = date.getMonth() + 1
            var d = date.getDate()
            var h = date.getHours()
            var mi = date.getMinutes()
            var value = y + '年' + m + '月' + d + '日 ' + h + ':' + mi
            // 根据时间跨度，决定显示日期的格式
            var today = new Date()
            var now = today.getTime()
            var s = now - val
            console.log('now ', now, 'val', val, 's', s)
            // 24 小时以内
            if (s <= 60 * 60 * 24 * 1000) {
                value = h + ':' + mi
            }
            // x天内
            else if (s <= 60 * 60 * 24 * 30 * 1000) {
                value = m + '月' + d + '日' + h + ':' + mi
            }
            console.log('time str is', value)
            this.setData({ timeStr: value })

        },
        "msg.avatar": function (avatar) {
            var _this = this
            var timUid = this.data.msg.from
            if (!timUid) {
                return
            }
            if (avatar) {
                console.log('avatar 不为空', avatar)
                _this.setData({ avatar: avatar })
                return
            }
            // 没有avatar，就调用自己的
            if (this.data.msg.flow == 'out') {
                _this.setData({
                    avatar: app.globalData.userInfo.avatar,
                    nickname: app.globalData.userInfo.nickname,
                })
                return
            }

            // 对方头像，从缓存中取得
            var uid = timUid.split('.')[1]
            var key = 'user.' + uid
            var user = wx.getStorageSync(key)
            if (!user) {
                console.log("没有从缓存中找到用户信息，user id", uid)
                return false
            }
            _this.setData({ avatar: user.avatar, nickname: user.name || user.nickname })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        avatar: '',
        nickname: '',
        audioPlaying: false,
    },

    ready: function () {
    },

    /**
     * 组件的方法列表
     */
    methods: {
        audioPlayHandle: function (e) {
            var _this = this
            var audio = wx.createInnerAudioContext()
            audio.src = this.data.msg.payload.url
            audio.autoplay = false

            if (this.data.audioPlaying) {
                // 停止
                this.setData({ audioPlaying: false })
                audio.stop()
                audio.destroy()
                return
            }


            // 监听停止播放
            audio.onEnded((event) => {
                console.log('audo stop event')
                _this.setData({ audioPlaying: false })
            })

            audio.onError((error) => {
                console.log('播放语音出错', error)
            })

            // 播放语音
            this.setData({ audioPlaying: true })
            console.log('播放语音', audio.src)
            audio.play()
        },
        imagePreview: function (e) {
            var url = this.data.msg.payload.imageInfoArray[0]['imageUrl']
            wx.previewImage({
                current: url,
                urls: [url],
                success: (result) => {
                },
            });

        },

    }
})
