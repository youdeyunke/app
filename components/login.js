// components/login.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    flag: { type: Boolean, value: false}
  },

  /**
   * 组件的初始数据
   */
  data: {
    countDown: 0,
    _code: 0,
  },
  

  /**
   * 组件的方法列表
   */
  methods: {
    inputHandle: function(e){
      var key = e.currentTarget.id
      var value = e.detail.value
      var userInput = {}
      userInput[key] = value
      this.setData(userInput)
    },
    timer: function(){
      var _this = this
      if(_this.data.countDown <= 0 ){
        return
      }
      _this.setData({ countDown: _this.data.countDown - 1 })
      setTimeout(function () {_this.timer()}, 1000)

    },

    closeHandle: function(e){
      this.setData({flag: false})
    },

    captchaHandle: function(e){
      var _this = this
      if(!_this.data.mobile){
        return;
      }
      if(_this.data.mobile.length < 11){
        return;
      }

      if(_this.data.countDown > 0 ){
        return
      }

      // send captcha
      
      _this.setData({countDown: 5, _code: '5555'})
      _this.timer()
    },

    formSubmit: function (e) {
      var data =  e.detail.value
      var _this = this
      // check code
      var verify = data.code == _this.data._code
      console.log('data.code', data.code, 'this.data.code', _this.data.code)
      if(!verify){
        console.log('this.data.code ', _this.data.code, 'data.code', data)
        wx.showToast({
          title: '验证码错误',
          icon: 'none',
        })
        return false
      }
      

      app.request({
        url: '/api/v1/users/bind_mobile',
        method: 'POST',
        data: data,
        success: function (resp) {
          if(resp.data.status != 0){
            console.log('bind :', resp)
            return false
          }

          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000,
            success: function(){
              console.log('success trigger event')
              _this.triggerEvent('success', {}, {})
              // login back ?
              var p = wx.getStorageSync('login_back_page')
              if (p) {
                wx.setStorageSync('login_back_page', null)
                wx.navigateTo({ url: p })
              }

            }
          })

        }
      })      
    },

  }
})
