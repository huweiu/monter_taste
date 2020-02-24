<template>
    <div class="jcfood">
        <div class="jcfoof_content">
            <i class="iconfont icon-tuijian"></i>
            <h2 class="title">精美家常菜</h2>
        </div>
        <div class="content">
            <ul ref="picsUl">
                <li class="content_list" @click="gotoNewPage(foodDataBase)" v-for="(foodDataBase,index) in foodDataBases" :key="index">                    
                    <div class="left">
                        <a href="#">                           
                            <img style="width:100px;height:100px" :src="foodDataBase.pic" alt="">
                        </a>
                    </div>
                    <div class="right">
                        <h2 class="food_name">{{foodDataBase.foodName}}</h2>
                        <div class="right_middle">
                            <span class="score">评分 {{foodDataBase.rate}}</span>
                            <span>月售 {{foodDataBase.order}} 单</span>
                        </div>
                        <div class="right_bottom">
                            <span v-if="foodDataBase.discount > 0" class="price">¥<del>{{foodDataBase.price}}</del></span>
                            <span v-else class="price">¥{{foodDataBase.price}}</span>

                            <span v-if="foodDataBase.discount > 0" class="discount">折后价 ¥{{foodDataBase.discount}}</span>                            

                            <span class="fee">配送费约 ¥{{foodDataBase.fee}}</span>
                            <i class="iconfont icon-icon22fuzhi"></i>
                        </div>
                    </div>                    
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import BScroll from '@better-scroll/core'
    import {getJCFoodInfo} from "../../api/index"
    export default {
        name:"jcfood",
        data(){
            return {                
                foodDataBases:[]
            }
        },

        created(){
            this.getJCFoodInfoFromServer()
        },

        methods:{
            _initScroll() { 
                const ul = this.$refs.picsUl
                const liHeight = 100
                const paddingHeight = 20
                const count = this.foodDataBases.length
                ul.style.height = (liHeight + paddingHeight) * count + (120*4) + 'px'
                new BScroll(".content",{
                    click:true
                })
            },

            // 请求服务器的数据
            async getJCFoodInfoFromServer(){
                let result = await getJCFoodInfo()
                if(result.errCode === 0){
                    // 请求服务器数据成功
                    console.log(result.data)
                    this.foodDataBases = result.data
                }
            },

            // 前端页面点击单个项目，进入页面详情展示
            gotoNewPage(dataObj){
                console.log("*********** = ",dataObj)
                this.$store.dispatch("saveJCFoodDetailData",dataObj)
                // 页面进行跳转
                this.$router.push("/jcfooddetail")
            }
        },

        watch:{
            foodDataBases(){
                this.$nextTick(()=>{
                    this._initScroll()
                })
            }
        }
    }
</script>

<style scoped>
.jcfood{
    width: 95%;
    height: 100%;
    margin: 10px auto;
    background-color: #fff;    
}

.jcfood .jcfoof_content{
    width: 100%;
    height: 25px;
    display: flex;
    box-shadow: 0 1px 0 0 #ccc;
}

.jcfood .jcfoof_content i{
    padding-right: 8px;
    font-size:18px;
    color:#fe753e;
}

.jcfood .jcfoof_content .title{
    color: #999;
    font-size: 14px;
    line-height: 25px;
}

.jcfood .content{
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.jcfood .content .content_list{
    width: 100%;
    height: 100px;
    padding-top: 10px;
    padding-bottom: 10px;
    box-shadow: 0 1px 0 0 #ccc;
    /* background-color: pink; */
    display: flex;
}

.jcfood .content .content_list .right{
    flex: 1;
    box-sizing: border-box;
    padding-left: 10px;
    /* background-color: deeppink; */
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
}

.jcfood .content .content_list .right .food_name{
    font-size: 18px;
    font-weight: bold;
    font-family: "微软雅黑"
}

.jcfood .content .content_list .right .right_middle{
    font-size: 14px;
    color: #999;
}

.jcfood .content .content_list .right .right_middle .score{    
    color: #fe753e;
    padding-right: 10px;
}

.jcfood .content .content_list .right .right_bottom{
    font-size: 14px;
    color: #999;    
}

.jcfood .content .content_list .right .right_bottom .discount{
    color: #fe753e;
}

.jcfood .content .content_list .right .right_bottom i{
    /* margin-left: 80px; */
    font-size: 28px;
    border: 1px solid #fe753e;
    color: #fff;
    background-color: #fe753e;
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    right: 10px;
    z-index: 100;

}
</style>