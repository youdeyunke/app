const app = getApp()
Page({
    data: {
        total_pages:0,
        page: 1,
        loading: true,
        ownersList:[]
    },
    onLoad: function(){
        this.loadData()
    },
    /** 
     * 发送请求 获取数据
    */

    loadData:function(){
        var _this = this
        var query ={
            page: this.data.page
        }
        app.request({
            url:'/api/v1/owner_sales/',
            data:query,
            success: function(resp) {
                var res = resp.data.data
                //console.log(resp.data);
                var arr=  _this.data.ownersList || []
                _this.setData({ loading: false })
                if (!resp.data.status == 0) {
                    return false
                }
                var arr1 = arr.concat(res)
                _this.setData({
                    ownersList: arr1,
                    total_pages : resp.data.total_pages
                })
            }
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({
            page:1,
            loading:true,
            ownersList:[]
        }),
            this.loadData()
        
        
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        var page = this.data.page || 1
        if(page < this.data.total_pages){
            this.setData({
                page: page + 1,
                loading: true,
            })
        }else{
            return false
        }
        
    this.loadData()
    },
})
