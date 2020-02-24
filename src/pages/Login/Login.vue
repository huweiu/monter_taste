<template>
    <div class="login">
        <div class="login_wrapper">
            <div class="login_header">
                <i class="iconfont icon-mjiantou-copy" @click="$router.back()"></i>
                <h2 class="log_title">登 录</h2>
                <!-- 登录方式选择 -->
                <div class="login_style">
                    <span class="message_login" :class="{isChoiceLoginTyle:loginWay}" @click="loginWay=true">短信登录</span>
                    <span class="password_login" :class="{isChoiceLoginTyle:!loginWay}" @click="loginWay=false">密码登录</span>
                </div>
            </div>

            <!-- 登录内容区域 -->
            <div class="login_content">
                <form class="login_form" @submit.prevent="login"><!-- 收集表单数据 -->
                    <div class="login_content_wrapper" v-if="loginWay">
                        <section class="login_message">
                            手机号<input type="text" maxlength="11" placeholder="请输入您的手机号" v-model="phoneNum">
                            <i class="iconfont icon-chahao" @click="clearPhoneNum" v-if="isShowXX"></i>
                        </section>
                        <section class="login_verification">
                            验证码<input type="text" maxlength="6" placeholder="请输入验证码" v-model="Code" >
                            <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}" @click.prevent="getMessCode">
                                {{computedTime > 0 ? `已发送(${computedTime}s)` : "获取验证码"}}
                            </button>
                        </section>
                        <section class="login_hint">
                            温馨提示：未注册妈妈的味道帐号的手机号，登录时将自动注册，且代表已同意
                            <a href="javascript:;">《用户服务协议》</a>
                        </section>
                    </div>

                    <div class="login_content_wrapper" v-if="!loginWay">
                        <section class="login_password">
                            用户名<input type="text" placeholder="手机/邮箱/用户名" v-model="name">
                            <i class="iconfont icon-chahao" @click="clearName" v-if="isShowUU"></i>
                        </section>
                        <section class="login_password">
                            密 码<input type="password" maxlength="20" placeholder="请输入登录密码" v-model="passWord" v-if="!isShowPassword">
                                 <input type="text" maxlength="20" placeholder="请输入登录密码" v-model="passWord" v-else>
                                 <i class="iconfont icon-xianshimima" @click="isShowPassword = !isShowPassword" v-if="isShowPassword"></i> 
                                 <i class="iconfont icon-yincang" @click="isShowPassword = !isShowPassword" v-if="!isShowPassword"></i>                             
                        </section>
                        <section class="login_captcha">
                            验证码<input type="text" maxlength="4" placeholder="请输入验证码" v-model="captcha">
                            <!-- <img ref="captcha" class="get_captcha" src="http://localhost:6000/api/users/captcha" 
                                alt="captcha" @click.prevent="getCaptcha1"> -->
                            <div class="get_captcha" v-html="svgData" @click.prevent="getCaptcha"></div>
                            <!-- <img ref="captcha" @load="verifyLoadState=true"  
                                @click="toggleVerify" class="get_captcha" :src="getCaptcha" :alt="capatchMsg" > -->
                            <!-- <button>{{capatchMsg}}</button> -->
                            <!-- <span>{{getCaptcha}}</span> -->
                        </section>                        
                    </div>
                    <div class="submit_wrapper">
                        <button class="login_submit" :class="{color:'#fe753e'}">登 录</button>
                    </div>
                    <router-link class="register" to="/register">还没有注册?赶快去注册吧!</router-link>                    
                </form> 
            </div>
        </div>
    </div>
</template>

