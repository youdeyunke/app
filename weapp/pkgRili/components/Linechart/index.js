/**
* +----------------------------------------------------------------------
* | 友得云客  - 开启房产营销新纪元
* +----------------------------------------------------------------------
* | Copyright (c) 2019~2023 优得（西安）信息科技有限公司版权所有
* +----------------------------------------------------------------------
* | Licensed 友得云客不是自由软件 未经允许不可移除相关版权
* +----------------------------------------------------------------------
* | Author: UDEVE Team <tech@udeve.cn>
* +----------------------------------------------------------------------
*/
// components/Linechart/index.js
var xdata = []
var ydata = []
var yanse = "#cb1623"
const app = getApp()
const housesigningApi = require("../../../api/house_signing")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
    },
    // 数据监听
    observers: {

    },
    /**
     * 组件的初始数据
     */
    data: {
        ec: {
            // onInit: initChart,
            lazyLoad: true
        },
        items: []
    },

    ready(){
        this.loadData()
        this.init()
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadData() {

            var color = app.globalData.color
            var _this = this
            var data = {
                api: "/api/v6/count_house_signings/6",
                data: {}
            }
            var url = '/api/proxy'
            housesigningApi.getHousesigningCount().then((resp) => {
              console.log(resp)
              xdata = []
              ydata = []
              yanse = color.primary
              var items = resp.data.data
              for(let i = 0 ; i < items.length ; i++){
                  xdata.push(items[i].year_month)
                  ydata.push(items[i].count)
              }
              _this.setData({
                  items: resp.data.data
              }, () => {
                  _this.init()
              })
            })
        },
        init: function () {
            this.ecComponent = this.selectComponent('#mychart-dom-line');
            this.ecComponent.init((canvas, width, height, dpr) => {
                // 获取组件的 canvas、width、height 后的回调函数
                // 在这里初始化图表
                const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                });
                setOption(chart);

                // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
                this.chart = chart;

                this.setData({
                    isLoaded: true,
                    isDisposed: false
                });

                // 注意这里一定要返回 chart 实例，否则会影响事件处理等
                return chart;
            });
        }
    }
})
import * as echarts from '../../components/ec-canvas/echarts';
// 折线图
function setOption(chart) {


    const option = {
        title: {
            text: '',
            left: 'center'
        },
        grid: {
            left: 10,
            right: 20,
            bottom: 15,
            containLabel: true
        },

        tooltip: {
            show: true,
            trigger: 'axis'
        },
        formatter: (params) => {
            return params[0].marker + ' ' + params[0].seriesName + ': ' + params[0].data + '套 '
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xdata,
            axisLabel: {
                interval: 0,
                rotate: 45,
            },
            // show: false
            axisLine: {
                show: true, //隐藏x轴线
            },
            axisTick: {
                show: true //隐藏x轴刻度
            },
        },
        yAxis: {
            //         show:false,  //隐藏y轴
            x: 'center',
            type: 'value',
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
            // show: false
        },
        // 图例  升级echarts包
        // legend: {
        //     data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        //   },
        series: [{
            name: '网签套数',
            type: 'line',
            smooth: true,
            data: ydata,
            itemStyle: {
                normal: {
                    color: yanse, //改变折线点的颜色
                    // color: yanse,
                    label: {
                        show: true, //拐点数据显示
                        color: 'inherit'
                    },
                    lineStyle: {
                        color: yanse, //改变折线颜色
                    },
                },
            },
        }]
    };

    chart.setOption(option);
    //   return chart;
}