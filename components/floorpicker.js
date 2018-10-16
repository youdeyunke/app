// components/typepicker.js
const nums = []

for(let i=1;i<=50;i++){
  nums.push(i)
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
    nums: nums,
    value: [0,9],
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
      var current =  this.data.nums[v[0]]
      var total = this.data.nums[v[1]]
      console.log('111')
      this.triggerEvent('confirm', {
        current_floor: current, 
        total_floor: total}, {})

      console.log('222')
    },



  }
})
