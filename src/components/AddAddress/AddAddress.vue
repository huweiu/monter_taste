<template>
    <div class="address1">
        <div class="address_wrapper">
            <div class="address_content">
                <div class="header">
                    <i class="iconfont icon-mjiantou-copy" @click="goBack"></i>
                    <h3 class="title">添加收货地址</h3>                    
                </div>
                <van-address-edit
                    :area-list="areaList"
                    show-postal                    
                    show-set-default
                    show-search-result
                    :search-result="searchResult"
                    :area-columns-placeholder="['请选择', '请选择', '请选择']"
                    @save="onSave"
                    
                />
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import areaList from "../../assets/js/area"
    import {saveAddressInfo} from "../../api/index"
    export default {
        name:"add_address",
        data(){
            return{
                areaList,
                searchResult: []
            }
        },

         methods: {
            goBack(){
                this.$router.push("/addressAdmin")
            },

            async onSave(valueObj) {
                // val 是收集到的地址信息的一个数组
                console.log(valueObj)
                let user_id = localStorage.getItem("mon_taste_login_id")
                // 把数据保存到数据库中
                valueObj.user_id = user_id
                let result = await saveAddressInfo(valueObj)
                if(result.errCode === 0){
                    console.log("地址信息保存数据库成功")
                    // 数据保存成功页面发生跳转
                    this.$router.push("/addressAdmin")
                }else{
                    console.log("地址信息保存数据库失败")
                    return 
                }
            }            
        }
    }
</script>

<style scoped>
.address1{
    width: 100%;
    height: 100%;
}

.address1 .address_wrapper{
    width: 100%;
    height: 100%;
}

.address1 .address_wrapper .address_content{
    width: 100%;
    height: 100%;
}

.address1 .address_wrapper .address_content .header{
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
}

.address1 .address_wrapper .address_content .header i{
    font-size: 45px;
}

.address1 .address_wrapper .address_content .header .title{
    width: 75%;
    height: 100%;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>