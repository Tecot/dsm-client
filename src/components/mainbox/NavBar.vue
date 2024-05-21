<template>
  <el-menu 
    class="el-menu-demo" 
    mode="horizontal" 
    background-color="#2E54A1"
    active-text-color="#ffd04b"
    text-color="#fff"
    :default-active="$route.path" 
    router
  >
    <el-menu-item index="/index">
      Home
    </el-menu-item>
    <el-menu-item index="/analysis">
      Analysis
    </el-menu-item>
    <el-submenu index="/database">
      <template slot="title">
        Database
      </template>
      <el-menu-item index="/database/overview">
        Overview
      </el-menu-item>
      <el-menu-item index="/database/srpproject">
        SRP Projects
      </el-menu-item>
      <el-menu-item index="/database/contigproject">
        Contig List
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/download">
      Download
    </el-menu-item>
    <el-menu-item index="/tutorial">
      Tutorial
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'NavBar',

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
.el-menu-demo {
  display: flex;
  justify-content: flex-end;
}
</style>
