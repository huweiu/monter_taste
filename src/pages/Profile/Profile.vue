<template>
    <div class="profile">
        <div class="profile_wrapper">
            <div class="profile_wrapper_list">
                <div class="profile_header">
                    <div class="profile_content">
                        <!--个人中心头部-->
                        <img :src="headeImage" alt="">
                        <router-link to="/login" class="profile_link" :style="{pointerEvents : userLoginState}">
                            <div class="login">
                                <span class="loginMsg" v-if="userInfo._id">{{userInfo.userName || userInfo.phoneNum}}</span>                                
                                <span class="loginNoMsg" v-else>登录/注册</span>
                            </div>
                        </router-link>
                        <i class="iconfont icon-lingdang"></i>
                    </div>
                </div>
                <section class="profile_info_data">
                    <ul class="info_data_list">
                        <li>
                            <a href="#" class="info_data_link">
                                <span class="info_data_top">
                                    <span class="small">¥</span>
                                    <span>0</span>
                                </span>
                                <span class="info_data_bottom">余额</span>
                            </a>
                        </li>
                        <div class="sx"></div>
                        <li>
                            <a href="#" class="info_data_link">
                                <span class="info_data_top">0</span>
                                <span class="info_data_bottom">优惠券</span>
                            </a>
                        </li>
                        <div class="sx"></div>
                        <li>
                            <a href="#" class="info_data_link">
                                <span class="info_data_top">0</span>
                                <span class="info_data_bottom">商品券</span>
                            </a>
                        </li>
                        <div class="sx"></div>
                        <li>
                            <a href="#" class="info_data_link">
                                <span class="info_data_top">0</span>
                                <span class="info_data_bottom">积分兑换</span>
                            </a>
                        </li>
                    </ul>
                </section>
                <!-- 个人中心订单模块 -->
                <div class="order">
                    <div class="order_wrapper">
                        <div class="my_order">
                            <h4 class="order_title">我的订单</h4>
                            <span class="all_order">
                                <span>全部订单</span>
                                <i class="iconfont icon-arrow-right"></i>
                            </span>
                        </div>

                        <ul class="order_content">
                            <li class="order_content_list">
                                <a href="#" class="order_link">
                                    <i class="iconfont icon-daizhifu"></i>
                                    <span>待支付</span>
                                </a>
                            </li>
                            <li class="order_content_list">
                                <a href="#" class="order_link">
                                    <i class="iconfont icon-daipeisong"></i>
                                    <span>待配送</span>
                                </a>
                            </li>
                            <li class="order_content_list">
                                <a href="#" class="order_link">
                                    <i class="iconfont icon-peisongzhong"></i>
                                    <span>配送中</span>
                                </a>
                            </li>
                            <li class="order_content_list">
                                <a href="#" class="order_link">
                                    <i class="iconfont icon-pingjia"></i>
                                    <span>待评价</span>
                                </a>
                            </li>
                            <li class="order_content_list">
                                <a href="#" class="order_link">
                                    <i class="iconfont icon-shouhoutuikuan2"></i>
                                    <span>售后/退款</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <!--我的服务部分-->
                <div class="service">
                    <div class="service_wrapper">
                        <h4 class="service_title">我的服务</h4>
                        <div class="service_content">
                            <div ref="divpisc" class="server_con_wrapper">

                                <ul class="content_top">
                                    <li class="content_list">
                                        <a href="#">                                
                                            <i class="iconfont icon-huiyuan1"></i>
                                            <span>储值送会员</span>
                                        </a>
                                    </li>
                                    <li class="content_list">
                                        <a href="#">                                
                                            <i class="iconfont icon-wodepintuan"></i>
                                            <span>我的拼团</span>
                                        </a>
                                    </li>
                                    <li class="content_list">
                                        <a href="#">                                
                                            <i class="iconfont icon-tuijianyouli"></i>
                                            <span>推荐有礼</span>
                                        </a>
                                    </li>
                                </ul>                               

                                <ul class="content_middle">
                                    <li class="content_list">
                                        <a href="#">                                
                                            <i class="iconfont icon-jifenshangcheng"></i>
                                            <span>积分商城</span>
                                        </a>
                                    </li>
                                    <li class="content_list">
                                        <a href="#">                                
                                            <i class="iconfont icon-yaoqing"></i>
                                            <span>邀请得现金</span>
                                        </a>
                                    </li>
                                    <li class="content_list">
                                        <router-link to="/addressAdmin">
                                            <i class="iconfont icon-shouhuodizhi1"></i>
                                            <span>收货地址</span>
                                        </router-link>
                                    </li>
                                </ul>

                                <ul class="content_bottom">
                                    <li class="content_list">
                                        <a href="#">                                
                                            <i class="iconfont icon-kefu"></i>
                                            <span>客服和帮助</span>
                                        </a>
                                    </li>
                                    <li class="content_list">
                                        <router-link to="/Setup">
                                            <i class="iconfont icon-shezhi2"></i>
                                            <span>设置</span>
                                        </router-link>
                                    </li>  
                                    <li class="content_list">
                                        <a href="#">                                
                                            <i class="iconfont"></i>
                                            <span></span>
                                        </a>
                                    </li>                       
                                </ul>    

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>

