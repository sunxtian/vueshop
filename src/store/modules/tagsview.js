/**
 * 获取菜单列表
 */
import router from "@/router"
let taglist = localStorage.getItem('taglist') ? JSON.parse(localStorage.getItem('taglist')) : []
export default {
    // namespaced: true,
    namespaced: true,
    state: {
        taglist: taglist
    },
    getters: {
        taglist: state => state.taglist
    },
    mutations: {
        // 设置标签
        SET_TAGS(state, route) {
            // 判断是否已经存在？如果存在就不添加了
            let isExist = state.taglist.some(val => val.path == route.fullPath)
            if (!isExist) {
                state.taglist.push({
                    name: route.meta.title,
                    path: route.fullPath
                })
                localStorage.setItem('taglist', JSON.stringify(state.taglist))
            }
        },
        // 删除一个
        DEL_TAGS(state, { index, isActive }) {
            // 激活
            
            if (isActive) {
                state.taglist.splice(index, 1)
                console.log(state.taglist.length)
                // 跳转到index-1的地址去
                if (state.taglist.length != 0) {
                    console.log(22)
                    if (index == 0) {  // 删除第是第一个，那么就向后走，但是其实还是index下标这个，因为数组已经发生变化了
                        router.push(state.taglist[index].path)
                        console.log('到了' + state.taglist)
                        localStorage.setItem('taglist', JSON.stringify(state.taglist))
                    } else {  // 删除的不是第一个，那么就展示前面一个
                        router.push(state.taglist[index - 1].path)
                        localStorage.setItem('taglist', JSON.stringify(state.taglist))
                    }
                   
                } else {
                    router.push('/')
                    localStorage.setItem('taglist', JSON.stringify(state.taglist))
                }
                
                
            
            } else {
                console.log(state.taglist.length)
                state.taglist.splice(index, 1)
                if (state.taglist.length == 0 ){
                    state.taglist.splice(index, 1)
                }
                localStorage.setItem('taglist', JSON.stringify(state.taglist))
            }
           
        },
        DEL_ALL(state) {
            state.taglist = [];
            localStorage.removeItem('taglist')
            router.push('/')
        },
        DEL_OTHER_ALL(state, path) {
            state.taglist = state.taglist.filter(val => val.path === path);
            
            localStorage.setItem('taglist', JSON.stringify(state.taglist))
            
        }
    }
}