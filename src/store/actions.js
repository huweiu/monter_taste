import Vue from "vue"

import {
    AsyncgetuserInfo
} 
from "../api"

import {
    RECEIVE_USERINFO,
    LOG_OUT,
    SAVE_JCFOOD_DETAIL_DATA,
    SAVE_CART_INFO,
    EDIT_ADDRESS_INFO,
    SAVE_CLASSIFY_DATA
}
from "./mutation_type"
export default{
    // 获取用户信息
    receiveUserInfo({commit,state},user){
        commit(RECEIVE_USERINFO,{user})
    },

    // 异步请求服务器，实现自动登录
    async getuserInfo({commit,state},user_id){
        let result = await AsyncgetuserInfo(user_id)
        if(result.errCode === 0){
            // 获取数据库数据成功
            // 把数据提交到mutation 用来保存用户信息，实现用户号自动登录
            let user = result.data
            console.log("actions")
            console.log(user)    // user 和 mutations中方法的user保持一致，这是个坑
            commit(RECEIVE_USERINFO,{user})
        }
    },

    Logout({commit,state}){
        console.log("33333#########")
        commit(LOG_OUT)
    },
    // 保存家常菜详细信息数据
    saveJCFoodDetailData({commit,state},dataObj){
        commit(SAVE_JCFOOD_DETAIL_DATA,dataObj)
    },

    //保存添加在购物车中的商品信息
    saveCartInfo({commit,state},DataInfosCompany){
        commit(SAVE_CART_INFO,DataInfosCompany)
    },

    saveAddressInfo({commit,state},item){
        commit(EDIT_ADDRESS_INFO,item)
    },

    saveClassifyData({commit,state},dataObj){
        commit(SAVE_CLASSIFY_DATA,dataObj)
    }


}

