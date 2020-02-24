<template>
    <div class="setup">
        <div class="setup_wrapper">
            <div class="setup_title">
                <i class="iconfont icon-mjiantou-copy" @click="goto('/profile')"></i>
                <h2 class="setup_title_content">设置</h2>
            </div>
            <!-- 设置页面的内容区域 -->
            <div class="setup_content">
                <ul>
                    <li class="setup_list">
                        <a href="#">
                            <span class="setup_lis_left">消息推送设置</span>
                            <div class="setup_lis_right">
                                <span>已开启</span>
                                <i class="iconfont icon-arrow-right"></i>
                            </div>
                        </a>
                    </li>
                    <li class="setup_list">
                        <a href="#">
                            <span class="setup_lis_left">个性化推荐设置</span>
                            <div class="setup_lis_right">
                                <span class="dli">已开启</span>                                
                            </div>
                        </a>
                    </li>
                    <li class="setup_list">
                        <a href="#">
                            <span class="setup_lis_left">清除本地缓存</span>
                            <div class="setup_lis_right">
                                <span class="dli">49.81MB</span>                                
                            </div>
                        </a>
                    </li>
                    <li class="setup_list">
                        <a href="#">
                            <span class="setup_lis_left">关于我们</span>
                            <div class="setup_lis_right">                                
                                <i class="iconfont icon-arrow-right"></i>
                            </div>
                        </a>
                    </li>
                    <li class="setup_list">
                        <a href="#">
                            <span class="setup_lis_left">检查更新</span>
                            <div class="setup_lis_right">                                
                                <i class="iconfont icon-arrow-right"></i>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="setup_an" v-if="isEmptyUserInfo">
                <button @click="logout">退出登录</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { Dialog } from 'vant';
    import {mapState, mapGetters} from "vuex"
    export default {
        data(){
            return{
                // isEmptyUserInfo:false
            }
        },

        mounted(){
            
        },

        computed:{
            isEmptyUserInfo(){
                // 获取本地的localStroage来判定是否需要显示退出按钮
                let login_id  = localStorage.getItem("mon_taste_login_id")
                return login_id ? true : false
            }
        },

        methods:{        
            // ...mapGetters(["isEmptyUserInfo"]),    
            goto(path){
                console.log("1111111")
                this.$router.replace(path)
            },

            // 异步退出
            logout(){
                Dialog.confirm({
                    title: '标题',
                    message: '确定要退出吗?'
                }).then(() => {
                    // 点击确认按钮的执行退出的回调函数
                    // 退出登录，清除本地浏览器的localStroage,清除vuex中的用户信息
                    // 1. 清除本地localStroage
                    localStorage.setItem("mon_taste_login_id","") // 把本地的数据干掉
                    // 2. 清除vuex中的用户信息
                    this.$store.dispatch("Logout")
                    // 3. 页面进行跳转到到个人中心
                    this.$router.replace("/profile")

                }).catch(() => {
                    // on cancel
                    console.log("点击了取消退出!")
                });
            }
        },

        components:{
            [Dialog.Component.name]: Dialog.Component,            
        }
    }
</script>

<style scoped>
    .setup{
        width: 100%;
        height: 100%;
        background-color: #fff;
    }

    .setup .setup_wrapper{
        width: 95%;
        height: 100%;
        margin: 0 auto;    
        /* background-color: yellow;     */
    }

    .setup .setup_wrapper .setup_title{
        display: flex;
        width: 100%;
        height: 40px;
        /* background-color: skyblue; */
    }

    .setup .setup_wrapper .setup_title i{
        font-size: 35px;
    }

    .setup .setup_wrapper .setup_title .setup_title_content{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "微软雅黑"
    }

    .setup .setup_wrapper .setup_content{
        width: 100%;
        margin-top: 20px;
    }

    .setup .setup_wrapper .setup_content .setup_list{
        height: 20px;
        line-height: 20px;
        font-size: 18px;  
        margin-bottom: 20px;      
        font-family: "微软雅黑"
        /* background-color: skyblue; */
        /* border-bottom: 1px solid gray; */
    }

    .setup .setup_wrapper .setup_content .setup_list i{
        font-size: 35px;
    }

    .setup .setup_wrapper .setup_content .setup_list .setup_lis_left{
        float: left;
        color: #333;
    }

    .setup .setup_wrapper .setup_content .setup_list .setup_lis_right{
        float: right;
        color: gray;     
           
    }

    .setup .setup_wrapper .setup_content .setup_list .setup_lis_right .dli{
        padding-right: 10px;
    }

    .setup .setup_wrapper .setup_content .setup_list .setup_lis_right span{
        display: inline-block;
        vertical-align: top;
    }

     .setup .setup_wrapper .setup_an{
         width: 100%;
         border: none;
     }

     .setup .setup_wrapper .setup_an button{
         width: 100%;
         height: 40px;
         border: none;
         font-size: 20px;
         border-radius: 25px;
         color: #ffffff;
         background-color: #fe753e;
     }
</style>