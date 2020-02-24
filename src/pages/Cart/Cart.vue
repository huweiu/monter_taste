<template>
    <div class="cart">
        <div class="cart_wrapper">
            <div class="cart_head">
                <i class="iconfont icon-weizhi"></i>
                <h5 class="cart_title">购物车</h5>
                <a class="cart_delete" href="#" @click="delAllCartData">删除</a>
            </div>
            <img class="gif_img" v-if="CartInfos.length === 0" src="../../../static/images/Cart/timg.gif" alt="">
            <!-- 购物车提示 -->
            <div class="cart_tag" v-if="isShowTips">
                <router-link to="/login" class="cart_link">
                    <span class="login">登录</span>
                    <span class="login_title">后同步您购物车中的商品</span>
                    <i class="iconfont icon-arrow-right"></i>
                </router-link>                
            </div>
            <div v-if="CartInfos.length === 0" class="cart_tip_wrapper">
                <p class="cart_tips1">购物车里空空如也</p>
                <p class="cart_tips2">想吃啥? 别客气随便点</p>
                <a href="#" @click="goto('/msite')">去逛逛</a>
            </div>
            <div v-if="CartInfos.length > 0" class="cart_list">
                <div class="cart_list_header">
                    <i class="iconfont icon-qingdan"></i>
                    <h2 class="cart_list_title">购物车清单</h2>
                </div>
                <!-- <keep-alive> -->
                <div class="cart_list_wapper">
                    <ul ref="picsUl">
                        <li v-for="(CartInfo,index) in CartInfos" :key="index">
                            <div class="isChoice"  @click.prevent="choiceSignle(CartInfo)">
                                <!-- 不选中图标 v-if 为true  CartInfo.choiceFlag 初始记录的是flase 所以取反--> 
                                <i class="iconfont icon-xuanzhongyuandian" v-if="!CartInfo.choiceFlag"></i>
                                <!-- 选中图标 -->
                                <i class="iconfont icon-quanxuan choice" v-else></i>
                            </div>
                            <img class="list_img" :src="CartInfo.pic" alt="">
                            <div class="list_right">
                                <h6 class="foodname">{{CartInfo.foodName}}</h6>
                                <span class="delsignal" @click="delsignal(CartInfo)">删除</span>
                                <p class="price">{{CartInfo.foodinfo}}</p>
                                <span class="price">原价¥ {{CartInfo.price}}</span>
                                <span class="discount">折扣价¥ {{CartInfo.discount}}</span>
                                <!-- <el-input-number class="list_right_count" v-model="number" @change="handleChange" size="mini" 
                                    :min="1" :max="10" ></el-input-number> -->
                                <van-stepper class="list_right_count" @plus="addNum(CartInfo)" @minus="descream(CartInfo)" input-width="18px" button-size="25px" v-model="CartInfo.number" />
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- </keep-alive>                 -->
            </div>
            <!-- 购物车底部的价钱数量统计 -->
            <div class="cart_footer">
                <div class="cart_footer_left">
                    <div class="choice_wrapper"  @click="isChoice">
                        <i class="iconfont icon-xuanzhongyuandian" v-if="!isAllChoice"></i>
                        <i class="iconfont icon-quanxuan choice" v-else></i>
                        <span>全选</span>
                    </div>
                </div>
                <div class="cart_footer_right">
                    <span class="total_price">合计:</span><span class="price">¥{{totalPrice}}</span>
                    <button @click="gotoOrder" class="btn1" :class="{btn2:totalPrice>0}">去结算</button>
                    <span class="fee" v-if="totalPrice <= 20 && totalPrice > 0">含配送费5元</span>
                </div>
            </div>            
        </div>
    </div>
</template>

