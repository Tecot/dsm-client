<template>
  <div class="protein-seq-detail">
    <el-descriptions 
      :title="proteinSeqInfo['ID'] + ' detail'" 
      direction="vertical" 
      :column="2" 
      size="small" 
      border
    >
      <el-descriptions-item label="ID">
        {{ proteinSeqInfo['ID'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Name">
        {{ proteinSeqInfo['Name'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Length">
        {{ proteinSeqInfo['Length'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Description">
        {{ proteinSeqInfo['Description'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Sequence" :span="2">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          :value="proteinSeqInfo['Sequence']"
          :autosize="true"
          resize="none"
        >
        </el-input>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'ProteinSeqDescription',

  props: {
    proteinSeqInfo: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
</style>