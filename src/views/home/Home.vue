<template>
  <div class="home-container">
    <div class="left">
      <NavAside></NavAside>
    </div>
    <div class="right">
      <div class="description-container">
        <div class="title">
          DeepSeaMicro
        </div>
        <el-divider></el-divider>
        <div class="description">
          Welcome to PhageScope! PhageScope is an online bacteriophage database that offers comprehensive annotations, including completeness assessment, phenotype annotation, taxonomic annotation, structural annotation, functional annotation, and genome comparison.
          PhageScope incorporates automatic analysis and interactive visualization for both curated and customized data.
          Welcome to PhageScope! PhageScope is an online bacteriophage database that offers comprehensive annotations, including completeness assessment, phenotype annotation, taxonomic annotation, structural annotation, functional annotation, and genome comparison.
          PhageScope incorporates automatic analysis and interactive visualization for both curated and customized data.
        </div>
      </div>

      <div class="second-title">
        Map display samples
      </div>
      <div class="geo-vis-container">
        <GeoWithSearch :geoData="geoData"></GeoWithSearch>
      </div>

      
      <div class="statistics-plots-container">
        <div class="statistics-plot">
          <div class="plot-title">
            Number of projects in depth range
          </div>
          <GradientPieVis :pieData="gradientData" :width="'700px'" :height="'400px'"></GradientPieVis>
        </div>
        <div class="statistics-plot">
          <div class="plot-title">
            Number of projects in each region
          </div>
          <PositionBarVis :barData="positionBarData" :width="'700px'" :height="'350px'"></PositionBarVis>
        </div>
      </div>

      
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

export default {
  name: 'Home',

  components: {
    NavAside,
    GradientPieVis,
    PositionBarVis,
    GeoWithSearch,
  },

  data() {
    return {
      geoData: [],
      gradientData: [],
      positionBarData: {},
      description: "Deep-sea microbes are a diverse and fascinating group of organisms that inhabit the extreme environments of the world's oceans. These tiny life forms play crucial roles in the functioning of marine ecosystems, from nutrient cycling to energy flow. The deep sea is characterized by its vastness, darkness, high pressure, and cold temperatures. Despite these harsh conditions, it is home to a staggering array of microbial communities, including bacteria, archaea, viruses, and single-celled eukaryotes. These organisms have adapted to survive in one of the most inhospitable environments on Earth.' One of the key adaptations of deep-sea microbes is their ability to metabolize chemosynthetically, meaning they can obtain energy by oxidizing inorganic compounds such as hydrogen sulfide or methane. This allows them to thrive in areas devoid of sunlight, where photosynthesis is not possible."
    };
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
      await axios.get(url, {
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
  display: flex;
  .left {
    background-color: #FFF;
  }
  .right {
    width: 100%;
    margin-left: 10px;
    background-color: #FFF;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 40px;
    .description-container {
      .title {
        font-size: 38px;
        font-weight: bold;
        color: #3E5294;
      }
      .description {
        font-size: 18px;
        color: #44546A;
      }
    }
    .second-title {
      height: 60px;
      line-height: 60px;
      font-size: 24px;
      font-weight: bold;
      color: #44546A;
    }
    .statistics-plots-container {
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
      .statistics-plot {
        box-shadow: 5px 0px 5px #ccc, -5px 0px 5px #ccc, 0px 5px 5px #ccc;
        .plot-title {
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 20px;
          background-color: #3E5294;
          color: #FFF;
        }
      }
    }
    .geo-vis-container {
      margin-bottom: 20px;
      box-shadow: 5px 0px 5px #ccc, -5px 0px 5px #ccc, 0px 5px 5px #ccc;
    }
  }
}
</style>