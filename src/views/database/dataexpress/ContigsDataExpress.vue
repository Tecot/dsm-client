<template>
  <div class="data-visual-container">
    <div class="decription-container">
      <div ref="descriptionContainer" class="decription-title-container" @click="ifShowDescription = !ifShowDescription">
        Description
      </div>
      <div class="decription-content-container" v-show="ifShowDescription">
        The Sample View section aims to depict the geographical distribution and environmental information of ocean samples currently available on the website. This section allows users to check each dataset and its metadata. Users either can select datasets directly from the sample list, or they can use the navigation panel on the right side. Users are able to use sample ID, Habitat source, Location, longitude and latitude as well as sampling depth to carry out the search. These selected datasets can be viewed on a global map to estimate their distribution.
      </div>
    </div>

    <div class="contig-description-container">
      <div class="title-container">
        {{ `${contigDetail.srp}: ${contigDetail.ID} contigs information` }}
      </div>
      <ContigDescriptionView :contigDetail="contigDetail"></ContigDescriptionView>
      <MultiRowsArrowVis 
        ref="multi_rows_arrow_vis"
        :svgAttr="{width: 1200}"
        :inputData="multiArrowData"
        @viewProteinStructSignal="handleViewProteinStructSignal($event)"
        @viewVfAndResfinderSignal="handleViewVfAndResfinderSignal($event)"
      >
      </MultiRowsArrowVis>
    </div>
    
    <!-- <div class="arrow-vis-container">
      <div class="title-container">
        Genes arrow plot
      </div>
      
    </div> -->

    <div class="gtdb-bac120-container">
      <div class="title-container">
        {{ contigDetail.srp + ' gtdbtk bac120 summary' }}
      </div>
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
      ifShowDescription: false,

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
  padding-left: 100px;
  padding-right: 100px;

  .decription-container {
    margin-top: 10px;
    box-shadow: 5px 5px 5px #ccc;
    .decription-title-container {
      height: 50px;
      line-height: 50px;
      color: #36A3F7;
      font-weight: bold;
      font-size: 18px;
      padding-left: 10px;
      border-radius: 5px 5px 5px 5px;
      background-color: #FFF;
      cursor: pointer;
    }
    .decription-content-container {
      padding: 10px 10px 10px 10px;
      background-color: #FFF;
      font-size: 14px;
      border-radius: 0 0 5px 5px;
      border-top: 1px solid #efeeee;
    }
  }

  .contig-description-container {
    margin-top: 10px;
    box-shadow: 5px 5px 5px #ccc;
    background-color: #FFF;
    border-radius: 5px 5px 5px 5px;
    padding-bottom: 20px;
    .title-container {
      font-size: 16px;
      font-weight: 700;
      height: 50px;
      line-height: 50px;
      padding-left: 10px;
      color: #36A3F7;
    }
    ::v-deep textarea {
      font-size: 12px;
      border: none;
    }
  }

  .arrow-vis-container {
    margin-top: 10px;
    box-shadow: 5px 5px 5px #ccc;
    background-color: #FFF;
    border-radius: 5px 5px 5px 5px;
    padding-bottom: 20px;
    .title-container {
      font-size: 16px;
      font-weight: 700;
      height: 50px;
      line-height: 50px;
      padding-left: 10px;
      color: #36A3F7;
    }
  }

  .gtdb-bac120-container {
    margin-top: 10px;
    box-shadow: 5px 5px 5px #ccc;
    background-color: #FFF;
    border-radius: 5px 5px 5px 5px;
    padding-bottom: 20px;
    .title-container {
      font-size: 16px;
      font-weight: 700;
      height: 50px;
      line-height: 50px;
      padding-left: 10px;
      color: #36A3F7;
    }
  }
}
</style>