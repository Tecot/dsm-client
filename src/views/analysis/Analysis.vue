<template>
<div class="analysis">
    <div class="container">
        <div class="upload">
            <div class="uplaod-left">
                <div class="tip">Please input fasta*</div>
                <el-upload
                    drag
                    action=""
                    accept=".fasta,.fa,.fas"
                    list-type="text"
                    :http-request="dummyFastq1Request"
                    :on-remove="handleFastq1Remove"
                    :on-change="handleFastq1Change"
                    :auto-upload="false"
                    :limit="1">
                    <i class="el-icon-upload"></i>
                <div class="el-upload__text">Drag the file here, or <em>click upload fasta</em></div>
                </el-upload>
            </div>
            
            <div class="upload-right">
                <div class="tip">Please input graph</div>
                <el-upload
                drag
                action=""
                accept=".graph"
                list-type="text"
                :http-request="dummyFastq2Request"
                :on-remove="handleFastq2Remove"
                :on-change="handleFastq2Change"
                :auto-upload="false"
                :limit="1">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Drag the file here, or <em>click upload graph</em></div>
                </el-upload>
            </div>
        </div>

        <div class="methods">
            <div class="method-container">
                
                <el-checkbox-group v-model="checkList">
                    <el-checkbox v-for="(item, index) in analysis_methods" :key="index" :label="item.description"></el-checkbox>
                </el-checkbox-group>
            </div>
        </div>

        <div class="options">
            <el-button icon="el-icon-upload">Submit</el-button>
            <el-button icon="el-icon-download" @click="requestSampleData()">Demo data</el-button>
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
    data() {
        return {
            analysis_methods: [],
            checkList: []
        }
    },
    mounted() {
        this.requestAnalysisMethods()
    },
    methods: {
        async requestAnalysisMethods() {
            const url = config.baseUrl + config.uri.analysisMethodsURI
            showLoading()
            return axios({
                url: url,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8' 
                }
            }).then((response) => {
                this.analysis_methods = response.data.data
                console.log(this.analysis_methods)
            }).catch((e) => {
                this.$notify({
                    title: 'Error',
                    message: 'System error',
                    type: 'error'
                })
            }).finally(() => {
                hideLoading()
            })
        },
        async requestSampleData() {
            const url = config.baseUrl + config.uri.downloadSampleDataURI
            showLoading()
            return axios({
                url: url,
                method: 'GET',
                responseType: 'blob'
            }).then((response) => {
                this.blobDownload(response)
            }).catch((e) => {
                this.$notify({
                title: 'Error',
                message: 'Download error',
                type: 'error'
                });
            }).finally(() => {
                hideLoading()
            })
        },
        blobDownload(blobObject) {
            const url = window.URL.createObjectURL(new Blob([blobObject.data]));
            const link = document.createElement('a');
            link.href = url;
            link.id = 'download_link'
            link.setAttribute('download', 'sample_data.zip'); 
            document.body.appendChild(link);
            link.click();
            const elementToRemove = document.getElementById(link.id);
            const parentElement = elementToRemove.parentNode;
            parentElement.removeChild(elementToRemove);
        },
    }
}
</script>

<style lang="scss" scoped>
.analysis {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 5rem);
    .container {
        width: 70%;
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
        .methods {
            display: flex;
            justify-content: center;
            align-items: center;
            .method-container {
                padding: 1rem 1rem 1rem 1rem;
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 2rem;
                width: 800px;
                background-color: #FFF;
            }
        }
        .options {
            margin-top: 1rem;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            .el-button {
                width: 350px;
            }
        }
    }
}
</style>