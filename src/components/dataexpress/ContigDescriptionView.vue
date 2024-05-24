<template>
  <el-descriptions 
    :title="contigDetail['ID'] + ' detail'" 
    :column="5" 
    direction="vertical" 
    size="small" 
    border
  >
    <el-descriptions-item label="ID">
      {{ contigDetail['ID'] }}
    </el-descriptions-item>
    <el-descriptions-item label="Name">
      {{ contigDetail['Name'] }}
    </el-descriptions-item>
    <el-descriptions-item label="Length (bp)">
      {{ contigDetail['Length'] }}
    </el-descriptions-item>
    <el-descriptions-item label="GC (%)">
      {{ contigDetail['GC'] }}
    </el-descriptions-item>
    <el-descriptions-item label="Description">
      {{ contigDetail['Description'] }}
    </el-descriptions-item>
    <el-descriptions-item label="Sequence" :span="5">
      <el-input
        type="textarea"
        resize="none"
        :value="getCompleteSeq(contigDetail)"
        :autosize="true"
        :spellcheck="false"
      >
      </el-input>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
export default {
  name: 'ContigDescriptionView',

  props: {
    contigDetail: {
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
    getCompleteSeq(contigDetail) {
      return '>' + contigDetail['Description'] + '\n' + contigDetail['Sequence']
    }
  },
};
</script>