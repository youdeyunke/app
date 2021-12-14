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
				success: function (res) {
					console.log(res)
					let value = res.data.data
					if (value) {
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
						_this.Timeout()
					}
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
		Timeout() {
			var _this = this
			var second = _this.data.second - 1
			setTimeout(() => {
				_this.setData({
					second: second
				})
				if (_this.data.second <= 0) {
					this.uploadData({
						view_nums: 1
					})
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