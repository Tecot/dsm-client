<template>
  <div class="run-info-table">
    <div class="title">
      Run Informations
    </div>
    <el-table
      size="small"
      style="width: 100%"
      :data="runData.data"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
    >
      <el-table-column
        v-for="(item, index) in runData.header"
        :key="index"
        :prop="item"
        :label="item"
      >
      </el-table-column>
      <el-table-column label="Option" width="100">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleRowData(scope['row'])">
            View
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-table
      :data="runData.data"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
      size="small"
      height="400"
      style="width: 100%"
    >
      <el-table-column
        v-for="(item, index) in runData.header"
        :key="index"
        :prop="item"
        :label="item"
      >
      </el-table-column>

      <el-table-column label="Option" width="100">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleRowData(scope.row)">
            Detail
          </el-button>
        </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>

<script>
export default {
  name: 'RunInformation',

  props: {
    runData: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      headerCellStyle: {
        textAlign: 'center', 
        backgroundColor: 'gray', 
        color: 'white'
      },
      cellStyle: {
        textAlign: 'center'
      },
      runHeader: [
        'Run', 
        'LibraryStrategy', 
        'LibrarySelection', 
        'LibrarySource', 
        'LibraryLayout', 
        'Platform', 
        'BioSample', 
        'geographic location',
        'latitude and longitude', 
        'depth',
        'collection date'
      ]
    }
  },
  methods: {
    handleRowData($event) {
      this.$emit('output-value', $event)
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  height: 56px;
  line-height: 56px;
  font-size: 16px;
  font-weight: 700;
}
</style>