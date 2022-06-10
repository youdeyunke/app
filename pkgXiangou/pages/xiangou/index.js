// pkgXiangou/pages/xiangou/index.js
import zhengzhou from "./zhengzhou"
import xian from "./xian"

const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        questions: {},
        answer: [
        ],
        answerIndex: [],
        active:false,
        lastData:[],
        // 显示结果时隐藏其他元素
        show:true,
        city:''
    },

    //重新计算功能实现
  recount(){
    this.setData({
      questions: {},
      answer: [
      ],
      answerIndex: [],
      active:false,
      lastData:[],
      // 显示结果时隐藏其他元素
      show:true
    })
    this.loadQuestions(this.data.city)
  },
  // 将数据放入数组
  writeData(rec){
    let array = []
    let lastData = []
    lastData = this.data.lastData
    lastData.push(this.data.questions)
    console.log("writeData:",this.data.lastData);
    this.setData({
      lastData: lastData
    })
    
  },

  // 页面结果跳转
  redirectResult(rec){
    if(this.data.questions.options[rec.index].children[0].options[rec.index].option==undefined){
      console.log("redirectResult:",this.data.questions.options[rec.index].children[0].options)
      let result = this.data.questions.options[rec.index].children[0].options
      let answer = this.data.answer
      // wx.redirectTo({
      //   url: '../pages/show?message=' + result
      // })
      this.setData({
        show:false
      })
    }
  },

  // 页面数据渲染
  dataView(rec){
    let answer = this.data.answer
    let title = this.data.questions.title 
    let option = this.data.questions.options[rec.index].option
    let arr = {
      title: title,
      option: option
    }
    answer.push(arr)
    console.log(arr);
    // answer.title.push(this.data.questions.title)
    // answer.option.push(this.data.questions.options[rec.index].option);
    console.log('dataView:',this.data.answer);
    let questions = this.data.questions.options[rec.index].children[0]
    this.setData({
      active: true,
      questions: questions,
      answer : answer,
      index: rec.index
    })
  },


// 选项触摸
  tapOption(e) {
    console.log(e.target.dataset);
    let rec = e.target.dataset
    console.log(this.data.questions);
    // 将程序记录到lastData
    this.writeData(rec)
    this.redirectResult(rec)
    this.dataView(rec)
  },

  // 触摸替换
  displayMessage(e){
    console.log(e.target.dataset.index);
    let i = e.target.dataset.index
    let q = i-1
    let questions = this.data.lastData[i]
    console.log(this.data.answer);
    let answer = this.data.answer
    answer.splice(i,5)
    this.setData({
      questions : questions,
      answer : answer
    })
    if(i == 0) {
        this.setData({
            answerIndex: [],
            active:false,
            lastData:[],
            // 显示结果时隐藏其他元素
            show:true
        })
    }
  },

  loadQuestions(c){
      if(c == 'xian'){
          this.setData({questions: xian})
      }
      if(c == 'zhengzhou'){
        this.setData({questions: zhengzhou})
    }
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            city: options.city
        })
        this.loadQuestions(options.city)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        var _this = this
        app.ensureConfigs(function (configs) {
            var ui = configs.ui
            var color = configs.color 
            _this.setData({ 
                headerImg:  ui.login_header,
                bodyImg: ui.login_body ,  
                primaryBtnColor:  color.primary_btn, 
                primaryColor: color.primary,
            })
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})