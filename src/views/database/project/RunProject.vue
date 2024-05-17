<template>
  <div class="srp-detail-container">
    <div class="srp-description-container">
      <el-descriptions title="SRP Description" direction="vertical" :column="6" size="small" border>
        <el-descriptions-item 
          v-for="(item, index) in srpDescriptionLabel" 
          :key="index"
          :label="item"
        >
          {{ srpInfo[item] }}
        </el-descriptions-item>
        <el-descriptions-item label="Contigs">
          <el-button type="danger" size="mini" @click="viewContigs(srpInfo['SRAStudy'])">
            View contigs
          </el-button>
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <div class="run-info-container">
      <div class="title">
        Run Informations
      </div>
      <el-table
        :data="runInfo.data"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        size="small"
        height="400"
        style="width: 100%"
      >
          <el-table-column
            v-for="(item, index) in runInfo.header"
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
    </div>

    <!-- <div class="contigs-info-container">
      <div class="title">
        Contigs List
      </div>
      <div class="contigs-table">
        
      </div>
    </div> -->

    <!-- dialog -->
    <el-dialog :visible.sync="runDetailVisible">
      <el-descriptions 
        :title="runDetailData['Run'] + ' detail'" 
        direction="vertical" 
        :column="3" 
        size="small" 
        border
      >
        <el-descriptions-item 
          v-for="(item, index) in runHeader"
          :key="index" 
          :label="item"
        >
          {{ runDetailData[item] }}
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
import config from '@/config'
import axios from 'axios';
import { showLoading, hideLoading } from '@/utils/loading'

export default {
  name: 'RunProject',

  data() {
    return {
      srpInfo: {},
      runInfo: {},
      runDetailData: {},
      runDetailVisible: false,
      srpDescriptionLabel: [
        'SRAStudy', 
        'BioProject', 
        'ProjectID', 
        'Submission', 
        'CenterName'
      ],
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
    };
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const param = this.$route.params['param']
      const databaseRunProjectData = this.$store.state.databaseRunProjectData
      if(param['SRAStudy']) {
        if(databaseRunProjectData) {
          if(databaseRunProjectData.srpInfo['SRAStudy'] == param['SRAStudy']) {
            this.srpInfo = databaseRunProjectData.srpInfo
            this.runInfo = databaseRunProjectData.runInfo
          } else {
            this.srpInfo = param
            this.requestRunProjectInfo(this.srpInfo['SRAStudy'])
          }
        } else {
          this.srpInfo = param
          this.requestRunProjectInfo(this.srpInfo['SRAStudy'])
        }
        
      } else {
        this.srpInfo = databaseRunProjectData.srpInfo
        this.runInfo = databaseRunProjectData.runInfo
      }
    },

    requestRunProjectInfo(srp) {
      showLoading()
      const url = config.baseUrl + config.uri.runProjectViewURI + '/' + srp
      return axios.get(url, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8' 
        }
      }).then((response) => {
        this.runInfo = response.data
        this.$store.commit('setDatabaseRunProjectData', {
          'srpInfo': this.srpInfo, 
          'runInfo': this.runInfo
        })
      }).finally(() => {
        hideLoading()
      })
    },

    viewContigs(srp) {
      // TODO
      // console.log('SRP080056')
      const facdeSRP = 'SRP080056'
      this.$router.push({
        name: 'contigview',
        query: {
          param: facdeSRP
        }
      })
    },

    handleDetail(value) {
      this.runDetailData = value
      this.runDetailVisible = true
    }
  },
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