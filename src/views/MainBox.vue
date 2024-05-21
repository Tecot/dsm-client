<template>
    <div class="common-layout">
        <el-container direction="vertical">
            <NavBar></NavBar>
            <el-main>
                <router-view></router-view>
            </el-main>
            <!-- <Footer></Footer> -->
        </el-container>
    </div>
  </template>
  
<script>
import NavBar from '@/components/mainbox/NavBar.vue'
import Footer from '@/components/mainbox/Footer.vue'

export default {
    name: 'MainBox',
  
    data() {
      return {
        
      };
    },

    components: {
        NavBar,
        Footer
    },
  
    mounted() {
      
    },
  
    methods: {
      
    },
};
</script>

<style lang="scss" scoped>
.el-main {
    padding: 0;
}
</style>
  