<script>
    // import { Stepper } from 'vant';
    import BScroll from '@better-scroll/core'
    import {mapState} from "vuex"
    import {getCartData,UpdateCartData,delsignalCartData,delAllCartDataFromDataBase} from "../../api/index"
    export default {
        data(){
            return{
                isAllChoice:false,    // 是否全部选中
                isChoiceSignle:false,
                CartInfos:[],
                num:0,
                number:1,
                totalPrice:0
            }
        },

        created(){
            this.getCartDataFromDataBase()
        },

        methods:{
            _initScroll() { 
                const ul = this.$refs.picsUl
                const liHeight = 80
                const paddingHeight = 20
                const count = this.CartInfos.length
                ul.style.height = (liHeight + paddingHeight) * count + (120*2) + 'px'
                new BScroll(".cart_list_wapper",{
                    click:false // 这里有一个坑  这个地方如果是true的话,会导致滑动的这个区域绑定的事件一旦触发停不下，
                                // 会自动成倍数的被自动触发
                })
            },

            goto(path){
                this.$router.replace(path)
            },

            async isChoice(){
                this.isAllChoice = !this.isAllChoice
                let user_id = localStorage.getItem("mon_taste_login_id")
                // this.isAllChoice 为true的时候代表全选,全选时候,上面的子选项你被选中，如果为false的时候上面的子选项被取消
                let updateObj = {}
                updateObj._id = ""
                updateObj.user_id = user_id
                updateObj.choiceFlag = this.isAllChoice
                let result = await UpdateCartData(updateObj)
                if(result.errCode === 0){
                    console.log("购物车数据更新成功 all_choice")
                    // 重新获取购物车           
                    this.getCartDataFromDataBase()                    
                }else{
                    console.log("购物车数据更新失败 all_choice")
                    return 
                }
            },     
            
            async getCartDataFromDataBase(){
                let user_id = localStorage.getItem("mon_taste_login_id")
                let result = await getCartData(user_id)
                if(result.errCode === 0){
                    console.log("购物车数据获取成功")
                    // console.log(result.data)
                    let num = 0
                    this.totalPrice = 0;
                    if(result.data.length){
                        for(let i = 0; i < result.data.length; i++){
                            if(result.data[i].choiceFlag === true){
                                num++
                                // 计算购物车所有的商品的总价格
                                if(result.data[i].discount > 0){
                                    this.totalPrice = this.totalPrice + result.data[i].discount * result.data[i].number
                                }else{
                                    this.totalPrice = this.totalPrice + result.data[i].price * result.data[i].number
                                }                                
                            }
                        }
                        if( num === result.data.length ){
                            this.isAllChoice = true
                        }else{
                            this.isAllChoice = false
                        }                        
                    }    
                    if(result.data.length === 0){
                        this.isAllChoice = false
                    }                
                    this.CartInfos = result.data
                }else{
                    console.log("购物车数据获取失败")
                    return 
                }
            },

            /*
                函数节流：一个函数执行一次后，只有大于设定的执行周期才会执行下一次
                需要频频触发的函数，出于优化性能的角度，在规定的时间内只让第一次触发的生效，其他的不生效

            */

            async choiceSignle(CartInfo){                
                this.num++
                // this.getCartDataFromDataBase()
                // 点击按钮修改数据库中是否选中
                let _id = CartInfo._id
                let updateObj = {}
                updateObj._id = _id
                // updateObj.user_id = CartInfo.user_id // 保存用户ID唯一标识
                // updateObj.foodName = CartInfo.foodName
                // updateObj.desc = CartInfo.desc
                // updateObj.price = CartInfo.price
                // updateObj.discount = CartInfo.discount
                // updateObj.fee = CartInfo.fee
                // updateObj.rate = CartInfo.rate
                // updateObj.order = CartInfo.order
                // updateObj.foodinfo = CartInfo.foodinfo
                // updateObj.pic = CartInfo.pic
                updateObj.choiceFlag = !CartInfo.choiceFlag
                // updateObj.isSale = CartInfo.isSale // 是否付付过款标志
                console.log(_id)
                let result = await UpdateCartData(updateObj)
                if(result.errCode === 0){
                    console.log("购物车数据更新成功")
                    // 重新获取购物车           
                    this.getCartDataFromDataBase()                    
                }else{
                    console.log("购物车数据更新失败")
                    return 
                }
            },

            async addNum(CartInfo) {                
                // 对象传过来
                // 更新数据库中的数量
                let _id = CartInfo._id
                let updateObj = {}
                updateObj._id = _id
                updateObj.choiceFlag = CartInfo.choiceFlag
                updateObj.number = CartInfo.number + 1
                let result = await UpdateCartData(updateObj)
                if(result.errCode === 0){
                    console.log("增加购物车数据更新成功")
                    // 重新获取购物车           
                    this.getCartDataFromDataBase()                    
                }else{
                    console.log("增加购物车数据更新失败")
                    return 
                }
            },

            async descream(CartInfo){
                // 对象传过来
                let _id = CartInfo._id
                let updateObj = {}
                updateObj._id = _id
                updateObj.choiceFlag = CartInfo.choiceFlag
                updateObj.number = CartInfo.number - 1
                let result = await UpdateCartData(updateObj)
                if(result.errCode === 0){
                    console.log("减少购物车数据更新成功")
                    // 重新获取购物车           
                    this.getCartDataFromDataBase()                    
                }else{
                    console.log("减少购物车数据更新失败")
                    return 
                }
            },

            //删除单个订单选项
            async delsignal(CartInfo){
                // 从数据库中删除数据记录
                let id = CartInfo._id
                let result = await delsignalCartData(id)
                if(result.errCode === 0){
                    // 数据库删除数据成功
                    this.getCartDataFromDataBase() 
                }else{
                    // 数据库删除数据失败
                    this.getCartDataFromDataBase() 
                    return
                }
            },

            // 删除所有的购物车记录
            async delAllCartData(){                
                let user_id = localStorage.getItem("mon_taste_login_id")
                let result = await delAllCartDataFromDataBase(user_id)
                if(result.errCode === 0){
                    // 删除数据库所有的数据成功
                    console.log("删除数据库中的所有数据成功")
                    this.getCartDataFromDataBase() 
                }else{
                    // 删除数据库中所有的数据失败
                    console.log("删除数据库中的所以数据失败")
                    this.getCartDataFromDataBase()
                    return
                }
            },

            // 点击结算按钮实现页面跳转
            gotoOrder(){
                // 如果结算按钮没有赋能不能跳转
                if(this.totalPrice === 0) return
                if(this.totalPrice > 0) this.$router.push("/order")
            }
        },

        computed:{
            isShowTips(){
                let tips = localStorage.getItem("mon_taste_login_id")
                if(tips){
                    return false
                }else{
                    return true
                }
            },
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
.cart{
    width: 100%;
    height: 100%;
}

.cart .cart_wrapper{    
    width: 100%;    
    height: 100%;
    position: relative;
    overflow: hidden;   
}

.cart .cart_wrapper .gif_img{
    width: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%)
}

.cart .cart_wrapper .cart_head{
    width: 100%;
    height: 50px;
    display: flex;   
    background-color: #fff;
    position: absolute;
    z-index: 100;
}

.cart .cart_wrapper .cart_head i{
    padding-left: 35%;
    font-size: 35px;
    display: flex;
    align-items: center;
    color: #090909;
}

.cart .cart_wrapper .cart_title{
    font-size: 18px;
    display: flex;
    align-items: center;
    color: #090909;
}

.cart .cart_wrapper .cart_delete{    
    color: #3c3c3c;
    position: absolute;
    top: 19px;
    right: 15px;
}

.cart .cart_wrapper .cart_tag{
    width: 100%;
    height: 50px;
    background-color: #fff9e3;    
    position: relative;
}

.cart .cart_wrapper .cart_tag .cart_link{
    display: block;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
}

.cart .cart_wrapper .cart_tag .login{
    color: #e55a81;
    font-size: 15px;
    margin-left: 20px;
}

.cart .cart_wrapper .cart_tag .login_title{
    color: #1e160b;
    font-size: 15px;
}

.cart .cart_wrapper .cart_tag i{
    color: #1e160b;
    font-size: 40px;
    position: absolute;
    top: 5px;
    right: 5px;
}

.cart .cart_wrapper .cart_tip_wrapper{
    width: 100%;
    padding-top: 60px;
    position: relative;
}

.cart .cart_wrapper .cart_list{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: absolute;
    top: 50px;
}

.cart .cart_wrapper .cart_list .cart_list_header{
    display: flex;
    width: 100%;
    height: 45px;
    position: fixed;
    z-index: 100;
    background-color: #fff;    
    border-bottom:1px solid #ccc;
}

.cart .cart_wrapper .cart_list .cart_list_header i{
    font-size: 35px;
    display: flex;
    align-items: center;
    color: #fe753e;
}

.cart .cart_wrapper .cart_list .cart_list_header .cart_list_title{
    width: 100%;
    height: 100%;
    font-size: 18px;
    font-family: "微软雅黑";    
    display: flex;
    align-items: center;
}

.cart .cart_wrapper .cart_list .cart_list_wapper{
    width: 100%;
    height: 100%;
    margin-top: 50px;
}

.cart .cart_wrapper .cart_list .cart_list_wapper ul{
    width: 97%;
    height: 100%;
    margin: 0 auto;
    /* 开启BFC */
    overflow: hidden; 
}

.cart .cart_wrapper .cart_list .cart_list_wapper li{
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #ffffff;
}

.cart .cart_wrapper .cart_list .cart_list_wapper li .isChoice{
    display: flex;
    align-items: center;
}

.cart .cart_wrapper .cart_list .cart_list_wapper li .isChoice .choice{
    color: #e55a81;
}

.cart .cart_wrapper .cart_list .cart_list_wapper li .list_img{
    width: 80px;
    height: 80px;
    margin-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;    
}

.cart .cart_wrapper .cart_list .cart_list_wapper li .list_right{
    flex:1;
    box-sizing: border-box;
    padding: 5px;
    padding-left: 10px;
    position: relative;
}

.cart .cart_wrapper .cart_list .cart_list_wapper li .list_right .delsignal{
    position: absolute;
    text-align: center;
    width: 50px;
    height: 20px;
    right: 15px;;
    top: 5px;
    font-size: 12px;
    /* background-color: pink; */
}

.cart .cart_wrapper .cart_list .cart_list_wapper li .list_right .list_right_count{
    width: 90px;
    position: absolute;
    bottom: 5px;
    right: 5px;
}

.cart .cart_wrapper .cart_list .cart_list_wapper li .list_right .foodname{
    font-weight: bold;
    margin-bottom: 10px;
}

.cart .cart_wrapper .cart_list .cart_list_wapper li .list_right .price{
    font-size: 12px;
}

.cart .cart_wrapper .cart_list .cart_list_wapper li .list_right .discount{
    font-size: 12px;
    color: #fe753e;
}

.cart .cart_wrapper .cart_tips1{
    text-align: center;
    font-size: 18px;
    color: #ccaeb6;
}

.cart .cart_wrapper .cart_tips2{
    text-align: center;
    font-size: 18px;
    color: #c5677f;
    padding-top: 15px;
}

.cart .cart_wrapper .cart_tip_wrapper a{
    display: inline-block;
    font-size: 18px;
    padding: 10px;
    color: #666;
    background-color: #ffe5ca;
    margin-top: 110px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%)
}

