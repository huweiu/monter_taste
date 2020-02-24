<template>
    <div class="address1">
        <!-- <div class="address_wrapper">
            <div class="address_content">
                <div class="header">
                    <i class="iconfont icon-mjiantou-copy" @click="goBack"></i>
                    <h3 class="title">我的收货地址</h3>
                    <div @click="Add_address">
                        <a href="#">添加</a>
                    </div>
                </div>
                <div class="address_list">
                    <ul class="list_ul">
                        <li class="list" v-for="(AddressArr,index) in AddressArrs" :key="index">
                            <div class="list_left">                                
                                <p v-if="AddressArr.isDefault" class="iconHW">{{AddressArr.name}}</p>
                                <p v-else class="iconHW">{{AddressArr.name.slice(0,1)}}</p>
                            </div>
                            <div class="list_content">
                                <div>
                                    <span class="name">{{AddressArr.name}}</span>
                                    <span class="phone">{{AddressArr.tel}}</span>
                                </div>
                                <p class="detail">
                                    <span v-if="AddressArr.isDefault" class="isMR">默认</span>
                                    <span>{{AddressArr.province}}</span>
                                    <span>{{AddressArr.city}}</span>
                                    <span>{{AddressArr.county}}</span>
                                    <span>{{AddressArr.addressDetail}}</span>
                                </p>
                            </div>
                            <div class="SX">
                                <div></div>
                            </div>
                            <div class="list_edit">
                                <span class="edit">编辑</span>
                            </div>
                        </li>                        
                    </ul>
                </div>
            </div>
        </div> -->

        <div class="address_wrapper">
            <div class="address_content">
                <div class="header">
                    <i class="iconfont icon-mjiantou-copy" @click="goBack"></i>
                    <h3 class="title">我的收货地址</h3>                    
                </div>
                <!-- <div class="wrapper">
                    <div ref="pisc" class="content">
                        
                    </div>
                </div>  -->
                <van-address-list class="address_list"
                    v-model="chosenAddressId"
                    :list="list"                     
                    default-tag-text="默认"
                    @add="Add_address"
                    @edit="onEdit"            
                />               
            </div>
        </div>        
    </div>
</template>

<script>
    import {getAddressInfo} from "../../api/index"
    import BScroll from '@better-scroll/core'
    export default {
        name:"address1",
        data(){
            return {
                chosenAddressId: '1',
                AddressArrs:[],
                editDataObj:[]
            }
        },

        created(){
            this.getAddressInfoFromDataBase()            
        },

        methods:{            
            _initScroll() {
                const div = document.getElementsByClassName("van-radio-group")[0]
                const divHeight = 80
                const count = this.list.length
                div.style.height = ( divHeight ) * count + 80*3 + 'px'
                new BScroll(".address_list",{
                    click:false // 这里有一个坑  这个地方如果是true的话,会导致滑动的这个区域绑定的事件一旦触发停不下，
                                // 会自动成倍数的被自动触发
                })
            },

            goBack(){
                this.$router.push('/profile')
            },

            // 添加地址页面跳转 
            Add_address(){
                this.$router.push('/addAddress')
            },

            // 编辑地址信息
            onEdit(item,index){
                this.editDataObj.push(item)
                this.$store.dispatch("saveAddressInfo",item)
                // 页面实现跳转
                this.$router.replace("/editAddress")
            },

            async getAddressInfoFromDataBase(){
                let user_id = localStorage.getItem("mon_taste_login_id")
                let result = await getAddressInfo(user_id)
                if(result.errCode === 0){
                    // 数据库获取地址信息成功
                    console.log("获取地址信息成功")                    
                    this.AddressArrs = result.data
                    console.log(this.AddressArrs)
                }else{
                    console.log("获取地址信息失败")
                    return 
                }
            }
        },
        
        computed:{
            list(){
                let list = []
                let obj = {}
                for(let i = 0; i < this.AddressArrs.length; i++){
                    obj = {}
                    obj.id = i
                    obj._id = this.AddressArrs[i]._id
                    obj.name = this.AddressArrs[i].name
                    obj.tel = this.AddressArrs[i].tel
                    obj.address = this.AddressArrs[i].province + this.AddressArrs[i].city + this.AddressArrs[i].county  + this.AddressArrs[i].addressDetail
                    obj.isDefault = this.AddressArrs[i].isDefault
                 
                    list.push(obj)                    
                }
                console.log("BBBBBBBBBBBBBBBB",list)
                return list
            }
        },

        watch:{
            list(){
                this.$nextTick(()=>{
                    this._initScroll()
                })
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

/* .address1 .address_wrapper .address_content .wrapper{
    width: 100%;
    height: 100%;
}

.address1 .address_wrapper .address_content .wrapper .content{
    width: 100%;
} */ 

.address1 .address_wrapper .address_content .header{    
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
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

.address1 .address_wrapper .address_content .address_list{
    width: 100%;
    height: 100%;
    margin-top: 60px;
}

/* .address1 .address_wrapper .address_content .header div{
    flex:1;
}

.address1 .address_wrapper .address_content .header a{  
    font-size: 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.address1 .address_wrapper .address_content .address_list{
    width: 100%;
    height: 100%;
    background-color: #fff;
}

.address1 .address_wrapper .address_content .address_list .list_ul{
    width: 100%;
    height: 100%;
}

.address1 .address_wrapper .address_content .address_list .list{
    width: 100%;
    height: 90px;    
    box-sizing: border-box;
    padding: 8px;
    display: flex;
}

.address1 .address_wrapper .address_content .address_list .list .list_left{  
    width: 80px;
    height: 100%;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.address1 .address_wrapper .address_content .address_list .list .list_left .iconHW{ 
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #fff;
    background-color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.address1 .address_wrapper .address_content .address_list .list .SX{
    width: 3px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.address1 .address_wrapper .address_content .address_list .list .SX div{
    width: 1px;
    height: 60%;
    background-color: #ccc;
}

.address1 .address_wrapper .address_content .address_list .list .list_content{
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.address1 .address_wrapper .address_content .address_list .list .list_content .name{
    font-size: 18px;
    line-height: 25px;
}

.address1 .address_wrapper .address_content .address_list .list .list_content .phone{
    color: #999;
    line-height: 18px;
}

.address1 .address_wrapper .address_content .address_list .list .list_content .detail span{
    line-height: 20px;
    font-size: 14px;
}

.address1 .address_wrapper .address_content .address_list .list .list_content .detail .isMR{
    display: inline-block;
    width: 28px;
    height: 18px;
    color: #fff;
    background-color: #fe753e;
}

.address1 .address_wrapper .address_content .address_list .list .list_edit{
    width: 80px;
    height: 100%;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
} */
</style>