<script>
    import {getMessageCode,loginMessCode,loginPwd,getCaptchaMsg} from "../../api/index"
    import { Dialog } from 'vant';
    import md5 from "js-md5";
    export default {
        data(){
            return {
                phoneNum:"", // 输入的手机号码
                loginWay: false, // true代表短信登陆, false代表密码
                name:"", // 用户名
                captcha:"", // 图形验证码
                Code:"", // 短信验证码
                computedTime:0, // 倒计时
                passWord:"", // 用户登录密码
                isShowPassword:false, // 是否显示登录密码
                capatchMsg:"",
               // buttonColor: "#fe753e"
               // getCaptcha:{},
                verifyLoadState:false,
                svgData:""

            }
        },

        mounted(){
            let result = getCaptchaMsg()
            result.then((captcha)=>{
                console.log(captcha)              
                // 把获取到的数据库id保存到localStroage中,以便下次使用的时候获取上送服务器
                localStorage.setItem("captcha_id",captcha.captchaId)
                this.svgData = captcha.captchaData
            })
        },

        methods:{
            /*清除输入框中的手机号*/
            clearPhoneNum(){
                if(this.phoneNum){
                    this.phoneNum = ""
                }
            },

            clearName(){
                if(this.name){
                    this.name = ""
                }

                console.log(this.capatchMsg)
            },

            async getMessCode(){
                // 如果倒计时computedTime 没有 才有倒计时的效果
                if(!this.computedTime){
                    // 开启循环定时器
                    // 初始倒计时的值为30s
                    this.computedTime = 30
                    this.intervalId = setInterval(()=>{
                        this.computedTime--
                        if(this.computedTime <= 0){
                            // 清除定时器，停止计时
                            clearInterval(this.intervalId)
                        }
                    },1000)

                    // 发送ajax请求，获取短信验证码
                    console.log("111111")
                    let result = await getMessageCode(this.phoneNum)
                    //console.log("888888888888888888888888888888")
                    //console.log(result)
                    if(result.errCode === 1){
                        // 获取短信验证码失败
                        // 显示提示错误信息
                        Dialog.alert({
                            message: result.msg
                            }).then(() => {
                            // 终止倒计时                            
                            // 如果计算的时间大于0
                            if(this.computedTime){
                                this.computedTime = 0
                                // 清除定时器
                                clearInterval(this.intervalId)
                                this.intervalId = null
                            }
                            return
                        });
                    }
                }              
            },

            // 获取图形验证码
            getCaptcha(){
                //this.$refs.captcha.src="http://localhost:6000/api/users/captcha?time" + Date.now()
                let result = getCaptchaMsg()
                result.then((captcha)=>{
                    console.log(captcha)
                    // 把获取到的数据库id保存到localStroage中,以便下次使用的时候获取上送服务器
                    localStorage.setItem("captcha_id",captcha.captchaId)
                    this.svgData = captcha.captchaData
                })
            },

            toggleVerify(){
                if( !this.verifyLoadState ) return 

             },

            // 登录
            async login(){
                let result
                if(this.loginWay){
                    // 登录方式为短信验证码登录
                    let {rightPhone,phoneNum,Code} = this
                    if(!rightPhone){ // 手机号前台验证不正确
                        Dialog.alert({
                            message: '输入的手机号不正确'
                            }).then(() => {
                            // on close
                            return
                        });
                    }else if(!Code){
                        Dialog.alert({
                            message: '请输入手机验证码'
                            }).then(() => {
                            // on close
                            return
                        });
                    }

                    console.log("给服务器发请求获取数据1--登录!")
                    result = await loginMessCode(phoneNum,Code)
                    console.log("8888888888888888888888")  
                }else{
                    // 登录方式为密码登录
                    let {name,passWord,captcha} = this

                    if(!name){
                        Dialog.alert({
                            message: '请输入用户名'
                            }).then(() => {
                            console.log("1111")
                            return 
                        });
                    }else if(!passWord){
                        Dialog.alert({
                            message: '请输入登录密码'
                            }).then(() => {
                            // on close
                            return
                        });
                    }else if(!captcha){
                        Dialog.alert({
                            message: '请输入验证码'
                            }).then(() => {
                            // on close
                            return
                        });
                    }
                    // 在localStroage中获取保存的图形验证码的数据库id,上送服务器做验证码校验
                    let captcha_id = localStorage.getItem("captcha_id")
                    console.log(captcha_id)
                    console.log("给服务器发请求获取数据2--登录!")
                    let newPassword = md5(passWord)
                    result = await loginPwd(name,newPassword,captcha,captcha_id)                    
                }

                // 无论请求是成功还是失败，停止计时器
                if(this.computedTime){
                    this.computedTime = 0
                    // 清除定时器
                    clearInterval(this.intervalId)
                    this.intervalId = null
                }

                if(result.errCode === 0){
                    //成功登录之后，页面跳转
                    console.log("登录成功!")
                    const user = result.data
                    console.log("11111 = " + user.userName)
                    console.log("22222 = " + user.phoneNum)
                    // 上面一切请求成功之后保存用户的数据库id 以便后面实现自动登录 做数据持久化
                    localStorage.setItem("mon_taste_login_id",user._id)
                    this.$store.dispatch("receiveUserInfo",user)
                    // 信息验证成功之后计算是要登录成功,跳转页面到个人主页
                    this.$router.replace("/msite")
                }else{
                    const msg = result.msg
                    Dialog.alert({
                        message: msg
                        }).then(() => {
                        // on close
                        return
                    });
                }
            }
                            
        },  

        computed:{

            isShowXX(){
                return this.phoneNum ? true:false;
            },

            isShowUU(){
                return this.name ? true:false;
            },

            rightPhone(){
                // 利用正则校验输入的手机号是否正确(最基本的校验)
                return /^1[3-9][0-9]{9}$/.test(this.phoneNum)
            },           
        },

        components:{
            [Dialog.Component.name]: Dialog.Component
        }


    }
