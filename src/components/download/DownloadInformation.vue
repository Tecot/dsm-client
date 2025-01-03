<template>
  <div class="download-container">
    <div class="title-container">
      <span>Download SRP project</span>
    </div>
    
    <div class="table-container">
      <el-table
        :data="tableData"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        size="small"
        max-height="600"
        style="width: 100%"
      >
        <el-table-column prop="BioProject" label="Bio project" width="200"></el-table-column>
        <el-table-column prop="SRAStudy" label="SRAStudy" width="200"></el-table-column>
        <el-table-column prop="ProjectID" label="Project ID" width="200"></el-table-column>
        <el-table-column prop="Submission" label="Submission" width="200"></el-table-column>
        <el-table-column prop="Depth range" label="Depth range" width="200"></el-table-column>
        <el-table-column prop="Longitude and latitude range" label="Longitude and latitude range"  width="350"></el-table-column>
        <el-table-column prop="CenterName" label="Center name" width="500"></el-table-column>
        <el-table-column prop="genes" label="Genes" width="200">
            <template slot-scope="scope">
              {{ scope.row['genes']? scope.row['genes'].split(';').slice(0, 3).join(';') + '......' : '' }}
            </template>
        </el-table-column>
        <el-table-column prop="vfs" label="VFs" width="400">
          <template slot-scope="scope">
              {{ scope.row['vfs']? scope.row['vfs'].split(';').slice(0, 3).join(';') + '......' : '' }}
            </template>
        </el-table-column>
          <el-table-column prop="args" label="ARGs" width="600"></el-table-column> 
        <el-table-column prop="taxonome" label="Taxonome" width="600"></el-table-column>
        <el-table-column prop="product" label="Product" width="600"></el-table-column>
            
        <el-table-column label="Option" width="100" fixed="right">
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
      headerCellStyle: {
        textAlign: 'center', 
        backgroundColor: '#E9ECEF', 
        color: '#44546A'
      },
      cellStyle: {
        textAlign: 'center'
      },
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
    async requestDownloadListInfo(currentPage, pageSize) {
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

    async requestDownload(srp) {
      const url = config.baseUrl + config.uri.downloadURI + '/' + srp
      showLoading()
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
      }).finally(() => {
        hideLoading()
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
padding-left: 40px;
padding-right: 40px;

.title-container {
  line-height: 60px;
  height: 60px;
  font-size: 18px;
  font-weight: 700;
  color: #36A3F7;
  border-radius: 5px 5px 0 0;
  background-color: #FFF;
  padding-left: 10px;
}


.pagination-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #FFF;
}
}
</style>