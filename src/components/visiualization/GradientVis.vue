<template>
  <div ref="echart" class="funnel-vis" :style="{ width: width,height: height }"></div>
</template>

<script>
import testData from '../visiualization/data'
import * as echarts from 'echarts';

export default {
  name: 'GradientVis',

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
      option: null,
      // color: ['#F07D7D', '#A2D38A', '#FCD975', '#E391E4', '#E46B0C', '#368D6C']
      color: ['lightskyblue', '#057EC1',]
    };
  },

  mounted() {
    this.initChart()
  },

  methods: {
    initChart() {
      this.echart = echarts.init(this.$refs.echart);
      const meta = {
        'Unknow': { value: 0, name: 'Unknow'},
        '0~2000': { value: 0, name: '0~2000' },
        '2000~4000': { value: 0, name: '2000~4000' },
        '4000~6000': { value: 0, name: '4000~6000' },
        '6000~8000': { value: 0, name: '6000~8000' },
        '8000~10000': { value: 0, name: '8000~10000' },
        '8000~10000': { value: 0, name: '8000~10000' },
        '10000~12000': { value: 0, name: '10000~12000' }
      }
      const funnelData = {
        maxValue: 0,
        data: [],
      }
      testData.data.forEach((item, index) => {
        if(item.depth === '-') {
          meta['Unknow'].value++
        } else {
          if(item.depth >= 0 && item.depth < 2000) {
            meta['0~2000'].value++
          }
          if(item.depth >= 2000 && item.depth < 4000) {
            meta['2000~4000'].value++
          }
          if(item.depth >= 4000 && item.depth < 6000) {
            meta['4000~6000'].value++
          }
          if(item.depth >= 6000 && item.depth < 8000) {
            meta['6000~8000'].value++
          }
          if(item.depth >= 8000 && item.depth < 10000) {
            meta['8000~10000'].value++
          }
          if(item.depth >= 10000 && item.depth < 12000) {
            meta['10000~12000'].value++
          }
        }
      })
      Object.keys(meta).forEach(key => {
        funnelData.data.push(meta[key])
        if(meta[key].value > funnelData.maxValue) {
          funnelData.maxValue = meta[key].value
        }
      })
      
      this.option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}'
        },
        visualMap: {
          min: 0,
          max: funnelData.maxValue,
          text: ['Max', 'Min'],
          realtime: false,
          calculable: true,
          inRange: {
            color: this.color
          },
          textStyle: {
            color: '#FFF'
          }
        },
        series: [{
          name: 'Depth range',
          type: 'funnel',
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
          width: '100%',
          min: 0,
          max: funnelData.maxValue,
          minSize: '0%',
          maxSize: '70%',
          sort: 'none',
          gap: 5,
          color: this.color,
          label: {
            show: true,
            position: 'right',
            formatter: '{b}',
            fontWeight: 'bold'
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'dashed'
            }
          },
          itemStyle: {
              borderWidth: 0,
          },
          emphasis: {
            label: {
              fontSize: 12
            }
          },
          data: funnelData.data
          }
        ]
      };
      this.option && this.echart.setOption(this.option);
    }
  },
};
</script>