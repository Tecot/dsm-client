<template>
  <div class="bio-project-container">
    <div class="srp-infomation">
      <SrpInformation></SrpInformation>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import { showLoading, hideLoading } from '@/utils/loading'
import SrpInformation from '@/components/database/bioproject/SrpInformation.vue'

export default {
  name: 'SrpProject',

  components: {
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

<style lang="scss" scoped>
</style>