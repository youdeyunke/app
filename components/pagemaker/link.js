module.exports = {


    functionHandle: function (config) {
        console.log('config.function',config.function)
        switch(config.function){
            case 'location': 
            // 导航到位置
            wx.openLocation({
              name: config.locationName, 
              latitude: config.locationLat,
              longitude: config.locationLng,
            })
            break;
            case 'call': 
                var phone = config.phone
                if(!phone){
                    return
                }
                wx.makePhoneCall({
                    phoneNumber: phone,
                    fail: function(res){
                        // pass
                    }
                });            
                break;
            case 'modal': 
                wx.showModal({
                    title: config.modalTitle || '提示', 
                    content: config.modalContent, 
                    showCancel: false,  
                })
                break;
            case 'openChannelsLive': 
                // 打开直播需要获取
                wx.openChannelsLive({
                    finderUserName: config.sph,
                    complete: function(){
                        wx.hideLoading()
                    },
                    fail: function(err){
                        // 直播没有开始
                        wx.showModal({
                          title: '温馨提醒',
                          content: '直播还未开始，敬请期待', 
                          confirmText: '知道了',
                        })
                      console.log('打开直播失败：',err) 
                    }
                })
                break;
            case 'openChannelsUserProfile': 
                wx.openChannelsUserProfile({ 
                  finderUserName: config.sph,
                  complete: function(err){
                    console.log('complete',err)
                  }
                })
            break; 
            
        }

    },

    weappHandle: function (config) {
        // TODO 
        //  打开另外一个小程序
    },

    webHandle: function(config){
        var url = config.url 
        const app = getApp() 
        app.gotoWebview(url)
    },

    pageHandle: function (config) {
        var path = config.path
        var ot = config.opentype || 'navigateTo'
  
        switch (ot) {
            case 'switchTab':
                wx.switchTab({
                url: path,
                });
                break;
                
            case 'navigateBack': 
                wx.navigateBack({
                  delta: -1,
                })
                break;

            case 'navigateTo':
                wx.navigateTo({
                    url: path,
                    fail: function(){
                        wx.showToast({
                        icon: 'none',
                          title: '页面不存在',
                        
                        })
                    },
                });
                break;

            case 'redirectTo': 
                wx.redirectTo({
                  url: path,
                  fail: function(){
                    wx.showToast({
                        icon: 'none',
                          title: '页面不存在',
                        })
                  }
                })    
                break;
        }
    },

    clickHandle: function (config) {
        // 点击按钮后，根据link对象，决定做和操作
        console.log('link handle', config)
        if (!config) {
            return
        }
 

        switch (config.cat) {
            case 'page':
                this.pageHandle(config)
                break;
            case 'web':
                this.webHandle(config)
                break;
            case 'function':
                console.log('222')
                this.functionHandle(config)
                break;
        }

    },


}