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
// components/price-picker.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        position: {
            type: String, value: "bottom"
        },
        label: { type: String, value: '售价' }

    },

    /**
     * 组件的初始数据
     */
    data: {
        show: false,
        mainActiveIndex: 0,
        input_min: null,
        input_max: null,
        keys: [
            'average_price',
            'total_price',
        ],
        activeId: null,
        items: [
            {
                text: '单价',
                disabled: false,
                children: [
                    {
                        text: '1.5万元以下/㎡',
                        id: 1,
                        value: '0,15000',
                    },
                    {
                        text: '1.5万-2万元/㎡',
                        id: 2,
                        value: '15000,20000'
                    },
                    {
                        text: '2万-2.5万元/㎡',
                        id: 3,
                        value: '20000,25000'
                    },
                    {
                        text: '2.5万-3万元/㎡',
                        id: 4,
                        value: '25000,30000'
                    },
                    {
                        text: '3万-3.5万元/㎡',
                        id: 5,
                        value: '30000,35000'
                    },
                    {
                        text: '3.5万-4万元/㎡',
                        id: 6,
                        value: '35000,40000'
                    },
                ]
            },
            {
                text: '总价',
                disabled: false,
                children: [
                    {
                        text: '150万以内',
                        id: 1,
                        value: '0,150',
                    },
                    {
                        text: '150-200万',
                        id: 2,
                        value: '150,200'
                    },
                    {
                        text: '200-250万',
                        id: 3,
                        value: '200,250'
                    },
                    {
                        text: '250-300万',
                        id: 4,
                        value: '250,300'
                    },
                    {
                        text: '300-400万',
                        id: 5,
                        value: '300,400'
                    },
                    {
                        text: '400-500万',
                        id: 6,
                        value: '400,500'
                    },
                    {
                        text: '500-700万',
                        id: 7,
                        value: '500,700'
                    },
                    {
                        text: '700-1000万',
                        id: 8,
                        value: '700,1000'
                    },
                    {
                        text: '1000万以上',
                        id: 9,
                        value: '1000,99999'
                    },
                ]
            }
        ]

    },

    /**
     * 组件的方法列表
     */
    methods: {
        priceInput: function (e) {
            console.log('price input ', e)
            this.setData({ activeId: null })
            var key = e.currentTarget.dataset.name
            var value = e.detail
            var data = {}
            data[key] = value
            this.setData(data)
        },
        navClick: function (e) {
            this.setData({
                mainActiveIndex: e.detail.index,
                input_min: null,
                input_max: null,
            })

        },
        itemClick: function (e) {
            console.log('itme click', e)
            this.setData({
                input_min: null,
                input_max: null,
                activeId: e.detail.id
            })
        },

        onConfirm: function (e) {
            // 点击确定
            var _this = this
            var options = this.data.items[this.data.mainActiveIndex].children
            console.log('options', options)
            var data = { total_price: '', price: '' }
            var key = this.data.keys[this.data.mainActiveIndex]
            var value = ''
            options.forEach(function (item, index) {
                if (item.id == _this.data.activeId) {
                    value = item.value
                }
            })
            if (!value) {
                if(this.data.input_min && this.data.input_max){
                    value = this.data.input_min + ',' + this.data.input_max
                }
                // value = this.data.input_min + ',' + this.data.input_max
            }
            // if (!value) {
            //     return false
            // }

            data[key] = value
            console.log(data);
            this.triggerEvent('change', data, {})
            this.setData({ show: false })
        },

        showHandle: function (e) {
            this.setData({ show: true })
        },

        onReset: function (e) {
            var data = { price: '', total_price: '' }
            this.setData(data)
            this.setData({ show: false, input_min: null, input_max: null, activeId: null })
            this.triggerEvent('change', data, {})
        },

    }
})
