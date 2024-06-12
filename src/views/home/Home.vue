<template>
  <div class="home-container">
    <div class="left-container">
      <div class="left-title-container">
        Directly start
      </div>
      <div 
        class="left-directly-link"
        v-for="(item, index) in linkItems" 
        :key="index" 
        @click="goToLink(item.link)"
      >
        {{ item.name }}
      </div>
    </div>

    <div class="right-container">
      <!-- <div class="right-project-descripion">
        <div class="right-title-container">
          DeepSeaMicro
        </div>
        <div class="right-description">
          {{ description }}
          </div>
      </div> -->
      
      <div class="right-geo-container">
        <div class="geo-title">
          Regional distribution of deep-sea microorganisms
        </div>
        <GeoStatisticsVue></GeoStatisticsVue>
      </div>
    </div>
  </div>
</template>

<script>
import GeoStatisticsVue from '@/components/home/GeoStatistics.vue'

export default {
  name: 'Home',

  components: {
    GeoStatisticsVue
  },

  data() {
    return {
      linkItems: [
        {
          name: 'Tutorial',
          link: 'tutorial'
        },
        {
          name: 'Analysis',
          link: 'analysis'
        },
        {
          name:'Database',
          link: 'overview'
        },
        {
          name:'Download',
          link: 'download'
        }
      ],
      description: "Deep-sea microbes are a diverse and fascinating group of organisms that inhabit the extreme environments of the world's oceans. These tiny life forms play crucial roles in the functioning of marine ecosystems, from nutrient cycling to energy flow. The deep sea is characterized by its vastness, darkness, high pressure, and cold temperatures. Despite these harsh conditions, it is home to a staggering array of microbial communities, including bacteria, archaea, viruses, and single-celled eukaryotes. These organisms have adapted to survive in one of the most inhospitable environments on Earth.' One of the key adaptations of deep-sea microbes is their ability to metabolize chemosynthetically, meaning they can obtain energy by oxidizing inorganic compounds such as hydrogen sulfide or methane. This allows them to thrive in areas devoid of sunlight, where photosynthesis is not possible."
    };
  },

  mounted() {
    
  },

  methods: {
    goToLink(value) {
      this.$router.push({
        name: value
      })
    }
  }
}
</script>

<style lang="scss">
::v-deep .el-input {
  border: none;
}

.home-container {
  display: flex;
  padding: 0;

  .left-container {
    width: 300px;
    height: 1000px;

    .left-title-container {
      text-align: center;
      margin-top: 20px;
      font-size: 24px;
      font-weight: 700;
    }

    .left-directly-link {
      height: 40px;
      width: 200px;
      margin-left: 25px;
      text-align: center;
      line-height: 40px;
      color: #FFFFFF;
      font-size: 14px;
      font-weight: 700;
      margin-top: 20px;
      border-radius: 20px;
      background-color: #2E54A1;
      cursor: pointer;
    }

    .left-directly-link:hover {
      background-color: #FFD04B;
    }
  }
  
  .right-container {
    height: 1000px;
    width: 100%;
    background-color: #F7F8F9;
    padding-left: 20px;
    padding-right: 10px;

    .right-project-descripion {
      .right-title-container {
        height: 40px;
        margin-top: 20px;
        font-size: 24px;
        font-weight: 700;
      }

      .right-description {
        color: #000;
        font-size: 18px;
        border-radius: 10px 10px 10px 10px;
        background-color: #FFF;
        padding: 10px 10px 10px 10px;
      }
    }

    .right-geo-container {
      margin-top: 20px;
      .geo-title {
        font-size: 24px;
        background-color: #15223d;
        color: #FFF;
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
    }
    
  }
}
</style>