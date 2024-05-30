<template>
  <div class="srp-information-container">
    <div class="title-container">
      <span>Bio Project List</span>
    </div>

    <el-divider></el-divider>

    <div class="search-container">
      <el-button 
        size="mini" 
        type="danger" 
        style="width: 200px;"
        @click="openSearchConditionsDialog"
      >
        Search
      </el-button>
      <el-button 
        size="mini" 
        type="primary"
        @click="reset"
      >
        Reset
      </el-button>
    </div>
    
    <div class="table-container" v-if="displayOriginalTable">
      <el-table
        :data="tableData"
        :header-cell-style="{textAlign: 'center', backgroundColor: 'gray', color: 'white'}"
        :cell-style="{textAlign: 'center'}"
        size="small"
        height="400"
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
              <el-button type="primary" size="mini" @click="handleDetail(scope.row)">
                Detail
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

    <!-- Search dialog -->
    <el-dialog :visible.sync="searchConditionsVisible" width="30%">
      <SrpSearchConditions></SrpSearchConditions>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import config from '@/config'
import { showLoading, hideLoading } from '@/utils/loading'
import SrpSearchConditions from './SrpSearchConditions.vue'


export default {
  name: 'SrpInformation',

  components: {
    SrpSearchConditions
  },

  data() {
    return {
      searchConditionsVisible: false,

      displayOriginalTable: true,
      tableData: [],
      header: [],
      currentPage: 1,
      pageSize: 20,
      total: 0
    };
  },

  mounted() {
    this.requestBioProjectInfo(this.currentPage, this.pageSize)
  },

  methods: {

    openSearchConditionsDialog() {
      this.searchConditionsVisible = true
    },

    reset() {
      this.currentPage = 1
      this.pageSize = 20
      this.requestBioProjectInfo(this.currentPage, this.pageSize)
      this.displayOriginalTable = true
    },

    requestBioProjectInfo(currentPage, pageSize) {
      showLoading()
      const url = config.baseUrl + config.uri.srpProjectViewURI + '/' + currentPage + '/' + pageSize
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
      this.requestBioProjectInfo(this.currentPage, this.pageSize)
    },

    handleCurrentChange(value) {
      this.currentPage = value
      this.requestBioProjectInfo(this.currentPage, this.pageSize)
    },

    handleDetail(value) {
      console.log('-----')
      console.log(value)
      this.$router.push({ 
        name: 'runproject', 
        params: { 
          param: value
        }
      })
    }
  },
};
</script>

<style lang="scss"scoped>
.srp-information-container {
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;

  .search-container {
    display: flex;
    justify-content: right;
  }
  
  .title-container {
    font-size: 24px;
    font-weight: 700;
  }

  .table-container {
    margin-top: 20px;
    .pagination-container {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }

  
}

</style>