<template>
  <div class="bio-project-container">
    <div class="title-container">
      <span>{{ ifSearchedSrp? 'Searched bio project list' : 'Bio project list'}}</span>
    </div>

    <div class="search-container">
      <SrpSearch @outputSearchData="handleSearchData($event)" @outputResetSignal="handleResetSignal($event)"></SrpSearch>
    </div>

    <div class="srp-infomation" v-if="!ifSearchedSrp">
      <SrpInformation></SrpInformation>
    </div>

    <div class="srp-infomation" v-else>
      <SrpSearchedInformation :tableData="searchedSrptableData"></SrpSearchedInformation>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import { showLoading, hideLoading } from '@/utils/loading'
import SrpSearch from '@/components/database/bioproject/SrpSearch.vue'
import SrpInformation from '@/components/database/bioproject/SrpInformation.vue'
import SrpSearchedInformation from '@/components/database/bioproject/SrpSearchedInformation.vue'

export default {
  name: 'SrpProject',

  components: {
    SrpSearch,
    SrpInformation,
    SrpSearchedInformation 
  },

  data() {
    return {
      searchedSrptableData: [],
      ifSearchedSrp: false
    }
  },

  mounted() {
   
  },

  methods: {
    handleSearchData(value) {
      this.requestBioProjectInfo(value)
      this.ifSearchedSrp = true
    },

    handleResetSignal(value) {
      this.ifSearchedSrp = false
    },

    requestBioProjectInfo(searchData) {
      showLoading()
      const url = config.baseUrl + config.uri.srpSearchedProjectViewUIR
      axios.get(url, {
        params: {
          bioProjectText: searchData.bioProjectText,
          centerName: searchData.centerName,
          srastudyText: searchData.srastudyText,
          submission: searchData.submission,
          projectID: searchData.projectID,
          lowDepth: searchData.depthRange[0],
          highDepth: searchData.depthRange[1],
          includeUnknownDepth: searchData.includeUnknownDepth,
          includeUnknownll: searchData.includeUnknownll,
          s: searchData.snRange[0],
          n: searchData.snRange[1],
          w: searchData.weRange[0],
          e: searchData.weRange[1],
        },
        headers: {
          'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.searchedSrptableData = response.data.data
      }).finally(() => {
        hideLoading()
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.bio-project-container {
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
  
  .title-container {
    font-size: 24px;
    font-weight: 700;
  }
}
</style>