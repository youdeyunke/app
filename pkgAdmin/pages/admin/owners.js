const app = getApp()
Page({
    data: {
        page: 1,
        loading: true,
        ownersList:[]
    },
    onLoad: function(){
        this.loadData()
    },
    loadData:function(){
        var _this = this
        var query ={
            page: this.data.page
        }
        app.request({
            url:'/api/v1/owner_sales/',
            data:query,
            success: function(resp) {
                _this.setData({ loading: false })
                if (!resp.data.status == 0) {
                    return false
                }
                _this.setData({
                    ownersList:resp.data.data
                })
            }
        })
    }
})