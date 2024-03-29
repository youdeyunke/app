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
// components/protected-mobile-input.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        size: { type: String, value: 'small' },
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentIndex: 1, // 当前正在编辑哪个数字
        mobile: [
            '1',
            '',
            '',
            '*',
            '*',
            '*',
            '*',
            '',
            '',
            '',
            '',
        ],

    },

    observers: {
        'mobile.**': function (mobile) {
            var value = mobile.join('')
            this.triggerEvent('change', { value: value })
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onFocus: function (e) {
            var i = e.currentTarget.dataset['index']
            this.setData({
                currentIndex: i,
            })
        },

        deleteHandle: function (e) {
            // 处理删除的情况
            var currentIndex = e.currentTarget.dataset['index']
            var v = this.data.mobile[currentIndex]
            var nextIndex = currentIndex - 1
            var data = {}

            // 如果当前输入框中有数字，就清楚当前输入框
            if (v && v.length >= 1) {
                var key = 'mobile[' + currentIndex + ']'
                data[key] = ''
            }
            // 光标向上移动
            if (nextIndex >= 3 && nextIndex <= 6) {
                nextIndex = 2
            }
            if (nextIndex <= 0) {
                nextIndex = 0
            }
            data['currentIndex'] = nextIndex
            this.setData(data)
        },



        numberInput: function (e) {
            /* 输入框内容变化  */
            var currentIndex = e.currentTarget.dataset['index']
            var k = e.detail.keyCode
            console.log('key code is', k)
            // 退格键
            if (k == 8) {
                return this.deleteHandle(e)
            }

            var n = e.detail.value
            if (n.length == 0) {
                return ''
            }


            var data = {}
            var key = 'mobile[' + currentIndex + ']'
            if (n.length == 1) {
                data[key] = n
            }

            // 修改原先的输入值
            if (n.length == 2) {
                data[key] = n[1]
            }

            // 输入完成后，跳转到下一个输入曹
            var nextIndex = currentIndex + 1
            // 如果输入的是第三位，下一位就跳转到第8位
            if (nextIndex >= 3 && nextIndex <= 6) {
                nextIndex = 7
            }

            if (nextIndex >= 11) {
                // 输入完成,置空
                console.log('输入最后一位')
                nextIndex = null
            }

            data['currentIndex'] = nextIndex
            this.setData(data)
        },




    }

})
