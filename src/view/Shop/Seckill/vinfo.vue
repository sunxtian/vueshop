<template>
  <el-dialog
    :title="info.isAdd ? '添加活动' : '修改活动'"
    :visible.sync="info.isShow"
    @close="cancel"
    width="60%"
  >
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="100px">
      <el-tabs v-model="activeName">
        <el-row>
          <el-col :span="15" :offset="5">
            <el-form-item label="活动名称" prop="title">
              <el-input
                v-model="forminfo.title"
                placeholder="请输入活动名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="活动名称" prop="time">
              <el-date-picker
                v-model="value2"
                type="datetimerange"
                :picker-options="timm"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="一级分类">
              <el-select
                v-model="forminfo.first_cateid"
                @change="topChange"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in catelist"
                  :key="item.id"
                  :label="item.catename"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
              <el-select
                v-model="forminfo.second_cateid"
                @change="goChange"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in secondlist"
                  :key="item.id"
                  :label="item.catename"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择商品">
              <el-select v-model="forminfo.goodsid" placeholder="请选择">
                <el-option
                  v-for="item in thirdlist"
                  :key="item.id"
                  :label="item.goodsname"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-tabs>
      <el-row>
        <el-col :span="15" :offset="6">
          <el-form-item label>
            <el-button type="primary" @click="sumbit">立即添加</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import vueWangeditor from "vue-wangeditor";
import { addSeck, editSeck } from "@/request/seckill";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  // id: 0,
  title: "",
  begintime: "",
  endtime: "",
  first_cateid: "",
  second_cateid: "",
  goodsid: "",
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
        // catename: [{ required: true, message: "必填", tigger: "blur" }],
      },
      thirdlist: [],
      filelist: [],
      activeName: "first",
      secondlist: [],
      attrslist: [],
      timm: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },

      value2: [],
    };
  },
  computed: {
    ...mapGetters({
      catelist: "category/catelist",
      // specslist: "specs/specslist",
      goodslist: "goods/goodslist",
    }),
  },
  created() {},
  mounted() {
    if (!this.catelist.length) {
      this.get_category_list();
    }
    // if (!this.specslist.length) {
    //   this.get_specs_list();
    // }
    if (!this.goodslist.length) {
      this.get_goods_list();
    }
  },

  methods: {
    ...mapActions({
      get_category_list: "category/get_category_list",
      // get_specs_list: "specs/get_specs_list",
      get_goods_list: "goods/get_goods_list",
      get_seck_list: "seckill/get_seck_list",
    }),

    topChange(id) {
      (this.secondlist = []), (this.forminfo.second_cateid = "");
      this.catelist.forEach((val) => {
        // console.log(val)
        if (val.id == id) {
          this.secondlist = val.children;
        }
      });
    },
    goChange(id) {
      (this.thirdlist = []), (this.forminfo.goodsid = "");
      this.goodslist.forEach((val) => {
        
        if (val.second_cateid == id) {
          this.thirdlist.push(val);
        }
      });
    },
    
    goodsChange(id) {
      this.filelist = [];
      this.forminfo.goodsid = [];
      this.goodslist.forEach((val) => {
        if (val.id == id) {
          this.filelist = val.attrs;
        }
      });
    },
    setinfo(val) {
      // this.value2.begintime = val.begintime
      // this.value2.endtime = val.endtime
      val.children ? delete val.children : "";
      
      this.value2.push(new Date(parseInt(val.begintime)).toString());
      this.value2.push(new Date(parseInt(val.endtime)).toString());
      // console.log(this.value2);
      this.topChange(val.first_cateid);
      // this.specsChange(val.specsid);
      this.goChange(val.second_cateid);
      "firstcatename" in val ? delete val.firstcatename : "";
      "secondcatename" in val ? delete val.secondcatename : "";
      "goodsname" in val ? delete val.goodsname : "";
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    async sumbit() {
      console.log(this.value2);

      this.forminfo.begintime = Date.parse(new Date(this.value2[0]));
      // this.value2[0].getTime(
      this.forminfo.endtime = Date.parse(new Date(this.value2[0]));
      // this.value2[1].getTime();
      console.log(this.forminfo);
      // this.forminfo.description = this.$refs.Wangeditor.getHtml();
      // return ;
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res;
          
          if (this.info.isAdd) {
            res = await addSeck(this.forminfo);
          
          } else {
            res = await editSeck(this.forminfo);
          }
          if (res.code === 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_seck_list();
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
      this.value2 = [];
      // this.filelist = []; // 设为空，就没有了
    },
  },
  components: {
    vueWangeditor,
  },
};
</script>

<style scoped>
</style>