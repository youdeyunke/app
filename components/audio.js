// components/audio.js
const audio = wx.createInnerAudioContext()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {type: String, value: ''},
    name: {type: String, value: '音频'}
  },

  ready: function(){
    var _this = this
    
    audio.autoplay = false
    audio.src = "http://oc4tj4k6j.bkt.clouddn.com/%E6%B1%9F%E5%8D%97%E6%82%A6%E5%8D%A2%E8%80%81%E5%B8%88%E4%BB%8B%E7%BB%8D.wav"
    audio.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })   

    audio.onPlay( () => {
      console.log('on play ', audio.duration)
    })

    audio.onEnded(() => {
      // 自然播放结束
      this.setData({status: 0})
    })

    audio.onSeeking(() => {
      console.log('seeking')
    })

    audio.onTimeUpdate( () => {
      console.log('on onTimeUpdate', audio.duration)
      var durationStr = this.s2m(audio.duration)
      var currentTimeStr = this.s2m(audio.currentTime)
      
      var per = audio.currentTime /  audio.duration * 100
      var progressValue = '' + per + '%'
      _this.setData({
        durationStr: durationStr,
        currentTimeStr: currentTimeStr,
        progressValue: progressValue
      })
    })

  },

  /**
   * 组件的初始数据
   */
  data: {
    status: 0,
    durationStr: '10:00',
    currentTimeStr: '00:00'

  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    i2ii: function(i){
      if(i<10){
        return '0' + i
      }else{
        return '' + i
      }
    },

    s2m: function(v){
      v = Math.floor(v)
      var m = Math.floor(v / 60)
      var s = v % 60
      m = this.i2ii(m)
      s = this.i2ii(s)
      
      console.log('v', v, 'm', m, 's', s)
      return '' + m + ':' + s
    },

    statusHandle: function(e){
      console.log('status,', this.data.status)
      var s = 0
      if(this.data.status == 1){
        s = 0
        audio.pause()
      }else{
        // 开始播放
        if(audio.currentTime == audio.duration){
          //  上一次播放到结束了，从头开始
          audio.startTime = 0
        }
      
        s = 1
        audio.play()
      }
      this.setData({status:s})
    }

  }
})
