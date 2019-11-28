// components/post/booking.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
      postId: {type: Number, value: null},
      show: { type: Boolean, value: true},
      currentTimeIndex: null,
  },

  /**
   * 组件的初始数据
   */
  data: {
      loading: false,
      success: false,
      currentDateIndex: 0,
      currentTimeIndex: 0,
      dates: [ ],
  },

   ready: function(){
       this.initDate()
   },

  /**
   * 组件的方法列表
   */
  methods: {
      initDate: function(){
          // 计算往后n天时间
          var days = 7 -1
          var today = new Date()
          var todayTimes = this.initTime(today) // 当日的时间段
          var otherTimes = [] // 出今日以外，其他的可选时间段

          var hour = today.getHours()
          var startTime  = today.getTime()
          var dates = []
          var labelHead = [ "今天","明天", "后天" ]
          for(var i=0;i<=days;i++){
              var newTime  = i * 24 * 60 * 60 * 1000 + startTime
              var day = new Date(newTime)
              var y = day.getFullYear()
              var m = day.getMonth() + 1
              var d = day.getDate()
              var dateStr = y + '-' + m + '-' + d
              var label = labelHead[i] || m + '-' + d
              var times = []
              
              if(i == 0){
                  times = todayTimes
              }else{
                  otherTimes = otherTimes.length > 1 ? otherTimes : this.initTime(day)
                  times = otherTimes
              }


              // 如果今天时间已经超过了20点，就不显示今天
              if(hour < 20){
               dates.push({
                  i: i,
                  label: label,
                  value: dateStr,
                  times: times,
                })
              }

          }
          this.setData({dates: dates})
      },

      initTime: function(d){
          var _this = this
          var today = new Date()
          var hour = d.getHours()
          var times = []
          for(var h=9;h<=20;h++){
              var label =  h + ':00'
              var disabled =  false

              // 如果是生成今天的时间段, 要判断是否可选时间段
              if(today.getDate() == d.getDate()){
                disabled = h  < hour
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

      dateChange: function(e){
        var i = e.detail.name
        this.setData({ currentDateIndex: i, currentTimeIndex: null })
      },

      timeClick: function(e){
          var i = e.currentTarget.dataset['index']
          this.setData({ currentTimeIndex: i })
      },

      submitHandle: function(){
          var _this = this
          var log = {post_id: this.data.postId, status:0}
          var t = this.data.times[this.data.currentTimeIndex]
          var d = this.data.dates[this.data.currentDateIndex]

          log['time_str'] = t.value
          log['date'] = d.value
          var isok = this.validate(log)
          if(!isok){
              return false;
          }
          app.request({
              url: '/api/v1/booking_logs/',
              method: 'POST',
              data: {booking_log: log},
              success: function(resp){
                  var data = resp.data.data
                  _this.setData({loging:false, success: true})
              },
          })
      },

      loadData: function(){
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
              success: function(resp){
              }
          })
      },


  }

})
