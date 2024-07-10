<template>
  <div 
    ref="loginTimes" 
    @mouseenter="handleMouseEnter" 
    @mouseleave="handleMouseLeave" 
    style="width: 360px;height: 330px;"></div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-wordcloud';

export default {
  name: 'WordCloudVis',
  data() {
    return {
      soruce: [
        { value: '30', name: 'VIVO1' },
        { value: '29', name: 'OPPO2' },
        { value: '28', name: 'HONOR' },
        { value: '27', name: 'iPhone 12 pro max3' },
        { value: '26', name: 'iPhone 12 pro max4' },
        { value: '25', name: 'HUAWEI MATE 105' },
        { value: '24', name: 'ONEPLUS6' },
        { value: '23', name: 'Lenova T4707' },
        { value: '22', name: 'MacBook Air8 ' },
        { value: '21', name: 'SAMSUNG9' },
        { value: '20', name: 'iPad mini111' },
        { value: '16', name: 'BLACKBERRY222' },
        { value: '14', name: 'OPPO333' },
        { value: '13', name: 'SAMSUNG444' },
        { value: '12', name: '361555' },
        { value: '10', name: 'Lenova666' }
      ],
      currentData: [], // 当前显示的数据组
      isPaused: false
    }
  },
  mounted() {
    this.initCurrentData(); // 初始化当前显示的数据组
    this.getIint(); // 初始化图表
    this.startSwitchTimer(); // 开始切换定时器
    this.bindMouseEvents();
  },
  beforeDestroy() {
    this.stopSwitchTimer(); // 组件销毁时停止定时器
    this.unbindMouseEvents();
  },
  methods: {
    getIint() {
      let myChart = echarts.init(this.$refs.loginTimes);
      const option = {
        backgroundColor: '#2C3964',
        series: [{
          type: 'wordCloud',
          sizeRange: [8, 18],
          rotationRange: [-45, 45],
          gridSize: 25,
          layoutAnimation: true,
          data: this.currentData.map(item => ({
            name: item.name,
            value: item.value,
            textStyle: {
              normal: {
                fontSize: 8,
                color: this.getRandomColor()
              }
            }
          }))
        }]
      };
      myChart.setOption(option);
    },
    initCurrentData() {
      // 初始化当前显示的数据组，这里简单取前5个数据作为初始显示
      this.currentData = this.soruce.slice(0, 8);
    },
    switchDataGroup() {
      // 切换到下一组数据
      const step = 8;
      let index = this.currentData.length === step ? 0 : this.currentData.length;
      this.currentData = this.soruce.slice(index, index + step);
      this.getIint(); // 更新图表
    },
    startSwitchTimer() {
      // this.switchTimer = setInterval(this.switchDataGroup, 3000);
      if (!this.switchTimer) {
        this.switchTimer = setInterval(() => {
          if (!this.isPaused) {
            this.switchDataGroup();
          }
        }, 3000);
      }
    },
    stopSwitchTimer() {
      clearInterval(this.switchTimer);
    },
    getRandomColor() {
      const colors = [
        '#ff4500', '#ff6347', '#ff7f50', '#ffd700', '#9acd32',
        '#00bfff', '#8a2be2', '#a52a2a', '#deb887', '#5f9ea0'
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    },
    handleMouseEnter() {
      this.isPaused = true; // 暂停切换
    },
    // 新增方法：处理鼠标离开事件
    handleMouseLeave() {
      this.isPaused = false; // 继续切换
      if (this.switchTimer) this.switchDataGroup(); // 如果有定时器，立即执行一次切换
    },
    // 新增方法：绑定鼠标事件
    bindMouseEvents() {
      const container = this.$refs.loginTimes;
      container.addEventListener('mouseenter', this.handleMouseEnter);
      container.addEventListener('mouseleave', this.handleMouseLeave);
    },
    // 新增方法：解绑鼠标事件
    unbindMouseEvents() {
      const container = this.$refs.loginTimes;
      container.removeEventListener('mouseenter', this.handleMouseEnter);
      container.removeEventListener('mouseleave', this.handleMouseLeave);
    },
  }
}
</script>



<!-- [
        { value: '30', name: 'VIVO1' },
        { value: '29', name: 'OPPO2' },
        { value: '28', name: 'HONOR' },
        { value: '27', name: 'iPhone 12 pro max3' },
        { value: '26', name: 'iPhone 12 pro max4' },
        { value: '25', name: 'HUAWEI MATE 105' },
        { value: '24', name: 'ONEPLUS6' },
        { value: '23', name: 'Lenova T4707' },
        { value: '22', name: 'MacBook Air8 ' },
        { value: '21', name: 'SAMSUNG9' },
        { value: '20', name: 'iPad mini111' },
        { value: '16', name: 'BLACKBERRY222' },
        { value: '14', name: 'OPPO333' },
        { value: '13', name: 'SAMSUNG444' },
        { value: '12', name: '361555' },
        { value: '10', name: 'Lenova666' }
      ], -->
