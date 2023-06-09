// components/post-selector/index.js
const app = getApp()
const postApi=require("../../api/post")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show: { type: Boolean }
    },

    /**
     * 组件的初始数据
     */
    data: {
        value: '',
        postItems: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onClose() {
            this.setData({ show: false });
        },
        onChange(e) {
            var _this = this
            let kw = e.detail
            if (kw == '') {
                this.setData({
                    postItem: []

                })
                return
            }
            //？？   该组件未被引用
            postApi.quickSearch(kw).then((res)=>{
                _this.setData({
                    postItems: res.data.data
                })
            })
        },
        selectHandle(e) {
            const { id, index  } = e.currentTarget.dataset
            var item =  this.data.postItems[index]
            this.triggerEvent("change", item)
        }
    }
})
