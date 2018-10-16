// components/typepicker.js
const ya = []
const fu = []

for(let i=1;i<=12;i++){
  ya.push(i)
  fu.push(i)
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  ready: function(){
  },

  /**
   * 组件的初始数据
   */
  data: {
    ya: ya,
    fu: fu,
    value: [0,0],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShow: function(){
      this.setData({show: true})
    },

    onClose: function(){
      this.setData({show: false})
    },

    changeHandle: function(e){
      var val = e.detail.value
      this.setData({value: val})
    },

    onConfirm: function(e){
      this.setData({show: false})
      var v = this.data.value
      var ya =  this.data.ya[v[0]]
      var fu = this.data.fu[v[1]]
      var text = "押" + ya + "付" + fu
      this.triggerEvent('confirm', {payment_cycle: text})
    },



  }
})
