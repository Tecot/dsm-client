<template>
  <div class="contig-project-container">
      <ContigsInformation></ContigsInformation>
  </div>
</template>

<script>
import ContigsInformation from '@/components/contigproject/ContigsInformation.vue'


export default {
  name: 'ContigProject',

  components: {
    ContigsInformation 
  },

  data() {
    return {
      tableData: [],
      header: [],
      total: 0
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="scss"scoped>
.contig-project-container {
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
}

</style>