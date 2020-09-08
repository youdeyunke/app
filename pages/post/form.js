// pages/post/new.js
const app = getApp()
var auth = require('../../utils/auth.js');
var onfire = require('../../utils/onfire.min.js');
var minRentMonthItems = []
for (var i = 1; i <= 12; i++) {
    minRentMonthItems.push({
        label: i + '个月',
        value: i
    })
}
minRentMonthItems.push({
    label: 24 + '个月',
    value: 24
})

Page({

    /**
     * 页面的初始数据
     */
    data: {
        error: {},
        step: 1,
        cities: [],
        districts: [],
        imagesMin: 3,
        imagesMax: 15,
        broker_name: '',
        broker_mobile: '',
        minRentMonthItems: minRentMonthItems,
        post: {
            id: null,
            title: '',
        },
        shopRentTypeItems: [
            { label: '出售', value: 'sale' },
            { label: '出租', value: 'rent' },
        ],
        shopPositionItems: [
            { label: '临街', value: 'linjie' },
            { label: '不临街', value: 'bulinjie' },
        ],

        draftCacheKey: null,

    },

    clearDraft: function () {
        // 这里将post设置为null，是为了在unload的时候，自动清理草稿箱
        this.setData({
            post: null
        })
    },

    genDraftCacheKey: function (q) {
        var qStr = "post.draft."
        qStr += q.group
        qStr += '.'
        qStr += q.rent_type
        qStr += '.is_sublet.'
        qStr += q.is_sublet
        this.setData({
            draftCacheKey: qStr
        })
        return qStr
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (q) {
        var _this = this
        // 监听行政区选择事件
        let dEvent = onfire.on('selectDistrict', (c, d) => {
            _this.updateDistrict(c, d)
        })
        this.setData({
            dEvent: dEvent
        })
        var draftCacheKey = this.genDraftCacheKey(q)
        var post = wx.getStorageSync(draftCacheKey) || {
            id: null,
            title: ''
        }

        auth.loadUserInfo(function (user) {
            _this.setData({ user: user })

            if (q.id) { // 如果是编辑房源，不需要取出草稿
                _this.loadPost(q.id)
            } else {
                // 如果是新建房源，需要取出草稿中
                _this.checkLimit(user)
                _this.initBrokerInfo(user)
                _this.setData({ post: post })
                _this.updatePostField('group', q.group || 'rental')
                _this.updatePostField('rent_type', q.rent_type || 'zhengzu')
                _this.updatePostField('is_sublet', q.is_sublet || false)
                _this.loadTags(q.group)
            }
        })
    },

    checkLimit: function (user) {
        // 判断发布房源数量限制情况
        var canPub = true
        var canPubError = ''
        var binfo = user.broker_profile
        console.log('totao limit')
        // 判断总数
        if (binfo.total_limit <= binfo.total_posts) {
            canPub = false
            canPubError = '你总共可以发布' + binfo.total_limit + '套房源，已发布' + binfo.total_posts + '套'
            console.log(canPubError)
        }
        // 判断总数
        if (binfo.per_day_limit <= binfo.today_posts) {
            canPub = false
            canPubError = '你今天可以发布' + binfo.per_day_limit + '套房源，已发布' + binfo.total_posts + '套'
        }
        if (!canPub) {
            wx.showModal({
                title: '禁止发布',
                content: canPubError,
                success: function (res) {
                    wx.switchTab({
                        url: '/pages/home/home',
                    });
                }
            })
        }
    },

    gotoSelectSubDistrict: function (e) {
        wx.navigateTo({
            url: '/pages/sub-districts/select',
        })
    },

    gotoSelectDistrict: function (e) {
        wx.navigateTo({
            url: '/pages/districts/select',
        })
    },

    loadTags: function (group) {
        var _this = this
        app.loadConfigs(function (config) {
            var key = group + '_tags'
            var tags = config[key] || ''
            console.log('init config data', config)
            console.log('init key is', key)
            console.log('init tags is', tags)
            _this._initTags(tags)
        })
    },

    _initTags: function (tags) {
        var _this = this
        var tagsList = tags.split(' ')
        var allTags = []
        for (var i = 0; i <= tagsList.length - 1; i++) {
            allTags.push({
                name: tagsList[i]
            })
        }

        // 初始化已选中的标签
        if (_this.data.post.tags_list) {
            for (var i = 0; i <= _this.data.post.tags_list.length - 1; i++) {
                for (var j = 0; j <= allTags.length - 1; j++) {
                    var posttag = _this.data.post.tags_list[i]
                    var tagObj = allTags[j]
                    if (tagObj.name == posttag) {
                        tagObj.selected = true
                        allTags[j] = tagObj
                    }
                }
            }
        }
        _this.setData({
            allTags: allTags
        })
    },


    tagHandle: function (e) {
        console.log('e', e)
        var allTags = this.data.allTags
        var i = e.currentTarget.dataset.index
        var tag = this.data.allTags[i]
        tag.selected = !tag.selected
        var data = {}
        var key = 'allTags[' + i + ']'
        data[key] = tag
        this.setData(data)
        var selectedTags = []
        this.data.allTags.forEach(function (item, i) {
            if (item.selected) {
                selectedTags.push(item.name)
            }
        })
        this.setData({
            selectedTags: selectedTags
        })
        this.updatePostField('tags', selectedTags.join(','))
    },

    mobileBind: function (e) {
        console.log('用户授权获取手机号成功', e.detail)
        var mobile = e.detail
        if (!mobile) {
            wx.showToast({
                title: '手机号授权失败，请重试',
                icon: 'error',
            })
            return false
        }

        var post = this.data.post
        post['broker_mobile'] = mobile
        this.setData({ post: post })
    },


    unbindEvent: function () {
        onfire.un('selectDistrict')
        onfire.un(this.data.dEvent)
    },


    updateDistrict: function (c, d) {
        // 更新行政区信息
        console.log('行政区信息改变了', d)
        this.updatePostField('city', c)
        this.updatePostField('district', d)
        this.updatePostField('city_id', c.id)
        this.updatePostField('district_id', d.id)
        wx.navigateBack({ delta: -1 })
    },

    loadPost: function (pid) {
        var _this = this
        app.request({
            url: '/api/v4/posts/' + pid,
            success: function (resp) {
                var post = resp.data.data
                if (post.user_id != _this.data.user.id) {
                    console.log('error')
                    wx.showToast({
                        title: '没有权限',
                        icon: 'none',
                        duration: 1500,
                    });
                    wx.navigateBack({ delta: 1 });
                    return

                } else {
                    // 将有些字段进行装换
                    post.images = post.images.split(',')
                    _this.setData({ post: post })
                    _this.loadTags(post.group)
                    _this.setData({
                        broker_name: post.broker_info.name,
                        broker_mobile: post.broker_info.mobile,
                    })
                }
            }
        })
    },

    initBrokerInfo: function (user) {
        var _this = this
        var keys = ['name', 'wechat', 'mobile']
        var value = ''
        keys.forEach(function (key, i) {
            key = 'broker_' + key
            value = wx.getStorageSync(key) || ''
            _this.updatePostField(key, value)
            console.log('从草稿中取出信息', key, value)
            _this.setData({ key: value })
        })

        // 如果草稿中不存在经纪人电话号码信息
        if (!this.data.broker_mobile) {
            this.setData({ 'broker_mobile': this.data.user.mobile || '' })
        }
    },

    loadMyselfInfo: function () {
        var _this = this
        app.request({
            url: '/api/v1/users/myself',
            data: {},
            method: 'GET',
            success: function (resp) {
                _this.setData({
                    myself: resp.data.data
                })
                console.log('myself', _this.data.myself)
            },
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */

    /**
     * 生命周期函数--监听页面隐藏
     */
    onUnload: function () {
        var _this = this
        var key = this.data.draftCacheKey
        wx.setStorageSync(key, _this.data.post)
        this.unbindEvent()
        console.log('on hide, set cache, key', key)
    },


    submit: function (e) {
        app.uploadFormId(e)
        var fdata = e.detail.value
        var post = this.data.post
        var _this = this

        var name = e.detail.target.dataset.name
        switch (name) {
            case 'step1':
                _this.validateStep1(function (post) {
                    _this.setData({
                        post: post
                    })
                    _this.nextStep()
                })
                break
            case 'step2':
                _this.validateStep2(function (post) {
                    _this.doSubmit(post)
                })
                break
        }
    },

    showError: function (key, msg) {
        console.log('show error ', key, msg)
        var error = this.data.error
        error[key] = true
        this.setData({
            error: error
        })
        wx.showToast({
            title: msg,
            icon: 'none'
        })
    },


    validateStep1: function (cb) {
        this.setData({
            error: {}
        })
        var post = this.data.post
        var _this = this
        var isok = true

        if (!post.title) {
            _this.showError('title', '请填写标题')
            isok = false
        }

        if (!post.images) {
            _this.showError('images', '请上传房源图片')
            return false
        }

        if (post.images.length < _this.data.imagesMin || post.images.length > _this.data.imagesMax) {
            _this.showError('images', '请上传' + _this.data.imagesMin + '~' + _this.data.imagesMax + '张房源照片')
            return
        }

        if (!post.sub_district_id) {
            _this.showError('sub_district_id', '请在地图中选择你所在的小区')
            return
        }


        if (post.group == 'rental' && !post.rent_price) {
            _this.showError('rent_price', '请填写租金')
            return
        }


        if (!post.fitment_id) {
            _this.showError('fitment_id', '请填写装修信息')
            return
        }


        if (post.group == 'rental' && !post.payment_cycle) {
            _this.showError('payment_cycle', '请填写租金支付方式')
            return
        }


        if (typeof cb == 'function') {
            return cb(post)
        }
    },

    validateStep2: function (cb) {
        var _this = this
        var post = this.data.post
        if (typeof cb == 'function') {
            return cb(post)
        }
    },

    submitCallback: function (data) {
        var _this = this
        if (data.status != 0) {
            // 失败
            wx.showToast({
                title: '服务器错误，请稍后重试',
                icon: 'none'
            })
        } else {
            // 这里讲post设置成null,是为了unload的时候，清理草稿箱
            var isNew = !this.data.post.id
            var msg = data.data.message || '保存成功'
            wx.showModal({
                title: '操作成功',
                content: msg,
                confirmText: '预览',
                cancelText: '管理房源',
                success(res) {
                    _this.clearDraft()
                    if (res.confirm) {
                        var pid = data.data.id
                        wx.redirectTo({
                            url: '/pages/post/post?id=' + pid
                        })
                    } else if (res.cancel) {
                        wx.redirectTo({
                            url: '/pages/myself/posts',
                        })
                    }
                }
            })
        }
    },

    doSubmit: function (post) {
        // update or create post 
        var _this = this
        var data = this.data.post
        var url = '/api/v3/posts/'
        var method = 'POST'
        if (_this.data.post.id) {
            url = url + _this.data.post.id
            method = 'PUT'
        } else {
            data['meta_create_from'] = 'weapp'
        }

        app.request({
            url: url,
            method: method,
            data: {
                post: data
            },
            success: function (resp) {
                // set 
                wx.setStorage({
                    key: 'broker_name',
                    data: data.broker_name
                })
                wx.setStorage({
                    key: 'broker_mobile',
                    data: data.broker_mobile
                })
                wx.setStorage({
                    key: 'broker_wechat',
                    data: data.broker_wechat
                })
                return _this.submitCallback(resp.data)
            },
        })

    },

    nextStep: function (e) {
        this.setData({
            step: 2
        })
    },

    previousStep: function (e) {
        this.setData({
            step: 1
        })
    },

    clearError: function () {
        this.setData({
            error: {}
        })
    },

    rentTypeClick: function (e) {
        var v = e.currentTarget.dataset.name
        this.updatePostField('rent_type', v)
    },

    rentTypeRadioChange: function (e) {
        console.log('e', e.detail.value)
        this.updatePostField('rent_type', e.detail.value)
    },

    positionRadioChange: function (e) {
        this.updatePostField('position', e.detail.value)
    },


    minRentMonthChange: function (e) {
        var i = e.detail.value
        var item = this.data.minRentMonthItems[i]
        this.updatePostField('min_rent_month', item.value)
    },

    inputChange: function (e) {
        var key = e.target.dataset.name
        var value = e.detail
        this.updatePostField(key, value)
        this.clearError()
    },

    descChange: function (e) {
        var value = e.detail.value
        this.updatePostField('desc', value)
        this.clearError()
    },

    showTypePicker: function () {
        this.selectComponent('#typepicker').onShow()
    },

    showPayment: function () {
        this.selectComponent('#payment').onShow()
    },

    showFitmentPicker: function () {
        this.selectComponent('#fitmentpicker').onShow()
    },

    paymentChanged: function (e) {
        this.clearError()
        this.updatePostField('payment_cycle', e.detail.payment_cycle)
    },

    fitmentChanged: function (e) {
        this.clearError()
        this.updatePostField('fitment', e.detail.fitment)
        this.updatePostField('fitment_id', e.detail.fitment.id)
    },

    typeChanged: function (e) {
        this.clearError()
        console.log('type changed', e)
        var post = this.data.post
        post.s = e.detail.s
        post.t = e.detail.t
        post.w = e.detail.w
        post.position = e.detail.position
        this.setData({
            post: post
        })

    },

    positionClick: function (e) {
        const { name } = e.currentTarget.dataset;
        this.updatePostField('position', name)
    },

    floorChanged: function (e) {
        this.clearError()
        this.updatePostField('current_floor', e.detail.current_floor)
        this.updatePostField('total_floor', e.detail.total_floor)
        this.updatePostField('has_lift', e.detail.has_lift)
    },

    showFloorPicker: function () {
        this.selectComponent('#floorpicker').onShow()
    },

    imagesChanged: function (e) {
        this.clearError()
        console.log('images change', e)
        var keys = Object.keys(e.detail)
        if (keys.includes('images')) {
            this.updatePostField('images', e.detail.images)
        }
        if (keys.includes('cover_index')) {
            this.updatePostField('cover_index', e.detail.cover_index)
        }
        if (keys.includes('video')) {
            this.updatePostField('video', e.detail.video)
        }
        if (keys.includes('overlook_image')) {
            console.log('set overlook image')
            this.updatePostField('overlook_image', e.detail.overlook_image)
        }

    },

    chooseDistrict: function (e) {
        var did = this.data.post && this.data.post.id ? this.data.post.district_id : ''
        wx.navigateTo({
            url: '/pages/districts/select?id=' + did,
        });

    },

    chooseLocation: function (e) {
        var _this = this
        wx.chooseLocation({
            success: function (poi) {
                _this.updateStreet(poi, false)
            }
        })
    },

    updateStreet: function (poi) {
        console.log('街道地址更新', poi)
        this.updatePostField('street', poi.name)
        this.updatePostField('sub_district_name', poi.name)
        this.updatePostField('latitude', poi.latitude)
        this.updatePostField('longitude', poi.longitude)
    },


    updatePostField: function (key, value) {
        var d = {}
        var key = 'post.' + key
        d[key] = value
        this.setData(d)
    },

    /**
     * 生命周期函数--监听页面卸载
     */

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

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
