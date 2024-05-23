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
    
    <div class="arrow-vis-container">
      <ArrowVis :inputData="contigGBKdata"></ArrowVis>
    </div>
    
  </div>
</template>

<script>
import config from '@/config'
import axios from 'axios'
import { tcgaColor } from '@/utils/tools'
import { showLoading, hideLoading } from '@/utils/loading'
import ArrowVis from '@/components/visiualization/ArrowVis.vue'

export default {
  name: 'GeneomeContigDetail',

  components: {
    ArrowVis
  },

  data() {
    return {
      contigName: '',
      contigDetail: {},
      contigGBKdata: null
    };
  },

  mounted() {
    this.init()
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
      this.requestContigGbkInfo(this.contigDetail.srp, this.contigDetail.ID)
    },

    requestContigGbkInfo(srp, contigID) {
      showLoading()
      const url = config.baseUrl + config.uri.geneomeContigGbkViewURI + '/' + srp + '/' + 'k141_79351'
      axios.get(url, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        console.log(response.data)
        this.contigGBKdata = response.data
      }).finally(() => {
        hideLoading()
      })
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

    

    setTCGAcolor(value) {
      return tcgaColor(value)
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

  .arrow-vis-container {
    display: flex;
    justify-content: center;
  }
}

</style>