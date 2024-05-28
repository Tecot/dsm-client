<template>
    <div ref="chart" style="width: 100%; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import worldJson from '../../../public/world.json'

export default {
    name: 'GeoVis',
    data() {
      return {
        chart: null,
        mapData: [
          [116.4074, 39.9042], // 北京的经纬度
          [-73.9352, 40.7306], // 纽约的经纬度
          [2.3522, 48.8566]
        ]
      }
    },

    mounted() {
      this.initChart()
    },

    methods: { 
      initChart() {
        this.chart = echarts.init(this.$refs.chart)
        echarts.registerMap('world', {geoJSON: worldJson})

        const option = { 
          tooltip: {
            trigger: 'item',
          },
          
          visualMap: {
            // 视觉映射组件，用于视觉编码，比如用不同的颜色表示不同范围的值
            // 在这个例子中，我们没有使用它，因为只是简单的描点
          },

          series: [
            {
              name: 'xxxxx',
              type: 'scatter', // 散点图类型
              coordinateSystem: 'bmap', // 地理坐标系,
              data: this.mapData.map((coord, index) => {
                return {
                  name: `地点${index + 1}`, // 数据项名称，可以根据需要自定义
                  value: coord,
                }
              }),
              symbolSize: function (val) {
                // 根据需要自定义点的大小
                return 10; // 这里统一设置为10，可以根据实际数据调整
              },
              encode: {
                value: 2, // 指定value为经纬度数组
              },
              label: {
                formatter: '{b}', // 显示数据项名称
                position: 'right',
                show: true, // 是否显示标签
              },
              itemStyle: {
                color: '#ddb926', // 点的颜色
              },
            }
          ],





          
          geo: {
            map: 'world', // 使用世界地图，如果需要特定国家地图，请更换为相应名称并引入对应地图数据
            roam: true, // 开启鼠标缩放和平移漫游
            label: {
              emphasis: {
                show: false, // 高亮时是否显示标签
              },
            },
            itemStyle: {
              normal: {
                areaColor: '#323c48', // 地图区域颜色
                borderColor: '#404a59', // 地图区域边框颜色
              },
              emphasis: {
                areaColor: '#2a333d', // 高亮时地图区域颜色
              },
            },
          },
        }
        this.chart.setOption(option)
      },

      beforeDestroy() {
        // 组件销毁前，清除ECharts实例
        if (this.chart) {
          this.chart.dispose()
        }
      },
    } 
}
</script>