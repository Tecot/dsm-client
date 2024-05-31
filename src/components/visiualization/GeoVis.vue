<template>
    <div ref="chart" style="width: 100%; height: 800px;"></div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts/map/js/world'
import {testData} from './testData'

export default {
    name: 'GeoVis',
    data() {
      return {
        
      }
    },

    mounted() {
      this.initChart()
    },

    methods: { 
      initChart() {
        this.chart = echarts.init(this.$refs.chart)
        
        const option = {

          // title: {
          //   show: true,
          //   text: 'Deep sea micro',
          //   left: 'center',
          //   top: 10,
          //   textStyle: {
          //     color: '#FFF',
          //     fontSize: 24
          //   }
          // },
          
          backgroundColor: '#0291B1',

          // toolbox: {
          //   show: true,
          //   orient: 'vertical',
          //   x: 'right',
          //   y: 'center',
          //   feature: {
          //     mark: {
          //       show: true
          //     },
          //     dataView: {
          //       show: true,
          //       readOnly: false
          //     },
          //     restore: {
          //       show: true
          //     },
          //     saveAsImage: {
          //       show: true
          //     }
          //   }
          // },

          series: [
            {
              name: 'xx', // series名称
              type: 'scatter', // series图表类型
              coordinateSystem: 'geo', // series坐标系类型
              symbolSize: 10, // 散点大小
              color: 'black',
              emphasis: {
                label: {
                  show: true,
                },
                itemStyle: {
                  color: '#FF5733' // 鼠标悬停时的标点颜色
                }

              },
              data: testData
            },
            // {
            //   name: 'top',
            //   type: 'map',
            //   mapType: 'world',
            //   data: [],
            //   markPoint: {
            //     symbol: 'emptyCircle',
            //     symbolSize: function(v) {
            //       return 10 + v/100
            //     },
            //     effect: {
            //       show: true,
            //       shadowBlur: 0
            //     },
            //     itemStyle: {
            //       normal: {
            //         label: {
            //           show: false
            //         }
            //       }
            //     },
            //     data: [{
            //         "name": "point2",
            //         "value": 21
            //     },
            //     {
            //         "name": "point3",
            //         "value": 212
            //     },
            //     {
            //         "name": "point4",
            //         "value": 432
            //     },
            //     {
            //         "name": "point5",
            //         "value": 123
            //     }]
            //   }
            // }
          ],


          geo: {
            map: 'world', // 注明使用世界地图
            show: true, // 显示地理坐标组件
            roam: true, // 缩放、平移启动
            zoom: 1.2, // 当前视角的缩放比例
            label: {
              position: 'left',
              emphasis: {
                show: true, // 高亮时是否显示标签
                color: '#FFF',
                fontStyle: 'italic',
                fontSize: 16
              },
            },
            itemStyle: {
                areaColor: '#323c48', // 地图区域颜色
                borderColor: '#8ACFF2', // 地图区域边框颜色
                borderWidth: 0.5, // 地图区域边的粗细
                borderType: 'solid', // 地图区域边的类型
                borderCap: 'round', // 地图区域边衔接的形状
                borderJoin: 'round', // 用于设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。
                // shadowColor: 'rgba(0, 0, 0, 0.5)',
                // shadowBlur: 10,
                opacity: 0.8,
              
              emphasis: {
                areaColor: '#2a333d', // 高亮时地图区域颜色
                borderWidth: 1, // 地图区域边的粗细
                opacity: 1,
              }
            }
          }
        }

        this.chart.setOption(option)
      },
      // initChart() {
      //   this.chart = echarts.init(this.$refs.chart)
      //   echarts.registerMap('world', {geoJSON: worldJson})

      //   const option = { 
      //     tooltip: {
      //       trigger: 'item',
      //     },
          
      //     visualMap: {
      //       // 视觉映射组件，用于视觉编码，比如用不同的颜色表示不同范围的值
      //       // 在这个例子中，我们没有使用它，因为只是简单的描点
      //     },

      //     // series: [
      //     //   {
      //     //     name: 'xxxxx',
      //     //     type: 'scatter', // 散点图类型
      //     //     coordinateSystem: 'bmap', // 地理坐标系,
      //     //     data: this.mapData.map((coord, index) => {
      //     //       return {
      //     //         name: `地点${index + 1}`, // 数据项名称，可以根据需要自定义
      //     //         value: coord,
      //     //       }
      //     //     }),
      //     //     symbolSize: function (val) {
      //     //       // 根据需要自定义点的大小
      //     //       return 10; // 这里统一设置为10，可以根据实际数据调整
      //     //     },
      //     //     encode: {
      //     //       value: 2, // 指定value为经纬度数组
      //     //     },
      //     //     label: {
      //     //       formatter: '{b}', // 显示数据项名称
      //     //       position: 'right',
      //     //       show: true, // 是否显示标签
      //     //     },
      //     //     itemStyle: {
      //     //       color: '#ddb926', // 点的颜色
      //     //     },
      //     //   }
      //     // ],





          
      //     geo: {
      //       map: 'world', // 使用世界地图，如果需要特定国家地图，请更换为相应名称并引入对应地图数据
      //       roam: true, // 开启鼠标缩放和平移漫游
      //       label: {
      //         emphasis: {
      //           show: false, // 高亮时是否显示标签
      //         },
      //       },
      //       itemStyle: {
      //         normal: {
      //           areaColor: '#323c48', // 地图区域颜色
      //           borderColor: '#404a59', // 地图区域边框颜色
      //         },
      //         emphasis: {
      //           areaColor: '#2a333d', // 高亮时地图区域颜色
      //         },
      //       },
      //     },
      //   }
      //   this.chart.setOption(option)
      // },

      beforeDestroy() {
        // 组件销毁前，清除ECharts实例
        if (this.chart) {
          this.chart.dispose()
        }
      },
    } 
}
</script>