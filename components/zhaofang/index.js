// components/zhaofang/index.js
const app = getApp()
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
        color: '#ee0a24',
        value: [100, 200],
        valueRuler: [30, 84, 138, 192, 246, 300],
        status: 1,
        budget_min: 100,
        budget_max: 200,
        positionList: [],
        housetypeList: [{
                name: '1居',
                value: 1,
            },
            {
                name: '2居',
                value: 2,
            },
            {
                name: '3居',
                value: 3,
            },
            {
                name: '4居',
                value: 4
            },
            {
                name: '5居',
                value: 5
            },
            {
                name: '5居+',
                value: 6
            },
        ],

        areaList: [{
            name: '80㎡以下'
        }, ],

        purposeList: [{
                name: '刚需'
            },
            {
                name: '改善房'
            },
            {
                name: '投资增值'
            },
            {
                name: '给父母住'
            },
            {
                name: '学区房'
            },
            {
                name: '其他'
            },

        ]
    },

    attached() {
        this.loadData()
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadData: function () {
            var _this = this
            app.request({
                url: '/api/v1/needs/',
                method: 'GET',
                success: function (resp) {
                    if (resp.data.status != 0) {
                        return
                    }
                    var rdata = resp.data.data


                    if (rdata.area && rdata.area.length > 0) {
                        _this.setData({
                            areaList: rdata.area
                        })
                    }

                    if (rdata.purpose && rdata.purpose.length > 0) {
                        _this.setData({
                            purposeList: resp.data.data.purpose
                        })
                    }
                    if (rdata.housetype && rdata.housetype.length > 0) {
                        _this.setData({
                            housetypeList: rdata.housetype
                        })
                    }
                    if (rdata.budget && rdata.budget.length > 0) {
                        _this.setData({
                            budgetList: rdata.budget
                        })
                    }

                    _this.setData({
                        positionList: rdata.districts,
                    })
                }
            })
        },
        onChange(e) {
            console.log(e.detail)
            this.setData({
                budget_min: e.detail[0],
                budget_max: e.detail[1],
                value: e.detail
            })
        },
        nextPage() {
            var status = this.data.status
            this.setData({
                status: status + 1
            })
        },
        quyuNextPage() {
            if (!this.data.position) {
                wx.showToast({
                    title: '请选择区域',
                    icon: 'none'
                })
                return
            }
            var status = this.data.status
            this.setData({
                status: status + 1
            })
        },
        huxinNextPage() {
            if (!this.data.housetype) {
                wx.showToast({
                    title: '请选择户型',
                    icon: 'none'
                })
                return
            }
            var status = this.data.status
            this.setData({
                status: status + 1
            })
        },
        mianjiNextPage() {
            if (!this.data.area) {
                wx.showToast({
                    title: '请选择面积',
                    icon: 'none'
                })
                return
            }
            var status = this.data.status
            this.setData({
                status: status + 1
            })
        },
        yongtuNextPage() {
            if (!this.data.purpose) {
                wx.showToast({
                    title: '请选择买房用途',
                    icon: 'none'
                })
                return
            }
            var status = this.data.status
            this.setData({
                status: status + 1
            })
        },
        positionHandle: function (e) {
            var i = e.currentTarget.dataset.index
            var ps = this.data.positionList
            var p = ps[i]
            var position = []

            p.selected = !p.selected
            ps[i] = p
            this.data.positionList.forEach(function (item, i) {
                if (item.selected) {
                    position.push(item.text)
                }
            })
            this.setData({
                positionList: ps,
                position: position.join(',')
            })
        },
        housetypeHandle: function (e) {
            var i = e.currentTarget.dataset.index
            var ps = this.data.housetypeList
            var p = ps[i]
            var housetype = []

            p.selected = !p.selected
            ps[i] = p
            this.data.housetypeList.forEach(function (item, i) {
                if (item.selected) {
                    housetype.push(item.name)
                }
            })
            this.setData({
                housetypeList: ps,
                housetype: housetype.join(',')
            })
        },
        areaHandle: function (e) {
            var i = e.currentTarget.dataset.index
            var ps = this.data.areaList
            var p = ps[i]
            var area = []

            p.selected = !p.selected
            ps[i] = p
            this.data.areaList.forEach(function (item, i) {
                if (item.selected) {
                    area.push(item.name)
                }
            })
            this.setData({
                areaList: ps,
                area: area.join(',')
            })
        },
        purposeHandle: function (e) {
            var i = e.currentTarget.dataset.index
            var ps = this.data.purposeList
            var p = ps[i]
            var purpose = []
    
            p.selected = !p.selected
            ps[i] = p
            this.data.purposeList.forEach(function (item, i) {
                console.log('item', item)
                if (item.selected) {
                    purpose.push(item.name)
                }
            })
    
    
            this.setData({
                purposeList: ps,
                purpose: purpose.join(',')
            })
        },
    }
})