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
    qas: null,
    answerPeermission: false,
    empty: false,
  
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
        
        var empty = true
        if(item.answer){
          if(item.answer.length > 1){
            empty = false
          }
        }
        _this.setData({empty: empty})
      }
    })

  },

  submitHandle: function(e){
    console.log('submit ',e)
    if(!this.data.answerPeermission){
      wx.showToast({
        title: '没有权限',
        icon: 'none',
      })
      return false
    }
    // 点击提交
    var _this = this
    if(_this.data.answer && _this.data.answer.length < 10){
      wx.showModal({
        title: '温馨提示',
        content: '答案字数不能少于10个字',
      })
      return false
    }

    app.request({
      url: '/api/v1/questions/answer',
      method: 'POST',
      data: {
        id: _this.data.item.id,
        answer: _this.data.answer,
      },
      success: function(resp){
        if(resp.data.status == 0){
          
          wx.showToast({
            title: '保存成功',
          })
          _this.loadData()
          _this.setData({ answerPeermission: false })
        }
      }
    })

  },

  addHandle: function(e){
    // 点击我来回答按钮
    var _this = this
    auth.ensureUser(function(userInfo){
      _this.loadPost((post) => {
        if(post.user_id == userInfo.id){
          console.log('hello')
          _this.setData({answerPeermission: true})
        }else{
          wx.showModal({
            title: '温馨提示',
            content: '你不是房源的发布者，不能回复此问题',
          })
          _this.setData({answerPeermission: false})
        }
      })
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
