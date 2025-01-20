<!--
 * @File name: 
 * @Author: Tecot (tyx_cqbs@163.com)
 * @Version: V1.0
 * @Date: 2025-01-20 15:13:15
 * @Description: 
-->
<template>
  <div class="protein-seq-detail">
    <el-descriptions
      style="color: #58CF6A;"
      :title="mopInfo['Access'] + ' macrel out prediction description'" 
      direction="vertical" 
      :column="5" 
      size="small" 
      border
    >
      <el-descriptions-item label="Access">
        {{ mopInfo['Access'] }}
      </el-descriptions-item>
      <el-descriptions-item label="AMP family">
        {{ mopInfo['AMP_family'] }}
      </el-descriptions-item>
      <el-descriptions-item label="AMP probability">
        {{ mopInfo['AMP_probability'] }}
      </el-descriptions-item>
      <el-descriptions-item label="Hemolytic">
        {{ mopInfo['Hemolytic'] }}
      </el-descriptions-item>
			<el-descriptions-item label="Hemolytic probability">
        {{ mopInfo['Hemolytic_probability'] }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'MacrelOutPredictionDescription',

  props: {
    mopInfo: {
      type: Object,
      required: true,
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