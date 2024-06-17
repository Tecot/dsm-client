<template>
    <div class="table-container">
      <div class="title-container">
        <span>{{ srp + ' contigs' }}</span>
      </div>
      <el-table
        :data="geneomeSeqTableData"
        :header-cell-style="{textAlign: 'center', backgroundColor: 'gray', color: 'white'}"
        :cell-style="{textAlign: 'center'}"
        size="small"
        height="300"
        style="width: 100%"
      >
        <el-table-column prop="ID" label="ID"></el-table-column>
        <el-table-column prop="Name" label="Name"></el-table-column>
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
        :total="geneomeSeqTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
 import config from '@/config'
import axios from 'axios';
import { showLoading, hideLoading } from '@/utils/loading'

export default {
  name: 'ContigsInformation',

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
      geneomeSeqTableData: [],
      geneomeSeqTableHeader: [],
      geneomeSeqTotal: 0,
      currentPage: 1,
      pageSize: 20,
      geneomeSeqTotal: 0,
    };
  },

  watch: {
    srp(newValue, oldValue) {
      if(newValue) {
        // TODO
        // this.requestGeneomeSeqInfo(this.srp, this.currentPage, this.pageSize)
        this.requestGeneomeSeqInfo('SRP121432', this.currentPage, this.pageSize)
      }
    }
  },

  mounted() { },

  methods: {
    requestGeneomeSeqInfo(srp, currentPage, pageSize) {
      showLoading()
      const url = config.baseUrl + config.uri.contigsInformationViewURI + '/' + srp + '/' + currentPage + '/' + pageSize
      axios.get(url, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.geneomeSeqTableHeader = response.data.header
        this.geneomeSeqTableData = response.data.data
        this.geneomeSeqTotal = response.data.total
      }).finally(() => {
        hideLoading()
      })
    },

    handleView(value) {
      console.log(value)
      // TODO
      this.$router.push({
        name: 'contigsdataexpress',
        params: { 
          param: {
            ...value,
            // srp: this.srp
            srp: 'SRP121432'
          }
        }
      })
    },

    handleSizeChange(value) {
      this.pageSize = value
      this.currentPage = 1
      // this.requestGeneomeSeqInfo(this.srp, this.currentPage, this.pageSize)
      this.requestGeneomeSeqInfo('SRP121432', this.currentPage, this.pageSize)
    },

    handleCurrentChange(value) {
      this.currentPage = value
      // this.requestGeneomeSeqInfo(this.srp, this.currentPage, this.pageSize)
      this.requestGeneomeSeqInfo('SRP121432', this.currentPage, this.pageSize)
    },
  },
};
</script>

<style lang="scss" scoped>
.table-container {

  .title-container {
    height: 56px;
    line-height: 56px;
    font-size: 16px;
    font-weight: 700;
  }

  .pagination-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>