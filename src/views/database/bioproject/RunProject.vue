<template>
  <div class="srp-detail-container">
    <div class="srp-description-container">
      <SrpDescription :srpData="srpInfo"></SrpDescription>
    </div>

    <div class="run-info-container">
      <RunInformation :runData="runInfo" @output-value="viewDetail($event)"></RunInformation>
    </div>
    <!-- dialog -->
    <el-dialog :visible.sync="runDetailVisible">
      <RunInfoDescription :runDetailData="runDetailData"></RunInfoDescription>
    </el-dialog>

    <div class="geneome-information-container">
      <ContigsInformation :srp="srpInfo['SRAStudy']"></ContigsInformation>
    </div>
  </div>
</template>

<script>
import config from '@/config'
import axios from 'axios';
import { showLoading, hideLoading } from '@/utils/loading'
import SrpDescription from '@/components/bioproject/SrpDescription.vue'
import RunInformation from '@/components/bioproject/RunInformation.vue'
import RunInfoDescription from '@/components/bioproject/RunInfoDescription.vue'
import ContigsInformation from '@/components/bioproject/ContigsInformation.vue';

export default {
  name: 'RunProject',

  data() {
    return {
      srp: '',
      srpInfo: {},
      runInfo: {},
      runDetailData: {},
      runDetailVisible: false,
      runHeader: [
        'Run', 
        'LibraryStrategy', 
        'LibrarySelection', 
        'LibrarySource', 
        'LibraryLayout', 
        'Platform', 
        'BioSample', 
        'geographic location',
        'latitude and longitude', 
        'depth',
        'collection date'
      ]
    };
  },

  components: {
    SrpDescription,
    RunInformation,
    RunInfoDescription,
    ContigsInformation
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const param = this.$route.params['param']
      const databaseRunProjectData = this.$store.state.databaseRunProjectData
      if(param['SRAStudy']) {
        if(databaseRunProjectData) {
          if(databaseRunProjectData.srpInfo['SRAStudy'] == param['SRAStudy']) {
            this.srpInfo = databaseRunProjectData.srpInfo
            this.runInfo = databaseRunProjectData.runInfo
          } else {
            this.srpInfo = param
            this.requestRunProjectInfo(this.srpInfo['SRAStudy'])
          }
        } else {
          this.srpInfo = param
          this.requestRunProjectInfo(this.srpInfo['SRAStudy'])
        }
        
      } else {
        this.srpInfo = databaseRunProjectData.srpInfo
        this.runInfo = databaseRunProjectData.runInfo
      }
    },

    requestRunProjectInfo(srp) {
      showLoading()
      const url = config.baseUrl + config.uri.runProjectViewURI + '/' + srp
      axios.get(url, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.runInfo = response.data
        this.$store.dispatch('setDatabaseRunProjectData', {
          'srpInfo': this.srpInfo, 
          'runInfo': this.runInfo
        })
      }).finally(() => {
        hideLoading()
      })
    },

    viewDetail(value) {
      this.runDetailData = value
      this.runDetailVisible = true
    }
  },
};
</script>

<style lang="scss" scoped>
.srp-detail-container {
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;

  .title {
    height: 56px;
    line-height: 56px;
    font-size: 16px;
    font-weight: 700;
  }
}

</style>