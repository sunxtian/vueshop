<template>
  <el-dialog title="增加类别" :visible.sync="info.isShow" @close="cancel" width="40%">
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
      <el-form-item label="上级目录">
        <el-select v-model="forminfo.pid" placeholder="请选择">
          <el-option label="顶级目录" :value="0"></el-option>
          <el-option
            v-for="item in catelist"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="catename">
        <el-input v-model="forminfo.catename" placeholder="请输入分类名"></el-input>
      </el-form-item>
      <el-form-item label="分类图片">
        <el-upload
          action
          :auto-upload="false"
          list-type="picture-card"
          :limit="1"
          :on-preview="see"
          :on-change="change"
          :on-remove="remove"
          :file-list="filelist"
        >
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>
        <el-dialog title="查看图片" :visible.sync="dialogVisible" :append-to-body="true">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="状态">
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
import { addCategory, editCategory } from "@/request/category";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  pid: 0,
  catename: "",
  img: "",
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
          isAdd: tree,
          isShow: false,
        };
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      forminfo: { ...defaultItem },
      rules: {
        catename: [{ required: true, message: "必填", tigger: "blur" }],
      },
      filelist: [],
    };
  },
  computed: {
    ...mapGetters({
      catelist: "category/catelist",
    }),
  },
  created() {},
  mounted() {
    if (!this.catelist.length) {
      this.get_category_list();
    }
  },
  methods: {
    ...mapActions({
      get_category_list: "category/get_category_list",
    }),
    see(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    change(file, filelist) {
      this.forminfo.img = file.raw;
    },
    remove(file, filelist) {
      this.forminfo.img = "";
    },
    setinfo(val) {
      if (val.img) {
        this.filelist = [
          {
            name: val.catename,
            url: this.$host + val.img,
          },
        ];
      }
      val.children ? delete val.children : "";
      defaultItem = { ...val };
      this.forminfo = { ...val };
      this.dialogImageUrl = this.$host + val.img;
      console.log(this.filelist.url);
    },
    async sumbit() {
      console.log(this.forminfo);
      // return ;
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res;
          let fd = new FormData();
          for (let k in this.forminfo) {
            fd.append(k, this.forminfo[k]);
          }
          if (this.info.isAdd) {
            res = await addCategory(fd);
            console.log(fd.img);
          } else {
            res = await editCategory(fd);
          }
          if (res.code === 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_category_list();
            this.cancel();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      if (this.info.isAdd) {
        // 添加时候的重置！
        this.forminfo = { ...resetItem };
      } else {
        // 修改时候的重置！
        this.setinfo({ ...defaultItem });
      }
    },
    cancel() {
      //  // 无论是修改成功还是添加成功，都应该让表单为空！或者弹框关闭的时候！
      this.forminfo = { ...resetItem };
      this.filelist = []; // 设为空，就没有了
      console.log(this.forminfo);
    },
  },
  components: {},
};
</script>

<style scoped>
</style>