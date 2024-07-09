<template>
  <div class="home-container">
    <div class="up">
      <div class="left">
        <div class="statistics">

        </div>
      </div>
      <div class="right">
        <GeoWithSearch :geoData="geoData"></GeoWithSearch>
      </div>
    </div>
    <div class="down">
      <GradientPieVis :pieData="gradientData" :height="'330px'" :width="'360px'"></GradientPieVis>
      <PositionBarVis :barData="positionBarData" :height="'330px'" :width="'360px'"></PositionBarVis>
      <WordCloudVis></WordCloudVis>
      <WordCloudVis></WordCloudVis>
      <WordCloudVis></WordCloudVis>
      <!-- <WordCloudVis></WordCloudVis> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import { showLoading, hideLoading } from '@/utils/loading'
import NavAside from '@/components/home/NavAside.vue'
import GradientPieVis from '@/components/visiualization/GradientPieVis.vue'
import PositionBarVis from '@/components/visiualization/PositionBarVis.vue'
import GeoWithSearch from '@/components/home/GeoWithSearch.vue'
import WordCloudVis from '@/components/visiualization/WordCloudVis.vue'

export default {
  name: 'Home',

  components: {
    NavAside,
    GradientPieVis,
    PositionBarVis,
    GeoWithSearch,
    WordCloudVis
  },

  data() {
    return {
      geoData: [],
      gradientData: [],
      positionBarData: {},
			vfsWordCloudData: [],
			argsWordCloudData: [],
			productWordCloudData: []
    };
  },

  mounted() {
    const geoDataInfoStore = this.$store.state.geoInfoData
    if(geoDataInfoStore) {
      this.geoData = geoDataInfoStore.geoData
      this.gradientData = geoDataInfoStore.gradientData
      this.positionBarData = geoDataInfoStore.positionBarData
			this.vfsWordCloudData = geoDataInfoStore.vfsWordCloudData
			this.argsWordCloudData = geoDataInfoStore.argsWordCloudData
			this.productWordCloudData = geoDataInfoStore.productWordCloudData
    } else {
      this.requestGeoData()
    }
  },

  methods: {
    async requestGeoData() {
      showLoading()
      const url = config.baseUrl + config.uri.geoDataViewURI
      await axios.get(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.geoData = response.data.data
        this.gradientData = this.processGradientData(this.geoData)
        this.positionBarData = this.processPositionBarData(this.geoData)
				this.vfsWordCloudData = this.processVFsData(this.geoData)
				this.argsWordCloudData = this.processArgsData(this.geoData)
				this.productWordCloudData = this.processProductData(this.geoData)
        this.$store.dispatch('setGeoInfoData', {
          geoData: this.geoData,
          gradientData: this.gradientData,
          positionBarData: this.positionBarData,
					vfsWordCloudData: this.vfsWordCloudData,
					argsWordCloudData: this.argsWordCloudData,
					productWordCloudData: this.productWordCloudData
        })
      }).finally(() => {
        hideLoading()
      })
    },

    processProductData(objData=[]) {
      let arr = []
      objData.forEach(item => {
        if(item.info.product) {
			const productArr = item.info.product.split(';')
			arr = [...arr, ...productArr]
        }
      })
      const products = Array.from(new Set(arr))
      return products
    },

    processArgsData(objData=[]) {
      let arr = []
      objData.forEach(item => {
        if(item.info.args) {
          const argsArr = item.info.args.split(';')
          arr = [...arr, ...argsArr]
        }
      })
      const args = Array.from(new Set(arr))
      return args
    },

    processVFsData(objData=[]) {
      let arr = []
      objData.forEach(item => {
        if(item.info.vfs) {
          const vfArr = item.info.vfs.split(';')
          arr = [...arr, ...vfArr]
        }
      })
      const vfs = Array.from(new Set(arr))
      return vfs
    },

    processPositionBarData(objData = []) {
      const gls = Array.from(new Set(objData.map((item) => {
        if(item['geographic location'].includes(':')) {
          return item['geographic location'].split(':')[0]
        }
        return item['geographic location']
      })))
      const values = gls.map((item, index) => 0)
      objData.forEach((item) => {
        values[gls.indexOf(item['geographic location'].includes(':')? item['geographic location'].split(':')[0] : item['geographic location'])]++
      })
      const arr = {
        x: gls,
        y: values
      }
      const combined = arr.x.map((value, index) => [value, arr.y[index]])
      combined.sort((a, b) => b[1] - a[1])
      arr.x = combined.map(item => item[0])
      arr.y = combined.map(item => item[1])
      return arr
    },

    processGradientData(objData = []) {
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
      const data = {
        maxValue: 0,
        data: [],
      }
      objData.forEach((item) => {
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
      const result = []
      Object.keys(meta).forEach(key => {
        result.push(meta[key])
      })
      return result
    },

    goToLink(value) {
      this.$router.push({
        name: value
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  .up {
    display: flex;
    background-color: #2C3964;
    .left {
      width: 360px;
      padding: 10px 10px 0 10px;
      .statistics {
        background-color: #3a4569;
        opacity: 0.8;
        height: 100%;
        border-radius: 10px 10px 10px 10px;
      }
    }
    .right {
      width: 100%;
    }
  }
  .down {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #2C3964;
  }
}
</style>