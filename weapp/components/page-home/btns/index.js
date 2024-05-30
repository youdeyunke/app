// components/pagemaker/myselficons/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    btns: {
      type: Object,
      value: null
    },
    config: {
      type: Object,
      default: null
    },
    pageKey: {
      type: String,
      value: 'home'
    }
  },

  ready() {
    var _this = this
    app.ensureConfigs(function (configs) {
      _this.setData({
        primaryColor: configs.color.primary,
      })
    })
  },
  observers: {
    "btns": function (val) {
      this.onShow()
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 滑动比例计算
    slideWidth: '', //滑块宽
    slideLeft: 0, //滑块位置
    totalLength: '', //当前滚动列表总长
    slideShow: false, //滑块是否显示
    slideRatio: '', //滑块比例
    userInfo: null,

    arrangedItems: [],
    btnNum: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    chunk: function (arr, size) {
      var result = [];

      for (var i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
      }
      return result;
    },
    getRatio() {
      if (this.data.arrangedItems.length <= 1) {
        this.setData({
          slideShow: false
        })
      } else {
        var _totalLength = this.data.arrangedItems.length * 630; //分类列表总长度
        var _ratio = 80 / _totalLength * (750 / this.data.windowWidth); //滚动列表长度与滑条长度比例
        var _showLength = 630 / _totalLength * 80; //当前显示滑条的长度(保留两位小数)
        this.setData({
          slideWidth: _showLength,
          totalLength: _totalLength,
          slideShow: true,
          slideRatio: _ratio
        })
      }
    },
    //slideLeft动态变化
    getleft(e) {
      this.setData({
        slideLeft: e.detail.scrollLeft * this.data.slideRatio
      })
    },

    onShow(){
      var _this = this
      // 如果val为空或val长度为0，return
      if(!this.data.btns || this.data.btns.length == 0){
        return
      }
      var val = []

      val = this.data.btns

      val = val.filter(item => item.public)

      var totalColumns = 5 * 5;

      // 对items进行分割
      _this.setData({
        arrangedItems: _this.chunk(val, totalColumns),
        btnNum: val.length
      });

      if (val.length) {
        var systemInfo = wx.getSystemInfoSync();
        this.setData({
          windowWidth: systemInfo.windowWidth,
        }, () => {
          _this.getRatio()
        })
        var user = wx.getStorageSync('userInfo');
        this.setData({
          userInfo: user
        })
      }
    },
  }
})