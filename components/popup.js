// components/popup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label: {
      type: String, value: '',
    },
    show: {
      type: Boolean, value: false
    },
    position: {
      type: String, value: 'top'
    },
    cancleBtnText: {
      type: String, value: '重置'
    },
    confirmBtnText: {
      type: String, value: '确定'
    }

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

    onConfirm: function(e){
      this.triggerEvent('confirm', {}, {})
    },
    onCancle: function(e){
      this.triggerEvent('cancle', {}, {})
    },

  }
})
