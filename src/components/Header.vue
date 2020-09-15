<template>
 <div class="header">
   <i v-if="isback" @click="$router.back()" class="icon-l iconfont icon-fanhui"></i>
			<h3>{{title}}</h3>
		<slot></slot>
		</div>
</template>

<script>
 export default {
   props:{
     isback:{
       type:Boolean,
       default:false
     },
     title:{
       type:String,
       default:"商城"
     }
   },
   data () {
     return {

     }
   },
   created() {},
   methods: {},
   components: {}
 }
</script>

<style scoped>
@import url("./assets/css/style.css");
</style>