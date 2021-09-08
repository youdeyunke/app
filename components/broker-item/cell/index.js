// components/broker-item/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: { type: Object, value: null },
        postId: {type: Number, value: null},
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

        gotoProfile: function(){
            
            // 经纪人主页
            var bid = this.data.item.id 
            console.log('item',this.data.item)
            var  path = '/pkgBroker/pages/broker/profile?id=' + bid 
            wx.navigateTo({
              url: path,
            })

        },
        chatHandle: function () {
            // TODO 

            var uid = this.data.item.id
            var path = '/pages/messages/show?target_user_id=' + uid
            if(this.data.postId){
                path += '&target_post_id=' + this.data.postId
            }
            wx.navigateTo({
              url: path,
            })

        },
        phoneHandle: function () {
            var _this = this
            wx.makePhoneCall({
                phoneNumber: _this.data.item.mobile,
                success: (result) => {
                },
            });
        },
    }
})
