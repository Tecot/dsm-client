<!--
 * @File name: 
 * @Author: Tecot (tyx_cqbs@163.com)
 * @Version: V1.0
 * @Date: 2024-07-08 11:03:44
 * @Description: 
-->
<template>
  <div class="analysis-cotainer">
    <div class="left">
      <el-tree 
        style="height: 100%;"
        node-key="id"
        :highlight-current="true"
        :data="treeData"
        :props="defaultProps"
        :default-expand-all="true"
        :current-node-key="11"
        @node-click="handuleNodeClick">
      </el-tree>
    </div>
    <div class="right">
      <div class="title-box">
        <div class="rect"></div>
        <span>{{ leafInfo.title }}</span>
      </div>
      <div class="content" >
        <div class="upload">
          <el-upload
            drag
            action=""
            accept=".fa,.fasta,.fastq,.fq"
            list-type="text"
            :http-request="dummyRequest"
            :on-remove="handleRemove"
            :on-change="handleChange"
            :auto-upload="false"
            :limit="1">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drag the file here, or <em>click upload</em></div>
          </el-upload>
        </div>
        <div class="submit">
          <el-button style="height: 40px; width: 400px;"type="primary" @click="handleSubmit">Submit</el-button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config'
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  name: 'Analysis',

  components: {
    
  },

  data() {
    return {
      treeData: [
        {
          id: 1,
          label: 'Analysis relevant to drug design',
          children: [
            {
              id: 11,
              label: 'Prediction of secondary metabolites',
            },
            {
              id: 12,
              label: 'Prediction of antimicrobial peptide',
            },
            {
              id: 13,
              label: 'Prediction of Protein structure',
            }
          ]
        },
        {
          id: 2,
          label: 'Analysis related to disease prevention',
          children: [
            {
              id: 21,
              label: 'Prediction of virulence factor',
            },
            {
              id: 22,
              label: 'Prediction of drug resistance factor',
            },
            {
              id: 23,
              label: 'Prediction of microorganism (Pathogenic microorganism)',
            }
          ]
        }
      ],
      labelMap: {

      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },

      leafInfo: {
        id: 11,
        title: 'Prediction of secondary metabolites',
        parentInfo: {
          id: '1',
          title: 'Analysis relevant to drug design'
        }
      },
      file: null,
    };
  },

  mounted() {
    
    
  },

  methods: {
    handuleNodeClick(value1, value2, value3) {
      if(!value1['children']) {
        this.leafInfo.title = value1.id
        this.leafInfo.title = value1.label
        this.leafInfo.parentInfo.id = value2.parent.data.id
        this.leafInfo.parentInfo.id = value2.parent.data.label
      }
    },
    handleChange(file, fileList) {
      this.file = file.raw
    },
    handleRemove(file, fileList) {
      this.file = null
    },
    dummyRequest({ file, onSuccess }) {
      onSuccess("ok")
    },
    handleSubmit() {
      if(this.file) {
        const formData = new FormData();
        formData.append('file', this.file)
        formData.append('name', this.leafInfo.title)
        console.log(this.leafInfo.title)
        const url = config.baseUrl + config.uri.analysisURI
        axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          const expires = new Date(new Date() * 1 + response.data.data['age'] * 1000)
          Cookies.set(response.data.data['key'], response.data.data['value'], { expires: expires })
          
          this.$notify({
            message: 'Upload success',
            type: 'success'
          });
        })
        .catch(error => {
          this.$notify.error({
            message: '服务器忙碌，请稍后再试！',
          })
        })
      } else {
        this.$notify.error({
          message: '请上传数据！',
        })
      }
      
    }
  },
};
</script>

<style lang="scss" scoped>
.analysis-cotainer {
  ::v-deep .el-tree-node__label {
    font-size: 14px;
    color: #44546A;
  }
  height: calc(100vh - 80px);
  display: flex;
  .left {
    padding-top: 10px;
    background-color: #FFF;
    width: 500px;
    height: 100%;
    border-right: 1px solid #f4f1f1;
    box-sizing: border-box;
  }
  .right {
    padding: 10px 10px 0 10px;
    width: calc(100% - 500px);
    background-color: #FFF;
    overflow-y: scroll;
    .title-box {
      height: 30px;
      font-size: 24px;
      font-weight: bold;
      display: flex;
      justify-content: left;
      align-items: center;
      color: #44546A;
      .rect {
        height: 30px;
        width: 10px;
        margin-right: 10px;
        background-color: aquamarine;
      }
    }
    .content {
      margin-top: 20px;
      .upload, .submit {
        display: flex;
        justify-content: center;
        align-items: center;  
      }
      .submit {
        margin-top: 20px;
      }
    }
  }
}
</style>