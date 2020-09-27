import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
 
import menu from "./modules/menu"
import role from "./modules/role"
import user from "./modules/user"
import category from "./modules/category"
import specs from "./modules/specs"
import goods from "./modules/goods"
import banner from "./modules/banner"
import seckill from "./modules/seckill"
import tagsview from "./modules/tagsview"
let store= new Vuex.Store({
    state:{
        isCollapse: false,
    },
    mutations:{
        change(state){
            state.isCollapse = !state.isCollapse;
            console.log(this.isCollapse)
        }
    },
    actions:{},
    modules:{
        menu,role,user,category,specs,goods,banner,seckill,tagsview
    },
    
})

export default store;