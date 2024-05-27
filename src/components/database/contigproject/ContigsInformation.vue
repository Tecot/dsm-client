<template>
  <div class="table-container">
    <div class="title-container">
      <span>Contig List</span>
    </div>

    <el-divider></el-divider>

    <el-table
      :data="contigsInfo"
      :header-cell-style="{textAlign: 'center', backgroundColor: 'gray', color: 'white'}"
      :cell-style="{textAlign: 'center'}"
      size="small"
      height="600"
      style="width: 100%"
    >

      <el-table-column prop="Contigs name" label="Contigs name"></el-table-column>
      <el-table-column prop="Max length" label="Max length"></el-table-column>
      <el-table-column prop="Min length" label="Min length"></el-table-column>
      <el-table-column prop="Max GC content" label="Max GC content"></el-table-column>
      <el-table-column prop="Min GC content" label="Min GC content"></el-table-column>
      <el-table-column prop="Contig total" label="Contig total"></el-table-column>
      
      <el-table-column label="Option" width="100">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleView(scope.row)">
              View
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import { showLoading, hideLoading } from '@/utils/loading'

export default {
  name: 'ContigsInformation',

  data() {
    return {
      contigsInfo: null
    };
  },

  mounted() {
    this.requestContigProjectInfo()
  },

  methods: {
    requestContigProjectInfo() {
      showLoading()
      const url = config.baseUrl + config.uri.contigProjectViewURI
      return axios.get(url, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.contigsInfo = response.data.data
      }).finally(() => {
        hideLoading()
      })
    },

    handleView(value) {
      // TODO
      console.log(value)
      const facdeSRP = value['Contigs name'].split('_')[0]
      this.$router.push({
        name: 'datavisual',
        params: { 
          param: facdeSRP
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.table-container {
  .title-container {
    font-size: 18px;
    font-weight: 700;
  }
}
</style>