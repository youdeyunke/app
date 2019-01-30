// pages/school-region/schools.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFilter: false,
    showCityPicker: false,
    query: {kw: ''},
    filterSections: [
      {
        name: 'is_public', 
        title: '学校性质', 
        currentOptionIndex: null,
        options: [
          {label: '公办', value: true},
          {label: '民办', value: false },
        ]
      },

      {
        name: 'cat',
        title: '学校类别',
        currentOptionIndex: null,
        options: [
          { label: '幼儿园', value: 'youeryuan' },
          { label: '小学', value: 'xiaoxue' },
          { label: '初中', value: 'chuzong' },
          { label: '高中', value: 'gaozhong' },                 
          { label: '九年一贯制', value: 'jiunian' },
        ]
      },      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (q) {
    var query = {}
    if(q.kw){
      query['kw'] = q.kw
    }
    if(q.sub_district_id){
      query['sub_district_id'] = q.sub_district_id
      this.markSubDistrictViews(q.sub_district_id)
    }
    this.setData({ query: query })    
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
    var query = {}
    var kw = e.detail
    if(kw.length <= 0){
      return false
    }
    query['kw'] = kw
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
