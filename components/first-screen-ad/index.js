const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    ready: function () {
        var _this = this
        _this.Timeout()
    },

    /**
     * 组件的初始数据
     */
    data: {
        show: true,
        time:5
    },

    /**
     * 组件的方法列表
     */
    methods: {
        adClick: function (e) {
            // 点击广告图片后
            // TODO 
            wx.navigateTo({
              url: 'url',
            })
        },

        closeHandle: function () {
            this.setData({ show: false })
        },
        Timeout(){
            var _this = this
            var time = _this.data.time-1
            setTimeout(() => {
                _this.setData({time : time})
                if(this.data.time<=0){
                    this.closeHandle()  
                    return
                }else{
                    this.Timeout()
                }
            }, 1000);
            
        },

    }
})
