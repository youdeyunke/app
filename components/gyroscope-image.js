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
// components/gyroscope-image.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        src: {
            type: String, value: '',
        },
        width: {
            type: Number, value: 750,
        },
        height: {
            type: Number, value: 320,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        delta: 200,
        x: null,
        y: null,
    },



    /**
     * 组件的方法列表
     */

    methods: {

        formatX: function (x) {
            // 放大10倍，取整数
            x = x * 100;
            x = Math.floor(x)
            return x
            //return this.safeX(x)
        },

        safeX: function (x) {
            var min = -200
            var max = 200
            x = x < min ? min : x
            x = x > max ? max : x
            return x
        },
    },

    ready: function () {
        console.log('gimage ready')
        var _this = this
        wx.onAccelerometerChange(function (res) {
            var x = _this.formatX(res.x)
            var y = _this.formatX(res.y)
            console.log('x', x)
            console.log('y', y)
            if (x == _this.data.x && y == _this.data.y) {
                return
            }

            var leftValue = (x - 100) / 2 + 'rpx'
            var bottomValue = (y - 100) / 2 + 'rpx'
            _this.setData({
                x: x, y: y, leftValue: leftValue, bottomValue: bottomValue
            })
        })

        wx.stopAccelerometer({
            complete: function () {
                wx.startAccelerometer({
                    interval: 'ui',
                    success: function (res) {
                        console.log('开始监听陀螺仪', res)
                    }
                })
            },
        })
    },
})
