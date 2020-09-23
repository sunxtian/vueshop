// import $axios from "@/common/http"  // 导入封装好的axios!

// /**
//  * 获取分类列表
//  */

// export async function getSeck(page = 1, size = 10) {

//     let res = await $axios.get("/secklist",{
//        params:{
//     size,page
// }
//     })
//     if(res.code==200 && res.list){
//         return res.list
//     }else{
//         return [];
//     }
// }
// /**
//  * 添加分类
//  * @param {*} data  添加的数据
//  */
// export function addSeck(data){
//     return  $axios.post("/seckadd",data)
// }
// /**
//  * 修改分类
//  * @param {*} data  修改的数据
//  */
// export function editSeck(data) {
//     return $axios.post("/seckedit", data)
// }
// /**
//  * 删除分类
//  * @param {*} id  删除的ID
//  */
// export function delSeck(id) {
//     return $axios.post("/seckdelete", {id})
// }

// export async function getTotal(){
//     let res = await $axios.get("/response")
//     return res.list[0].total;
// }
import $axios from "@/common/http"  // 导入封装好的axios!

/**
 * 获取规格列表
 */
export async function getSeck(page = 1, size = 10) {
    let res = await $axios.get("/secklist", {
        params: {
            size,
            page
        }
    })
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }
}
/**
 * 添加规格
 * @param {*} data  添加的数据
 */
export function addSeck(data) {
    return $axios.post("/seckadd", data)
}
/**
 * 修改规格
 * @param {*} data  修改的数据
 */
export function editSeck(data) {
    return $axios.post("/seckedit", data)
}
/**
 * 删除规格
 * @param {*} uid  删除的id
 */
export function delSeck(id) {
    return $axios.post("/seckdelete", { id })
}
// 获取管理个数
export async function getTotal() {
    let res = await $axios.get("/seckcount")
    return res.list[0].total;
}

