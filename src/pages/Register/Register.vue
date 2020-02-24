<template>
    <div class="register">
        <i class="iconfont icon-mjiantou-copy" @click="goto('/login')"></i>
        <h3 class="title">用户注册</h3>
        <form class="form_wrapper" @submit.prevent="register">
            <section class="register_username">
                <label>用 户 名</label><input type="text" maxlength="20" name="userName" placeholder="您的账号和登录名" v-model="userName" @focus="isFocus" @blur="isBlur">
                <i class="iconfont icon-chahao" v-if="isShowXX" @click="clearContext"></i>
                <span class="isCheckUserName" v-if="isCheckName">{{CheckNameContext}}</span>
                <span class="isCheckfocus" v-if="isfocus">{{isfocusText}}</span>
            </section>            
            <section class="register_password">
                <label>密 码</label><input type="password" maxlength="20" name="passWord" placeholder="建议使用两种或两种以上字符组合" v-model="passWord" @focus="isPwdFocus" @blur="isPwdBlur">
                <span class="isCheckpwd" v-if="isPwd">{{isPwdFoucesText}}</span>
                <span class="isCheckpwdErr" v-if="isPwdErr">{{isPwdFoucesErrText}}</span>
            </section>            
            <section class="reg_comfirm_password">
                <label>确认密码</label><input type="password" maxlength="20" name="passWord1" placeholder="请再次输入密码" v-model="passWord1" @focus="isPwd1Focus" @blur="isPwd1Blur">
                <span class="isShowPwd" v-if="isPwdMsg">{{isPwdMsgText}}</span>
                <span class="isShowPwdErr" v-if="isPwdMsgErr">{{isPwdMsgErrText}}</span>
            </section>
            <section class="register_phoneNum">
                <label>手机号码</label><input type="tel" maxlength="11" name="phoneNum" placeholder="请输入手机号码" v-model="phoneNum" @focus="isPhoneNumFocus" @blur="isPhoneNumBlur">
                <span class="isCheckphoneNum" v-if="isCheckphone">{{CheckphoneNumText}}</span>
                <span class="isCheckphoneNumErr" v-if="isPhNumErr">{{CheckphoneNumErrText}}</span>
            </section>            
            <div class="submit_wrapper">
                <button class="register_submit" :loading="openLoading">立即注册</button>
            </div>
            <router-link class="register_link" to="/login">已有账号,去登录吧</router-link>
        </form>
    </div>
</template>

<script>
    import { Dialog } from 'vant';
    import md5 from "js-md5";
    import {UserRegister,checkUserName} from "../../api/index"
    export default {
        data(){
            return{
                userName:"", //用户名
                passWord:"", // 密码
                passWord1:"", // 确认密码
                phoneNum:"", // 注册手机号码
                //isPwdMsg:false // 是否显示密码验证提示信息
                isfocusText:"",
                isfocus:false,
                isCheckName:false,
                CheckNameContext:"",
                isPwd:false,
                isPwdFoucesText:"建议使用字母、数字和符号两种及以上的组合，8-20个字符",
                isPwdErr:false,
                isPwdErrText:"长度只能在8-20个字符之间",
                isPwdFoucesErrText:"",
                isPwdMsg:false,
                isPwdMsgText:"请再次输入密码",
                isPwdMsgErr:false,
                isPwdMsgErrText:"两次输入密码不一致",
                isCheckphone:false,
                isPhNumErr:false,
                CheckphoneNumText:"请输入手机号",
                CheckphoneNumErrText:"输入的手机号码不合法",
                openLoading:false, // 防重复提交
            }
        },

        methods:{
            goto(path){
                this.$router.replace(path)
            },

            clearContext(){
                this.userName = ""
                this.isCheckName = false
                this.isfocus = false
            },

            alertError(msg){
                Dialog.alert({
                    message: msg
                    }).then(() => {
                    // on close
                    return
                });
            },

            async register(){
                // 获取页面中的元素的值
                this.openLoading = true
                let {userName,passWord,passWord1,phoneNum} = this
                if(!userName){
                    this.alertError("用户名不能为空!")
                    return
                }else if(!passWord){
                    this.alertError("密码不能为空!")
                    return
                }else if(!phoneNum){
                    this.alertError("手机号不能为空!")
                    return
                }

                if(this.isfocus){
                    console.log("aaaaaa")
                    console.log(this.isCheckName)
                    this.alertError("用户名非法")
                    return
                }else if(this.isPwdErr){
                    console.log("bbbbbb")
                    this.alertError("密码不合法")
                    return
                }else if(this.isPwdMsgErr){
                    this.alertError("两次输入密码不一致")
                    return
                }else if(this.isPhNumErr){
                    console.log("ccc")
                    this.alertError("输入的手机号码不合法")
                    return
                }
                // 前端校验已基本完成,发送后台做数据处理
                console.log("ddddd")
                // 1. 对输入的密码加密
                let newPassword = md5(passWord)
                let result = await UserRegister(userName,newPassword,phoneNum) // 请求服务器的方法
                console.log("11111111aaaa")
                console.log(result)
                if(result.errCode === 0){
                    this.alertError("恭喜注册成功")
                    this.$router.replace("/login") // 注册成功跳转到登录页面
                }else{
                    this.openLoading = false
                    this.alertError(result.msg)
                    retrun 
                }
            },
            // 表单获取焦点的时候触发
            isFocus(){
                console.log("23huweuiu")
                this.isfocus = true
                this.CheckNameContext = ""
                this.isfocusText = "支持中文、英文、数字、“-”、“_”的组合，4-20个字符"
            },
            // 表单失去焦点的时候做校验
            async isBlur(){
                this.isfocus = false
                this.CheckNameContext = ""                
                if(this.userName){
                    this.isCheckName = true
                    if(/^\d+$/.test(this.userName)){
                        this.isfocusText = ""
                        this.CheckNameContext = "用户名不能为纯数字"
                        return 
                    }
                    if(this.userName.length < 4){
                        this.CheckNameContext = "长度只能在4-20个字符之间"
                        return 
                    }

                    // 上面验证通过之后发ajax请求去服务器查询用户是否存在
                    let {userName} = this
                    let result = await checkUserName(userName)
                    console.log(result)
                    if(result.errCode === 1){                        
                        this.CheckNameContext = result.msg
                    }
                }else{
                    this.isCheckName = false
                    return 
                }
            },

            isPwdFocus(){
                this.isPwd = true
                this.isPwdErr = false
            },

            isPwdBlur(){
                this.isPwd = false
                if(this.passWord){ // 输入框中有密码输入
                    if(this.passWord.length < 8){
                        this.isPwdErr = true
                        this.isPwdFoucesErrText = this.isPwdErrText
                        return 
                    }
                }
            },

            isPwd1Focus(){
                this.isPwdMsg = true
                this.isPwdMsgErr = false
            },
            
            isPwd1Blur(){
                this.isPwdMsg = false
                if(this.passWord !== this.passWord1){
                    this.isPwdMsg = false
                    this.isPwdMsgErr = true
                    return 
                }
            },

            isPhoneNumFocus(){
                this.isCheckphone=true
                this.isPhNumErr=false
            },

            isPhoneNumBlur(){
                if(this.phoneNum){
                    if(!/^1[3-9][0-9]{9}$/.test(this.phoneNum)){
                        this.isCheckphone=false
                        this.isPhNumErr=true
                        return 
                    }else{
                        this.isCheckphone=false
                        this.isPhNumErr=false
                    }   
                }else{
                    this.isCheckphone=false
                    return 
                }
            }
        },

        computed:{
            isShowXX(){
                return this.userName ? true : false
            }
        }
    }
