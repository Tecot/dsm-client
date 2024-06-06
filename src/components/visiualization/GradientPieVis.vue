<template>
    <div ref="echart" class="pie-vis" :style="{ width: width,height: height }"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    name: 'GradientPieVis',
  
    props: {
      pieData: {
        type: Array,
        required: true,
        default() {
          return []
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
      pieData(newValue, oldValue) {
        if(newValue && newValue.length > 0) {
          this.initChart()
        }
      }
    },
    
    methods: {
      initChart() {
        this.echart = echarts.init(this.$refs.echart);
        this.option = {
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          series: [
            {
              name: 'Nightingale Chart',
              type: 'pie',
              radius: [10, 100],
              center: ['50%', '50%'],
              roseType: 'radius',
              label: {
                color: '#FFF',
              },
              labelLine: {
                lineStyle: {
                  color: '#FFF'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              },
              color: [
                '#ccc', 
                '#F76B6B', 
                '#FCD05B',
                '#73C0DE', 
                '#3BA272', 
                '#FC8452', 
                '#9A60B4'
              ],
              itemStyle: {
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              },
              data: this.pieData
            }
          ]
        };
        this.option && this.echart.setOption(this.option);
      }
    },
  };
  </script>