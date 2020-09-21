import $axios from "@/common/http"  // 导入封装好的axios!

/**
 * 获取轮播图列表
 */
export async function getBanner(page,size) {

    let res = await $axios.get(`/bannerlist?istree=1`)
    // ,{
        // /bannerlist?page=${page}&size=${size}
        // page,size
    // })
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
}
/**
 * 添加轮播图
 * @param {*} data  添加的数据
 */
export function addBanner(data){
    return  $axios.post("/banneradd",data)
}
/**
 * 修改轮播图
 * @param {*} data  修改的数据
 */
export function editBanner(data) {
    return $axios.post("/banneredit", data)
}
/**
 * 删除轮播图
 * @param {*} id  删除的ID
 */
export function delBanner(id) {
    return $axios.post("/bannerdelete", {id})
}

// export async function  getTotal(){
//     let res = await $axios.get("/bannercount")
//     return res.list[0].total;
// }