</script>

<style scoped>
.register{
    width:100%;
    height: 100%;
    background-color: #ffffff;
    position: relative;
}

.register i{
    font-size: 30px;
    position: absolute;
    left: 10px;
    top: 30px;
}

.register .title{
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    font-weight: 600;
    color: #fe753e;
    padding-top: 30px;
}

.register .form_wrapper{
    width: 90%;
    height: 100%;
    margin: 0 auto;
    padding-top: 45px;
    position: relative;
}

.register .form_wrapper .register_username,
.register .form_wrapper .register_password,
.register .form_wrapper .reg_comfirm_password,
.register .form_wrapper .register_phoneNum{
    font-size:18px;
    padding-bottom: 20px;
    position: relative;
}

.register .form_wrapper .register_username i{
    font-size: 20px;
    color: #999;
    position: absolute;
    top: 10px;
    left: 320px;
}

.register .form_wrapper .register_phoneNum .isCheckphoneNum,
.register .form_wrapper .register_username .isCheckUserName,
.register .form_wrapper .reg_comfirm_password .isShowPwdErr{
    display: block;
    font-size: 12px;
    position: absolute;
    color: #fe753e;
}

.register .form_wrapper .register_phoneNum .isCheckphoneNum{
    color: #c5c5c5;
}

.register .form_wrapper .register_phoneNum .isCheckphoneNumErr{
    display: block;
    font-size: 12px;
    position: absolute;
    color: #fe753e;
}

.register .form_wrapper .register_username .isCheckfocus{
    display: block;
    font-size: 12px;
    position: absolute;
    color: #c5c5c5;
}

.register .form_wrapper .register_password .isCheckpwd{
    display: block;
    font-size: 12px;
    position: absolute;
    color: #c5c5c5;
}

.register .form_wrapper .register_password .isCheckpwdErr{
    display: block;
    font-size: 12px;
    position: absolute;
    color: #fe753e;
}

.register .form_wrapper .reg_comfirm_password .isShowPwd{
    display: block;
    font-size: 12px;
    position: absolute;
    color: #c5c5c5;
}

.register .form_wrapper .register_username input,
.register .form_wrapper .register_password input,
.register .form_wrapper .reg_comfirm_password input,
.register .form_wrapper .register_phoneNum input{
    font-size: 15px;
    width: 70%;
    margin-left: 10px;
    height: 40px;
}

.register .form_wrapper .submit_wrapper{
    width: 100%;
}

.register .form_wrapper .submit_wrapper .register_submit{
    width: 100%;
    height: 50px;
    border: none;
    background-color: #fe753e;
    color: #ffffff;
    font-size: 18px;
}

.register .form_wrapper .register_link {
    font-size: 12px;
    position: absolute;
    right: 0px;
    margin-top: 10px;
    color: #fe753e;
    border-radius: 4px;
}
</style>