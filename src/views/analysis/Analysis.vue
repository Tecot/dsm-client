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
          <div class="uplaod-left">
            <div class="tip">Please input read 1 (.fastq/.fq)</div>
            <el-upload
              drag
              action=""
              accept=".fastq,.fq"
              list-type="text"
              :http-request="dummyFastq1Request"
              :on-remove="handleFastq1Remove"
              :on-change="handleFastq1Change"
              :auto-upload="false"
              :limit="1">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">Drag the file here, or <em>click upload</em></div>
            </el-upload>
          </div>
          <div class="upload-right">
            <div class="tip">Please input read 2 (.fastq/.fq)</div>
            <el-upload
              drag
              action=""
              accept=".fastq,.fq"
              list-type="text"
              :http-request="dummyFastq2Request"
              :on-remove="handleFastq2Remove"
              :on-change="handleFastq2Change"
              :auto-upload="false"
              :limit="1">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">Drag the file here, or <em>click upload</em></div>
            </el-upload>
          </div>
        </div>
        <div class="quast">
          <el-checkbox v-model="checkedQuast">Quast</el-checkbox>
          <span>* Checking this option will perform Quast evaluation on genome assembly.</span>
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
import { showLoading, hideLoading } from '@/utils/loading'
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
            // {
            //   id: 13,
            //   label: 'Prediction of Protein structure',
            // }
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
        'Analysis relevant to drug design': 'artdd',
        'Prediction of secondary metabolites': 'second',
        'Prediction of antimicrobial peptide': 'macrel',
        // 'Prediction of Protein structure': 'pops',
        'Analysis related to disease prevention': 'artdp',
        'Prediction of virulence factor': 'vf',
        'Prediction of drug resistance factor': 'res',
        'Prediction of microorganism (Pathogenic microorganism)': 'binning'
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
      file1: null,
      file2: null,
      checkedQuast: true
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
    handleFastq1Change(file, fileList) {
      this.file1 = file.raw
    },
    handleFastq1Remove(file, fileList) {
      this.file1 = null
    },
    dummyFastq1Request({ file, onSuccess }) {
      onSuccess("ok")
    },
    handleFastq2Change(file, fileList) {
      this.file2 = file.raw
    },
    handleFastq2Remove(file, fileList) {
      this.file2 = null
    },
    dummyFastq2Request({ file, onSuccess }) {
      onSuccess("ok")
    },
    handleSubmit() {
      if(this.file1 && this.file2) {
        showLoading()
        const formData = new FormData();
        formData.append('file1', this.file1)
        formData.append('file2', this.file2)
        formData.append('name', this.labelMap[this.leafInfo.title])
        formData.append('flag', this.checkedQuast === true? '1' : '0')
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
            type: 'success',
            duration: 2000,
            onClose: () => {
              this.$router.push({
                name: 'workspace'
              })
            }
          })
        })
        .catch(error => {
          hideLoading()
          this.$notify.error({
            message: 'The server is busy, please try again later!',
          })
        })
        .finally(() => {
          hideLoading()
        })
      } else {
        this.$notify.error({
          message: 'Please upload data!',
        })
      }
      
    }
  },
};
</script>

<style lang="scss" scoped>
.analysis-cotainer {
  ::v-deep .el-tree-node__content {
    height: 60px;
  }
  ::v-deep .el-tree-node__label {
    font-size: 16px;
    color: #44546A;
  }
  height: calc(100vh - 80px);
  display: flex;
  .left {
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
      width: 70%;
      margin-top: 40px;
      margin-left: 15%;
      background-color: #fcfafa;
      padding: 20px 0 20px 0;
      border-radius: 10px 10px 10px 10px;
      box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.3);
      .upload {
        display: flex;
        justify-content: center;
        align-items: center;
        .upload-left, .upload-right {
          padding: 10px 10px 10px 10px;
        }
        .tip {
          background-color: darkcyan;
          text-align: center;
          height: 40px;
          line-height: 40px;
          color: #44546A;
          margin-bottom: 10px;
          color: #FFF;
          border-radius: 5px 5px;
        }
      }
      .quast {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 12px;
          color: #a3a2a2;
          margin-left: 20px;
        }
      }
      .submit {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>