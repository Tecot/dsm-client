<template>
  <div class="data-visual-container">
    <div class="title-container">
      <span>{{ contigDetail.srp +  ` contigs(${contigDetail.Name}) informations` }}</span>
    </div>
    
    <el-divider></el-divider>

    <div class="contig-description-container">
      <ContigDescriptionView :contigDetail="contigDetail"></ContigDescriptionView>
    </div>
    
    <div class="arrow-vis-container">
      <ArrowVis :inputData="contigGBKdata" :svgAttr="{width: 800, height: 160}" @signal="handleSignal($event)"></ArrowVis>
      <!-- <MultiRowsArrowVis :inputData="" @signal="handleSignal($event)"></MultiRowsArrowVis> -->
    </div>

    <el-dialog :visible.sync="dialog3DmolVisible" width="50%">
      <div>
        <ProteinSeqDescription :proteinSeqInfo="proteinSeqInfo"></ProteinSeqDescription>
        <ProteinStructVis :structData="proteinStruckData"></ProteinStructVis>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>
import config from '@/config'
import axios from 'axios'
import { showLoading, hideLoading } from '@/utils/loading'
import ArrowVis from '@/components/visiualization/ArrowVis.vue'
import MultiRowsArrowVis from '@/components/visiualization/MultiRowsArrowVis.vue';
import ContigDescriptionView from '@/components/database/dataexpress/ContigDescriptionView.vue'
import ProteinSeqDescription from '@/components/database/dataexpress/ProteinSeqDescription.vue'
import ProteinStructVis from '@/components/visiualization/ProteinStructVis.vue'

export default {
  name: 'ContigsDataExpress',

  components: {
    ContigDescriptionView,
    ArrowVis,
    MultiRowsArrowVis,
    ProteinSeqDescription,
    ProteinStructVis
  },

  data() {
    return {
      contigName: '',
      contigDetail: {},
      contigGBKdata: null,

      dialog3DmolVisible: false,
      proteinSeqInfo: {},
      proteinStruckData: '',
    };
  },

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      const param = this.$route.params['param']
      if(param) {
        this.contigDetail = param
        this.$store.dispatch('setContigDetailData', { ...param })
      } else {
        this.contigDetail = this.$store.state.contigDetailData
      }
      this.requestContigGbkInfo(this.contigDetail.srp, this.contigDetail.ID)
    },

    // 请求GBK文件数据
    async requestContigGbkInfo(srp, contigID) {
      showLoading()
      const url = config.baseUrl + config.uri.geneomeContigGbkViewURI + '/' + srp + '/' + contigID
      axios.get(url, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.contigGBKdata = response.data
      }).finally(() => {
        hideLoading()
      })
    },

    // 查看蛋白质信息
    async handleSignal(signal) {
      const code = this.contigDetail.Name.split('_')[1]
      this.requestProteinSeqData(this.contigDetail.srp, code)
      // console.log(this.contigDetail)
      this.requestProteinStructData(this.contigDetail.srp, code)
      this.dialog3DmolVisible = signal
    },

    async requestProteinStructData(srp, code) {
      // SRP121432_17256
      // const url = config.baseUrl + config.uri.proteinPdbViewURI + '/' + srp + '/' + code
      const url = config.baseUrl + config.uri.proteinPdbViewURI + '/' + 'SRP121432' + '/' + '17256'
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => { 
        this.proteinStruckData = response.data.data
      })
    },

    async requestProteinSeqData(srp, code) {
      // SRP121432_17256
      // const url = config.baseUrl + config.uri.proteinPdbViewURI + '/' + srp + '/' + code
      const url = config.baseUrl + config.uri.proteinOneSeqViewURI + '/' + 'SRP121432' + '/' + '17256'
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.proteinSeqInfo = response.data.data
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.data-visual-container {
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
  
  .title-container {
    font-size: 18px;
    font-weight: 700;
  }

  ::v-deep textarea {
    font-size: 12px;
    border: none;
  }

  .arrow-vis-container {
    display: flex;
    justify-content: center;
  }
}

</style>