// pages/fenxiao/customer-item.js
const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: { type: Object, value: null },
        isAdmin: { type: Boolean, value: false },
    },

    observers: {
        "item.id": function (val) {
            var items = app.globalData.myconfigs['deal_status_items'] || []
            var steps = items.map((item, index) => {
                return { text: item.name }
            })
            this.setData({
                steps: steps,
                dealStatusItems: items,
            })
        },

        "item.created_at": function (t) {
            console.log('created', t)
            var dt = t.split('T')[0]
            var tm = t.split('T')[1].split('.')[0]
            var v = dt + ' ' + tm
            this.setData({
                createdAt: v
            })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        steps: [],
        dealStatusItems: [],
        currentDealStatusIndex: 0,
        showPop: false,
        isPending: null,
        isPass: null,
        isReject: null
    },

    /**
     * 组件的方法列表
     */
    methods: {
        showPopHandle: function () {
            var index = this.data.dealStatusItems.findIndex((item, i) => {
                return item.value === this.data.item.deal_status
            })
            this.setData({ showPop: true, currentDealStatusIndex: index })
        },

        closePopHandle: function () {
            this.setData({ showPop: false })
        },

        changeDealStatusHandle: function (e) {
            const { index } = e.detail
            var deal = this.data.dealStatusItems[index]
            var val = deal.value
            this.updateDealStatus(val)
            this.closePopHandle()
        },

        validHandle: function () {

            // 验证通过
            var _this = this
            wx.showModal({
                title: '操作提示',
                content: '您确定将该记录标记为有效吗? 变更后无法撤销，请谨慎操作',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '确定',
                confirmColor: '#1989fa',
                success: (result) => {
                    console.log('confirm', result.confirm)
                    if (result.confirm == false) {
                        return
                    }
                    _this.updateStatus(2)
                },
            });

        },

        updateStatus: function (val) {
            // 修改为审核通过
            var _this = this
            app.request({
                url: '/api/v1/admin_customers/' + _this.data.item.id,
                method: 'PUT',
                data: { status: val },
                success: function (resp) {
                    if (resp.data.status != 0) {
                        return
                    }
                    _this.triggerEvent('change')
                    wx.showToast({
                        title: '状态已变更',
                        icon: 'none',
                    });
                }
            })
        },

        updateDealStatus: function (val) {
            // 修改交易状态
            var _this = this
            app.request({
                url: '/api/v1/admin_customers/' + _this.data.item.id,
                method: 'PUT',
                data: { deal_status: val },
                success: function (resp) {
                    if (resp.data.status != 0) {
                        return
                    }
                    _this.triggerEvent('change')
                    wx.showToast({
                        title: '状态已变更',
                        icon: 'none',
                    });

                }
            })
        },


        invalidHandle: function () {
            // 验证通过
            var _this = this
            wx.showModal({
                title: '操作提示',
                content: '您确定将该记录标记为无效吗? 变更后无法撤销，请谨慎操作 ',
                showCancel: true,
                cancelText: '取消',
                cancelColor: '#000000',
                confirmText: '确定',
                confirmColor: '#1989fa',
                success: (result) => {
                    console.log('confirm', result.confirm)
                    if (result.confirm == false) {
                        return
                    }
                    _this.updateStatus(0)
                },
            });

        },
    }

})
