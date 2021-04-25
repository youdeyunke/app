Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: Object
    },
    num:{
      type:Number
    },
    formdata:{
      type:Object
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    detailsShow: false,
    buildingShow: true,
  },
  // ready:function(){
  //   console.log('提交的数据',this.properties.formdata)
  // },
  /**
   * 组件的方法列表
   */
  methods: {
    unfoldHandle: function (e) {
      var myindex = e.currentTarget.dataset.index.floor
      var detailsShow = this.data.detailsShow
      this.setData({
        detailsShow: !detailsShow,
        buildingShow: !this.data.buildingShow,
      })
      this.triggerEvent("changestatus",{detailsShow,myindex})
    },
    closeHandle: function () {
      this.setData({
        detailsShow: !this.data.detailsShow,
        buildingShow:!this.data.buildingShow
      })
    },
  },

})