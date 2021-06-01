const app = getApp()

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {

	},

	ready: function () {
		var _this = this
		_this.loadData()

	},

	/**
	 * 组件的初始数据
	 */
	data: {
		show: false,
		second: '',
		url: '',
		id: '',
		click_nums: 1,
		skip_nums: 1,
		view: {
			view_nums: 1
		}
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		loadData() {
			var _this = this
			app.request({
				url: '/api/v1/first_screen_ads',
				method: 'get',
				success: function (res) {
					console.log(res)
					let value = res.data.data
					if (value) {
						_this.setData({
							id: value.id,
							second: value.second,
							url: value.url,
							show: true
						})
						_this.Timeout()
					}
				}
			})
		},
		uploadData(key) {
			app.request({
				url: '/api/v1/first_screen_ads/' + this.data.id,
				method: 'PUT',
				data: {
					key
				},
			})
		},
		adClick: function (e) {
			// 点击广告图片后
			// TODO 
			wx.navigateTo({
				url: 'url',
			})
			this.uploadData(e.currentTarget.dataset)
		},

		closeHandle: function (e) {
			this.setData({
				show: false
			})
			if (this.data.second >= 0) {
				this.uploadData(e.currentTarget.dataset)
			}
		},
		Timeout() {
			var _this = this
			var second = _this.data.second - 1
			setTimeout(() => {
				_this.setData({
					second: second
				})
				if (_this.data.second <= 0) {
					this.uploadData(_this.data.view)
					this.setData({
						show: false
					})
					return
				} else {
					this.Timeout()
				}
			}, 1000);
		},
	}
})