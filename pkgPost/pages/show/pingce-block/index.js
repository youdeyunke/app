// pages/post/pingce-block/index.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
	properties: {
        value: { type: Object },
        color: { type: String, value: '#3A6BDD'}
    },

    /**
     * 组件的初始数据
     */
    data: {
        zongpingfen: 0,
        zhezhao: true
    },
    ready: function () {
		this.calculateAverage()
    },
    /**
     * 组件的方法列表
     */
    methods: {
  
        calculateAverage() {
		var arr = this.data.value.pingceList
            let sum = 0;
            let count = 0;

            for (let i = 0; i < arr.length; i++) {
                sum += arr[i].score;
                count++;
            }
            const average = (sum / count).toFixed(1);
            this.setData({
                zongpingfen: average
            })
        },
        jiesuobtn() {
           wx.navigateTo({
             url: '/pkgPingce/pages/pingce/index?postid='+this.data.value.postId,
           })
        }
    }
})
