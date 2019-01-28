// pages/school-region/schools.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFilter: false,
    query: {},
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
      this.setData({query: query})
    }
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
    // 处理过滤器
    var sections = this.data.filterSections
    for (var i = 0; i <= sections.length - 1; i++) {
      var section = sections[i]
      var currentIndex = section.currentOptionIndex
      if (currentIndex != null) {
        var field = section.name
        var option = section.options[currentIndex]
        query[field] = option.value
      }
    }

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
    this.setData({filterSections: sections})
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})