<template>
  <div class="container">
    <div class="title">
      Task query
    </div>
    <div class="search">
      <div class="search-input">
        <el-input style="width: 40%;"v-model="searchData" placeholder="Please enter your task ID"></el-input>
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
          <el-table-column prop="id" label="Task ID" width="200px" fixed="left"></el-table-column>
          <el-table-column prop="name" label="Task Name"></el-table-column>
          <el-table-column prop="createTime" label="Create Time"></el-table-column>
          <el-table-column prop="status" label="Status"></el-table-column>
          <el-table-column label="Option" width="200px" fixed="right">
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
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, prev, pager, next, sizes, jumper"
          :total="tasks.length"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  name: 'Workspace',

  data() {
    return {
      searchData: '',
      headerCellStyle: {
        textAlign: 'center', 
        backgroundColor: '#C8D6DF', 
        color: '#000'
      },
      cellStyle: {
        textAlign: 'center'
      },
      tasks: [],
      tabelData: [],
      currentPage: 1,
      pageSize: 5,
    };
  },

  mounted() {
    const cookies = Cookies.get();
    const tasks = []
    for (let key in cookies) {
      if(key.startsWith('dsm')) {
        const value = cookies[key]
        tasks.push({
          id: key,
          name: value.split('_')[0],
          createTime:value.split('_')[1],
        })
      }
    }
    this.tasks = tasks
    this.tabelData = this.paginationControler(this.tasks, this.currentPage, this.pageSize)
  },

  methods: {
    handuleSearchData() {
      const cookies = Cookies.get();
      const tasks = []
      this.currentPage = 1
      this.pageSize = 5
      if(this.searchData) {
        for (let key in cookies) {
          if(key.startsWith('dsm')) {
            const value = cookies[key]
            if(key.includes(this.searchData)) {
              tasks.push({
                id: key,
                name: value.split('_')[0],
                createTime:value.split('_')[1],
              })
            }
          }
        }
      } else {
        for (let key in cookies) {
          if(key.startsWith('dsm')) {
            const value = cookies[key]
            tasks.push({
              id: key,
              name: value.split('_')[0],
              createTime:value.split('_')[1],
            })
          }
        }
      }
      this.tasks = tasks
      this.tabelData = this.paginationControler(this.tasks, this.currentPage, this.pageSize)
    },
    handleRowData(rowData) {

    },
    handleSizeChange(value) {
      this.currentPage = 1
      this.pageSize = value
      this.tabelData = this.paginationControler(this.tasks, this.currentPage, this.pageSize)
    },
    handleCurrentChange(value) {
      this.currentPage = value
      this.tabelData = this.paginationControler(this.tasks, this.currentPage, this.pageSize)
    },
    paginationControler(array, currentPage, pageSize) {
      const totle = array.length
      let sliceData = []
      if(totle - pageSize * currentPage > 0) {
        sliceData = array.slice(pageSize * (currentPage - 1), pageSize * currentPage)
      } else {
        sliceData = array.slice(pageSize * (currentPage - 1), totle)
      }
      return sliceData
    }
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