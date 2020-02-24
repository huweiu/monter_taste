import Vue from "vue"
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
    [RECEIVE_USERINFO](state,{user}){
        console.log("^^^^^^^^^")
        console.log(user)
        state.userInfo = user
    },

    [LOG_OUT](state){
        console.log("%%%%%%%%%%112233")
        console.log(state.userInfo)
        state.userInfo._id = ""
        // console.log($$$11122333)
        // console.log(state.userInfo)
    },

    [SAVE_JCFOOD_DETAIL_DATA](state,dataObj){
        console.log("3333==== ",dataObj)
        state.JCFoodDataInfo = dataObj
        console.log("4444444444444444444444==== ",state.JCFoodDataInfo)
    },

    [SAVE_CART_INFO](state,DataInfosCompany){
        state.CartInfos.push(DataInfosCompany)
    },

    [EDIT_ADDRESS_INFO](state,item){
        state.editAddressInfo = []
        state.editAddressInfo.push(item)
    },

    [SAVE_CLASSIFY_DATA](state,dataObj){
        state.JCFoodDataInfo = dataObj
    }


}