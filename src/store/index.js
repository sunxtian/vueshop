import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
 
import menu from "./modules/menu"
import role from "./modules/role"
import user from "./modules/user"
import category from "./modules/category"
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
        menu,role,user,category
    },
    
})

export default store;