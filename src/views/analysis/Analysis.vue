<!--
 * @File name: 
 * @Author: Tecot (tyx_cqbs@163.com)
 * @Version: V1.0
 * @Date: 2024-07-08 11:03:44
 * @Description: 
-->
<template>
  <div>
    <!-- <GeneStructVis></GeneStructVis> -->
     <WordCloudVis></WordCloudVis>
  </div>
</template>

<script>
import WordCloudVis from '@/components/visiualization/dellWordCloudVis.vue'

export default {
  name: 'Analysis',

  components: {
    WordCloudVis,
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