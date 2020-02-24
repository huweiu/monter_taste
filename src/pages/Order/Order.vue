<template>
    <div class="order">
        <div class="order_header">
            <i class="iconfont icon-mjiantou-copy" @click="$router.push('/cart')"></i>
            <h3 class="title">确认订单</h3>
        </div>
        <div class="order_wrapper">
            <div ref="content" class="order_content">
                <div class="order_address">
                    <div class="left">
                        <i class="iconfont icon-weizhi"></i>
                    </div>
                    <div class="middle">
                        <div>
                            <span class="name">{{AddressArrs.name}}</span>
                            <span class="phone">{{AddressArrs.tel}}</span>
                        </div>
                        <p class="detail">
                            <span>{{AddressArrs.province}}</span>
                            <span>{{AddressArrs.city}}</span>
                            <span>{{AddressArrs.county}}</span>
                            <span>{{AddressArrs.addressDetail}}</span>
                        </p>
                    </div>
                    <div class="right">
                        <i class="iconfont icon-arrow-right" @click="$router.replace('/addressAdmin')"></i>
                    </div>
                </div>
                <ul class="order_list_wrapper">
                    <li class="order_list" v-for="(CartInfoArr,index) in CartInfoArrs" :key="index">
                        <img style="width:110px;height:110px;" :src="CartInfoArr.pic" alt="">
                        <div class="order_list_right">
                            <h3 class="food_name">{{CartInfoArr.foodName}}</h3>
                            <span class="price">原价¥ {{CartInfoArr.price}}</span>
                            <span v-if="CartInfoArr.discount > 0" class="discount">折扣价¥ {{CartInfoArr.discount}}</span>
                            <div class="content_wrapper">
                                <p class="food_info">{{CartInfoArr.foodinfo}}</p>
                                <span class="food_count">×{{CartInfoArr.number}}</span>
                            </div>
                            <div class="order_total">
                                <span>共{{CartInfoArr.number}}件</span>
                                <span class="xj">小计: ¥ {{parseInt(CartInfoArr.discount) > 0 ? parseInt(CartInfoArr.discount)*CartInfoArr.number : parseInt(CartInfoArr.price)*CartInfoArr.number}}</span>
                            </div>
                        </div>
                    </li>                    
                </ul>
            </div>
        </div>
        <div class="order_footer">
            <div style="width:40px;height:100%;"></div>
            <div class="footer_content">
                <div class="content_top">
                    <span class="total_num">共{{totalNum}}件,</span>
                    <span class="total_price">合计: ¥{{totalPrice}}</span>
                </div>
                <div class="content_bottom">
                    <span v-if="totalPrice < 20" class="fee">配送费{{5}}元 </span>
                    <span class="yh_message">享折扣已为您节省{{saveMoney}}元</span>
                </div>
            </div>
            <div class="btn">
                <button>提交订单</button>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from '@better-scroll/core'
    import {getCartData,getAddressInfo} from "../../api/index"
    export default {
        name:"order",
        data(){
            return {
                CartInfos:[],
                AddressArrs:{
                    name:"",
                    tel:"",
                    province:"",
                    city:"",
                    county:"",
                    addressDetail:""
                }
            }
        },
        
        created(){
            this.getCartDataFromDataBase()
            // this.getAddressInfoFromDataBase()
        },

        mounted(){
            this.getAddressInfoFromDataBase()
        },
        
        methods:{
             _initScroll() { 
                const content = this.$refs.content
                const divHeight = 110
                const paddingHeight = 16
                const marginHeight = 10

                const count = this.CartInfoArrs.length
                content.style.height = (divHeight + paddingHeight + marginHeight) * count + 30 + (120*2) + 'px'
                new BScroll(".order_wrapper",{
                    click:false // 这里有一个坑  这个地方如果是true的话,会导致滑动的这个区域绑定的事件一旦触发停不下，
                                // 会自动成倍数的被自动触发
                })
            },
            // 获取购物车中被选中的条目在页面中显示
            async getCartDataFromDataBase(){
                let user_id = localStorage.getItem("mon_taste_login_id")
                let result = await getCartData(user_id)
                if(result.errCode === 0){
                    console.log("购物车数据获取成功")               
                    this.CartInfos = result.data
                }else{
                    console.log("购物车数据获取失败")
                }
            },

            async getAddressInfoFromDataBase(){
                let user_id = localStorage.getItem("mon_taste_login_id")
                let result = await getAddressInfo(user_id)
                if(result.errCode === 0){
                    // 数据库获取地址信息成功
                    console.log("获取地址信息成功")
                    for(let i = 0; i < result.data.length; i++){
                        if(result.data[i].isDefault === true){                            
                            this.AddressArrs.name = result.data[i].name
                            this.AddressArrs.tel = result.data[i].tel
                            this.AddressArrs.province = result.data[i].province
                            this.AddressArrs.city = result.data[i].city
                            this.AddressArrs.county = result.data[i].county
                            this.AddressArrs.addressDetail = result.data[i].addressDetail
                        }
                    }  
                    console.log("RTRTRTRTRRTRTRTRTRTRTRT = ",this.AddressArrs)
                }else{
                    console.log("获取地址信息失败")
                    return 
                }
            }
        },

        computed:{
            // 过滤出没有被选中的数据
            CartInfoArrs(){
                let arr = []
                for(let i = 0; i < this.CartInfos.length; i++){
                    if(this.CartInfos[i].choiceFlag === true){
                        arr.push(this.CartInfos[i])
                    }
                }
                return arr
            },
            // 页面商品总个数
            totalNum(){
                let num = 0
                for(let i = 0; i < this.CartInfoArrs.length; i++){
                    num  += this.CartInfoArrs[i].number
                }
                return num
            },

            // 计算页面总价格
            totalPrice(){
                let totalprice = 0
                for(let i = 0; i < this.CartInfoArrs.length; i++){
                    if(this.CartInfoArrs[i].discount > 0){
                        totalprice  += this.CartInfoArrs[i].number * this.CartInfoArrs[i].discount                        
                    }else{
                        totalprice  += this.CartInfoArrs[i].number * this.CartInfoArrs[i].price
                    }                    
                }
                if(totalprice < 20){
                    return totalprice + 5
                }
                return totalprice
            },

            // 计算节省的钱
            saveMoney(){
                let savemoney = 0
                for(let i = 0; i < this.CartInfoArrs.length; i++){
                    if(this.CartInfoArrs[i].discount > 0){
                        savemoney += this.CartInfoArrs[i].price - this.CartInfoArrs[i].discount                   
                    }else{
                        savemoney += 0
                    }                    
                }
                return savemoney
            }

        },

        watch:{
            CartInfos(){
                this.$nextTick(()=>{
                    this._initScroll()
                })
            }
        }
    }
