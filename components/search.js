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
// components/search.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: { type: String, value: '' },
        initmode: { type: Number, value: null },
        fake: { type: Number, value: 0 },
    },


    attached: function () {
        var history = wx.getStorageSync('keywordsHistory') || []
        var historyTitle = '搜索记录'
        if (history.length == 0) {
            historyTitle = '大家都在搜'
            history = app.globalData.hotKeywords || ['江景房', '不限购']
        }
        this.setData({
            history: history, historyTitle: historyTitle,
            cats: app.globalData.myconfigs['post_groups'],
        })
    },

    /**
     * 组件的初始数据
     */
    data: {
        placeholder: '你想住在哪？',
        text: '',
        mode: 1, // 1: 输入模式， 2： 搜索结果模式
        currentCatIndex: '0',
        cats: [
            { name: '新房', value: 'xinfang' },
            { name: '二手房', value: 'ershoufang' },
            { name: '租房', value: 'zufang' },
        ],
    },



    /**
     * 组件的方法列表
     */
    methods: {
        confirm: function (e) {
            console.log('cofirm', e, this.data.text)
            var text = e.detail.value
            if (text) {
                this.setData({ text: text })
                this.submit(e)
            }
        },

        catClick: function (e) {
            var i = e.currentTarget.dataset.name
            this.setData({ currentCatIndex: String(i) })
        },

        submit: function () {
            if (this.data.fake) {
                return false
            }
            var text = this.data.text
            if (text.length == 0) {
                return false
            }
            var i = this.data.currentCatIndex
            var cat = this.data.cats[i]
            var data = { text: text, cat: cat, group: cat.value }
            this.triggerEvent('submit', data, {})
            this.logHistory(text)
            console.log('submit', data)
        },

        keywordClick: function (e) {
            var text = e.currentTarget.dataset.text
            this.setData({ text: text, value: text })
        },

        logHistory: function (text) {
            var history = wx.getStorageSync('keywordsHistory') || []
            history = [text].concat(history)
            history = [...new Set(history)]
            wx.setStorageSync('keywordsHistory', history.slice(0, 5))
        },

        bindTextInput: function (e) {
            if (this.data.fake) {
                return false
            }
            this.setData({
                text: e.detail.value,
                mode: 1,
                initmode: null,
            })
        },

        searchTap: function (e) {
            if (!this.data.fake) {
                return false
            }
            // 跳转到搜索页面
            wx.navigateTo({
                url: '/pages/search/index'
            })
        },

        clear: function (e) {
            console.log('e', e)
            if (!this.data.text && !this.data.value) {
                console.log('aaaaaaaaa')
                return false
            }
            this.setData({ text: '', mode: 1, initmode: null })
            this.triggerEvent('clear', {}, {})
        },

        inputHandle: function (e) {
        }
    }
})
