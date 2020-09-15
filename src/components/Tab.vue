<template>
  <ul class="footer">
    <li>
      <router-link to="/" exact>
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
      </router-link>
    </li>
    <li>
      <router-link to="/menu">
        <i class="iconfont icon-menus"></i>
        <span>分类</span>
      </router-link>
    </li>
    <li>
      <router-link to="/car">
        <i class="iconfont icon-gouwuche"></i>
        <span>购物车</span>
      </router-link>
    </li>
    <li>
      <router-link to="/user">
        <i class="iconfont icon-yonghu"></i>
        <span>用户</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {},
};
</script>

<style scoped>
</style>