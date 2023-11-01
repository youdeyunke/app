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
const app = getApp()

Component({
    data: {
        selected: 0,
        color: "#7A7E83",
        selectedColor: "#3cc51f",
        list: [],
    },
    ready () {
        app.ensureConfigs((configs) => {
            this.setData({
                list: configs.tabbars,
                selectedColor: configs.color.primary,
            })
        })
    },
    methods: {
        setPage: function (path) {
            // 根据传入的path 选择tab
            var _this = this
            app.ensureConfigs((configs) => {
                console.log('set page path', path)
                configs.tabbars.filter((tab, index) => {
                    if (tab.page_path == path) {
                        _this.setData({
                            selected: index
                        })
                        console.log('set page index', index)
                    }
                })

            })
        },

        switchTab (e) {
            const { index } = e.currentTarget.dataset
            var data = this.data.list[index];
            console.log('data', data)
            const url = data.page_path
            console.log('tab click ', url)
            wx.switchTab({ url })
            console.log('tab index', data.index)
            this.setData({
                selected: data.index
            })
        }
    }
})