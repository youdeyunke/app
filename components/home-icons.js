// components/home-icons.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    publishSheetShow: false,
    publishActions: [
      {name: '我要找房', group: 'need-room'},
      {name: '我要找室友', group: 'need-roommate'},
      {name: '我要转租', group: 'rental', is_sublet: true},

      {name: '发布整租房源', group: 'rental', rent_type: 'zhengzu'},
      {name: '发布合租房源', group: 'rental', rent_type: 'hezu' },
      {name: '发布二手房房源', group: 'old'  },

    ],

    colors: [
      '4BC587',
      'F7B264',
      'F5D04F',
      'F17276',
      '67B1FD',
      'F7B263',
      '62D182',
      '5AC0E5',
      '5DD2B9',
      '9291DF',
    ],

    icons: [
      {name: '新房', url: '/pages/post/index?group=xinfang', opentype:"navigateTo", id: 'new', bg: '#fdaa3d'},
      { name: '二手房', url: '/pages/post/index?group=ershoufang', opentype:"navigateTo", id: 'old', bg: '#53d8e3'},

      { name: '整租', url: '/pages/post/index?group=zufang&rent_type=zhengzu', opentype:"navigateTo", id: 'rent_house', bg: '#65b455'},
      { name: '合租', url: '/pages/post/index?group=zufang&rent_type=hezu', opentype:"navigateTo", id: 'rent_room', bg: '#d578e3'},

      { name: '找室友', url: '/pages/need/roommate', opentype: "navigateTo", id: 'shiyou', bg: '#4c9ef0' },

      { name: '求购登记', url: '/pages/need/room-form?cat=buy', opentype: "navigateTo", id: 'publish'  },
      { name: '求租登记', url: '/pages/need/room-form?cat=rent', opentype: "navigateTo", id: 'publish'  },
      { name: '我要卖房', url: '/pages/post/form?group=old', opentype: "navigateTo", id: 'sale'  },
      { name: '我要出租', url: '/pages/post/form?group=rental&rent_type=zhengzu', opentype: "navigateTo", id: 'rent'  },
      { name: '关于我们', url: '/pages/about/index', opentype: "navigateTo", id: 'about'  },

    ]

  },

  /**
   * 组件的方法列表
   */
  methods: {
    publishClose: function(e){
      this.setData({
        publishSheetShow: false
      })
    },

    publishClick: function(e){
      var group = e.detail.group
      var url =  '/pages/post/form?group=' 
      url += e.detail.group 
      url +=  '&rent_type=' 
      url += e.detail.rent_type || 'zhengzu'
      url += '&is_sublet='
      url += e.detail.is_sublet || 'false'
      wx.navigateTo({
        url: url,
      })
    },

    publishHandle: function(e){
      // 点击发布按钮，弹出选择框
      this.setData({
        publishSheetShow: true,
      })
    },

  }
})
