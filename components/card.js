// components/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    border: {
      type: Boolean, value: false,
    },
    shadow: {
      type: Boolean, value: false,
    },
    
    title: {type: String, value: 'CARD标题'},
    number: {type: Number, value: 0,},
    action: { type: String, value: '查看更多'},
    url: { type: String, value: null},
    opentype: {type: String, value: 'navigateTo'}
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    actionHandle: function(e){
      console.log('url:', this.data.url, 'opentype', this.data.opentype)
      if(!this.data.url){
        return false
      }

      var _this = this
      var url = _this.data.url
      switch (_this.data.opentype.toLowerCase()){
        case 'navigateto':
          wx.navigateTo({
            url: url,
          })
          break;
        case "switchtab":
          wx.switchTab({
            url: url,
          })
          break;
        case "webview":
          wx.navigateTo({
            url: '/pages/webview/webview?url=' + url,
          })
          console.log('hello')
          break;
        default:
          console.log('default:', _this.data.opentype.toLowerCase, 'url', url)
      }
    },

  }
})
