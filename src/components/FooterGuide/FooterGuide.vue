<template>
    <div class="footer">
        <footer>
            <ul>
                <li @click="goto('/msite')" >
                    <a href="#" :class="{fontcolor:isCurrentPath('/msite')}">
                        <i class="iconfont icon-shouye"></i>
                        <span>首页</span>
                    </a>
                </li>
                <li @click="goto('/classify')">
                    <a href="#" :class="{fontcolor:isCurrentPath('/classify')}">
                        <i class="iconfont icon-fenlei"></i>
                        <span>分类</span>
                    </a>
                </li>
                <li @click="goto('/cart')">
                    <a href="#" :class="{fontcolor:isCurrentPath('/cart')}">
                        <i class="iconfont icon-icon22fuzhi"></i>
                        <span>购物车</span>
                    </a>
                </li>
                <li @click="goto('/order')">
                    <a href="#" :class="{fontcolor:isCurrentPath('/order')}">
                        <i class="iconfont icon-dingdan"></i>
                        <span>订单</span>
                    </a>
                </li>
                <li @click="goto('/profile')">
                    <a href="#" :class="{fontcolor:isCurrentPath('/profile')}">
                        <i class="iconfont icon-wode"></i>
                        <span>我的</span>
                    </a>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
    export default {
        data(){
            return{
               
            }

        },
        methods:{
            goto(path){
                this.$router.replace(path)
            },
            // 获取当前的路由地址
            isCurrentPath(path){
                // console.log(this.$route)
                return this.$route.path === path
            }
        }
    }
</script>

<style scoped>
    .footer{
        width: 100%;
        height: 57px;
        box-sizing: border-box;
        background-color: #f7f7f7;
        position: fixed;
        bottom:0;
        left: 0;
        z-index: 1000;
        border-top: 1px solid #d3e3f9;
    }

    .footer footer{
        height: 100%;
    }    

    .footer footer ul{
        display: flex;
        height: 100%;
        justify-content: space-around;
    }

    .footer footer ul li a{
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-around;
    }

    .footer footer ul li a i{
        display: flex;
        justify-content: center;
        font-size: 24px;
        padding-bottom: 0.03rem;
    }

    .footer footer ul li a span{
        font-size: 16px;
    }

    .footer footer ul li .fontcolor{
        color: #fe753e;
    }

</style>