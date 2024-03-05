// pkgYfyj/components/air-view/index.js
const postApi = require("../../../api/post")
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pid: {
      type: Number,
      value: 0
    },
    currentBuild: {
      type: String,
      value: ''
    }
  },

  observers: {
    'pid': function (val) {
      if (!val) {
        return
      }
      this.loadData()
    },
    'currentBuild':function (val) {
      if (!val) {
        return
      }
      var _this = this
      var currentIndex = this.data.items.findIndex((b) => b.text === val)
      console.log(currentIndex);
      if (currentIndex === -1) {
        return
      }
      this.setData({
        currentIndex: currentIndex
      },() => {
        _this.clearCanvas()
        _this.renderCanvas()
      })
    }
  },

  ready() {},

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: -1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadData() {
      var _this = this
      var pid = this.data.pid
      postApi.getPostAirviews(pid).then((resp) => {
        if (resp.data.code != 0) {
          return
        }
        const dpr = wx.getSystemInfoSync().pixelRatio
        const xs = 750 / this.data.bg_width;
        // var data
        // bg_width = _this.data.bg_width * xs * dpr
        // bg_height = _this.data.bg_height * xs * dpr
        this.setData(resp.data.data, () => {
          _this.drawCanvas()
        })
        // console.log();
      })
    },
    drawCanvas() {
      const dpr = wx.getSystemInfoSync().pixelRatio
      const xs = 750 / this.data.bg_width;


      var _this = this
      const query = this.createSelectorQuery()
      query.select('#myCanvas')
        .fields({
          node: true,
          size: true
        })
        .exec((res) => {
          console.log(res, dpr,  _this.data.bg_width * xs * dpr,_this.data.bg_height * xs * dpr);
          const canvas = res[0].node
          canvas.width = _this.data.bg_width * xs * dpr
          canvas.height = _this.data.bg_height * xs * dpr
          const ctx = canvas.getContext('2d')

          let img = canvas.createImage();

          this.setData({
            ctx: ctx,
            img: img
          })

          // var bgImage = wx.createImage(); // 创建图片对象
          img.src = this.data.bg_img_url
          img.onload = () => {
            //img.complete表示图片是否加载完成，结果返回true和false;
            console.log(img.complete); //true
            ctx.drawImage(img, _this.data.bg_img_x * xs * dpr, _this.data.bg_img_y * xs * dpr, 750 * _this.data.bg_img_scale * dpr, _this.data.bg_height * xs * _this.data.bg_img_scale * dpr);
            _this.renderCanvas()
          };
        })


    },
    renderCanvas(){
      if (!this.data.ctx) {
        return
      }
      const dpr = wx.getSystemInfoSync().pixelRatio
      const xs = 750 / this.data.bg_width;
      var _this = this
      _this.data.items.forEach((obj, index) => {
              
        const box = {
          x: obj.x * xs * dpr,
          y: obj.y * xs * dpr,
          width: obj.width * xs * dpr,
          height: obj.height * xs * dpr,
          text: obj.text // 假设obj中有text属性作为矩形内的文字
        };
      
        _this.drawBox(box, index);
      });
    },
    drawBox(box, index) {
      var ctx = this.data.ctx
      const dpr = wx.getSystemInfoSync().pixelRatio
      const xs = 750 / this.data.bg_width;

      const cornerRadius = 10 * xs * dpr; // 圆角半径
      box.width = Number(box.width);
      box.height = Number(box.height);

      // 绘制填充矩形
      if (this.data.currentIndex == index) {
        console.log(box);
        ctx.fillStyle = '#fff'
      } else {
        ctx.fillStyle = '#fa6a00';
      }
      
      ctx.beginPath();
      ctx.moveTo(box.x + cornerRadius, box.y);
      ctx.lineTo(box.x + box.width - cornerRadius, box.y);
      ctx.arc(
        box.x + box.width - cornerRadius,
        box.y + cornerRadius,
        cornerRadius,
        -Math.PI / 2,
        0
      );
      ctx.lineTo(box.x + box.width, box.y + box.height - cornerRadius);
      ctx.arc(
        box.x + box.width - cornerRadius,
        box.y + box.height - cornerRadius,
        cornerRadius,
        0,
        Math.PI / 2
      );
      ctx.lineTo(box.x + cornerRadius, box.y + box.height);
      ctx.arc(
        box.x + cornerRadius,
        box.y + box.height - cornerRadius,
        cornerRadius,
        Math.PI / 2,
        Math.PI
      );
      ctx.lineTo(box.x, box.y + cornerRadius);
      ctx.arc(
        box.x + cornerRadius,
        box.y + cornerRadius,
        cornerRadius,
        Math.PI,
        -Math.PI / 2
      );
      ctx.closePath();
      ctx.fill();

      // 绘制描边矩形（白边）
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2 * xs * dpr; // 设置描边宽度为2
      ctx.beginPath();
      ctx.moveTo(box.x + cornerRadius, box.y);
      ctx.lineTo(box.x + box.width - cornerRadius, box.y);
      ctx.arc(
        box.x + box.width - cornerRadius,
        box.y + cornerRadius,
        cornerRadius,
        -Math.PI / 2,
        0
      );
      ctx.lineTo(box.x + box.width, box.y + box.height - cornerRadius);
      ctx.arc(
        box.x + box.width - cornerRadius,
        box.y + box.height - cornerRadius,
        cornerRadius,
        0,
        Math.PI / 2
      );
      ctx.lineTo(box.x + cornerRadius, box.y + box.height);
      ctx.arc(
        box.x + cornerRadius,
        box.y + box.height - cornerRadius,
        cornerRadius,
        Math.PI / 2,
        Math.PI
      );
      ctx.lineTo(box.x, box.y + cornerRadius);
      ctx.arc(
        box.x + cornerRadius,
        box.y + cornerRadius,
        cornerRadius,
        Math.PI,
        -Math.PI / 2
      );
      ctx.closePath();
      ctx.stroke();

      // 绘制文字
      ctx.fillStyle = "#fff"; // 设置字体颜色为白色

      if (this.data.currentIndex == index) {
        ctx.fillStyle = '#fa6a00'
      } else {
        ctx.fillStyle = '#fff';
      }

      ctx.textAlign = "center"; // 水平居中对齐
      ctx.textBaseline = "middle"; // 垂直居中对齐

      ctx.font = `bold ${30 * xs * dpr}px Arial`; // 设置字体为粗体、20px大小的 Arial

      ctx.fillText(
        box.text,
        box.x + box.width / 2,
        box.y + box.height / 2
      );

    },

    clearCanvas() {
      const dpr = wx.getSystemInfoSync().pixelRatio
      const xs = 750 / this.data.bg_width;
      if (!this.data.ctx) {
        return
      }
      var _this = this
      this.data.ctx.clearRect(0, 0, _this.data.bg_width * xs * dpr, _this.data.bg_height * xs * dpr);
      var img = this.data.img
      this.data.ctx.drawImage(img, _this.data.bg_img_x * xs * dpr, _this.data.bg_img_y * xs * dpr, 750 * _this.data.bg_img_scale * dpr, _this.data.bg_height * xs * _this.data.bg_img_scale * dpr);

    },

    clickHandle(e) {
      var _this = this
      const dpr = wx.getSystemInfoSync().pixelRatio;
      const screenWidth = wx.getSystemInfoSync().windowWidth;
      const rpxInPx = 750 / screenWidth;
      const xs = 750 / this.data.bg_width;
      const x = e.detail.x * dpr * rpxInPx;
      const y = e.detail.y * dpr * rpxInPx;
    
      // 将items数组中的方框位置转换为像素坐标
      const pixelItems = this.data.items.map((item) => {
        return {
          x: item.x * xs * dpr,
          y: item.y * xs * dpr,
          width: item.width * xs * dpr,
          height: item.height * xs * dpr
        };
      });
    
      // 判断点击位置是否在某个方框内
      const index = pixelItems.findIndex((item) => {
        return (
          x >= item.x &&
          x <= (item.x + item.width) &&
          y >= item.y &&
          y <= (item.y + item.height)
        );
      });
      console.log(e,index,x,y,rpxInPx);
      if (index === -1) {
        this.setData({
          currentIndex: -1
        })
      } else {
        this.setData({
          currentIndex: index
        },() => {
          _this.clearCanvas()
          _this.renderCanvas()
          this.triggerEvent('buildClick', _this.data.items[index].text);
        })
      }
      // console.log(x, y,e,);
    }
  }
})