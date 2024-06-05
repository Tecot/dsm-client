<template>
  <div ref="echart" class="geo-vis" :style="{ width: width,height: height }"></div>
</template>

<script>
import * as echarts from 'echarts'

import 'echarts/map/js/world'
import testData from './data'
import testData1 from './data1'
import elementResizeDetectorMaker from "element-resize-detector";

export default {
    name: 'GeoVis',

    data() {
      return {
        echart: null,
        option: null
      }
    },

    props: {
      width: {
        type: String,
        default() {
          return '100%'
        }
      },
      height: {
        type: String,
        default() {
          return '600px'
        }
      }
    },

    mounted() {
      this.initChart()
      this.chartResize()
      // this.addLinesWhenMouseEvent()
    },

    methods: { 
      initChart() {
        this.echart = echarts.init(this.$refs.echart)
        this.option = {
          backgroundColor: '#2C406A',
          tooltip: {
              trigger: 'item', // 触发类型
              formatter: (params) => {
                return 'SRAStudy: ' + params.data['name'] + 
                '<br>Run: ' + params.data['run'] + 
                '<br>Geographic location: ' + params.data['geographic location'] + 
                '<br>Depth: ' + (params.data['depth'] === '-'? 'Unkown' : params.data['depth'] + 'm') + 
                '<br>Longitude: ' + params.data.value[1] + 
                '<br>Latitude: ' + params.data.value[0]
              }
          },
          visualMap: {
            min: 0,
            max: 8000,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
              color: ['lightskyblue', 'yellow', 'orangered']
            },
            textStyle: {
              color: '#FFF'
            }
          },
          series: [
            {
              name: 'SRP',
              type: 'effectScatter',
              progressive: true,
              roam: true,
              coordinateSystem: 'geo',
              showEffectOn: 'emphasis',
              data: testData.data,
              rippleEffect: {
                color: '#40B299',
                number: 5,
                scale: 10,
                brushType: 'fill'
              },
              symbol: 'pin',
              symbolSize: 15,
              symbolKeepAspect: true,
              
            },
          ],

          geo: {
            map: 'world',
            show: true,
            roam: true,
            left: 40, 
            top: 40, 
            right: 40, 
            bottom: 40,
            zoom: 1,
            boundingCoords: [
              [-180, 90],
              [180, -90]
            ],
            label: {
              position: 'left',
              emphasis: {
                show: true, 
                color: '#FFF',
                fontStyle: 'italic',
                fontSize: 16
              },
            },
            itemStyle: {
              areaColor: '#323c48', 
              borderColor: '#8ACFF2',
              borderWidth: 0.5,
              borderType: 'solid',
              borderCap: 'round',
              borderJoin: 'round', 
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 20,
              opacity: 0.8,
              emphasis: {
                areaColor: '#40B299', // 高亮时地图区域颜色
                borderWidth: 1, // 地图区域边的粗细
                opacity: 1,
              }
            }
          },
        }
        this.echart.setOption(this.option)
      },

      // 鼠标画线事件
      addLinesWhenMouseEvent() {
        const that = this
        let lineSeriesIndex = null;
        this.echart.on('mouseover', function (params) {
          if (params.seriesType === 'effectScatter') {
            const currentName = params.data.name
            const data = that.option.series[0].data
            const sameNameData = data.filter(function (item) {
                return item.name === currentName;
            })
            if (sameNameData.length > 1) {
              const lineData = sameNameData.map(function (item) {
                return {
                  points: [params.data.name, item.name],
                  coords: [
                    params.data.value.slice(0, 2),
                    item.value.slice(0, 2)
                  ]
                }
              })
              if (lineSeriesIndex === null) {
                lineSeriesIndex = that.option.series.length;
                that.option.series.push({
                  name: "lines",
                  type: "lines",
                  coordinateSystem: "geo",
                  zlevel: 0,
                  large: true,
                  // effect: {
                  //   show: true, // 开启动态线条效果
                  //   constantSpeed: 30, // 线条速度
                  //   symbol: "pin", // 标记的图形，支持图片和文字
                  //   symbolSize: 10, // 标记的大小
                  //   trailLength: 0, // 动态线条的长度
                  //   loop: true, // 是否循环动画效果
                  // },
                  lineStyle: {
                    normal: {
                      color: '#CCFF01',
                      width: 2,
                      opacity: 0.4,
                      curveness: 0.2, // 曲线程度
                    },
                    emphasis: {
                      opacity: 0.8,
                      width: 5,
                    },
                    data: this.mapLineDataArr,
                  },
                  data: lineData,
                });
                that.echart.setOption(that.option)
              } 
              // else {
              //   that.option.series[lineSeriesIndex].data = lineData;
              // }
            }
          }
        });
        this.echart.on('mouseout', function (params) {
          if (params.seriesType === 'effectScatter') {
            if (lineSeriesIndex !== null) {
              that.option.series.splice(lineSeriesIndex, 1)
              // that.echart.clear()
              lineSeriesIndex = null;
              that.echart.setOption(that.option)
            }
          }
        })
      },

      // 当屏幕尺寸改变时，地图同时响应尺寸
      chartResize() {
        const erd = elementResizeDetectorMaker();
        const that = this
        erd.listenTo(this.$refs.echart, function(element) {
          that.$nextTick(() => {
            that.echart.resize();
          })
        })
      },

      // 当组件销毁时，清除echart对象
      beforeDestroy() {
        if (this.echart) {
          this.echart.dispose()
        }
      },
    } 
}
</script>