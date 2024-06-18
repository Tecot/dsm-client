<template>
  <div class="home-container">
    <GeoStatisticsVue></GeoStatisticsVue>
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