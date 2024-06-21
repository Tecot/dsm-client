<template>
  <div class="search">
    <div class="search-option">
      <el-select 
        filterable
        v-model="srp" 
        size="mini"
        placeholder="Please select bioproject"
        @change="handleChangedSrp" 
      >
        <el-option
          v-for="item, index in srps"
          :key="index"
          :label="item" 
          :value="item"
        >
        </el-option>
      </el-select>
      
      <el-button 
        size="mini" 
        type="danger" 
        style="width: 200px;"
        @click="searchConditionsVisible = true"
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
    <!-- Search dialog -->
    <el-dialog 
      :visible.sync="searchConditionsVisible" 
      :close-on-click-modal="false"
      width="30%"
    >
      <div class="contigs-project-search-conditions-container">
        <div class="search-condition-container">
          <div class="title">
            Name
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.name" 
              size="mini"
              placeholder="Please input name"
            >
            </el-input>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="title">
            ID
          </div>
          <div class="search-container">
            <el-input 
              v-model="searchContent.id" 
              size="mini"
              placeholder="Please input ID"
            >
            </el-input>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="title">
            Length range:  {{ '[' + searchContent.lengthRange[0] + ' bp , ' + searchContent.lengthRange[1] + ' bp]' }}
          </div>
          <div class="search-container">
            <el-slider
              range
              show-stops
              v-model="searchContent.lengthRange"
              :max="5000"
              :min="0"
              :format-tooltip="(value) => value + ' bp' "
            >
            </el-slider>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="title">
            GC content range:  {{ '[' + searchContent.gcRange[0] + '% , ' + searchContent.gcRange[1] + '%]' }}
          </div>
          <div class="search-container">
            <el-slider
              range
              show-stops
              v-model="searchContent.gcRange"
              :max="100"
              :min="0"
              :format-tooltip="(value) => value + '%' "
            >
            </el-slider>
          </div>
        </div>
        
        <div class="search-condition-container">
          <div class="search-container">
            <el-checkbox v-model="searchContent.includeStitle">Does it contain Stitle?</el-checkbox>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="search-container">
            <el-checkbox v-model="searchContent.includeSseqid">Does it contain Sseqid?</el-checkbox>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="search-container">
            <el-checkbox v-model="searchContent.includeGenes">Does it contain Genes?</el-checkbox>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="search-container">
            <el-checkbox v-model="searchContent.includeBin">Does it contain bin?</el-checkbox>
          </div>
        </div>

        <div class="search-condition-container">
          <div class="search-container">
            <el-checkbox v-model="searchContent.includeClassification">Does it contain classification?</el-checkbox>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import config from '@/config'
import axios from 'axios';
import { showLoading, hideLoading } from '@/utils/loading'

export default {
  name: 'ContigsProjectSearch',

  data() {
    return {
      srp: '',
      srps: [],

      searchConditionsVisible: false,
      searchContent: {
        name: '',
        id: '',
        lengthRange: [0, 6000],
        gcRange: [0, 100],
        includeStitle: false,
        includeSseqid: false,
        includeGenes: false,
        includeBin: false,
        includeClassification: false
      }
    };
  },

  mounted() {
    this.requestSrpDirNames()
  },

  methods: {
    handleChangedSrp() {
      this.$emit('outputSrp', this.srp)
    },

    async requestSrpDirNames() {
      const url = config.baseUrl + config.uri.srpDirNamesViewURI
      axios.get(url, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.srps = response.data.data
        this.srp = this.srps[0]
        this.$emit('outputSrp', this.srp)
      })
    },

    reset() {
      this.$emit('outputResetSignal', true)
    },

    searchConfirm() {
      this.searchConditionsVisible = false
      this.$emit('outputSearchData', this.searchContent)
    },

    searchConditionsReset() {
      this.searchContent = {
          name: '',
          id: '',
          lengthRange: [0, 6000],
          gcRange: [0, 100],
          includeStitle: false,
          includeSseqid: false,
          includeGenes: false,
          includeBin: false,
          includeClassification: false
        }
    }
  },
};
</script>

<style lang="scss" scoped>
.search {
  .search-option {
    display: flex;
    justify-content: right;
    span {
      font-size: 18px;
    }
    .el-select {
      margin-right: 10px;
    }
  }
  .contigs-project-search-conditions-container {

    .search-condition-container {
      margin-top: 5px;
      .title {
        font-size: 14px;
      }
      .search-container {
        margin-top: 5px;
      }
    }
  }
}
</style>