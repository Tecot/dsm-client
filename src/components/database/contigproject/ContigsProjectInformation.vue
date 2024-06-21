<template>
  <div class="table-container">
    <el-table
      :data="tableData"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
      size="small"
      max-height="600"
      style="width: 100%"
    >

      <el-table-column prop="name" label="Name" width="200"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="description" label="Description" width="300"></el-table-column>
      <el-table-column prop="length" label="Length"></el-table-column>
      <el-table-column prop="gc" label="GC"></el-table-column>
      <el-table-column prop="stitle" label="Stitle"></el-table-column>
      <el-table-column prop="sseqid" label="Sseqid"></el-table-column>
      <el-table-column prop="genes" label="Genes"></el-table-column>
      <el-table-column prop="bin" label="Bin"></el-table-column>
      <el-table-column prop="classification" label="Classification"></el-table-column>
      
      <el-table-column label="Option" width="100">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleView(scope.row)">
              View
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[20, 50, 100]"
          :page-size="pageSize"
          layout="total, prev, pager, next, sizes, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import { showLoading, hideLoading } from '@/utils/loading'

export default {
  name: 'ContigsProjectInformation',

  props: {
    srp: {
      type: String,
      required: true,
      default() {
        return ''
      }
    }
  },

  data() {
    return {
      headerCellStyle: {
        textAlign: 'center', 
        backgroundColor: '#E9ECEF', 
        color: '#44546A'
      },
      cellStyle: {
        textAlign: 'center'
      },
      displayOriginalTable: true,
      tableData: [],
      header: [],
      currentPage: 1,
      pageSize: 20,
      total: 0
    };
  },

  mounted() {
    
  },

  watch: {
    srp(newValue, oldValue) {
      if(newValue) {
        this.pageSize = 20
        this.currentPage = 1
        this.requestContigProjectInfo(newValue, this.currentPage, this.pageSize)
      }
    }
  },

  methods: {
    format(str) {
      return str? str : '-'
    },

    async requestContigProjectInfo(srp, currentPage, pageSize) {
      showLoading()
      const url = config.baseUrl + config.uri.contigProjectViewURI + '/' + srp + '/' + currentPage + '/' + pageSize
      return axios.get(url, {
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

    handleSizeChange(value) {
      this.pageSize = value
      this.currentPage = 1
      this.requestContigProjectInfo(this.srp, this.currentPage, this.pageSize)
    },

    handleCurrentChange(value) {
      this.currentPage = value
      this.requestContigProjectInfo(this.srp, this.currentPage, this.pageSize)
    },

    handleView(value) {
      // TODO
      // const facdeSRP = value.name.split('_')[0]
      this.$router.push({
        name: 'contigsdataexpress',
        params: { 
          param: {
            Name: value.name,
            ID: value.id,
            Description: value.description,
            GC: value.gc,
            Length: value.length,
            Sequence: value.sequence,
            // srp: this.srp
            srp: 'SRP121432'
          }
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.table-container {
  margin-top: 20px;
  .pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>