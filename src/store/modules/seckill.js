// 获取菜单列表！
import { getSeck } from "@/request/seckill"


export default {
    namespaced: true,
    state: {
        secklist: [],  // 列表
        // page: 1, // 页码数
        // size: 10, // 每页数量
        // total: 0 //总条数
    },
    getters: {
        secklist: state => state.secklist,
        // page: state => state.page,
        // size: state => state.size,
        // total: state => state.total
    },
    mutations: {
        SET_LIST(state, data) {
            state.secklist = data;
        },
        // SET_PAGE(state, data) {
        //     state.page = data;
        // },
        // SET_SIZE(state, data) {
        //     state.size = data;
        // },
        // SET_TOTAL(state, data) {
        //     state.total = data;
        // }
    },
    actions: {
        // 请求菜单列表的数据！
        async get_seck_list({ commit, state, dispatch }) {
            let res = await getSeck(state.page, state.size);
            res.forEach(val=>{
                val.specsattr = val.specsattr ? val.specsattr.split(","):[]
            })
            commit('SET_LIST', res)
            // 请求数量
            // dispatch('get_seck_total')
        },
        // 获取规格的总数
        // async get_seck_total({ commit }) {
        //     let res = await getTotal();
        //     commit('SET_TOTAL', res)
        // },
        // set_page({ commit, dispatch }, data) {
        //     commit('SET_PAGE', data)
        //     dispatch('get_seck_list')
        // },
        // set_size({ commit, dispatch }, data) {
        //     commit('SET_SIZE', data)
        //     dispatch('get_seck_list')
        // }
    }
};