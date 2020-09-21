<template>
  <el-dialog title="提示" :visible.sync="info.isShow" @close="cancel" width="40%">
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
      <el-form-item label="图片名称" prop="title">
        <el-input v-model="forminfo.title" placeholder="请输入图片名称"></el-input>
      </el-form-item>
      <el-form-item label="轮播图片">
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
import { addBanner, editBanner } from "@/request/banner";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  id: 0,
  title: "",
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
          isAdd: false,
          isShow: false,
        };
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      // dialogVisible:false,
      forminfo: { ...defaultItem },
      rules: {},
      filelist: [],
    };
  },
  computed: {
    ...mapGetters({
      bannerlist: "banner/bannerlist",
    }),
  },
  created() {},
  mounted() {
    console.log("aaa");
    if (!this.bannerlist.length) {
      this.get_banner_list();
    }
  },
  methods: {
    ...mapActions({
      get_banner_list: "banner/get_banner_list",
    }),
    see(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    change(file, filelist) {
      this.forminfo.img = file.raw;
    },
    setinfo(val) {
      defaultItem = { ...val };
      this.forminfo = { ...val };
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
            res = await addBanner(fd);
          } else {
            res = await editBanner(fd);
          }
          if (res.code === 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_banner_list();
            this.forminfo = { ...defaultItem };
            this.cancel();
          } else {
            this.$message.error(res.msg);
          }
          // this.cancel();
        }
      });
    },
    reset() {
      if (this.info.isAdd) {
        // 添加时候的重置！
        this.forminfo = { ...resetItem };
         this.filelist = []; 
      } else {
        // 修改时候的重置！
        this.setinfo({ ...defaultItem });
      }
    },
    cancel() {
      //  // 无论是修改成功还是添加成功，都应该让表单为空！或者弹框关闭的时候！
      this.forminfo = { ...resetItem };
      this.filelist = []; 
      // 设为空，就没有了
    },
  },
  components: {},
};
</script>

<style scoped>
</style>