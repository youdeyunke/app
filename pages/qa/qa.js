// pages/qa/qa.js
const app = getApp()
var util = require('../../utils/util.js');
var auth = require('../../utils/auth.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: null,
    loading: true,
    submiting: false,
    showForm: false,
    qas: null,
  
  },


  likeHandle: function(e){
    var qid = this.data.item.id
    var key = 'liked_qa.' + qid
    if(wx.getStorageSync(key)){
      console.log('重复点击', key)
      return false
    }
    this.data.item.like_nums +=1 
    this.setData({item: this.data.item})

    app.request({
      url: '/api/v1/questions/like',
      method: 'POST',
      data: {id: qid},
      success: function(resp){
        console.log('resp')
        wx.setStorage({
          key: key,
          data: true,
        })        
      }
    })
  },


  randomQas: function(len=2){
    var qas = []
    var QAS = wx.getStorageSync('questions')
    var _this = this
    console.log('QAS,', QAS)

    for(var i=0;i<QAS.length;i++){
      if(qas.length == len){
        break
      }

      var qa = QAS[i]
      if(qa['id'] != this.data.item['id']){
        qas.push(qa)
      } 
    }

    _this.setData({qas: qas})
    console.log('qas,', qas)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var qid = options.id
    var _this = this
    this.setData({id: qid}, () => {
      this.loadData()
    })
  },

  loadData: function(){
    var _this = this
    app.request({
      url: '/api/v1/questions/' + _this.data.id,
      success: function(resp){
        var item = resp.data.data
        item['created_at_pretty'] = util.prettyTime(item['created_at'])
        item['updated_at_pretty'] = util.prettyTime(item['updated_at'])
        _this.setData({item: item})
        
      }
    })

  },

  submitHandle: function(e){
    console.log('submit ',e)
    // 点击提交
    var _this = this
    if(_this.data.answer && _this.data.answer.length < 10){
      wx.showModal({
        title: '温馨提示',
        content: '答案字数不能少于10个字',
      })
      return false
    }
    this.setData({submiting: true})
    app.request({
      url: '/api/v1/answers',
      method: 'POST',
      data: {
        question_id: _this.data.item.id,
        content: _this.data.answer,
      },
      success: function(resp){
        _this.setData({submiting: false})
        if(resp.data.status == 0){
          wx.showToast({ title: '保存成功', })
          _this.loadData()
        }
      }
    })
  },

  addHandle: function(e){
    // 点击我来回答按钮
    var _this = this
    auth.ensureUser(function(userInfo){
        if(!userInfo.is_broker){
            wx.showModal({
                title: '温馨提示',
                content: '你不是经纪人，不能回复此问题',
            })
            //return false
        }
        _this.setData({showForm: true})
    })
  },


  answerInput: function(e){
    console.log(e)
    this.setData({answer: e.detail.value})
  },

  loadPost: function(cb){
    var pid = this.data.item.post_id
    var key = 'post.data.' + pid
    var post = wx.getStorageSync(key)
    return cb(post)
  },

  gotoNew: function(e){
    console.log('submit', e)
    app.uploadFormId(e)
    wx.navigateTo({
      url: '/pages/qa/new'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  onShareAppMessage: function () {
    var _this = this
    return {
      desc: _this.data.item['content'],
      title: '',
      path: 'pages/qa/qa?id=' + _this.data.item['id']
    }
  },


})
