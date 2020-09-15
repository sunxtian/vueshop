<template>
  <div class="aside" style="background-color: #a2bffa">
    <h3 class="logo">小U商城后台</h3>
    <el-menu
      class="el-menu-vertical-demo"
      router
      :default-active="$route.path"
      :collapse="isCollapse"
    >
      <!--   :default-active="$route.path"   -->
      <el-menu-item index="/index">
        <i class="el-icon-house"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>
      <template  v-for="(item,index) in menus">
        <el-menu-item v-if="item.type==2" :index="item.url">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
        <el-submenu v-else :index="index+''">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item :index="val.url" v-for="(val,idx) in item.children" :key="idx">{{val.title}}</el-menu-item>
        </el-submenu>
      </template>
      <el-button @click="upd">
        菜单更新
      </el-button>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapGetters,mapActions } from "vuex";
// import { mapState } from 'vuex'
export default {
  data() {
    return {
      data: [{ title: 111, ss: 22 }],
      // menus:[]
      //   isCollapse: true,
    };
  },
  computed: {
    ...mapState(["isCollapse"]),
    ...mapGetters({
      menus: "user/menus",
    }),
  },
  updated() {
    
    console.log(this.isCollapse);
   
  },
  created() {},
  methods: {
    // ...mapActions({
    //   get_menu_list: "this.get_menu_list()",
    // }),
    upd(){
      this.menus = this.get_menu_list;
    }
  },
  components: {},
};
</script>

<style scoped>
.logo{
  line-height: 60px;
  text-align: center;
  color: #fff;
  background-color: #a2bffa;
  white-space: nowrap;
  overflow: hidden;
}
.aside {
  /* width: 100vw; */

  background-color: #a2bffa;
  color: rgb(155, 56, 56);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  height: 100vh;
  background-color: #abc4ee !important;
  color: #def109;
  /* width: 200px; */
  /* min-height: 400px; */
}

.el-menu {
  /* margin: 0 !important;
  padding: 0 !important; */
  background-color: #abc4ee !important;
}
</style>