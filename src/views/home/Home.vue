<!--
 * @File name: 
 * @Author: Tecot (tyx_cqbs@163.com)
 * @Version: V1.0
 * @Date: 2024-10-30 09:18:41
 * @Description: 
-->
<template>
  <div class="home-container">
    <div class="search-container">
      <div class="search-label" style="padding-top: 100px;" >
        Deep Sea Microorganism
      </div>
      <div class="search-input">
        <el-input style="width: 40%;"v-model="searchData" :placeholder="placeholder"></el-input>
        <el-button icon="el-icon-search" @click="handuleSearchData()">Search</el-button>
      </div>
    </div>
    <div class="description-container">
      
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/config'
export default {
  name: 'Home',

  data() {
    return {
      searchData: '',
      placeholder: 'Search for SRA/SRP project. Examples: SRP080036, ERP109052',
      srpDirNames: [],
    };
  },

  mounted() {
    axios.get(config .baseUrl + config.uri.srpDirNamesViewURI, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8' 
      }
    }).then((response) => {
      this.srpDirNames = response.data.data
    })
  },

  methods: {
    handuleSearchData() {
      if(this.searchData) {
        if(this.srpDirNames.includes(this.searchData)) {
          axios.get(config.baseUrl + config.uri.getTargetSrpValueURI + '/' + this.searchData, {
            headers: {
              'Content-Type': 'application/json; charset=utf-8' 
            }
          }).then((response) => {
            this.$router.push({
              name: 'runproject', 
              params: { 
                param: response.data.data
              }
            })
          })
          
        } else {
          this.$notify.error({
            title: 'Error',
            message: 'The project number does not exist!'
          });
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  .search-container{
    height: 400px;
    background-color: #1371B9;
    .search-label {
      font-size: 48px;
      font-weight: bold;
      color: #FFF;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .search-input {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      .el-button {
        margin-left: 10px;
        color: #1371B9;
      }
    }
  }
}
</style>
