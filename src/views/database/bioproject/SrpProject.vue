<template>
  <div class="bio-project-container">
    <div class="geo-container">
      <div class="geo-vis" style="height: 800px;">
        <GeoVis :height="'800px'"></GeoVis>
      </div>
      <div class="options">
        <div class="title">
          Statistics of collected samples
        </div>
        <div class="gradient-vis">
          <GradientVis :width="'90%'" :height="'200px'" ></GradientVis>
        </div>
        <div class="position-bar-vis">
          <PositionBarVis :width="'90%'" :height="'250px'"></PositionBarVis>
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
import GeoVis from '@/components/visiualization/GeoVis.vue';
import GradientVis from '@/components/visiualization/GradientVis.vue';
import PositionBarVis from '@/components/visiualization/PositionBarVis.vue';
import SrpInformation from '@/components/database/bioproject/SrpInformation.vue'

export default {
  name: 'SrpProject',

  components: {
    GeoVis,
    GradientVis,
    PositionBarVis,
    SrpInformation
  },

  data() {
    return {
      
    }
  },

  mounted() {
    
  },

  methods: {
    
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
          height: 40px;
          text-align: center;
          line-height: 40px;
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