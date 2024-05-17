<template>
  <div class="data-visual-container">
    <div class="title-container">
      <span>{{ srp + ' contigs informations' }}</span>
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

          <el-table-column label="Option" width="100">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleDetail(scope.row)">
                Detail
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

    <div class="contig-detail-dialog"> 
      <el-dialog :visible.sync="contigDetailVisible">
        <el-descriptions 
          :title="contigDetailInfo['ID'] + ' detail'" 
          direction="vertical" 
          :column="4" 
          size="small" 
          border
        >
          <el-descriptions-item label="ID">
            {{ contigDetailInfo['ID'] }}
          </el-descriptions-item>
          <el-descriptions-item label="Name">
            {{ contigDetailInfo['Name'] }}
          </el-descriptions-item>
          <el-descriptions-item label="Length (bp)">
            {{ contigDetailInfo['Length'] }}
          </el-descriptions-item>
          <el-descriptions-item label="GC (%)">
            {{ contigDetailInfo['GC'] }}
          </el-descriptions-item>
          <el-descriptions-item label="Description" :span="4">
            {{ contigDetailInfo['Description'] }}
          </el-descriptions-item>
          <el-descriptions-item label="Sequence" :span="4">
            <div>
              <span 
                class="tcga-base-style" 
                v-for="(item, index) in contigDetailInfo['Sequence']" 
                :key="index" 
                :style="{ color: setTCGAcolor(item) }"
              >
                {{ item }}
              </span>
            </div>
            <div class="copy-container">
              <i 
                class="el-icon-document-copy"
                v-clipboard:copy="contigDetailInfo['Sequence']"
                v-clipboard:success="handleFirstCopySuccess"
                v-clipboard:error="handleFirstCopyError"
              >
              </i>
              <!-- <el-button 
                size="large" 
                link
                type="text"
                icon="el-icon-document-copy" 
                v-clipboard:copy="contigDetailInfo['Sequence']"
                v-clipboard:success="handleFirstCopySuccess"
                v-clipboard:error="handleFirstCopyError">
              </el-button> -->
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import config from '@/config'
import axios from 'axios';
import { tcgaColor } from '@/utils/tools'
import { showLoading, hideLoading } from '@/utils/loading'

export default {
  name: 'ContigView',

  data() {
    return {
      srp: 'SRP080056',
      tableData: [],
      header: [
        'Id', 
        'Name', 
        'Description', 
        'Length', 
        'GC', 
        'Sequence'
      ],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      contigDetailVisible: false,
      contigDetailInfo: {},
    };
  },

  mounted() {
    // const param = this.$route.params['param']

    this.requestContigsInfo(this.srp, this.currentPage, this.pageSize)
  },

  methods: {
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
  .title-container {
    font-size: 24px;
    font-weight: 700;
  }

  .pagination-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

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

</style>