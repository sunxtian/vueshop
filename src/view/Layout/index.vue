<template>
  <el-container class="page">
    <el-aside :width="isCollapse ? '64px' : '220px'" class="page-nav">
      <left />
    </el-aside>
    <el-container>
      <el-header>
        <top />
      </el-header>
      <el-main height="" class="page-main">
        <taglist/>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import left from "./left";
import top from "./top";
import taglist from "./tagsviews";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["isCollapse"]),
  },
  created() {},
  methods: {},
  components: {
    top,
    left,
    taglist
  },
};
</script>

<style scoped>
.page {
  width: 100vw;
  /* height: 100vh; */
}
.page-nav {
  height: 100%;
  background-color: #444;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.page-main{
    position: relative;
    padding-top: 50px;
}
.page-header{
    background-color: #fff;
    box-shadow:  0 0 4px 0 rgba(0,0,0,.3);
     position: relative;
  z-index: 1000;
}
.el-header {
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