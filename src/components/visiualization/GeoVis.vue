<template>
  <div>
    <div ref="echart" class="geo-vis" :style="{ width: width, height: height }"></div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-descriptions>
          <el-descriptions-item label="SRAStudy">
            <el-tag type="danger" size="small">{{ srp }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Run">
            <el-tag type="warning" size="small">{{ runs[0] }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Other run numbers">
            {{ runs.length - 1 }}
          </el-descriptions-item>
      </el-descriptions>
      <div>
        <el-alert
          :title="`Are you sure you want to enter the ${srp} details page?`"
          type="success"
          :closable="false"
        >
        </el-alert>
      </div>
      <div class="confirm">
        <el-button type="danger" size="mini" @click="handleRoutePush">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>

<script>
import * as echarts from 'echarts'
import 'echarts/map/js/world'
import elementResizeDetectorMaker from "element-resize-detector";

export default {
    name: 'GeoVis',

    data() {
      return {
        echart: null,
        option: null,
        dialogVisible: false,
        srp: '',
        runs: []
      }
    },

    props: {
      geoData: {
        type: Array,
        required: true
      },
      search: {
        type: Object,
        default() {
          return null
        }
      },
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
      
    },

    watch: {
      geoData(newValue, oldValue) {
        if(newValue && newValue.length > 0) {
          this.initChart()
          this.chartResize()
          // this.addLinesWhenMouseEvent()
          this.addClickEvent()
        }
      },
      search(newValue, oldValue) {
        if(newValue) {
          const result = []
          this.geoData.forEach((item, index) => {
            if(
              item.value[0] >= newValue.weRange[0] &&
              item.value[0] <= newValue.weRange[1] &&
              item.value[1] >= newValue.snRange[0] &&
              item.value[1] <= newValue.snRange[1] &&
              item.value[2] >= newValue.depthRange[0] && 
              item.value[2] <= newValue.depthRange[1]
            ) {
              result.push(item) 
            }
          })
          this.option.series[0].data = result
          this.echart.setOption(this.option)
        }
      }
    },

    methods: { 
      initChart() {
        this.echart = echarts.init(this.$refs.echart)
        this.option = {
          // backgroundColor: '#2C406A',
          backgroundColor: '#2C3964',
          lazyUpdate: true,
          animation: true,
          animationDuration:5000,
          animationEasing:'bounceOut',
          animationThreshold: 5,
          tooltip: {
            trigger: 'item',
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
            text: ['Depth'],
            realtime: true,
            calculable: true,
            hoverLink: true,
            itemWidth: 15,
            itemHeight: 400,
            seriesIndex: 0,
            inverse: true,
            bottom: 0,
            right: 0,
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
              id: 'SRP',
              type: 'effectScatter',
              roam: true,
              coordinateSystem: 'geo',
              showEffectOn: 'emphasis',
              data: this.geoData,
              rippleEffect: {
                number: 5,
                period: 4,
                scale: 5,
                brushType: 'fill'
              },
              symbol: 'pin',
              symbolSize: 15,
              symbolKeepAspect: true,
              emphasisOnMouseOver: false,
            },
          ],

          geo: {
            id: 'worldGeo',
            map: 'world',
            show: true,
            left: 40, 
            top: 40, 
            right: 40, 
            bottom: 40,
            roam: true,
            animationDurationUpdate:0,
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
                areaColor: '#40B299',
                borderWidth: 1,
                opacity: 1,
              }
            }
          },
        }
        this.echart.setOption(this.option)
      },

      // 路由跳转
      handleRoutePush() {
        this.dialogVisible = false
        this.$router.push({ 
          name: 'runproject', 
          params: { 
            param: this.srp
          }
        })
      },

      // 点击事件
      addClickEvent() {
        const that = this
        this.echart.on('click', function (params) {
          if (params.seriesType === 'effectScatter') {
            that.srp = params.data.name
            const runs = [params.data.run]
            that.geoData.forEach(item => {
              if(item.name === that.srp) {
                runs.push(item.run)
              }
            })
            that.runs = runs
            that.dialogVisible = true
          }
        })
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
              else {
                that.option.series[lineSeriesIndex].data = lineData;
              }
            }
          }
        });
        this.echart.on('mouseout', function (params) {
          if (params.seriesType === 'effectScatter') {
            if (lineSeriesIndex !== null) {
              that.option.series.splice(lineSeriesIndex, 1)
              that.echart.clear()
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
<style lang="scss" scoped>
// .geo-vis {
//   background: url('../../assets/images/geo_background.jpeg');
//   background-size: 100% 100%;
//   background-repeat: no-repeat;
// }
.dialog-div {
  height: 40px;
  line-height: 40px;
}
.confirm {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}
</style>