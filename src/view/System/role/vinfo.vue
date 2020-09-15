<template>
  <el-dialog
    :title="info.isAdd ? '添加角色':'修改角色'"
    
    :visible.sync="info.isShow"
    @close="cancel"
    width="40%"
  >
    <el-form :model="forminfo" 
    :rules="rules"
    ref="form" label-width="140px">
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="forminfo.rolename" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色权限">
        <el-tree
          default-expand-all
          node-key="id"
          ref="tree"
          :data="menulist"
          show-checkbox
          :props="{children:'children',label:'title'}"
          :check-strictly="checkStrictly"
        ></el-tree>
      </el-form-item>
      <el-form-item label="角色状态">
        <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="sumbit">提交</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addRole, editRole } from "@/request/role";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  rolename: "",
  menus: "",
  status: 1, // 状态1正常2禁用
};
let resetItem = { ...defaultItem };
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          // dialogVisible: false,
          isAdd: true,
          isShow: false,
        };
      },
    },
  },
  data() {
    return {
      // dialogVisible:false,
      forminfo: { ...defaultItem },
      rules: {
        rolename: [{ required: true, message: "必填", tigger: "blur" }],
      },
      checkStrictly: false,
    };
  },
  computed: {
    ...mapGetters({
      menulist: "menu/menulist",
    }),
  },
  created() {},
  mounted() {
    // console.log("aaa");
    if (!this.menulist.length) {
      this.get_menu_list();
    }
  },
  methods: {
    ...mapActions({
      get_role_list: "role/get_role_list",
      get_menu_list: "menu/get_menu_list",
    }),
    setinfo(val) {
      let idarr = val.menus.split(",");
      // console.log(val.status);
      if (idarr[0]) {
        this.checkStrictly = true;
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(idarr);
          this.checkStrictly = false;
        });
      }
      defaultItem = { ...val };
      this.forminfo = { ...val };
      console.log(this.forminfo.status)
    },
    async sumbit() {
      let idarr = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      if (idarr.length) {
        this.forminfo.menus = idarr;
      } else {
        this.$message.warning("请选择权限");
        return;
      }
      this.$refs.form.validate(async (valid)=>{
        if(valid){
          let res;
          if(this.info.isAdd){
            res = await addRole(this.forminfo);
          } else {
            res = await editRole(this.forminfo);
          }
          if(res.code == 200){
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_role_list(); // 重新获取角色列表！
            this.cancel();
          }else{
            thsi.$message.error(res.msg)
          }
        }
      })
    },
    reset() {
      if (this.info.isAdd) {
        // 添加时候的重置！
        this.forminfo = { ...resetItem };
        this.$refs.tree.setCheckedKeys([]);
      } else {
        // 修改时候的重置！
        this.setinfo({ ...defaultItem });
      }
    },
    cancel() {
      this.$refs.tree.setCheckedKeys([]);
      this.forminfo = { ...resetItem };
    },
  },
  components: {},
};
</script>

<style scoped>
</style>