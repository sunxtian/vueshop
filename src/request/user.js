import $axios from "@/common/http"  // 导入封装好的axios!

/**
 * 获取管理员列表
 */
export async function getUser(page = 1, size = 10) {
    console.log("nihoa")
    let res = await $axios.get("/userlist", {
        params: {
            size, page
        }
    })
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }
}
/**
 * 添加管理员
 * @param {*} data  添加的数据
 */
export function addUser(data) {
    return $axios.post("/useradd", data)
}
/**
 * 修改管理员
 * @param {*} data  修改的数据
 */
export function editUser(data) {
    return $axios.post("/useredit", data)
}
/**
 * 删除管理员
 * @param {*} id  删除的ID
 */
export function delUser(id) {
    return $axios.post("/userdelete", { id })
}

export async function getTotal(){
    let res = await $axios.get('/usercount')
    return res.list[0].total;
}
export function Login(data) {
    return $axios.post("/userlogin", data)
}