// components/zhaofang/index.js
const app = getApp()
const needApi = require("../../api/need")
var auth = require('../../utils/auth.js');
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        config: {
            type: Object,
        }
    },

    observers: {

        "config.data.message": function (v) {
            this.setData({
                message: v
            })
        },
    },
    /**
     * 组件的初始数据
     */
    data: {
        message: '我们已经收到您的找房要求，系统正在为您分配置业顾问，2个工作日内会有专属置业顾问与您电话联系，请注意接听',
        isDone: false,
        value: [100, 200],
        valueRuler: [30, 80, 150, 200, 300, 500],
        status: 1,
        budget_min: 100,
        budget_max: 200,
        positionList: [],
        contact_sex: 1,
        contact_name: '',
        sms_code: '',
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

        var _this = this
        app.ensureConfigs((myconfigs) => {
            _this.setData({
                primaryColor: myconfigs.color.primary,
                primaryBtnColor: myconfigs.color.primary_btn
            })
        })

        var user = app.globalData.userInfo
        var contact_mobile_lock = false
        if (user == null ) {
            this.setData({
                contact_mobile_lock: contact_mobile_lock
            })
            return
        }
        if (user.mobile && user.mobile.length == 11) {
            contact_mobile_lock = true
        }
        this.setData({
            contact_mobile: user.mobile,
            contact_mobile_lock: contact_mobile_lock
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadData: function () {
            var _this = this
            // 有待检测
            // app.request({
            //     url: '/api/v1/needs/ 有待检测',
            //     method: 'GET',
            //     success: function (resp) {
                  
            //     }
            // })
            needApi.getNeedList().then((resp)=>{
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
        sexToggle: function (e) {
            this.setData({
                contact_sex: this.data.contact_sex == 1 ? 0 : 1,
            })
        },
        inputChange: function (e) {
            var key = e.target.dataset.name
            var value = e.detail
            var d = {}
            d[key] = value
            this.setData(d)
        },
        changeMobile: function (e) {
            this.setData({
                contact_mobile: '',
                contact_mobile_lock: false,
            })
        },
        submitHandle: function (e) {
            var _this = this
            _this.validate(function (data) {
                // 如果需要提交验证码
                // 应该改为，判断点击了修改按钮之后
                var _token = app.globalData.token
                if (!_this.data.contact_mobile_lock) {
                    _this.smsLoginHandle(() => {
                        _this.postData(data)
                    })
                    return
                }
                _this.postData(data)
                return
            })

        },
        smsLoginHandle(cb) {
            // 通过短信验证码登陆账号
            var phone = this.data.contact_mobile
            var code = this.data.sms_code
            if (!(/^1[3456789]\d{9}$/.test(phone))) {
                wx.showModal({
                    title: '手机号格式错误',
                    icon: 'none'
                })
                return false
            }
            if (code.length != 4) {
                wx.showModal({
                    title: '验证码输入错误',
                    icon: 'none'
                })
                return false
            }
            app.request({
                url: '/api/v1/sms/auth',
                method: 'POST',
                data: {
                    mobile: phone,
                    code: code
                },
                success: function (res) {
                    var data = res.data
                    if (data.status == 0) {
                        // 保存下服务器返回的token
                        var token = data.data.token
                        var user = data.data.user
                        auth.setUserInfo(token, user)
                        return cb()
                    }
                }
            })
        },
        postData: function (data) {
            var _this = this
            // 将表单数据处理成线索表所需要的数据格式 

// 有待检测
            // app.request({
            //     url: '/api/v1/needs/有待检测',
            //     data: data,
            //     method: 'POST',
            //     success: function (resp) {
                  
            //     }
            // })
            needApi.getNeedList(data).then((resp)=>{
                if (resp.data.status != 0) {
                    wx.showToast({
                        title: '服务器出现错误，请稍后再试',
                        icon: 'none',
                    })
                    return false
                }
                // 设置一些重要标志位 
                _this.setData({
                    isDone: true,
                    sms_code: null,
                    contact_mobile_lock: true,
                })
            })
        },
        validate: function (cb) {
            if (!this.data.contact_name) {
                wx.showToast({
                    title: '请填写联系人姓名',
                    icon: 'none'
                })
                return
            }
            if (this.data.contact_mobile_lock == false && !this.data.sms_code) {
                wx.showToast({
                    title: '请填写短信验证码',
                    icon: 'none'
                })
                return
            }
            var data = {
                cat: this.data.cat,
                budget_min: this.data.budget_min,
                budget_max: this.data.budget_max,
                position: this.data.position,
                housetype: this.data.housetype,
                area: this.data.area,
                points: this.data.purpose,
                name: this.data.contact_name,
                mobile: this.data.contact_mobile,
                sex: this.data.contact_sex,
            }
            var budget_max = this.data.budget_max
            if (budget_max == 500) {
                delete data.budget_max
            }
            return cb(data)
        },
        reWrite: function (e) {
            this.setData({
                isDone: false,
                status: 1
            })
        },
    }
})