// components/post/booking.js
const app = getApp()
const bookingApi=require("../../api/booking")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        postId: {type: Number,value:null},
        booked: { type: Boolean, value: false },
        currentTimeIndex: null,
    },

    /**
     * 组件的初始数据
     */
    data: {
        show: false,
        loading: false,
        currentDateIndex: 0,
        currentTimeIndex: 0,

        name: '',
        date: '', 
        time: '', 
        remark: '', 
        mobile: '', // 如果当前用户已经登陆，自动填充手机号， 并且不能被修改

        mobileLocked: false,        
        dates: [],
    },

    ready: function () {
        var user = app.globalData.userInfo
        this.setData({ 
            user: user ,
            mobile:  user ?  user.mobile : '',
            mobileLocked: user ?  true : false, 
        })
        this.initDate()
    },

    /**
     * 组件的方法列表
     */
    methods: {
       

        closeHandle: function () {
            this.setData({ show: false })
            this.triggerEvent('close', {})
        },

        openHandle: function (user) {
            this.setData({ show: true })
            this.setData({ 
                user: user ,
                mobile:  user ?  user.mobile : '',
                mobileLocked: user ?  true : false, 
            })
            this.triggerEvent('open', {})
        },

        initDate: function () {
            // 计算往后n天时间
            var days = 7 - 1
            var today = new Date()
            var todayTimes = this.initTime(today) // 当日的时间段
            var otherTimes = [] // 出今日以外，其他的可选时间段

            var hour = today.getHours()
            var startTime = today.getTime()
            var dates = []
            var weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
            var labelHead = ["今天", "明天"]
            for (var i = 0; i <= days; i++) {
                var newTime = i * 24 * 60 * 60 * 1000 + startTime
                var day = new Date(newTime)
                var y = day.getFullYear()
                var m = day.getMonth() + 1
                var d = day.getDate()
                var w = day.getDay()
                var dateStr = y + '-' + m + '-' + d
                var label = m + '.' + d
                if (labelHead[i]) {
                    label = label + '(' + labelHead[i] + ')'
                } else {
                    label = label + '(' + weeks[w] + ')'
                }

                var times = []

                if (i == 0) {
                    times = todayTimes
                } else {
                    otherTimes = otherTimes.length > 1 ? otherTimes : this.initTime(day)
                    times = otherTimes
                }

                // 如果今天时间已经超过了20点，就不显示今天
                if (i >= 1 || hour < 20) {
                    dates.push({
                        i: i,
                        label: label,
                        value: dateStr,
                        times: times,
                    })
                }

            }
            console.log('dates', dates)
            this.setData({ dates: dates })
        },

        initTime: function (d) {
            var _this = this
            var today = new Date()
            var hour = d.getHours()
            var times = []
            for (var h = 9; h <= 20; h++) {
                var label = h + ':00'
                var disabled = false

                // 如果是生成今天的时间段, 要判断是否可选时间段
                if (today.getDate() == d.getDate()) {
                    disabled = h < hour
                }

                var item = {
                    label: label,
                    value: label,
                    disabled: disabled,
                }

                times.push(item)
            }
            return times
        },


        dateClick: function (e) {
            var i = e.currentTarget.dataset['index']
            this.setData({ currentDateIndex: i, currentTimeIndex: null })
        },

        timeClick: function (e) {
            var i = e.currentTarget.dataset['index']
            this.setData({ currentTimeIndex: i })
        },

        validate: function (log) {
        },

        submitHandle: function(){
            this._submitHandle()
  
        },

        _submitHandle: function () {
            if (this.data.currentTimeIndex == null || this.data.currentDateIndex == null) {
                wx.showToast({
                    title: '请选择预约时间',
                    icon: 'none',
                })
                return false;
            }
            if(this.data.name==''){
                wx.showToast({
                  title: '请输入您的姓名',
                  icon:'none'
                })
                return false
            }
            if(this.data.mobile==''){
                wx.showToast({
                  title: '请输入您的联系方式',
                  icon:'none'
                })
                return false
            }
            console.log("this.data.mobile",this.data.mobile.length)
            if(this.data.mobile.length<'11'){
                wx.showToast({
                  title: '号码格式错误，请重新输入',
                  icon:'none'
                })
                return false
            }


            var _this = this
            var log = {
                post_id: this.properties.postId,
                name: this.data.name, 
                remark: this.data.remark, 
                mobile: this.data.mobile, 
                status: 0,
            }
            console.log("log",log)
            var d = this.data.dates[this.data.currentDateIndex]
            var t = d.times[this.data.currentTimeIndex]
            log['time'] = t.value
            log['date'] = d.value
    
            app.bindPostCustomer(log.post_id, '点击了预约看房')
            this.setData({ loging: true })
            // 有待检测
            // app.request({
            //     url: '/api/v1/booking_logs/有待检测',
            //     method: 'POST',
            //     data: { booking_log: log },
            //     success: function (resp) {
                  
            //     },
            // })
            bookingApi.createBooking(
                log
            ).then((resp)=>{
                _this.setData({ loging: false })
                if (resp.data.status == 0) {
                    _this.triggerEvent('change', { value: true })
                }
            })
        },

        nameChange: function (e) {
            this.setData({ 
                name: e.detail.value 
            })
        },
        mobileChange:function(e){
            this.setData({
                mobile:e.detail.value
            })
        },
        wordChange:function(e){
            this.setData({
                remark:e.detail.value
            })
        },

        loadData: function () {
            var _this = this
            var user = app.globalData['userInfo']
            // 查询预约状态
            var query = {
                user_id: user.id,
                user_group: 'user',
                post_id: this.data.postId
            }
            app.request({
                url: '/api/v1/booking_logs',
                data: query,
                success: function (resp) {
                }
            })
        },


    }

})
