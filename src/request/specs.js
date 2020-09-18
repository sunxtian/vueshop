import $axios from "@/common/http"  // 导入封装好的axios!

/**
 * 获取分类列表
 */
export async function getSpecs(page,size) {

    let res = await $axios.get(`/specslist?page=${page}&size=${size}`,{
        page,size
    })
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
}
/**
 * 添加分类
 * @param {*} data  添加的数据
 */
export function addSpecs(data){
    return  $axios.post("/specsadd",data)
}
/**
 * 修改分类
 * @param {*} data  修改的数据
 */
export function editSpecs(data) {
    return $axios.post("/specsedit", data)
}
/**
 * 删除分类
 * @param {*} id  删除的ID
 */
export function delSpecs(id) {
    return $axios.post("/specsdelete", {id})
}

export async function  getTotal(){
    let res = await $axios.get("/specscount")
    return res.list[0].total;
}