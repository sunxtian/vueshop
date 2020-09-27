<template>
  <div class="table-bg">
    <el-table :data="list">
      <el-table-column
        prop="uid"
        label="用户ID"
        width="320"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        align="center"
      ></el-table-column>
      <el-table-column label="注册日期">
        <template slot-scope="scope">
          {{ scope.row.addtime | dataTime }}
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status == 1">启用</el-tag>
          <el-tag type="danger" v-if="scope.row.status == 2">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="修改">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="small"
            @click="edit(scope.row)"
            circle
            icon="el-icon-edit"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// import { mapGetters, mapActions, mapMutations } from "vuex";
// import { mapGetters, mapActions, mapMutations } from "vuex";
import { getMember, editMember } from "@/request/memeber";
export default {
  data() {
    return {
      list:[]
    };
  },
 
  mounted() {
   this.get_list();
    // console.log(this.memberlist);
  },
  methods: {
    
    edit(val) {
      this.$emit("edit", { ...val });
    },
    async get_list(){
        let res = await getMember();
        console.log(res);
        this.list = res;
    },
    async del(id) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await delSpecs(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
           
            this.get_list();
            // console.log("执行力");
            // console.log(arr)// 重新获取列表！
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    },
  },
  components: {},
};
</script>
<style scoped>
*{
  text-align: center;
}
</style>