<script>
    import BScroll from '@better-scroll/core'
    import {mapState,mapActions} from "vuex"
    export default {
        data(){
            return{
                headeImage:"./static/images/profile_header/profile_header.png",
                // userLoginState:""
            }
        },
        mounted(){
            this._initScroll()                  
        },

        methods:{            
            _initScroll() { 
                let divele = this.$refs.divpisc
                let ulHeight = 75
                divele.style.height = 75 * 3 + "px"
                new BScroll(".service_content",{
                    click:true
                })
            },

            // 跳转收货地址管理页面
            gotoAddressAdmin(){
                this.$router.replace("/addressAdmin")
            }

            
             
        
        },

        computed:{
            ...mapState(["userInfo"]) ,
            userLoginState(){
                let userInfo1 = this.$store.state.userInfo
                console.log("***********")
                console.log(userInfo1)
                if(userInfo1._id){
                    return 'none'
                }else{
                    return 'auto'
                }
            }


        }
    }
</script>

<style scoped>
.profile{
    width: 100%;
    height: 100%;
}

.profile .profile_header{
    width: 100%;
    height: 130px;
    background-image: linear-gradient(to right,#fff,#ffe5ca);   
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-radius: 5px;
    position: relative;
    margin-bottom: 15px;
}

.profile .profile_header .profile_content{
     display: flex;
     padding-left: 15px;     
}

.profile .profile_header .profile_content img{
    width: 65px;
    height: 65px;
    border: 5px solid white;
    border-radius: 50%;
}

.profile .profile_header .profile_content .profile_link{
    display: flex;
    align-items: center;
    margin-left: 15px;
}

.profile .profile_header .profile_content .login .loginMsg{
    font-size: 14px;
}

.profile .profile_header .profile_content .login .loginNoMsg{
    font-size: 20px;
}

.profile .profile_header .profile_content i{
    position: absolute;
    top: 40px;
    right: 40px;
    font-size: 25px;
}

.profile_info_data{
    width: 100%;   
}

.profile_info_data .info_data_list{
    width: 95%;
    height: 70px;
    margin: 0 auto;
    border-radius: 8px;
    background-color: #fff;
    display: flex;
}

.profile_info_data .info_data_list li{
    flex: 1;
}

.profile_info_data .info_data_list li .info_data_link{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.profile_info_data .info_data_list li .info_data_link .info_data_top{
    display: flex;
    justify-content: center;
    color: #1b1b1b;
}

.profile_info_data .info_data_list li .info_data_link .info_data_top .small{
    font-size: 12px;
    display: flex;
    align-items: flex-end;
}

.profile_info_data .info_data_list li .info_data_link .info_data_bottom{
    display: flex;
    justify-content: center;
    padding-top: 8px;
    color: #1b1b1b;
    font-size: 13px;
    color: #666;
}

.profile_info_data .sx{    
    width: 1px;
    height: 30px;
    background-color: #f5f5f5;
    position: relative;
    top:20px;
    left: 0px;    
}

.order{
    width: 100%;
    margin-top: 10px;
}

.order .order_wrapper{
    width: 95%;
    height: 112px;
    margin: 0 auto;
    border-radius: 8px;
    background-color: #fff;
    box-sizing: border-box;
}

.order .order_wrapper .my_order{
    width: 100%;
    height: 30px;
    
}

.order .order_wrapper .my_order .order_title{
    float: left;
    padding-left: 15px;
    line-height: 30px;
    font-weight: 600;
}

.order .order_wrapper .my_order .all_order{
    float: right;   
    font-size: 12px;
    line-height: 30px;    
}

.order .order_wrapper .my_order .all_order span{
    display: inline-block;
    vertical-align: top;
    color: #7a7c7b;
}

.order .order_wrapper .my_order .all_order i{
    font-size: 20px;   
    color: #7a7c7b;
}

.order .order_wrapper  .order_content{
    width: 100%;
    height: 100%;
    display: flex;    
    margin-top: 10px;
}

.order .order_wrapper  .order_content .order_content_list{
    flex: 1;
    width: 100%;
    height: 72px;    
}

.order .order_wrapper  .order_content .order_content_list a{
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
}

.order .order_wrapper  .order_content .order_content_list a i{
    display: flex;
    justify-content: center;
    font-size: 24px;
    color: #fe753e;
}

.order .order_wrapper  .order_content .order_content_list a span{
    display: flex;
    justify-content: center;
    font-size: 13px;
    padding-top: 10px;
    color: #666;
}


.service{
    width: 100%;
    height: 100%;
    margin-top: 10px;
}

.service .service_wrapper{
    width: 95%;
    height: 100%;
    margin: 0 auto;
    border-radius: 8px;
    background-color: #fff;
    box-sizing: border-box;
}

.service .service_wrapper .service_title{
    padding-left: 15px;
    line-height: 30px;
    font-weight: 600;
}

.service .service_wrapper .service_content{
    width: 100%;
    height: 100%;
    margin-top: 15px;
}

.service .service_wrapper .service_content .content_top{
    display: flex;
}

.service .service_wrapper .service_content .content_top .content_list{
    flex:1;
}

.service .service_wrapper .service_content .content_top .content_list a{
    display: flex;
    flex-direction: column;
}

.service .service_wrapper .service_content .content_top .content_list a i{
    display: flex;
    justify-content: center;
    color: #8ccecc;
    font-size: 45px;
}

.service .service_wrapper .service_content .content_top .content_list:nth-child(1) a i{
    color: #8ccecc;
}

.service .service_wrapper .service_content .content_top .content_list:nth-child(2) a i{
    color: #ff5d92;
}

.service .service_wrapper .service_content .content_top .content_list:nth-child(3) a i{
    color: #ff787f;
}

.service .service_wrapper .service_content .content_top .content_list a span{
    display: flex;
    justify-content: center;
    color: #666;
    font-size: 15px;
    padding-top: 15px;
}

.service .service_wrapper .service_content .content_middle{
    display: flex;
}

.service .service_wrapper .service_content .content_middle .content_list{
    flex:1;
    padding-top: 18px;
}

.service .service_wrapper .service_content .content_middle .content_list a{
    display: flex;
    flex-direction: column;
}

.service .service_wrapper .service_content .content_middle .content_list a i{
    display: flex;
    justify-content: center;
    font-size: 45px;
}

.service .service_wrapper .service_content .content_middle .content_list:nth-child(1) a i{
    color: #fbab53;
}

.service .service_wrapper .service_content .content_middle .content_list:nth-child(2) a i{
    color: #a597ff;
}

.service .service_wrapper .service_content .content_middle .content_list:nth-child(3) a i{
    color: #00bce8;
}

.service .service_wrapper .service_content .content_middle .content_list a span{
    display: flex;
    justify-content: center;
    color: #666;
    font-size: 15px;
    padding-top: 15px;
}

.service .service_wrapper .service_content .content_bottom{
    display: flex;
    padding-top: 18px;
}

.service .service_wrapper .service_content .content_bottom .content_list{
    flex:1;
}

.service .service_wrapper .service_content .content_bottom .content_list a{
    display: flex;
    flex-direction: column;
}

.service .service_wrapper .service_content .content_bottom .content_list a i{
    display: flex;
    justify-content: center;
    font-size: 45px;
}

.service .service_wrapper .service_content .content_bottom .content_list:nth-child(1) a i{
    color: #19b8ec;
}

.service .service_wrapper .service_content .content_bottom .content_list:nth-child(2) a i{
    color: #1296db;
}

.service .service_wrapper .service_content .content_bottom .content_list:nth-child(3) a i{
    color: #00bce8;
}

.service .service_wrapper .service_content .content_bottom .content_list a span{
    display: flex;
    justify-content: center;
    color: #666;
    font-size: 15px;
    padding-top: 15px;
}


</style>