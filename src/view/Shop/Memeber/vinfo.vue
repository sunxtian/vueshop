<template>
  <el-dialog
    title="修改信息"
    :visible.sync="info.isShow"
    @close="cancel"
    width="40%"
  >
    <el-form :model="forminfo" ref="form" label-width="140px">
      <el-form-item label="会员名" prop="nickname">
        <el-input
          v-model="forminfo.nickname"
          readonly
          placeholder="请输入属性名"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          style="dispaly: inline-block; width: 160px; margin-bottom: 10px"
          v-model="forminfo.phone"
          readonly
          placeholder="手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="forminfo.password"
          placeholder="为空不修改密码"
        ></el-input>
      </el-form-item>

      <el-form-item label="会员状态">
        <el-switch
          v-model="forminfo.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="sumbit">提交</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { editMember } from "@/request/memeber";

let defaultItem = {
  nickname: "",
  phone: "",
  password: "",
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
      forminfo: { ...defaultItem },
    };
  },

  methods: {
    setinfo(val) {
      val.password = "";
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    async sumbit() {
      console.log("daol");
      this.$refs.form.validate(async valid => {
        if (valid) {
          let res;
          res = await editMember(this.forminfo);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.$emit("update");
            this.cancel();
          } else {
            this.$message.error(res.msg);
          }
        }
      })
    },
    reset() {
      // 修改时候的重置！
      this.setinfo({ ...defaultItem });
    },
    cancel() {
      //  // 无论是修改成功还是添加成功，都应该让表单为空！或者弹框关闭的时候！
      this.forminfo = { ...resetItem };
    },
  },
  components: {},
};
</script>

<style scoped>
</style>