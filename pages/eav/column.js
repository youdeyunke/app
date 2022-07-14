// pages/eav/column.js
const app = getApp() 

Page({

    /**
     * 页面的初始数据
     */
    data: {
        column: null,
        value: "",
        mode: null, 
        options: null,
    },


    radioChange: function(e){
        console.log('radio change',e )
    },
    
    optionClick: function(e){

        var value = e.currentTarget.dataset.name  
        this.setData({value: value })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(q) {
        var _this = this 
        app.ensureConfigs((myconfigs) => { 
            _this.setData({
              color: myconfigs.color.primary,
              btnColor: myconfigs.color.primary_btn
            })
          })


        const ac = this.getOpenerEventChannel()  
        ac.once('setColumn', (data) => { 
            this.setData({column: data })
            wx.setNavigationBarTitle({
              title: '请填写' + data.label,
            })
            this.setOptions(data.options)

            // 判断输入框类型
            if(data.options && data.options.length > 0){ 
                if(data.multiple){
                    this.setData({mode: 'checkbox'})
                    return 
                }else{ 
                    this.setData({mode: 'radio'})
                    return 
                }
            }
            if(data.value_type == 'string'){
                this.setData({mode: 'string'})
            }

            if(data.value_type == 'text'){
                this.setData({mode: 'textarea'})
            }

            if(data.value_type == 'boolean'){
                this.setData({mode: 'switch'})
            }

            if(data.value_type == 'integer'){
                this.setData({mode: 'number'})
            }

        })
        ac.once('setValue', (value) => { 
            this.setData({value: value })
        })

    },
    confirmHandle: function(e){
        var data = {
            key: this.data.column.name,  
            value: this.data.value, 
        }
        wx.navigateBack({
            delta:1,
        })
        this.getOpenerEventChannel().emit("change", data)
    },
    setOptions: function(strVal){
        // 将字符串格式的选项转换成数组 
        var items = strVal.split('\n')
        this.setData({ 
            options: items, 
        })
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

    },

    cancleHandle: function(){
        wx.navigateBack({
          delta: 1,
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