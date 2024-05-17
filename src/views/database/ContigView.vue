<template>
  <div>
    contig
  </div>
</template>

<script>
export default {
  name: 'ContigView',

  data() {
    return {
      
    };
  },

  mounted() {
    console.log(this.$route.query['param'])
  },

  methods: {
    
  },
};
</script>