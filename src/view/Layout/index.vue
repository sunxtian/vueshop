<template>

  <el-container class="page">
    <el-aside :width="isCollapse ? '64px' : '220px'" class="page-nav">
    
      <left />
    </el-aside>
    <el-container>
      <el-header>
        <top />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import left from "./left"
import top from "./top"
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed:{
    ...mapState(['isCollapse'])
  },
  created() {},
  methods: {},
  components: {
    top,left
  },
};
</script>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
}
.page-nav{
    height: 100%;
    background-color: #444;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-header,
.el-footer {
  background-color: #f8fafc;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  
}
</style>