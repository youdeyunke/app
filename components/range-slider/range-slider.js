const _windowWidth = wx.getSystemInfoSync().windowWidth;
Component({
  properties: {
    //组件宽度
    width: {
      type: Number,
      value: 750,
      observer: function(newVal, oldVal, changedPath) {
        var that = this;
        if (newVal != that.data.width) {
          this._refresh();
        }
      }
    },
    //组件高度
    height: {
      type: Number,
      value: 100
    },
    //滑块大小
    blockSize: {
      type: Number,
      value: 50,
      observer: function(newVal, oldVal, changedPath) {
        var that = this;
        if (newVal != that.data.blockSize) {
          this._refresh();
        }
      }
    },
    //区间进度条高度
    barHeight: {
      type: Number,
      value: 10
    },
    //背景条颜色
    backgroundColor: {
      type: String,
      value: "#e9e9e9"
    },
    //已选择的颜色
    activeColor: {
      type: String,
      value: "#1aad19"
    },
    //最小值
    min: {
      type: Number,
      value: 0,
      observer: function(newVal, oldVal, changedPath) {
        var that = this;
        if (newVal != that.data.min) {
          that._refresh();
        }
      }
    },
    //最大值
    max: {
      type: Number,
      value: 100,
      observer: function(newVal, oldVal, changedPath) {
        var that = this;
        if (newVal != that.data.max) {
          that._refresh();
        }
      }
    },
    //设置初始值
    values: {
      type: Object,
      value: [0, 100],
      observer: function(newVal, oldVal, changedPath) {
        var that = this;
        var values = that.data.values;
        if (that._isValuesValid(newVal) && that._isValuesValid(values)) {
          if (newVal[0] != values[0] || newVal[1] != values[1])
            that._refresh();
        }
      }
    }

  },
  /**
   * 组件生命周期函数，在组件布局完成后执行
   */
  ready() {
    this._refresh();
  },
  options: {
    multipleSlots: true
  },
  data: {
    MAX_LENGTH: 700,
    minBlockLeft: 0,
    maxBlockLeft: 700,
    progressBarLeft: 0,
    progressBarWidth: 700
  },
  methods: {
    _pxToRpx: function(px) {
      return 750 * px / _windowWidth;
    },
    _onBlockTouchStart: function(e) {
      this._blockDownX = e.changedTouches[0].pageX
      this._blockLeft = e.target.dataset.left;
      this._curBlock = e.target.dataset.tag;
    },
    _onBlockTouchMove: function(e) {
      var that = this;
      var values = that._calculateValues(e);
      that._refreshProgressBar(values[2], values[3]);
      that._refreshBlock(values[2], values[3]);
    },
    _onBlockTouchEnd: function(e) {
      var that = this;
      var values = that._calculateValues(e);
      that._refreshProgressBar(values[2], values[3]);
      that._refreshBlock(values[2], values[3]);
      var eventDetail = {
        minValue: values[0],
        maxValue: values[1],
        fromUser: true
      };
      var eventOption = {};
      that.triggerEvent("rangechange", eventDetail, eventOption);
    },
    _isValuesValid: function(values) {
      return values != null && values != undefined && values.length == 2;
    },
    /**
     * 根据手势计算相关数据
     */
    _calculateValues: function(e) {
      var that = this;
      var moveLength = e.changedTouches[0].pageX - that._blockDownX;
      var left = that._blockLeft + that._pxToRpx(moveLength)
      left = Math.max(0, left);
      left = Math.min(left, that.data.MAX_LENGTH);
      var minBlockLeft = that.data.minBlockLeft;
      var maxBlockLeft = that.data.maxBlockLeft;
      if (that._curBlock == "minBlock") {
        minBlockLeft = left;
      } else {
        maxBlockLeft = left;
      }
      var range = that.data.max - that.data.min;
      var minLeft = Math.min(minBlockLeft, maxBlockLeft);
      var maxLeft = Math.max(minBlockLeft, maxBlockLeft);
      var minValue = minLeft / that.data.MAX_LENGTH * range + that.data.min;
      var maxValue = maxLeft / that.data.MAX_LENGTH * range + that.data.min;
      return [minValue, maxValue, minLeft, maxLeft];
    },
    /**
     * 计算滑块坐标
     */
    _calculateBlockLeft: function(minValue, maxValue) {
      var that = this;
      var blockSize = that.data.blockSize;
      var range = that.data.max - that.data.min;
      var minLeft = (minValue - that.data.min) / range * that.data.MAX_LENGTH;
      var maxLeft = (maxValue - that.data.min) / range * that.data.MAX_LENGTH;
      return [minLeft, maxLeft];
    },
    /**
     * 刷新进度条视图
     */
    _refreshProgressBar: function(minBlockLeft, maxBlockLeft) {
      var that = this;
      var blockSize = that.data.blockSize;
      that.setData({
        progressBarLeft: minBlockLeft + blockSize / 2,
        progressBarWidth: Math.abs(maxBlockLeft - minBlockLeft)
      });

    },
    /**
     * 刷新滑块视图
     */
    _refreshBlock: function(minBlockLeft, maxBlockLeft) {
      var that = this;
      that.setData({
        minBlockLeft: minBlockLeft,
        maxBlockLeft: maxBlockLeft
      });
    },
    /**
     * 刷新整个视图
     */
    _refresh: function() {
      var that = this;
      var MAX_LENGTH = that.data.width - that.data.blockSize;
      that.setData({
        MAX_LENGTH: MAX_LENGTH,
        maxBlockLeft: MAX_LENGTH,
        progressBarWidth: MAX_LENGTH
      });
      var values = that.data.values;
      if (that._isValuesValid(values)) {
        values[0] = Math.max(that.data.min, values[0]);
        values[0] = Math.min(values[0], that.data.max);
        values[1] = Math.max(that.data.min, values[1]);
        values[1] = Math.min(values[1], that.data.max);
        var leftValues = that._calculateBlockLeft(values[0], values[1]);
        that._refreshProgressBar(leftValues[0], leftValues[1]);
        that._refreshBlock(leftValues[0], leftValues[1]);
      }
    }
  }
})