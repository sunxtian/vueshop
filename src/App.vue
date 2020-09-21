<template>
 <div>
   <router-view></router-view>

</div>
</template>

<script>
import Tab from '@/components/Tab'
 export default {
   data () {
     return {}
   },
   created() {},
   methods: {},
   components: {
     Tab,
   }
 }
</script>

<style>
*{
  margin: 0; 
  padding: 0;
}
.el-dialog__header{
  border-bottom: 2px solid;
}
.el-button{
  margin: 10px;
}
</style>