<template>
  <div class="container">
    <div class="title">
      Task query
    </div>
    <div class="search">
      <div class="search-input">
        <el-input style="width: 40%;"v-model="searchData" :placeholder="placeholder"></el-input>
        <el-button icon="el-icon-search" @click="handuleSearchData()">Search</el-button>
      </div>
      <div class="tip">
        You could check the submitted task by Task ID.
      </div>
    </div>
    <div class="submitted-tasks">
      <div class="up">
        Submitted task(s) <el-button icon="el-icon-refresh" size="mini" type="primary">Refresh status</el-button>
      </div>
      <div class="tip">
        You could check the submitted task by Task ID.
      </div>
    </div>
    <div class="task-table-container">
      <div class="table-container">
        <el-table
          size="small"
          style="width: 100%;"
          max-height="200"
          :data="tabelData"
          :header-cell-style="headerCellStyle"
          :cell-style="cellStyle"
        >
          <el-table-column prop="ID" label="Task ID"></el-table-column>
          <el-table-column prop="name" label="Task Name"></el-table-column>
          <el-table-column prop="status" label="Status"></el-table-column>
          <el-table-column prop="create_time" label="Create Time"></el-table-column>
          <el-table-column label="Option" width="100" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="mini">
                View detail
              </el-button>
              <el-button type="success" size="mini">
                Task log
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
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Workspace',

  data() {
    return {
      searchData: '',
      placeholder: 'Please enter your task ID',
      headerCellStyle: {
        textAlign: 'center', 
        backgroundColor: '#C8D6DF', 
        color: '#000'
      },
      cellStyle: {
        textAlign: 'center'
      },
      tabelData: [],
      currentPage: 1,
      pageSize: 20,
      total: 0
    };
  },

  mounted() {
    
  },

  methods: {
    handuleSearchData() {

    },
    handleRowData(rowData) {

    },
    handleSizeChange(value) {
      
    },

    handleCurrentChange(value) {

    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title {
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
  }
  .tip {
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    text-align: center;
  }
  .search {
    .search-input {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      .el-button {
        margin-left: 10px;
        color: #1371B9;
      }
    }
  }
  .submitted-tasks {
    margin-top: 100px;
    .up {
      height: 40px;
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-button {
        border-radius: 20px 20px 20px 20px;
        margin-left: 20px;
      }
    }
  }
  .task-table-container {
    margin-top: 20px;
    padding-left: 10%;
    padding-right: 10%;
    .pagination-container {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
}
</style>