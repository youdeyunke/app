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
// components/common-filter/index.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        configs: {
            type: Array,
            value: [{
                label: '状态',
                key: 'sale_status_item_id',
                options: [{
                    text: '全部状态',
                    value: null
                },
                {
                    text: '状态1',
                    value: 1
                },
                {
                    text: '状态2',
                    value: 2
                },
                {
                    text: '状态3',
                    value: 3
                },
                ]
            },
            {
                label: '产品',
                key: 'product_id',
                options: [{
                    text: '产品1',
                    value: 1
                },
                {
                    text: '产品2',
                    value: 2
                },
                {
                    text: '产品3',
                    value: 3
                },
                ]
            },
            {
                label: '期次',
                key: 'period',
                options: [{
                    text: '期次1',
                    value: 1
                },
                {
                    text: '期次2',
                    value: 2
                },
                {
                    text: '期次3',
                    value: 3
                },
                ]
            },

            ],
        }

    },

    /**
     * 组件的初始数据
     */
    data: {

    },
    attached: function () {
        var _this = this
        app.ensureConfigs((myconfigs) => {
            _this.setData({
                btnColor: myconfigs.color.primary_btn,
                color: myconfigs.color.primary,
            })
        })
    },


    /**
     * 组件的方法列表
     */
    methods: {

        itemClick: function (e) {
            const {
                index
            } = e.currentTarget.dataset
            console.log('aaa')
            if (index == this.data.menuIndex) {
                console.log('bbb')
                this.setData({
                    menuIndex: null,
                })
                return
            }
            var item = this.data.configs[index]
            this.setData({
                menuIndex: index
            })
        },

        onChange: function (e) {
            console.log('chang', e)
            this.triggerEvent('change', e.detail)
            this.setData({
                menuIndex: null
            })
        },



    }
})