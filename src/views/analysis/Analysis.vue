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
        @node-click="handuleNodeClick">
      </el-tree>
    </div>
    <div class="right" ref="anchorRef" @scroll="handuleScroll()">
      <div class="title-box" ref="anchor-1">
        <div class="rect"></div>
        <span>Analysis relevant to drug design</span>
      </div>
      
    </div>
  </div>
</template>

<script>

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
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },

  mounted() {
    
  },

  methods: {
    handuleNodeClick(value1, value2, value3) {
      console.log(value1)
      console.log(value2)
      console.log(value3)
    },
    handuleScroll() {

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
    width: 400px;
    height: 100%;
    border-right: 1px solid #f4f1f1;
    box-sizing: border-box;
  }
  .right {
    padding: 10px 10px 0 10px;
    width: calc(100% - 400px);
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
    
  }
}
</style>