<template>
  <div class="download-container">
    <div class="title-container">
      <span>Download SRP project</span>
    </div>

    <el-divider></el-divider>
    
    <div class="table-container">
      <el-table
        :data="tableData"
        :header-cell-style="{textAlign: 'center', backgroundColor: 'gray', color: 'white'}"
        :cell-style="{textAlign: 'center'}"
        size="small"
        height="600"
        style="width: 100%"
      >
          <el-table-column
            v-for="(item, index) in header"
            :key="index"
            :prop="item"
            :label="item"
          >
          </el-table-column>
          
          <el-table-column label="Option" width="100">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleDownload(scope.row)">
                Download
              </el-button>
            </template>
          </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 50, 100]"
        :page-size="pageSize"
        layout="total, prev, pager, next, sizes, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import { showLoading, hideLoading } from '@/utils/loading'


export default {
  name: 'BioProject',

  data() {
    return {
      tableData: [],
      header: [],
      currentPage: 1,
      pageSize: 20,
      total: 0
    };
  },

  mounted() {
    this.requestDownloadListInfo(this.currentPage, this.pageSize)
  },

  methods: {
    requestDownloadListInfo(currentPage, pageSize) {
      showLoading()
      const url = config.baseUrl + config.uri.downloadListViewURI + '/' + currentPage + '/' + pageSize
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

    requestDownload(srp) {
      const url = config.baseUrl + config.uri.downloadURI + '/' + srp
      return axios({
        url: url,
        method: 'GET',
        responseType: 'blob'
      }).then((response) => {
        this.blobDownload(response)
      }).catch((e) => {
        this.$notify({
          title: 'Error',
          message: 'Download error',
          type: 'error'
        });
      })
    },

    blobDownload(blobObject) {
      const url = window.URL.createObjectURL(new Blob([blobObject.data]));
      const link = document.createElement('a');
      link.href = url;
      link.id = 'download_link'
      link.setAttribute('download', 'file.zip'); 
      document.body.appendChild(link);
      link.click();
      const elementToRemove = document.getElementById(link.id);
      const parentElement = elementToRemove.parentNode;
      parentElement.removeChild(elementToRemove);
    },

    handleSizeChange(value) {
      this.pageSize = value
      this.currentPage = 1
      this.requestDownloadListInfo(this.currentPage, this.pageSize)
    },

    handleCurrentChange(value) {
      this.currentPage = value
      this.requestDownloadListInfo(this.currentPage, this.pageSize)
    },

    handleDownload(value) {
      // TODO
      this.requestDownload('SRP080056')
    }
  },
};
</script>

<style lang="scss"scoped>
.download-container {
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
  
  .title-container {
    font-size: 24px;
    font-weight: 700;
  }

  .pagination-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}

</style>