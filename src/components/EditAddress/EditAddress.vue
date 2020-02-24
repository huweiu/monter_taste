<template>
    <div class="edit_address">
        <div class="address_wrapper">
            <div class="address_content">
                <div class="header">
                    <i class="iconfont icon-mjiantou-copy" @click="goBack"></i>
                    <h3 class="title">编辑收货地址</h3>                    
                </div>
                <van-address-edit
                    :area-list="areaList"
                    :address-info="AddressInfo"
                    show-postal
                    show-delete                    
                    show-set-default
                    show-search-result
                    :area-columns-placeholder="['请选择', '请选择', '请选择']"
                    @save="onSave"
                    @delete="onDelete"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import areaList from "../../assets/js/area"
    import {updateAddressInfo,getEditAddressInfoByID,getAddressInfo,delAddressData} from "../../api/index"
    import {mapState} from "vuex"
    export default {
        name:"edit_address",
        data(){
            return{
                areaList,                
                AddressInfo:{name: '',
                                tel:"",
                                areaCode:"",
                                postalCode:"",
                                isDefault:false,
                                addressDetail: ''}
            }
        },

        created(){
            this.getEditAddressInfo()
        },

        methods:{
            goBack(){
                this.$router.push("/addressAdmin")
            },

            async onSave(valueObj) {
                // val 是收集到的地址信息的一个数组                
                let _id = this.editAddressInfo[0]._id
                let user_id = localStorage.getItem("mon_taste_login_id")
                valueObj._id = _id
                valueObj.user_id = user_id
                
                let result = await updateAddressInfo(valueObj)
                if(result.errCode === 0){
                    console.log("地址信息保存数据库成功")
                    // 数据保存成功页面发生跳转
                    this.$router.push("/addressAdmin")
                }else{
                    console.log("地址信息保存数据库失败")
                    return 
                }
            },

            // 获取要编辑条目的信息
            async getEditAddressInfo(){
                let _id = this.editAddressInfo[0]._id
                console.log(_id)
                let result = await getEditAddressInfoByID(_id)
                if(result.errCode === 0){
                    this.AddressInfo = {}
                    this.AddressInfo.name = result.data[0].name
                    this.AddressInfo.tel = result.data[0].tel
                    this.AddressInfo.areaCode = result.data[0].areaCode
                    this.AddressInfo.postalCode = result.data[0].postalCode
                    this.AddressInfo.isDefault = result.data[0].isDefault
                    this.AddressInfo.addressDetail = result.data[0].addressDetail
                }else{
                    console.log("获取编辑地址信息失败!")
                    return 
                }
            },

           async onDelete(valueObj){
                console.log(valueObj)
                let id = this.editAddressInfo[0]._id
                let result = await delAddressData(id)
                if(result.errCode === 0){
                    console.log("删除地址信息成功")
                    this.$router.replace("/addressAdmin")
                }else{
                    console.log("删除地址数据失败")
                }
            }
        },

        computed:{
            ...mapState(["editAddressInfo"])
        }
    }
</script>

<style scoped>
.edit_address{
    width: 100%;
    height: 100%;
}

.edit_address .address_wrapper{
    width: 100%;
    height: 100%;
}

.edit_address .address_wrapper .address_content{
    width: 100%;
    height: 100%;
}

.edit_address .address_wrapper .address_content .header{
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
}

.edit_address .address_wrapper .address_content .header i{
    font-size: 45px;
}

.edit_address .address_wrapper .address_content .header .title{
    width: 75%;
    height: 100%;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>