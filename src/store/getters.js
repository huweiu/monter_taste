import Vue from "vue"

export default{
    isEmptyUserInfo(state){
        console.log("1111111111122233344")
        return state.userInfo._id === "" ? false : true
    }
}