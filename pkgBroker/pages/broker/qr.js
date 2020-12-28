const app = getApp()
import Poster from '../../utils/poster/poster';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:true,
    userInfo:{},
    userId:'',
    qrUrl:'',
    userInfoId:'',
    posterConfig:{},
    posterUrl:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    this.setData({userId :q.userId})
    if(app.globalData.userInfo.id){
      this.setData({userInfoId:app.globalData.userInfo.id})
    }
    
  },
  onShow:function(){
    this.loadUserInfo()
  },
    loadUserInfo: function(){
      var uid = this.data.userId
      var _this = this
      var path = 'pkgBroker/pages/broker/profile'
          var qdata = {source_type: 'broker_qr', source_id: _this.data.userId, id: _this.data.userId}
          app.genQrV2(path, qdata, function (data) {
            var url = data.qr
              _this.setData({qrUrl:url})
              app.request({
                url: '/api/v1/users/' + uid,
                success: function(resp){
                  var u = resp.data.data
                  _this.setData({userInfo: u})
                  _this.onCreatePoster()
                  var title =  u.name +  "的名片"
                  wx.setNavigationBarTitle({
                    title: title
                  })        
                }
              })
        })
    },
    saveFile(){
      var _this = this
      wx.saveImageToPhotosAlbum({
        filePath: _this.data.posterUrl,
        success() {
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            });
        }
      })
    },
    userEdit(){
      wx.navigateTo({
        url: '/pages/myself/profile'
      })
    },
    onCreatePoster() {
        wx.showLoading({
          title: '制作海报中...',
          mask: true,
      });
      this.setData({loading:true})
      var _this = this
      var bgImg = '../../images/poster-bg.png'
      var desc = ''
      if(this.data.userInfo.desc){
        desc = this.data.userInfo.desc
      }
      var name = '未知'
      if(this.data.userInfo.name){
        name = this.data.userInfo.name
      }
      var companyName= '暂无'
      if(this.data.userInfo.company){
        var companyName = this.data.userInfo.company.name
      }
      var config ={
        debug:false,
        width:750,
        height:1110,
        images:[
          {
            width:750,
            height:1110,
            x: 0,
            y: 0,
            url: bgImg,
            zIndex: 0,
          },
          {
            width:178,
            height:189,
            x: 119,
            y: 159,
            url : _this.data.userInfo.avatar,
            borderRadius:178,
            zIndex: 19
          },
          {
            width:203,
            height:203,
            x: 275,
            y: 636,
            url : _this.data.qrUrl,
            zIndex: 21
          },
        ],
        texts:[
          {
            x:327,
            y:200,
            fontSize:46,
            color:'#3E290C',
            baseLine:'top',
            fontWeight:'bold',
            text:name
          },
          {
            x:327,
            y:266,
            fontSize:30,
            color:'#3E290C',
            baseLine:"top",
            text:_this.data.userInfo.mobile
          },
          {
            x:327,
            y:311,
            fontSize:28,
            color:'#3E290C',
            baseLine:'top',
            text:companyName
          },
          {
            x:135,
            y:460,
            width:480,
            fontSize:32,
            color:'#3E290C',
            lineNum: 2,
            lineHeight: 42,
            text:desc
          },
          {
            x:277,
            y:900,
            fontSize:28,
            color:'#3E290C',
            text:'长按识别二维码'
          },
          {
            x:292,
            y:935,
            fontSize:28,
            color:'#3E290C',
            text:'查看我的微店'
          },
        ],
        blocks:[
          {
            x:264,
            y:625,
            width:224,
            height:224,
            backgroundColor:'#fff',
            borderRadius:41,
            zIndex:20
          }
        ]
      }
      this.setData({ posterConfig: config }, () => {
        Poster.create(true)
    })
      },
      onPosterSuccess: function (e) {
        console.log('on poster success', e)
        var _this = this
        var posterUrl = e.detail
        this.setData({
            posterUrl: posterUrl,
        })
        setTimeout(function () {
            wx.hideLoading();
            _this.setData({ loading: false })
            wx.showToast({
                title: '已生成',
                icon: 'success',
                image: '',
                duration: 1000,
                mask: false,
            });

        }, 1000)
    },
    onPosterFail: function (e) {
      console.log('生成海报失败', e)
      wx.hideLoading();
      this.setData({ loading: false })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
