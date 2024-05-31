<template>
  <div class="srp-search-conditions-container">
    <div class="search-condition-container">
      <div class="title">
        SRAStudy
      </div>
      <div class="search-container">
        <el-input 
          v-model="searchContent.srastudyText" 
          size="mini"
          placeholder="Please input SRAStudy"
        >
        </el-input>
      </div>
    </div>
    
    <div class="search-condition-container">
      <div class="title">
        Bio project
      </div>
      <div class="search-container">
        <el-input 
          v-model="searchContent.bioProjectText" 
          size="mini"
          placeholder="Please input bio project"
        >
        </el-input>
      </div>
    </div>

    <div class="search-condition-container">
      <div class="title">
        Project ID
      </div>
      <div class="search-container">
        <el-input 
          v-model="searchContent.projectID" 
          size="mini"
          placeholder="Please input project ID"
        >
        </el-input>
      </div>
    </div>

    <div class="search-condition-container">
      <div class="title">
        Center name
      </div>
      <div class="search-container">
        <el-input 
          v-model="searchContent.centerName" 
          size="mini"
          placeholder="Please input center name"
        >
        </el-input>
      </div>
    </div>

    <div class="search-condition-container">
      <div class="title">
        Submission
      </div>
      <div class="search-container">
        <el-input 
          v-model="searchContent.submission" 
          size="mini"
          placeholder="Please input submission"
        >
        </el-input>
      </div>
    </div>

    <div class="search-condition-container">
      <div class="title">
        Depth range
      </div>
      <div class="search-container">
        <el-select 
          v-model="searchContent.depthRangeCondition"
          placeholder="Please select condition"
          size="mini"
          style="width: 100%;"
        >
          <el-option
            v-for="item in depthRangeConditions"
            :key="item.value"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <div class="one-range" v-if="searchContent.depthRangeCondition && searchContent.depthRangeCondition !== 'Between([a,b])' && searchContent.depthRangeCondition !== 'Unknow'">
          <div class="one-range-title">
            Depth value:
          </div>
          <el-input-number 
            v-model="searchContent.depthValue" 
            placeholder="Please input depth value"
            controls-position="right" 
            size="mini"
            style="width: 100%;">
          </el-input-number>
        </div>
        <div class="between-range" v-if="searchContent.depthRangeCondition === 'Between([a,b])'">
          <div class="left">
            <div class="left-title">
              Low:
            </div>
            <!-- <el-input 
              v-model="searchContent.depthRange.low" 
              size="mini"
              placeholder="Please input low value"
            >
            </el-input> -->
            <el-input-number 
              v-model="searchContent.depthRange.low" 
              placeholder="Please input low value"
              controls-position="right" 
              size="mini"
              style="width: 100%;">
            </el-input-number>
          </div>
          <div class="right">
            <div class="right-title">
              High:
            </div>
            <!-- <el-input 
              v-model="searchContent.depthRange.high" 
              size="mini"
              placeholder="Please input high value"
            >
            </el-input> -->
            <el-input-number 
              v-model="searchContent.depthRange.high" 
              placeholder="Please input high value"
              controls-position="right" 
              size="mini"
              style="width: 100%;">
            </el-input-number>
          </div>
        </div>
      </div>
    </div>

    <div class="search-condition-container">
      <div class="title">
        Longitude and latitude range
      </div>
      <div class="longitude-and-latitude-range-container">
        
          <div class="up">
            <div class="left">
              <div class="left-title">W:</div>
              <el-input 
                v-model="searchContent.llRange.w" 
                size="mini"
                placeholder="Please input W value"
              >
              </el-input>
            </div>
            <div class="right">
              <div class="right-title">E:</div>
              <el-input 
                v-model="searchContent.llRange.E" 
                size="mini"
                placeholder="Please input E value"
              >
              </el-input>
            </div>
          </div>

          <div class="down">
            <div class="left">
              <div class="left-title">S:</div>
              <el-input
                v-model="searchContent.llRange.S"  
                size="mini"
                placeholder="Please input S value"
              >
              </el-input>
            </div>
            <div class="right">
              <div class="right-title">N:</div>
              <el-input
                v-model="searchContent.llRange.N"  
                size="mini"
                placeholder="Please input N value"
              >
              </el-input>
            </div>
          </div>
      </div>
    </div>

    <div class="button-container">
      <el-button size="mini" type="danger" @click="searchConfirm">
        Confirm
      </el-button>
      <el-button size="mini" type="primary" @click="searchConditionsReset">
        Reset
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SrpSearchConditions',

  data() { 
    return {
      searchContent: {
        srastudyText: '',
        bioProjectText: '',
        projectID: '',
        centerName: '',
        submission: '',
        depthRangeCondition: '',
        depthValue: '',
        depthRange: {
          low: '',
          high: ''
        },
        llRange: {
          w: '',
          N: '',
          S: '',
          E: ''        
        }
      },
      depthRangeConditions: [
        'Up(>)',
        'Down(<)',
        'Equal(=)',
        'Between([a,b])',
        'Other'
      ]
    };
  },

  mounted() {
    
  },

  methods: {
    searchConfirm() {
      if(
        this.searchContent.srastudyText === '' &&
        this.searchContent.bioProjectText === '' &&
        this.searchContent.projectID === '' &&
        this.searchContent.centerName === '' &&
        this.searchContent.submission === '' &&
        this.searchContent.depthRangeCondition === '' &&
        this.searchContent.depthValue === '' &&
        this.searchContent.depthRange.low === '' &&
        this.searchContent.depthRange.high === '' &&
        this.searchContent.llRange.N === '' &&
        this.searchContent.llRange.E === '' &&
        this.searchContent.llRange.S === '' &&
        this.searchContent.llRange.w === ''
      ) {
        this.$message({
          message: 'Please input search conditions',
          type: 'error'
        });
        return
      } 

      if(this.searchContent.depthRangeCondition === 'Between([a,b])') {
        if(!(this.searchContent.depthRange.low || this.searchContent.depthRange.high)) {
          this.$message({
            message: 'Please input depth range',
            type: 'error'
          });
          return
        }
      }
      
      if(
        this.searchContent.depthRangeCondition === 'Up(>)' ||
        this.searchContent.depthRangeCondition === 'Down(<)' ||
        this.searchContent.depthRangeCondition === 'Equal(=)'
      ) {
        if(!this.searchContent.depthValue) {
          this.$message({
            message: 'Please input depth value',
            type: 'error'
          });
          return
        }
      }
      
    },

    searchConditionsReset() {
      this.searchContent = {
        srastudyText: '',
        bioProjectText: '',
        projectID: '',
        centerName: '',
        submission: '',
        depthRangeCondition: '',
        depthValue: '',
        depthRange: {
          low: '',
          high: ''
        },
        llRange: {
          w: '',
          N: '',
          S: '',
          N: ''        
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.srp-search-conditions-container {

  .search-condition-container {
    margin-top: 5px;
    .title {
      font-size: 14px;
    }
    .search-container {
      margin-top: 5px;
      .one-range {
        display: flex;
        align-items: center;
        margin-top: 5px;
        .one-range-title {
          width: 100px;
        }
      }
      .between-range {
        display: flex;
        .left {
          display: flex;
          align-items: center;
          margin-top: 5px;
          width: 50%;
          padding-right: 5px;
          .left-title {
            width: 40px;
          }
        }
        .right {
          display: flex;
          align-items: center;
          margin-top: 5px;
          width: 50%;
          padding-left: 5px;
          .right-title {
            width: 40px;
          }
        }
      }
    }

    .longitude-and-latitude-range-container {
      margin-top: 5px;
      .up {
        display: flex;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          margin-top: 5px;
          width: 50%;
          padding-right: 5px;
          .left-title {
            width: 40px;
          }
        }
        .right {
          display: flex;
          align-items: center;
          margin-top: 5px;
          width: 50%;
          padding-left: 5px;
          .right-title {
            width: 40px;
          }
        }
      }

      .down {
        display: flex;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          margin-top: 5px;
          width: 50%;
          padding-right: 5px;
          .left-title {
            width: 40px;
          }
        }
        .right {
          display: flex;
          align-items: center;
          margin-top: 5px;
          width: 50%;
          padding-left: 5px;
          .right-title {
            width: 40px;
          }
        }
      }
    }
  }

  .button-container {
    display: flex;
    margin-top: 20px;
    justify-content: center;
  }
}
</style>