</script>

<style scoped>
.login{
    width: 100%;
    height: 100%;
    background-color: #fff;    
}

.login .login_wrapper{
    width: 100%;
    height: 100%;   
}

.login .login_wrapper i{
    font-size: 35px;   
    padding-left: 10px;
}

.login .login_wrapper .log_title{
    text-align: center;
    font-weight: 600;
    color:#fe753e;
}

.login .login_wrapper .login_style{
    font-size: 18px;
    text-align: center;
    padding-top: 50px;
}

.login .login_wrapper .login_style .isChoiceLoginTyle{
    color: #fe753e;
}

.login .login_wrapper .login_style .message_login{
    padding-right: 18px;   
}

.login .login_wrapper .login_style .password_login{
    padding-left: 18px;    
}

.login_content{
    width:83%;
    padding-top: 50px;
    margin: 0 auto;
    box-sizing: border-box;
    background-color: #fff;    
}

.login_content .login_form{
    width: 100%;
    position: relative;
}

.login_content .login_form .login_content_wrapper{
    width: 100%;    
}
 
.login_content .login_message,
.login_content .login_verification,
.login_content .login_captcha,
.login_content .login_password{
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    position: relative;
    box-sizing: border-box;
}

.login_content .login_captcha{
    position: relative;
}

.login_content .login_captcha .get_captcha{
    width: 130px;
    height: 50px;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    /* background-color: #999 */
}

.login_content .login_message{
    position: relative;
}

.login_content .login_message i{
    font-size: 25px;    
    color: #999;
    position: absolute;
    top: 24px;
    right: 0px;
}

.login_content .login_password{
    position: relative;
}

.login_content .login_password i{
    font-size: 25px;
    color: #999;
    position: absolute;
    top: 24px;
    right: 0px;
}

.login_content .login_message input{
    width: 75%;
}

.login_content .login_verification input,
.login_content .login_captcha input{
    width: 40%;
}

.login_content .login_verification .get_verification{
    padding: 8px;
    background-color:#fff;
    border: 1px solid #e4e4e4;
    color: #e3dada;
}

.login_content .login_verification .right_phone{
    color: #060606;
}

.login_content .login_message input,
.login_content .login_verification input,
.login_content .login_captcha input,
.login_content .login_password input{
    padding-left: 15px;
    height: 32px;
}

/* .login_content .login_message:after,
.login_content .login_verification:after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    transform: scale(0.5);
    transform-origin: left top;
    box-sizing: border-box;
    z-index: -1;
    border-bottom: 1px solid #e4e4e4;
} */

.login_content .login_hint{
    color: #999;
    font-size: 14px;
    line-height: 20px;
}

.login_content .login_hint a{
    color: #fe753e;
}

.login_content .submit_wrapper{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 60px;
}


.login_content .register{
    color:#fe753e;
    font-size: 12px;
    position: absolute;
    bottom: -30px;
    right: 0px;
    margin-top: 10px;
}

.login_content .login_submit{
    width: 100%;
    height: 42px;
    border-radius: 4px;
    border: none;
    background-color: #fe753e;
    color: #ffffff;  
} 

</style>