export default{
    
    title: '西安个人户籍所在区域',
    options: [
      {
          option:'A、郑州户口',
          children:[{
              title: '是否达到法定结婚年龄？',
              options: [
                  {
                      option:'是',
                      children:[{
                          title: '是否在郑州首次购房？',
                          options:[
                              {
                                  option:'在郑州首次购房',
                                  children:[{
                                      title:'名下有无贷款记录？',
                                      options:[
                                          {
                                              option: '有',
                                              children:[{
                                                  title:'是否结清贷款？',
                                                  options:[
                                                      {
                                                          option:'未结清',
                                                          children:[{
                                                              title:'您的查询结果为',
                                                              options:'在郑州以家庭为单位，还可以购买2套住房，首付60%'
                                                          }]
                                                      },
                                                      {
                                                          option:'已结清',
                                                          children:[{
                                                              title:'您的查询结果为',
                                                              options:'在郑州以家庭为单位，限购3套房，首套可首付30%'
                                                          }]
                                                      }
                                                  ]
                                              }]
                                          },
                                          {
                                              option: '无',
                                              children:[{
                                                  title:'您的查询结果为',
                                                  options:'以家庭为单位，限购3套房，首套可首付30%'
                                              }]
                                          }
                                      ]
                                  }]
                              },
                              {
                                  option:'在郑州再次购房',
                                  children:[{
                                      title:'名下有无贷款记录？',
                                      options:[
                                          {
                                              option: '有',
                                              children:[{
                                                  title:'是否结清贷款？',
                                                  options:[
                                                      {
                                                          option:'未结清',
                                                          children:[{
                                                              title:'您的查询结果为',
                                                              options:'在郑州以家庭为单位，限购2套房，首付60%'
                                                          }]
                                                      },
                                                      {
                                                          option:'已结清',
                                                          children:[{
                                                              title:'您的查询结果为',
                                                              options:'在郑州以家庭为单位，限购2套房，可首付30%'
                                                          }]
                                                      }
                                                  ]
                                              }]
                                          },
                                          {
                                              option: '无',
                                              children:[{
                                                  title:'您的查询结果为',
                                                  options:'在郑州以家庭为单位，限购2套房，可首付30%'
                                              }]
                                          }
                                      ]
                                  }]
                              }
                          ]
                      }]
                  },
                  {
                      option:'否',
                      children:[{
                          title:'是否在郑州首次购房',
                          options:[
                              {
                                  option:'在郑州首次购房',
                                  children:[{
                                      title: '您的查询结果为',
                                      options: '在郑州限购1套房，首套可首付30%'
                                  }]
                              },
                              {
                                  option:'在郑州再次购房',
                                  children:[{
                                      title: '您的查询结果为',
                                      options: '已限购（在郑州已拥有一套房产），无法再购置房产'
                                  }]
                              }
                          ]
                      }]
                  }
              ]}
          ],
      },
      {
          option:'B、非郑州户口',
          children:[{
              title: '是否在郑州首次购房？',
              options:[
                  {
                      option:'在郑州首次购房',
                      children:[{
                          title:'名下有无贷款记录？',
                          options:[
                              {
                                  option: '有',
                                  children:[{
                                      title:'是否结清贷款？',
                                      options:[
                                          {
                                              option:'未结清',
                                              children:[{
                                                  title:'您的查询结果为',
                                                  options:'在郑州以家庭为单位，限购1套房，首付60%'
                                              }]
                                          },
                                          {
                                              option:'已结清',
                                              children:[{
                                                  title:'您的查询结果为',
                                                  options:'在郑州以家庭为单位，限购1套房，首付30%'
                                              }]
                                          }
                                      ]
                                  }]
                              },
                              {
                                  option: '无',
                                  children:[{
                                      title:'您的查询结果为',
                                      options:'以家庭为单位，可以限购1套房，首付30%'
                                  }]
                              }
                          ]
                      }]
                  },
                  {
                      option:'在郑州再次购房',
                      children:[{
                          title:'您的查询结果为',
                          options:'已限购（在郑州已拥有一套房产），无法再购置房产'
                      }]
                  }
              ]
          }]
      }
    ],
  
}