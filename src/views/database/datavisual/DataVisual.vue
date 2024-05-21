<template>
    <div class="data-visual-container">
      <div class="geneome-contigs-container">
        <GeneomeInformation :srp="srp"></GeneomeInformation>
      </div>
      
      <div class="protein-contigs-container">
        <ProteinInformation :srp="srp" @output-value="handleProteinSeqDetail($event)"></ProteinInformation>
      </div>

      <!-- dialog -->
      <el-dialog
        :visible.sync="dialog3DmolVisible"
        width="50%"
      >
        <ProteinSeqDescription :proteinSeqInfo="proteinSeqInfo"></ProteinSeqDescription>
        <ProteinStructVis :proteinSeqID="proteinSeqInfo['ID']"></ProteinStructVis>
      </el-dialog>
    </div>
  </template>
  
<script>
import GeneomeInformation from '@/components/datavisual/GeneomeInformation.vue'
import ProteinInformation from '@/components/datavisual/ProteinInformation.vue';
import ProteinSeqDescription from '@/components/datavisual/ProteinSeqDescription.vue';
import ProteinStructVis from '@/components/visiualization/ProteinStructVis.vue';

export default {
  name: 'DataVisual',

  components: {
    GeneomeInformation,
    ProteinInformation,
    ProteinSeqDescription,
    ProteinStructVis
  },

  data() {
    return {
      srp: 'SRP121432', // TODO
      proteinSeqInfo: {},
      dialog3DmolVisible: false,
    };
  },

  mounted() {
    // 需要持久化
    // const param = this.$route.params['param']
  },

  methods: {
    handleProteinSeqDetail(proteinSeqInfo) {
      this.proteinSeqInfo = proteinSeqInfo
      this.dialog3DmolVisible = true
    },

    handleFirstCopySuccess() {
      this.$message({
        message: 'Copy successful',
        type: 'success'
      });
    },

    handleFirstCopyError() {
      this.$message({
        message: 'Copy successful',
        type: 'error'
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.data-visual-container {
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
  
}

</style>