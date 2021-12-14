const app = getApp()
const link = require('../pagemaker/link')

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
		second: 5,
		link: {},
		image: '',
		id: '',
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		loadData() {
			var _this = this
			app.request({
				url: '/api/v1/first_screen_adds',
				method: 'get',
				hideLoading: true,
				success: function (res) {

					let value = res.data.data
					if (!value) {
						return false
					}

					var link = {}
					if (value.link) {
						JSON.parse(value.link)
					}

					_this.setData({
						id: value.id,
						link: link,
						image: value.image,
						show: true
					})
					_this.timeoutHandle()
				}
			})
		},

		uploadData(data) {
			app.request({
				url: '/api/v1/first_screen_adds/' + this.data.id,
				method: 'PUT',
				hideLoading: true,
				data: data,
			})
		},
		adClick: function (e) {
			link.clickHandle(this.data.link)
			this.uploadData({
				click_nums: 1
			})
		},

		closeHandle: function (e) {
			this.setData({
				show: false
			})
			if (this.data.second >= 0) {
				this.uploadData({
					skip_nums: 1
				})
			}
		},

		timeoutHandle: function () {
			// 开启倒计时 

			var _this = this
			var second = this.data.second - 1
			this.setData({
				second: second
			})

			// 倒计时结束，关闭
			if (second == 0) {
				this.setData({
					show: false
				})
				this.uploadData({
					view_nums: 1
				})
				return
			}


			setTimeout(() => {
				_this.timeoutHandle()
			}, 1000)


		},
	}
})