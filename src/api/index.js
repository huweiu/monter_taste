/**
 * 包含项目使用到的所有请求服务器的的方法
 * 返回值是Promise的实例 
*/

import ajax from "./ajax"  // 引入封装好的ajax方法
const BASE_URL = "http://localhost:6000/api/users"
//const BASE_URL = "/api" 

// 获取短信验证码get请求
export const getMessageCode = async (phoneNum)=>{
    console.log("222222222222222")
    console.log(BASE_URL)
    return await ajax(BASE_URL + "/sendcode",{phoneNum})    
}

// 短信验证码注册或者登录 post 请求
export const loginMessCode = async (phoneNum,Code)=>{
    console.log("3333333")
    console.log(BASE_URL)
    return await ajax(BASE_URL + "/loginSms",{phoneNum,Code},"POST")
}

// 密码登录 post 请求
export const loginPwd = async (userName,passWord,captcha,captcha_id)=>{    
    return await ajax(BASE_URL + "/login_pwd",{userName,passWord,captcha,captcha_id},"POST")
}

// 用户注册post请求
export const UserRegister = async (userName,passWord,phoneNum)=>{
    return await ajax(BASE_URL + "/register",{userName,passWord,phoneNum},"POST")
}

// 查询用户是否已经被注册get请求
export const checkUserName = async (userName)=>{    
    return await ajax(BASE_URL + "/check_name",{userName})    
}

// 获取图形验证码
export const  getCaptchaMsg = async ()=>{    
    return await ajax(BASE_URL + "/captcha?time" + Date.now(),{})    
}

// 异步请求服务器实现用户的自动登录get请求
export const AsyncgetuserInfo = async (user_id) =>{
    return await ajax(BASE_URL + "/getuserInfo",{user_id})
}

// 异步请求服务器获取服务器精美家常菜后台数据
export const getJCFoodInfo = async () =>{
    return await ajax(BASE_URL + "/getJCFoodInfoDataBase")
}

// 异步请求服务器获取服务器精美家常菜后台数据
export const getJPFoodRecData = async () =>{
    return await ajax(BASE_URL + "/getJPFoodRecInfoData")
}

// 把购物车数据保存在数据库中
export const saveCartData = async (dataObj) =>{
    return await ajax(BASE_URL + "/saveCartDataToDataBase",{dataObj},"POST")
}

// 获取购物车的数据展示在前端页面
export const getCartData = async (user_id) =>{
    return await ajax(BASE_URL + "/getCartDataFromDataBase",{user_id})
}

// 修改购物车数据
export const UpdateCartData = async (updateObj) => {
    return await ajax(BASE_URL + "/updateCartData",{updateObj},"POST")
}

// 客户端 删除数据库中单条数据记录 (删除单条数据信息)
export const delsignalCartData = async (id)=>{
    return await ajax(BASE_URL + `/delsignalCartData/${id}`,{id},"DELETE")    
}

// 客户端 删除数据库中所有数据记录 (删除所有数据信息)
export const delAllCartDataFromDataBase = async (user_id)=>{
    return await ajax(BASE_URL + `/delAllCartData/${user_id}`,{user_id},"DELETE")    
}

// 客户端 保存客户地址信息到数据库
export const saveAddressInfo = async (valueObj) => {
    return await ajax(BASE_URL + "/saveAddressData",{valueObj},"POST")
}

// 获取地址信息数据展示在前端页面
export const getAddressInfo = async (user_id) =>{
    return await ajax(BASE_URL + "/getAddressInfoFromDatabase",{user_id})
}

// 编辑地址时获取要编辑地址的的信息
export const getEditAddressInfoByID = async (_id) => {
    return await ajax(BASE_URL + "/getEditAddressInfoById",{_id})
}

// 客户端 更新客户地址信息到数据库
export const updateAddressInfo = async (valueObj) => {
    return await ajax(BASE_URL + "/updateAddressData",{valueObj},"POST")
}

// 客户端 删除数据库中地址信息
export const delAddressData = async (id)=>{
    return await ajax(BASE_URL + `/delAddressData/${id}`,{id},"DELETE")    
}

// 客户端  获取商品分类列表数据
export const getClassifyListsData = async () => {
    return await ajax(BASE_URL + "/getClassifyListsData")
}

// 客户端  获取商品分类 数据
export const getClassifyData = async () => {
    return await ajax(BASE_URL + "/getClassifyData")
}

