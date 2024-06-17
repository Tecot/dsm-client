<template>
  <div class="contig-project-container">
      <ContigsProjectInformation></ContigsProjectInformation>
  </div>
</template>

<script>
import ContigsProjectInformation from '@/components/database/contigproject/ContigsProjectInformation.vue';

export default {
  name: 'ContigProject',

  components: {
    ContigsProjectInformation
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

<style lang="scss"scoped>
.contig-project-container {
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
}

</style>