<template>
  <div class="srp-description-container">
    <el-descriptions title="SRP Description" direction="vertical" :column="6" size="small" border>
        <el-descriptions-item 
          v-for="(item, index) in srpDescriptionLabel" 
          :key="index"
          :label="item"
        >
          {{ srpData[item] }}
        </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'SrpDescription',

  props: {
    srpData: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      srpDescriptionLabel: [
        'SRAStudy', 
        'BioProject', 
        'ProjectID', 
        'Submission', 
        'CenterName'
      ]
    };
  },

  methods: { },
};
</script>