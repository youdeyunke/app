const app = getApp()

Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/home/home",
      iconPath: "/image/icon_component.png",
      selectedIconPath: "/image/icon_component_HL.png",
      text: "首页"
    }, {
      pagePath: "/pages/myself/index",
      iconPath: "/image/icon_API.png",
      selectedIconPath: "/image/icon_API_HL.png",
      text: "我的"
    }]
  },
  ready() {
    app.ensureConfigs((configs) => {
      this.setData({
        list: configs.tabbars,
        selectedColor:configs.color.primary,
      })
    })
  },
  methods: {
    setPage: function (path) {
      // 根据传入的path 选择tab
      var _this = this
      app.ensureConfigs((configs) => {
        console.log('set page path', path)
        configs.tabbars.filter((tab, index) => {
          if (tab.pagePath == path) {
            _this.setData({
              selected: index
            })
            console.log('set page index', index)
          }
        })

      })
    },

    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log('tab click ', url)
      wx.switchTab({ url })
      console.log('tab index', data.index)
      this.setData({
        selected: data.index
      })
    }
  }
})