<template>
  <div ref="echart" class="var-vis" :style="{ width: width,height: height }"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'PositionBarVis',

  props: {
    barData: {
      type: Object,
      default() {
        return {}
      }
    },
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
    
  },

  watch: {
    barData(newValue, oldValue) {
      if(newValue) {
        this.initChart()
      }
    }
  },

  methods: {
    initChart() {
      this.echart = echarts.init(this.$refs.echart);
      this.option = {
        itemStyle: {
          color: '#FFE000',
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
          },
          formatter: '{b} <br/>Numbers : {c}'
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
          data: this.barData.x,
          nameLocation: 'center',
          nameGap: 30,
          nameTextStyle: {
            fontSize: 14,
            color: '#FFF',
          },
          axisTick: {
            show: false,
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
              if (value.length > 8) {
                  return value.slice(0, 8) + '...';
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
            show: false,
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
            data: this.barData.y
          }
        ]
      };

      this.option && this.echart.setOption(this.option);
    }
  },
};
</script>