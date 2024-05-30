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
          <el-input 
            v-model="searchContent.depthValue" 
            size="mini"
            placeholder="Please input depth value"
          >
          </el-input>
        </div>
        <div class="between-range" v-if="searchContent.depthRangeCondition === 'Between([a,b])'">
          <div class="left">
            <div class="left-title">
              Low:
            </div>
            <el-input 
              v-model="searchContent.depthRange.low" 
              size="mini"
              placeholder="Please input low value"
            >
            </el-input>
          </div>
          <div class="right">
            <div class="right-title">
              High:
            </div>
            <el-input 
              v-model="searchContent.depthRange.high" 
              size="mini"
              placeholder="Please input high value"
            >
            </el-input>
          </div>
        </div>
      </div>
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
        }
      },
      depthRangeConditions: [
        'Up(>)',
        'Down(<)',
        'Equal(=)',
        'Between([a,b])',
        'Unknow'
      ]
    };
  },

  mounted() {
    
  },

  methods: {
    
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
  }
}
</style>