.cart .cart_wrapper .cart_footer{
    width: 100%;
    height: 75px;
    background-color: #fff;
    box-sizing: border-box;
    position: fixed;
    left: 0px;
    bottom: 56px;
    display: flex;
    border-top: 1px solid gray;
}

.cart .cart_wrapper .cart_footer .cart_footer_left{
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 15px;
    flex: 1;
}

.cart .cart_wrapper .cart_footer .cart_footer_left .choice_wrapper i{
    font-size: 20px;
}

.cart .cart_wrapper .cart_footer .cart_footer_left .choice_wrapper .choice{
    color: #e55a81;
}

.cart .cart_wrapper .cart_footer .cart_footer_left .choice_wrapper span{
    font-size: 18px;
}

.cart .cart_wrapper .cart_footer .cart_footer_right{
    height: 100%;
    display: flex;
    align-items: center;
    flex: 1;   
    position: relative;
}

.cart .cart_wrapper .cart_footer .cart_footer_right .fee{
    position: absolute;
    bottom: 10px;
    font-size: 12px;
    color: #fe753e;
}

.cart .cart_wrapper .cart_footer .cart_footer_right .total_price{
    font-size: 15px;
}

.cart .cart_wrapper .cart_footer .cart_footer_right .price{
    font-size: 18px;
    color: #e55a81;
}

.cart .cart_wrapper .cart_footer .cart_footer_right .btn1{
    border: none;
    padding: 15px;
    margin-left: 5px;
}

.cart .cart_wrapper .cart_footer .cart_footer_right .btn2{
    color: #fff;
    background-color: #fe753e;
}
</style>