<template>
 <div>
  
   <el-button type="primary" @click="add">添加轮播图</el-button>

    <v-list @edit="edit"></v-list>
    <v-info :info="info" ref="dialog"></v-info>
</div>
</template>

<script>
import VList from "./list" 
import VInfo from "./vinfo" 
 export default {
   data () {
     return {
       info:{
        //  dialogVisible:false,
         isAdd:false,
         isShow:false
       }
     }
   },
   created() {},
   methods: {
     change(){
       this.info.dialogVisible = true;
     },
     add(){
       this.info.isAdd = this.info.isShow = true; 
       console.log("哈哈")
     },
     edit(val){
        this.info.isAdd = false;
        this.info.isShow = true;
        // 调用弹框组件的setinfo方法！
        this.$refs.dialog.setinfo(val);
      }
   },
   components: {
     VList,VInfo
   }
 }
</script>

<style scoped>
.el-button{
  margin: 10px;
}
</style>