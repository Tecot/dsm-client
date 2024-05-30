<template>
  <div class="data-visual-container">
    <div class="title-container">
      <span>{{ contigDetail.srp +  ` contigs (${contigDetail.Name}) informations` }}</span>
    </div>
    
    <el-divider></el-divider>

    <div class="contig-description-container">
      <ContigDescriptionView :contigDetail="contigDetail"></ContigDescriptionView>
    </div>
    
    <div class="arrow-vis-container">
      <MultiRowsArrowVis 
        ref="multi_rows_arrow_vis"
        :inputData="multiArrowData" 
        @viewProteinStructSignal="handleViewProteinStructSignal($event)"
        @viewVfAndResfinderSignal="handleViewVfAndResfinderSignal($event)"
      >
      </MultiRowsArrowVis>
    </div>

    <div class="gtdb-bac120-container">
      <GtdbtkBac120Information :srp="contigDetail.srp"></GtdbtkBac120Information>
    </div>

    <el-dialog :visible.sync="dialog3DmolVisible" width="50%">
      <div>
        <ProteinSeqDescription :proteinSeqInfo="proteinSeqInfo"></ProteinSeqDescription>
        <ProteinStructVis :structData="proteinStruckData"></ProteinStructVis>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogVfAndResfinderDataVisible" width="50%">
      <VfAndResfinderDescription :inputData="vfAndResfinderData"></VfAndResfinderDescription>
    </el-dialog>
    
  </div>
</template>

<script>
import config from '@/config'
import axios from 'axios'
import { showLoading, hideLoading } from '@/utils/loading'
import MultiRowsArrowVis from '@/components/visiualization/MultiRowsArrowVis.vue';
import GtdbtkBac120Information from '@/components/database/dataexpress/GtdbtkBac120Information.vue';
import ContigDescriptionView from '@/components/database/dataexpress/ContigDescriptionView.vue'
import ProteinSeqDescription from '@/components/database/dataexpress/ProteinSeqDescription.vue'
import ProteinStructVis from '@/components/visiualization/ProteinStructVis.vue'
import VfAndResfinderDescription from '@/components/database/dataexpress/VfAndResfinderDescription.vue';

export default {
  name: 'ContigsDataExpress',

  components: {
    ContigDescriptionView,
    MultiRowsArrowVis,
    GtdbtkBac120Information,
    ProteinSeqDescription,
    ProteinStructVis,
    VfAndResfinderDescription,
  },

  data() {
    return {
      contigName: '',
      contigDetail: {},
      multiArrowData: null,

      dialog3DmolVisible: false,
      proteinSeqInfo: {},
      proteinStruckData: '',

      dialogVfAndResfinderDataVisible: false,
      vfAndResfinderData: null,
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
      this.requestCdsVfResfinderData(this.contigDetail.srp, this.contigDetail.ID)
    },

    // 请求cds vf resfinder数据
    async requestCdsVfResfinderData(srp, contigID) {
      showLoading()
      const url = config.baseUrl + config.uri.cdsVfResfinderViewURI + '/' + srp + '/' + contigID
      axios.get(url, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.multiArrowData = response.data
      }).finally(() => {
        hideLoading()
      })
    },

    // 查看蛋白质信息
    async handleViewProteinStructSignal(signal) {
      const code = this.contigDetail.Name.split('_')[1]
      this.requestProteinSeqData(this.contigDetail.srp, code)
      // console.log(this.contigDetail)
      this.requestProteinStructData(this.contigDetail.srp, code)
      this.dialog3DmolVisible = signal
    },

    // 
    async handleViewVfAndResfinderSignal(value) {
      this.vfAndResfinderData = value
      this.dialogVfAndResfinderDataVisible = true
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
    margin-top: 10px;
  }
}
</style>