</script>

<style scoped>
.order{
    width: 100%;
    height: 100%;
}

.order .order_header{
    width: 100%;
    height: 60px;
    display: flex;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
}

.order .order_header i{
    font-size: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.order .order_header .title{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.order .order_wrapper{
    width: 96%;
    height: 100%;
    margin: 60px auto;
}

.order .order_wrapper .order_content{
    width: 100%;
    height: 100%;
}

.order .order_wrapper .order_content .order_address{
    width: 100%;
    height: 90px;
    margin-top: 10px;
    border-radius: 12px;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
}
/* 11111111111111111111111111111111111111111111111111111111111111111111111111111111111 */
.order .order_wrapper .order_content .order_address .left{
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.order .order_wrapper .order_content .order_address .left i{
    font-size: 40px;
    color: #fff;
    background-color: #fe753e;
    border-radius: 50%;
}

.order .order_wrapper .order_content .order_address .middle{
    flex: 1;
    padding-left:20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.order .order_wrapper .order_content .order_address .middle .name{
    font-size: 18px;
}

.order .order_wrapper .order_content .order_address .middle .detail span{    
    line-height: 24px;
}

.order .order_wrapper .order_content .order_address .right{
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.order .order_wrapper .order_content .order_address .right i{
    font-size: 45px;
    color: #999;
}
/* 11111111111111111111111111111111111111111111111111111111111111111111111111111111111 */
.order .order_wrapper .order_content .order_list_wrapper{
    margin-top: 10px;
    width: 100%;
    height: 100%;
}

.order .order_wrapper .order_content .order_list_wrapper .order_list{
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    margin-bottom: 10px;
    border-radius: 12px;
    background-color: #fff;
    display: flex;
}

.order .order_wrapper .order_content .order_list_wrapper .order_list .order_list_right{
    flex: 1;
    width: 100%;
    height: 110px;
    box-sizing: border-box;
    padding: 5px 5px 5px 10px;
    position: relative;
}

.order .order_wrapper .order_content .order_list_wrapper .order_list .order_list_right .price{
    font-size: 13px;
}

.order .order_wrapper .order_content .order_list_wrapper .order_list .order_list_right .discount{
    font-size: 13px;
    color: #fe753e;
}

.order .order_wrapper .order_content .order_list_wrapper .order_list .order_list_right .content_wrapper{
    position: relative;
}

.order .order_wrapper .order_content .order_list_wrapper .order_list .order_list_right .food_name{
    display: inline-block;
}

.order .order_wrapper .order_content .order_list_wrapper .order_list .order_list_right .food_info{  
    width: 160px;
    margin-top: 5px;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 20px;
    padding: 2px;  
    /* 溢出显示省略号 */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;    
    -webkit-box-orient:vertical;     
}

.order .order_wrapper .order_content .order_list_wrapper .order_list .order_list_right .order_total{
    position: absolute;
    bottom: 5px;
    right: 10px;
}

.order .order_wrapper .order_content .order_list_wrapper .order_list .order_list_right .order_total .xj{
    color: #fe753e;
}

.order .order_wrapper .order_content .order_list_wrapper .order_list .food_count{
    position: absolute;
    top: 10px;
    right: 10px;
}

.order .order_footer{
    width: 100%;
    height: 65px;
    background-color: #fff;
    position: fixed;
    bottom: 55px;
    display: flex;
}

.order .order_footer .footer_content{
    flex: 1;
    /* width: 180px; */
    height: 100%;
    box-sizing: border-box;
    /* background-color: pink; */
}

.order .order_footer .footer_content .content_top{
    height: 50%;
    /* background-color: deeppink; */
    display: flex;
    justify-content: center;
}

.order .order_footer .footer_content .content_top .total_num{
    font-size: 14px;
    color: #999;
}

.order .order_footer .footer_content .content_top .total_price{
    font-size: 18px;
    color: #fe753e;
}

.order .order_footer .footer_content .content_top .total_num,
.order .order_footer .footer_content .content_top .total_price{
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.order .order_footer .footer_content .content_bottom{
    height: 50%;
    display: flex;
    justify-content: center;
}

.order .order_footer .footer_content .content_bottom .yh_message{
    color: #fe753e;
}

.order .order_footer .footer_content .content_bottom .fee,
.order .order_footer .footer_content .content_bottom .yh_message{
    font-size: 13px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.order .order_footer .btn{
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.order .order_footer button{
    width: 120px;
    height: 50px;
    border: none;
    margin-right: 10px;
    border-radius: 25px;
    color: #fff;
    background-color: #fe753e;
    
}
</style>