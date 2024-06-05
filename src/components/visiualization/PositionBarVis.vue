<template>
  <div ref="echart" class="var-vis" :style="{ width: width,height: height }"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'PositionBarVis',

  props: {
    width: {
      type: String,
      default() {
        return '400px'
      }
    },
    height: {
      type: String,
      default() {
        return '300px'
      }
    }
  },


  data() {
    return {
      echart: null,
      option: null
    };
  },

  mounted() {
    this.initChart()
  },

  methods: {
    initChart() {
      this.echart = echarts.init(this.$refs.echart);
      this.option = {
        itemStyle: {
          color: '#1E8BC7',
          borderRadius: [10, 10, 0, 0]
        },
        label: {
          show: true,
          color: '#FFF',
          position: 'top'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
          borderColor: '#FFF'
        },
        xAxis: {
          type: 'category',
          name: 'Geographic location',
          data: ['Mon', 'Tue', 'Wedxxxxxxxxxxxxxxxxxxxxxxxxx', 'Thu', 'Fri', 'Sat', 'Sun'],
          nameLocation: 'center',
          nameGap: 25,
          nameTextStyle: {
            fontSize: 14,
            color: '#FFF',
          },
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              color: '#FFF',
            }
          },
          axisLine: {
            lineStyle: {
              color: '#FFF'
            },
          },
          axisLabel: {
            color: '#FFF',
            rotate: 30,
            fontSize: 10,
            formatter: (value, index) => {
              if (value.length > 3) {
                  return value.slice(0, 3) + '...';
              } else {
                  return value;
              }
            }
          },
        },
        yAxis: {
          type: 'value',
          name: 'Number of SRP',
          nameLocation: 'center',
          nameGap: 24,
          nameTextStyle: {
            fontSize: 14,
            color: '#FFF',
          },
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              color: '#FFF'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#FFF'
            },
          },
          axisLabel: {
            color: '#FFF',
            fontSize: 10,
          },
        },
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      };

      this.option && this.echart.setOption(this.option);
    }
  },
};
</script>