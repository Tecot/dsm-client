<template>
  <div class="bio-project-container">
    <div class="geo-container">
      <div class="geo-vis">
        <GeoVis :geoData="geoData" :height="'800px'"></GeoVis>
      </div>
      <div class="options">
        <div class="title">
          Statistics of collected samples
        </div>
        <div class="gradient-vis">
          <!-- <GradientVis :funnelData="gradientData" :width="'90%'" :height="'200px'" ></GradientVis> -->
          <GradientPieVis :pieData="gradientData" :width="'90%'" :height="'260px'"></GradientPieVis>
        </div>
        <div class="position-bar-vis">
          <PositionBarVis :barData="positionBarData" :width="'95%'" :height="'300px'"></PositionBarVis>
        </div>
        <div class="geo-search">
          <div class="title">
            Geo search options
          </div>
        </div>
      </div>
      
    </div>
    <div class="srp-infomation">
      <!-- <SrpInformation></SrpInformation> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import { showLoading, hideLoading } from '@/utils/loading'
import GeoVis from '@/components/visiualization/GeoVis.vue';
import GradientVis from '@/components/visiualization/GradientVis.vue';
import GradientPieVis from '@/components/visiualization/GradientPieVis.vue'
import PositionBarVis from '@/components/visiualization/PositionBarVis.vue';
import SrpInformation from '@/components/database/bioproject/SrpInformation.vue'

export default {
  name: 'SrpProject',

  components: {
    GeoVis,
    GradientVis,
    GradientPieVis,
    PositionBarVis,
    SrpInformation
  },

  data() {
    return {
      geoData: [],
      gradientData: [],
      positionBarData: {}
    }
  },

  mounted() {
    const geoDataInfoStore = this.$store.state.geoInfoData
    if(geoDataInfoStore) {
      this.geoData = geoDataInfoStore.geoData
      this.gradientData = geoDataInfoStore.gradientData
      this.positionBarData = geoDataInfoStore.positionBarData
    } else {
      this.requestGeoData()
    }
  },

  methods: {
    async requestGeoData() {
      showLoading()
      const url = config.baseUrl + config.uri.geoDataViewURI
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.geoData = response.data.data
        this.gradientData = this.processGradientData(this.geoData)
        this.positionBarData = this.processPositionBarData(this.geoData)
        this.$store.dispatch('setGeoInfoData', {
          geoData: this.geoData,
          gradientData: this.gradientData,
          positionBarData: this.positionBarData
        })
      }).finally(() => {
        hideLoading()
      })
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
      return {
        x: gls,
        y: values
      }
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
      // Object.keys(meta).forEach(key => {
      //   data.data.push(meta[key])
      //   if(meta[key].value > data.maxValue) {
      //     data.maxValue = meta[key].value
      //   }
      // })
      const result = []
      Object.keys(meta).forEach(key => {
        result.push(meta[key])
      })

      return result
    }
  },
};
</script>

<style lang="scss"scoped>
.bio-project-container {
  .geo-container {
      position: relative;
      .options {
        position: absolute;
        width: 500px;
        height: 800px;
        top: 0;
        right: 0;
        background-color: #3b4157;
        opacity: 0.9;
        
        .title {
          height: 30px;
          text-align: center;
          line-height: 30px;
          font-size: 24px;
          color: #FFF;
          font-weight: 700;
        }
        .gradient-vis, .position-bar-vis {
          display: flex;
          justify-content: center;
        }
      }
  }


}
</style>