<template>
  <div class="srp-information-container">
    <div class="table-container">
      <el-table
        :data="tableData"
        :header-cell-style="{textAlign: 'center', backgroundColor: 'gray', color: 'white'}"
        :cell-style="{textAlign: 'center'}"
        size="small"
        height="600"
        style="width: 100%"
      >
        <el-table-column prop="SRAStudy" label="SRAStudy"></el-table-column>
        <el-table-column prop="BioProject" label="BioProject"></el-table-column>
        <el-table-column prop="ProjectID" label="ProjectID"></el-table-column>
        <el-table-column prop="CenterName" label="CenterName"></el-table-column>
        <el-table-column prop="Submission" label="Submission"></el-table-column>
        <el-table-column prop="Depth range" label="Depth range"></el-table-column>
        <el-table-column prop="Longitude and latitude range" label="Longitude and latitude range"></el-table-column>
        
        <el-table-column label="Option" width="100">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleDetail(scope.row)">
              Detail
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'SrpSearchedInformation',

  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    }
  },

  components: {
    
  },

  data() {
    return {
      displayOriginalTable: true,
    };
  },

  mounted() {
    
  },

  methods: {
    handleDetail(value) {
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