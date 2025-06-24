<template>
    <div class="table-container">
      <div class="search-container">
        <div class="title-container">
          {{ ifSearchedContigList? 'Searched contig list' : 'Contig list' }}
        </div>
        <div class="search-conditions-container">
          <ContigSearchedInformation
            @outputSearchData="handleSearchData($event)"
            @outputResetSignal="handleResetSignal($event)"
          >
          </ContigSearchedInformation>
        </div>
      </div>
      <el-table
        :data="tableData"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        size="small"
        height="300"
        style="width: 100%"
      >
        <el-table-column prop="Name" label="Name"></el-table-column>
        <el-table-column prop="ID" label="ID"></el-table-column>
        <el-table-column prop="Description" label="Description"></el-table-column>
        <el-table-column prop="Length" label="Length (bp)"></el-table-column>
        <el-table-column prop="GC" label="GC (%)"></el-table-column>
        <el-table-column label="Sequence">
          <template slot-scope="scope">
            {{ scope.row['Sequence'].slice(0, 10) + ' ...' }}
          </template>
        </el-table-column>

        <el-table-column label="Option" width="100" fixed="right">
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
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import config from '@/config'
import axios from 'axios';
import { showLoading, hideLoading } from '@/utils/loading'
import ContigSearchedInformation from './ContigSearchedInformation.vue';

export default {
  name: 'ContigsInformation',

  components: {
    ContigSearchedInformation
  },

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

      ifSearchedContigList: false,

      tableData: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
    };
  },

  watch: {
    srp(newValue, oldValue) {
      if(newValue) {
        // TODO
        // this.requestGeneomeSeqInfo(this.srp, this.currentPage, this.pageSize)
        this.requestContigsInformation(this.srp, this.currentPage, this.pageSize)
      }
    }
  },

  mounted() { },

  methods: {
    handleSearchData(value) {
      this.currentPage = 1
      this.pageSize = 20
      this.ifSearchedContigList = true
      this.searchData = { 
        ...value, 
        srp: this.srp,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.requestContigsSearchedInformation(this.searchData)
    },

    handleResetSignal(value) {
      if(this.ifSearchedContigList) {
        this.currentPage = 1
        this.pageSize = 20
        this.ifSearchedContigList = false
        this.requestContigsInformation(this.srp, this.currentPage, this.pageSize)
      }
    },

    requestContigsSearchedInformation(searchConditions) {
      showLoading()
      const url = config.baseUrl + config.uri.contigsSearchedInformationViewURI
      axios.get(url, {
        headers: {
        'Content-Type': 'application/json; charset=utf-8' 
        },
        params: {
          ...searchConditions
        }
      }).then((response) => {
        this.tableData = response.data.data
        this.total = response.data.total
      }).finally(() => {
        hideLoading()
      })
    },


    requestContigsInformation(srp, currentPage, pageSize) {
      showLoading()
      const url = config.baseUrl + config.uri.contigsInformationViewURI + '/' + srp + '/' + currentPage + '/' + pageSize
      axios.get(url, {
        headers: {
        'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.tableData = response.data.data
        this.total = response.data.total
      }).finally(() => {
        hideLoading()
      })
    },

    handleView(value) {
      // TODO
      this.$router.push({
        name: 'contigsdataexpress',
        params: { 
          param: {
            ...value,
            srp: this.srp
          }
        }
      })
    },

    handleSizeChange(value) {
      this.pageSize = value
      this.currentPage = 1
      // this.requestGeneomeSeqInfo(this.srp, this.currentPage, this.pageSize)
      if(this.ifSearchedContigList) {
        this.requestContigsSearchedInformation({ 
          ...this.searchData, 
          srp: 'SRP121432',
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
      } else {
        this.requestContigsInformation('SRP121432', this.currentPage, this.pageSize)
      }
    },

    handleCurrentChange(value) {
      this.currentPage = value
      // this.requestGeneomeSeqInfo(this.srp, this.currentPage, this.pageSize)
      if(this.ifSearchedContigList) {
        this.requestContigsSearchedInformation({ 
          ...this.searchData, 
          srp: 'SRP121432',
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
      } else {
        this.requestContigsInformation('SRP121432', this.currentPage, this.pageSize)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table-container {
  .search-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title-container {
      font-size: 18px;
      font-weight: 700;
      color: #36A3F7;
    }
  }
  .el-table {
    margin-top: 20px;
  }
  .pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>