// pkgAmbitus/pages/ambitus/index.js
const app = getApp()
const api = require("../../../api/post")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        postId: null,
        activeMarkerIndex: null,
        pois: [],
        post: null,
    },
    // getMapContext() {

    //     var _this = this
    //     var arr = []
    //     arr.push({ longitude: this.data.post.longitude, latitude: this.data.post.latitude })
    //     var pois = this.data.pois
    //     pois.forEach(v => {
    //         var obj = {}
    //         obj.longitude = v.location.lng
    //         obj.latitude = v.location.lat
    //         arr.push(obj)
    //     })
    //     // //缩放视野展示所有经纬度 此方法传入的数组不能为空 所以手动进行非空验证
    //     // if(pois.length ==0){
    //     //     return
    //     // }
    //     // this.data.map.includePoints({
    //     //     points: arr,
    //     //     padding: [50, 50, 50, 50]
    //     // });
    //     console.log('经纬度arr',arr)
    //     this.setData({
    //         points: arr
    //     })
    // },
    // setMarker: function () {
    //     this.setData({markers: []})
    //     var pois = this.data.pois
    //     var markers = []
    //     var _this = this
    //     const bgColor = '#ff0000'
    //     const whiteColor = '#ffffff'
    //     var R = app.globalData.system.pixelRatio / 2.0
    //     var fontSize = app.globalData.system.fontSizeSetting * 0.8
    //     var padding = fontSize * 1
    //     var marker = {
    //         iconPath: '/assets/icons/marker.png',
    //         alpha: '0.5',
    //         latitude: _this.data.post.latitude,
    //         longitude: _this.data.post.longitude,
    //         width: "40rpx",
    //         height: "40rpx",
    //         zIndex: 10000,
    //         callout : {
    //             content: _this.data.post.title, 
    //             bgColor: '#1989F9', 
    //             borderRadius: 4,
    //             display: 'ALWAYS',
    //             color: '#FFF', 
    //             padding:6,
    //             textAlign: 'center'
    //         }
    //     }
    //     markers.push(marker)
    //     pois.forEach((v,i) => {
    //         var m = {
    //             id: i, 
    //             //iconPath: '/assets/icons/marker.png',
    //             latitude: v.location.lat,
    //             width:'40rpx',
    //             height:'40rpx',
    //             longitude: v.location.lng,



    //         }
    //         m.alpha = '0.6',
    //         m.width = 1,
    //         m.zIndex = i,
    //         m.height = 1,
    //         m.callout = {
    //             content: i+1, 
    //             bgColor: '#ffffff', 
    //             borderRadius: 20,
    //             borderWidth: 2,
    //             borderColor:'#333333',
    //             display: 'ALWAYS',
    //             color: '#333333', 
    //             padding:6,
    //             textAlign: 'center'
    //         }
    //         markers.push(m)
    //     })
    //     this.setData({ markers: markers })
    //     console.log('markers', this.data.markers)
    // },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var _this = this
        var pid = q.post_id || q.id
        this.setData({
            postId: pid
        }, () => {
            _this.loadData()

        })
        // this.setMarker()
    },


    // markertap: function(e){

    //     var mid = e.detail.markerId 
    //     console.log('markertap',e, 'marker id is', mid )
    //     // 高亮
    //     var markers = this.data.markers.map((m,i) => { 
    //         if(i == 0){
    //             return m
    //         }
    //         if(m.id == mid){
    //             // 点击了这个,高亮显示 
    //             m.callout.bgColor = '#1989fa'
    //             m.zIndex = 1000
    //             console.log('mid hit', mid)
    //         }else{
    //             m.zIndex = i
    //             m.callout.bgColor = '#ffffff'
    //         }
    //         return m
    //     })
    //     this.setData({markers:markers, activeMarkerIndex: mid})

    // },

    loadData() {
        var _this = this
        // 拉取楼盘的基本信息：坐标、名称、id
        // app.request({
        //     url: '/api/v1/post_base_info/' + _this.data.postId,
        //     success: function (res) {
        //         //console.log(res.data.data);
        //         var post = res.data.data
        //         _this.setData({
        //             post: post
        //         })
        //         wx.setNavigationBarTitle({ title: post.title + '的周边配套' });
        //     }
        // })
        // 有待检验
        api.getPostBaseInfo({
            pid: _this.data.postId
        }).then((res) => {
            //console.log(res.data.data);
            var post = res.data.data
            _this.setData({
                post: post
            })
            wx.setNavigationBarTitle({
                title: post.title + '的周边配套'
            });
        })
    },
    // getMyevent(e) { //e为子组件传过来的值
    //     //console.log(e.detail)
    //     this.setData({
    //         pois: e.detail //这里是改变Page中data上的值
    //     })
    //     this.getMapContext()
    //     this.setMarker()
    // },
    onShareAppMessage: function () {

    },
})