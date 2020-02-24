<template>
    <div class="jcfood_detail">
        <!-- 整体大的包裹区域 -->
        <div class="detail_wrapper">
            <div class="detail_header">
                <i class="iconfont icon-mjiantou-copy" @click="$router.push('/msite')"></i>
            </div>
            <!-- 内容区域 -->
            <div class="detail_content">
                <div class="detail_content_wrap">
                    <img style="width:100%;height:200px" :src="JCFoodDataInfo.pic" alt="">
                    <div class="title">
                        <h2 class="food_name">{{JCFoodDataInfo.foodName}}</h2>
                        <span class="food_info">{{JCFoodDataInfo.foodinfo}}</span>
                        <div class="rate_wrapper">
                            <span class="rate">评分 {{JCFoodDataInfo.rate}}</span>
                            <span>月售 {{JCFoodDataInfo.order}} 单</span>
                        </div>
                        <div class="price_wrapper">
                            <span v-if="JCFoodDataInfo.discount > 0" class="price">原价 ¥<del>{{JCFoodDataInfo.price}}</del></span>
                            <span v-else class="price">原价 ¥{{JCFoodDataInfo.price}}</span>
                            <span v-if="JCFoodDataInfo.discount > 0" class="discount">折后价 ¥{{JCFoodDataInfo.discount}}</span>  
                        </div>
                    </div> 
                    <!-- 美食描述 -->
                    <div class="describer">
                        <h2 class="desc">菜品描述</h2>
                        <span>{{JCFoodDataInfo.desc}}</span>
                    </div>                   
                </div>
            </div>            
        </div>
        <JCFoodDetailFooter :DataInfos = "JCFoodDataInfo"/>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    import JCFoodDetailFooter from "../JCFoodDetailFooter/JCFoodDetailFooter"
    export default {
        name:"jcfood_detail",
        data(){
            return {
                // foodDataBase:{}
            }
        },

        computed:{
            ...mapState(["JCFoodDataInfo"])
        },

        components:{
            JCFoodDetailFooter
        }

    }
</script>

<style scoped>
.jcfood_detail{
    width: 100%;
    height: 100%;    
}

.jcfood_detail .detail_wrapper{
    width: 98%;
    height: 100%;
    margin: 0 auto;
}

.jcfood_detail .detail_wrapper .detail_header{
    width: 100%;
    height: 45px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
}

.jcfood_detail .detail_wrapper .detail_header i{
    font-size: 44px;
    color:#ccc;
}

.jcfood_detail .detail_wrapper .detail_content .detail_content_wrap{
    width: 100%;
    height: 100%;
}

.jcfood_detail .detail_wrapper .detail_content .title{
    width: 100%;
    /* height: 100px; */
    box-sizing: border-box;
    margin-top:10px;
    padding: 10px;
    background-color: #fff;
}

.jcfood_detail .detail_wrapper .detail_content .title .food_name{
    font-size: 20px;
    font-weight: bold;
    font-family: "微软雅黑";
    /* padding-left: 10px; */
    color: #373737;
    padding-top: 5px;
    padding-bottom: 10px;
}

.jcfood_detail .detail_wrapper .detail_content .title .food_info{    
    font-size: 13px;
    line-height: 12px;
    color: #9b9b9b;
    font-family: "微软雅黑";
    padding-bottom: 10px;
}

.jcfood_detail .detail_wrapper .detail_content .title .rate_wrapper{
    width: 100%;
    padding-top: 10px;
    /* padding-bottom: 10px; */
    font-size: 14px;
    color: #999;   
    background-color: #fff;
}

.jcfood_detail .detail_wrapper .detail_content .title .rate_wrapper .rate{
    color: #fe753e;
}

.jcfood_detail .detail_wrapper .detail_content .title .price_wrapper{
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    color: #999;   
    background-color: #fff;
}

.jcfood_detail .detail_wrapper .detail_content .title .price_wrapper .discount{
    color: #fe753e;
}

.jcfood_detail .detail_wrapper .detail_content .detail_content_wrap .describer{
    width: 100%;
    box-sizing: border-box;
    margin-top: 10px;
    padding: 10px;
    background-color: #fff;
}

.jcfood_detail .detail_wrapper .detail_content .detail_content_wrap .describer .desc{
    width: 100%;
    height: 30px;
    font-size: 20px;
    font-weight: bold;
    font-family: "微软雅黑";
    color: #373737;
}

.jcfood_detail .detail_wrapper .detail_content .detail_content_wrap .describer span{
    font-size: 13px;
    line-height: 12px;
    color: #9b9b9b;
    font-family: "微软雅黑";
    padding-bottom: 10px;
}
</style>