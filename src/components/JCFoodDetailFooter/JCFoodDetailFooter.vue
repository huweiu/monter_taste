<template>
    <div class="detail_footer">
        <div class="footer_left">
            <i class="iconfont icon-icon22fuzhi" @click="gotoCart"></i>
            <div class="num">{{count}}</div>
        </div>
        <div class="footer_right">
            <button @click="addCart">加入购物车</button>
            <!-- <span>加入购物车</span> -->
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    import {saveCartData,getCartData} from '../../api/index'
    export default {
        // 使用该页脚的组件传递过来的数据
        props:["DataInfos"],
        name:"detail_footer",
        data(){
            return {
                count:0, // 购物车数量显示
                CartInfos:[]
            }
        },

        created(){
            this.getCartDataFromDataBase()
        },

        methods:{
            async addCart(){               
                // this.getCartDataFromDataBase()
                let mom_taste_login_id = localStorage.getItem("mon_taste_login_id")
                if(mom_taste_login_id){
                    // 如果登录的信息存在,则往购物车里添加商品
                    let dataObj = {}
                    if(this.CartInfos.length === 0){
                        // 数据购物车中一条数据都没有,现在新增加的一条记录为
                        dataObj.number = 1
                    }else{
                        // 数据库中存在数据, 对比要增加的数据和数据库中已存在的数据进行对比
                        // 如果是相同的数据则，标记数量的字段增加 一
                        for(let i = 0; i<this.CartInfos.length; i++){
                            if(this.CartInfos[i].foodName === this.DataInfos.foodName){
                                dataObj.number = this.CartInfos[i].number + 1
                            }else{
                                dataObj.number = 1
                            }
                        }
                    }
                    // 把收集的数据写进数据库,以便后续的购物车操作能顺利进行
                    // 准备数据库数据                    
                    dataObj.user_id = mom_taste_login_id // 保存用户ID唯一标识
                    dataObj.foodName = this.DataInfos.foodName
                    dataObj.desc = this.DataInfos.desc
                    dataObj.price = this.DataInfos.price
                    dataObj.discount = this.DataInfos.discount
                    dataObj.fee = this.DataInfos.fee
                    dataObj.rate = this.DataInfos.rate
                    dataObj.order = this.DataInfos.order
                    dataObj.foodinfo = this.DataInfos.foodinfo
                    dataObj.pic = this.DataInfos.pic
                    dataObj.choiceFlag = false
                    dataObj.isSale = false // 是否付付过款标志
                    // console.log(dataObj)                    
                    let result = await saveCartData(dataObj)
                    if(result.errCode === 0){
                        console.log("购物车数据保存成功")
                        this.getCartDataFromDataBase()
                    }else{
                        this.getCartDataFromDataBase()
                        console.log("购物车数据保存失败")
                    }
                }else{
                    // 如果登录信息不存在,则页面跳转到登录页面
                    this.$router.push("/login")
                }
            },

            async getCartDataFromDataBase(){
                let user_id = localStorage.getItem("mon_taste_login_id")
                let result = await getCartData(user_id)
                if(result.errCode === 0){
                    console.log("购物车数据获取成功")
                    console.log(result.data)
                    this.count = 0
                    for(let i = 0; i < result.data.length; i++){
                        console.log("BBBBBBBBBBBBBBBBBB = ",this.count)
                        this.count = this.count + result.data[i].number
                        console.log("CCCCCCCCCCCCCCCCCC = ",this.count)
                    }
                    console.log("AAAAAAAAAAAAAAAA = ",this.count)
                    this.CartInfos = result.data
                }else{
                    console.log("购物车数据获取失败")
                }
            },

            // 点击购物车图片跳转到购物车页面
            gotoCart(){
                this.$router.push("/cart")
            }
        },

        computed:{
            DataInfosCompany(){
                // 给购物车中是否选中增加标志
                this.DataInfos.choiceFlag = false
                return this.DataInfos
            },            
        }
    }
</script>

<style scoped>
.detail_footer{
    width: 100%;
    height: 45px;
    position: fixed;
    bottom: 0;
    display: flex;
    box-sizing: border-box;
    background-color: #fff;
}

.detail_footer .footer_left{
    width:50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

.detail_footer .footer_left i{
    font-size: 30px;
    padding-left: 30px;
}

.detail_footer .footer_left .num{
    width: 20px;
    height: 20px;
    font-size: 12px;
    color: #fff;
    background-color: #fe753e;
    position: absolute;
    left: 50px;
    top: 2px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;    
}

.detail_footer .footer_right{
    width:50%;
    height: 45px;
    display: flex;
    flex-direction: column;    
    justify-content: center;    
    align-items: center;
}

.detail_footer .footer_right button{
    border: none;
    font-size: 18px;
    width: 80%;
    height: 80%;
    border-radius: 25px;
    background-color: #fe753e;
    color: #fff;
}
</style>