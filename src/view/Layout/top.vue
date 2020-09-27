<template>
  <div class="header">
    <div class="lt">
      <el-button
        size="small"
        v-if="iscollapse"
        type="success"
        @click="change"
        class="toggle-btn"
        icon="el-icon-s-unfold"
        circle
      ></el-button>
      <el-button
        v-else
        size="small"
        type="success"
        @click="change"
        class="toggle-btn"
        icon="el-icon-s-unfold"
        circle
      ></el-button>
      
      <el-breadcrumb style="margin:10px" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/menu'}">{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
        <el-button
          size="small"
          v-if="$route.path!='/index'"
          @click="$router.back()"
          icon="el-icon-back"
          circle
        ></el-button>
    </div>
    <div class="mbx">
      <el-dropdown>
        <span class="el-dropdown-link">{{username}}，你好</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-s-custom">编辑个人信息</el-dropdown-item>
          <el-dropdown-item icon="el-icon-chat-dot-square">我的信息</el-dropdown-item>
          <el-dropdown-item @click.native="QUIT" icon="el-icon-circle-plus-outline">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations,mapGetters,mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapState(["iscollapse"]),
    ...mapGetters({
      username:"user/username"
    })
  },
  methods: {
    ...mapMutations({
      change: "change",
      // QUIT: "user/quit",
    }),
    ...mapActions({
      QUIT: "user/quit",
    }),
    handleClick() {
      alert("button click");
    },
  },
  components: {},
};
</script>

<style scoped>
/* el-dropdown {
  background: rgb(231, 235, 13);
} */
.el-dropdown {
  /* background-color: #fff; */
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.header .lt {
  display: flex;
  margin: 0 20px;
  text-align: center;
  align-items: center;
}
.header .mbx {
  margin: 0 20px;
}
</style>