// pages/post/index.js
const app = getApp()
var auth = require('../../utils/auth.js');

Page({

  /**
   * 页面的初始 数据
   */
  data: {                                                                                  post: null,
    mode: 1,
    debug: false,
    user: {},
    contactInfo: {},
    posts: null,
    flowContent: '',
    flowId: '',
    showFlowForm: false,
    showGroupQr: false,
    htmlContent: null,
    minicontent: true,
    posterConfig: {},
    showShareBox: false,
    currentTab: 'detail',
  },

  swiperChange: function(e){
  },

  bookedHandle: function(e){
    // 预约成功，弹出二维码
    if(!this.data.post.group_qr){
      return false
    }
    this.setData({showGroupQr: true})
    
  },
  
  contentHandle: function(e){
    this.setData({
      minicontent: ! this.data.minicontent 
    })
  },

  gotoVideo: function(){
    wx.setStorageSync('video-url', this.data.post.video)
    wx.navigateTo({
      url: '/pages/video/show',
    })
  },

  gotoVr: function(){
    var vr = this.data.post.proxy_vr_url
    //var vr = 'https://csimum.udeve.cn/vr.html'
    //var vr = 'https://csimum.udeve.cn/vr2.html?id=21963'
    //var vrid = vr.split('?')[1].split('=')[1]
    //var vr = 'https://csimum.udeve.cn/vr2.html?id=' + vrid  + '&iframe=true'

    if(!vr){
      return false
    }
    wx.setStorageSync('webview', vr)
    wx.navigateTo({
      url: '/pages/webview/webview',
    })
  },

  openWebview: function(e){
    var url = this.data.post.more_url
    if(!url){
      return
    }
    var _this = this
    wx.setStorageSync('webview', this.data.post.more_url)
    wx.navigateTo({
      url: '/pages/webview/webview?title='+ _this.data.post.title,
    })
  },

  readMore: function(){
    this.setData({ readmore: true })
  },

  readLess: function () {
    this.setData({ readmore: false })
  },  

  loadQas: function(){
    var _this = this
    var postId = this.data.postId
    app.request({
      url: '/api/v1/questions/',
      hideLoading: true,
      data: {post_id: postId, limit: 999},
      success: function(resp){
        _this.setData({
          qas: resp.data.data
        })
      }
    })
  },

  loadComments: function(){
    var _this = this
    var postId = this.data.postId
    app.request({
      hideLoading: true,
      url: '/api/v1/mycomments',
      hideLoading: true,
      data: { target_id: postId, target_type: 'post', limit: 999 },
      success: function (resp) {
        _this.setData({ comments: resp.data.data })
      },
    })    
  },

 viewTypeImage: function(e){
   var i = e.currentTarget.dataset.index
   var url = this.data.post.types[i].image.url
   wx.previewImage({urls: [url] })
 },
  viewImage: function(e){
    var urls = this.data.post.full_images_list
    var index = e.currentTarget.dataset.index
    var url = urls[index]
    wx.previewImage({
      current: url,
      urls: urls,
    })
  },

  call: function(e){
    var mobile = e.currentTarget.dataset.value
    wx.makePhoneCall({
        phoneNumber: mobile //仅为示例，并非真实的电话号码
    })

  },

  callMe: function(){
    var m = this.data.post.staff_user.mobile
    wx.makePhoneCall({
        phoneNumber: m //仅为示例，并非真实的电话号码
    })
  },



  loadPost: function(postId, cb=null){
    var _this = this

    app.request({
      hideLoading: true,
      url: '/api/v2/posts/' + postId,
      success: function(resp){
        var pData = resp.data.data
        _this.setData({post: pData})
        _this.loadSub()
        wx.setStorage({ key: 'post.data.' + postId, data: pData})
        wx.setStorageSync('last_view_post', pData)
        wx.setNavigationBarTitle({
          title: pData['title']
        })        
        typeof cb == 'function' &&  cb(pData)

      },

    })

  },



  createBookOrder: function (cb){
      // 创建支付定金订单
      if(this.data.post.user_has_coupon){
        return false;
      }

      var _this = this
      app.request({
          url: '/api/v1/book_orders',
          method: 'POST',
          data: { post_id: _this.data.postId },
          success: function (resp) {
            if(resp.data.status == 1){
                return false;
            }

            console.log('支付成功后处理', resp.data)
            wx.showLoading({ title: '处理中...' })
            _this.loadPost(_this.data.postId)

            wx.showToast({
                icon: 'none',
                title: '已领取',
            })

            // 如果设置了群二维码，就弹出提示
            if(_this.data.post.group_qr){
              setTimeout(function(){
              _this.setData({showGroupQr: true})
              }, 1000)
            }
            return true
          }
      })
  },


  gotoMetaUrl: function(e){
    var url = e.currentTarget.dataset.url
    if(!url){
      return false
    }

    var _this = this
    wx.navigateTo({
      url: url,
    })
  },




  flowSubmit: function(e){
    var isNew = !this.data.flowId
    var  url = '/api/v2/flows/'
    var method = 'POST'
    var _this = this

    if(!isNew){
      url = url + this.data.flowId
      method = 'PUT'
    }
    
    app.request({
      url: url,
      method: method,
      data: {content: _this.data.flowContent, post_id: _this.data.post.id },
      success: function(resp){
        if(resp.data.status == 0){
          _this.closeFlowForm()
          _this.loadFlows()
        }
      },
    })
  },

  showShareBoxHandle: function(e){
    this.setData({
      showShareBox: true,
    })
  },

  closeShareBox: function(e){
    this.setData({
      showShareBox: false
    })
  },

  onCreatePoster: function(){
    wx.navigateTo({url: '/pages/poster/index?id=' + this.data.postId})
  },

  closeGroupQr: function(){
    this.setData({showGroupQr: false})
  },

  onSaveGroupQr: function(e){
    var _this = this
    var url  = this.data.post.group_qr.replace('http://', 'https://')
    var _this = this
    wx.downloadFile({
      url: url,
      success: function(res) {
        var path = res.tempFilePath
        app.saveImage(path, function(res){
          _this.setData({showGroupQr: false})
        })
      }
    })
  },

  saveImage: function(path, cb){
    wx.saveImageToPhotosAlbum({
      filePath: path,
      complete: function(res){
        if(res.errMsg == 'saveImageToPhotosAlbum:fail auth deny'){
            wx.navigateTo({
              url: '/pages/myself/setting',
              success: function(){
                wx.showToast({
                  title: '请先在“权限设置”中打开相册权限',
                  icon: 'none',
                  duration: 3000,
                  success: function(){ },
                })
              },
            })
        }
      },
      success: function(res) { 
        wx.showToast({
          icon: 'none',
          title: '已保存，请前往手机相册查看',
        })
        return typeof cb == 'function' && cb()
      }
    })    
  },



  isFromShare: function(scene){
    var res = false;
    var s = parseInt(scene)
    // 需要显示回到首页按钮的场景列表
    var sList = [1007,1008,1011,1012,1013,1014,1047, 1048,1049,1058,1067,1069,1073,1074,1081,1084,1091,1096]
    for(var i=0;i<=sList.length-1;i++){
      if(s == sList[i]){
        res = true;
      }
    }
    return res;
  },

   
  showViewsCount: function(c){
      // 延时显示有多少人看过房源
      if(c && c >= 5){
          wx.showToast({
            duration: 2000,
            title: '过去一周，有' + c + '人看过此房源',
            icon: 'none'
          })
      }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.checkForceLogin()
    var _this = this
    var mode = 1 // 房源信息的显示模式 1：正常显示，2，显示自定义联系人信息

    // 正常进入
    var postId = options.id
    if(options.contact){
        // 分享进入
        mode = 2
        var _contacts = options.contact.split('_')
        var postId = _contacts[0]
        this.setData({
            contactInfo: {
                name: decodeURIComponent(_contacts[1]),
                mobile: decodeURIComponent(_contacts[2]),
                uid: decodeURIComponent(_contacts[3]),
            }
        })
    }

    var post = wx.getStorageSync('post.data.' + postId)
    _this.setData({ postId: postId, post: post, mode: mode })
    _this.loadPost(postId, function(post){
      var c = post.views_count || 0
      setTimeout(function(){ _this.showViewsCount(c) }, 1000)
    })

    var fromShare = false
    var scene =  wx.getLaunchOptionsSync().scene
    if(this.isFromShare(scene)){
      fromShare = true
    }
    this.setData({
      user: wx.getStorageSync('userInfo') || {},
      from_share: fromShare
    })
    app.markVisitor(postId, 'post')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },


  loadSub: function(){
    var sid = this.data.post.sub_district_id
    if(!sid){
      return false;
    }
    var _this = this
    app.request({
      url: '/api/v1/sub_districts/' + sid,
      hideLoading: true,
      success: function(resp){
        if(resp.data.status != 0){
          return false
        }
        _this.setData({sub: resp.data.data})
      }
    })
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
    var pid = this.data.postId
    this.loadPost(pid)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  formidHandle: function(e){
      app.uploadFormId(e)
  },

  gotoMeta: function (e) {
      var _this = this
      auth.ensureUser(function(user){
          wx.navigateTo({
              url: '/pages/post/meta?id=' + _this.data.post.id,
          })

      })
  },

  onShareAppMessage: function () {
    var _this = this
    return {
      title: _this.data.post['title'],
      desc: _this.data.post['desc'],
      path: 'pages/post/post?from_share=1&id=' + _this.data.post['id'],
      imageUrl: _this.data.post['cover']
    }
  },

})
