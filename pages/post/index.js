// pages/school-region/schools.js
const app = getApp()
const typeFilter = {
  name: 's',
  title: '户型',
  currentOptionIndex: null,
  options: [
    { label: '一室', value: 1 },
    { label: '两室', value: 2 },
    { label: '三室', value: 3 },
    { label: '四室', value: 4 },
    { label: '五室及以上', value: 5 },
  ]
}

const totalPriceFilter = {
  name: 'total_price',
  title: '售价',
  currentOptionIndex: null,
  options: [
    { label: '30万以内', value: [0, 30] },
    { label: '30-50万', value: [30, 50] },
    { label: '50-100万', value: [50, 100] },
    { label: '100-150万', value: [100, 150] },
    { label: '150-200万', value: [150, 200] },
    { label: '200万-250万', value: [200, 250] },
    { label: '250万-300万', value: [250, 300] },
    { label: '300万以上', value: [300, 999999] },
  ]
}

const rentPriceFilter = {
  name: 'rent_price',
  title: '租金',
  currentOptionIndex: null,
  options: [
    { label: '1000以内', value: [0, 1000] },
    { label: '1000~1500', value: [1000, 1500] },
    { label: '1500~2000', value: [1500, 2000] },
    { label: '1500~2000', value: [1500, 2000] },
    { label: '2000~2500', value: [2000, 2500] },  
    { label: '2500~3000', value: [2500, 3000] },      
    { label: '2500~3000', value: [2500, 3000] },       
    { label: '3000~3500', value: [3000, 3500] },
    { label: '2500~3000', value: [2500, 3000] },       
    { label: '4000以上', value: [4000, 999999] },                   
    ]
}


const positionFilter = {
  name: 'position',
  title: '朝向',
  currentOptionIndex: null,
  options: [
    { label: '朝东', value: '东' },
    { label: '朝东', value: '东' }, 
    { label: '朝西', value: '西' },
    { label: '朝北', value: '北' },         
  ]
}

const orderFilter1 = {
  name: 'order',
  title: '排序',
  currentOptionIndex: null,
  options: [
      {label: '默认排序', value: 'refresh_at,desc'},
      {label: '价格(从低到高)', value: 'rent_price,asc' },
      {label: '价格(从高到低)', value: 'rent_price,desc'},
      {label: '面积(从大到小)', value: 'area,desc'},
      {label: '面积(从小到大)', value: 'area,asc' },
  ]

}
const orderFilter2 = {
  name: 'order',
  title: '排序',
  currentOptionIndex: null,
  options: [
      {label: '默认排序', value: 'refresh_at,desc'},
      {label: '均价(从低到高)', value: 'average_price,asc' },
      {label: '均价(从高到低)', value: 'average_price,desc'},
      {label: '总价(从低到高)', value: 'total_price,asc' },
      {label: '总价(从高到低)', value: 'total_price,desc'},
      {label: '面积(从大到小)', value: 'construction_area,desc'},
      {label: '面积(从小到大)', value: 'construction_area,asc' },
  ]

}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFilter: false,
    showCityPicker: false,
    query: {kw: ''},
    filterSections: [ 
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    var group = query.group || 'ershoufang'
    var query = {
      group: group,
      rent_type: query.rent_type || '',
      is_vr: query.is_vr || '',     
      kw: query.kw || '', 
      order: 'id,desc'
    }

    switch(group){
      case 'xinfang':
        var fs = [typeFilter, totalPriceFilter, orderFilter2]
        break
      case 'ershoufang':
        var fs = [typeFilter, totalPriceFilter, orderFilter2]
        break
      case 'zufang':
        var fs = [typeFilter, rentPriceFilter, positionFilter, orderFilter1]
        break;
    }
    this.setData({ query: query, filterSections: fs })    
  },

  markSubDistrictViews: function(sdid){
    // 更新小区热度值
    app.request({
      url: '/api/v1/sub_districts/' + sdid,
      data: {},
      success: function(resp){

      }
    })
  },

  orderChange: function(e){
    
  },

  cityChange: function(e){
      var c = e.detail.city
      var d = e.detail.district
      var cityDistrictName = ''
      var query = this.data.query
      query['city_id'] = ''
      query['district_id'] = ''
    
      if(c.id){
        cityDistrictName += c.name
        query['city_id'] = c.id
      }
      if(d.id){
        cityDistrictName += ' '
        cityDistrictName += d.name
        query['district_id'] = d.id
      }
     
      this.setData({
        query: query,
        city: e.detail.city,
        district: e.detail.district,
        showCitySelect: false,
        cityDistrictName: cityDistrictName,
        showCityPicker: false,
      })

      this.loadData()
    },

  showCity: function(){
    this.setData({showCityPicker: true})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  loadData: function(){
    console.log('load data with query', this.data.query)
  },

  onSearchClear: function(e){
    console.log('onSearchClear', e)
    // 清空关键词，回到初始状态
    this.filterReset()
    this.setData({query: {kw: ''}})
    this.loadData()
  },

  onSearch: function(e){
    // 重新输入关键词后，要重置智能过滤
    var query = this.data.query
    var kw = e.detail || ''
    if(kw.length <= 0){
      return false
    }
    query['kw'] = kw
    query['page'] = 1
    this.filterReset()
    this.setData({query: query})
    this.loadData()
  },

  showFilter: function(){
    this.setData({showFilter: true})
  },

  closeFilter: function(){
    this.setData({ showFilter: false })
  },

  buildQuery: function(){
    // 将城市选择器、过滤器、关键词组合成查询条件
    var _this = this
    var query = {
      kw: _this.data.kw
    }

    // 处理城市

    console.log('query ', query)

  },

  filterReset: function(e){
    var sections = this.data.filterSections
    for(var i=0; i<= sections.length -1 ; i++){
      sections[i].currentOptionIndex = null
    }
    this.setData({filterSections: sections})

  },
  filterConfirm: function(e){
    var query = this.data.query
    query.page = 1

    // 处理过滤器
    var sections = this.data.filterSections
    for (var i = 0; i <= sections.length - 1; i++) {
      var section = sections[i]
      var currentIndex = section.currentOptionIndex
      var field = section.name
      if(currentIndex == null){
        query[field] =  ''
      }
      else {
        var option = section.options[currentIndex]
        query[field] = option.value
      }
    }
    console.log('set query', query)
    this.setData({query: query})
    this.closeFilter()
    this.loadData()
  },


  optionHandle: function(e){
    console.log('e', e)
    var sectionIndex = e.target.dataset.sectionIndex
    var i = e.target.dataset.index
    console.log('s', sectionIndex, i)
    var sections = this.data.filterSections
    sections[sectionIndex].currentOptionIndex = sections[sectionIndex].currentOptionIndex == i ? null : i

    var data = {}
    var k = "filterSections[" + sectionIndex + "]"
    data[k] = sections[sectionIndex]

    this.setData(data)
    console.log('sections', sections)

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var query = this.data.query
    var page = this.data.query.page || 1
    query.page = page + 1
    this.setData({query: query})
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
