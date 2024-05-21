<template>
  <div class="data-visual-container">
    <div class="title-container">
      <span>{{ contigDetail.srp +  ` contigs(${contigDetail.Name}) informations` }}</span>
    </div>
    
    <el-divider></el-divider>

    <div class="contig-description-container">
      <el-descriptions 
        :title="contigDetail['ID'] + ' detail'" 
        direction="vertical" 
        :column="5" 
        size="small" 
        border
      >
        <el-descriptions-item label="ID">
          {{ contigDetail['ID'] }}
        </el-descriptions-item>
        <el-descriptions-item label="Name">
          {{ contigDetail['Name'] }}
        </el-descriptions-item>
        <el-descriptions-item label="Length (bp)">
          {{ contigDetail['Length'] }}
        </el-descriptions-item>
        <el-descriptions-item label="GC (%)">
          {{ contigDetail['GC'] }}
        </el-descriptions-item>
        <el-descriptions-item label="Description">
          {{ contigDetail['Description'] }}
        </el-descriptions-item>
        <el-descriptions-item label="Sequence" :span="5">
          <div>
            <span 
              class="tcga-base-style" 
              v-for="(item, index) in contigDetail['Sequence']" 
              :key="index" 
              :style="{ color: setTCGAcolor(item) }"
            >
              {{ item }}
            </span>
          </div>
          <div class="copy-container">
            <i 
              class="el-icon-document-copy"
              v-clipboard:copy="contigDetail['Sequence']"
              v-clipboard:success="handleFirstCopySuccess"
              v-clipboard:error="handleFirstCopyError"
            >
            </i>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- <div class="protein-visual-container">
      <div id="mol-container" class="visual-container"></div>
    </div> -->

    
  </div>
</template>

<script>
import config from '@/config'
import axios from 'axios'
import * as $3Dmol from '3dmol'
import { tcgaColor } from '@/utils/tools'
import { showLoading, hideLoading } from '@/utils/loading'

export default {
  name: 'ContigDetail',

  data() {
    return {
      contigName: '',
      contigDetail: {},
    };
  },

  mounted() {
    this.init()
    // this.requestContigsInfo(this.srp, this.currentPage, this.pageSize)
  },

  methods: {
    init() {
      const param = this.$route.params['param']
      if(param) {
        this.contigDetail = param
        this.$store.dispatch('setContigDetailData', { ...param })
      } else {
        this.contigDetail = this.$store.state.contigDetailData
      }
      

    },

    requestContigsInfo(srp, currentPage, pageSize) {
      showLoading()
      const url = config.baseUrl + config.uri.contigListViewURI + '/' + srp + '/' + currentPage + '/' + pageSize
      axios.get(url, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.header = response.data.header
        this.tableData = response.data.data
        this.total = response.data.total
      }).finally(() => {
        hideLoading()
      })
    },

    // 蛋白质结构可视化
    proteinStructvisual(value) {
      dialog3DmolVisible.value = true
      const url = configs.uriConfigs.baseUrl + configs.uriConfigs.uri.datasetsPdbContentViewURI + 'SRP080056' + '/' + '16956'
      axios({
          method: 'get',
          url: url,
          headers: {
            'Content-Type': 'application/json;charset=utf-8' 
          }
      }).then((response) => {
          dialog3DmolVisible.value = true
          const viewer = $3Dmol.createViewer(document.getElementById('mol-container'))
          viewer.addModel(response.data.pdbContent, "pdb");
          viewer.addUnitCell();
          viewer.setStyle({}, {sphere : {}});
          viewer.zoomTo();
          viewer.center()
          viewer.render();
      })
    },

    setTCGAcolor(value) {
      return tcgaColor(value)
    },

    handleDetail(value) {
      this.contigDetailInfo = value
      this.contigDetailVisible = true
    },

    handleSizeChange(value) {
      this.pageSize = value
      this.currentPage = 1
      this.requestContigsInfo(this.srp, this.currentPage, this.pageSize)
    },

    handleCurrentChange(value) {
      this.currentPage = value
      this.requestContigsInfo(this.srp, this.currentPage, this.pageSize)
    },

    handleFirstCopySuccess() {
      this.$message({
        message: 'Copy successful',
        type: 'success'
      });
    },

    handleFirstCopyError() {
      this.$message({
        message: 'Copy successful',
        type: 'error'
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.data-visual-container {
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
  
  .title-container {
    font-size: 24px;
    font-weight: 700;
  }

  .contig-description-container {
    .tcga-base-style {
      display: inline-block;
      width: 10px;
    } 

    .copy-container {
      display: flex;
      justify-content: end;

      i {
        cursor: pointer;
      }

      i:hover {
        color: #2E54A1;
      }
    }
  }

  .protein-visual-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    .visual-container {
      width: 600px;
      height: 400px;
      background-color: #2E54A1;
    }
  }

  
}

</style>