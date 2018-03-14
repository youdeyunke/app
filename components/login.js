// components/login.js
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
      _this.setData({countDown: 5})
      _this.timer()
    },

    formSubmit: function (e) {
      console.log('submit ', e.detail.value)
    },

  }
})
