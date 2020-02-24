<template>
    <div class="msite">
        <Header/>
        <!-- 首页轮播图 -->
        
        <!-- <div class="swiper-area">
            <van-swipe :autoplay="2000" indicator-color="#fe753e">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img v-lazy="image.imageUrl" width="100%"/>
                </van-swipe-item>               
            </van-swipe>
            <img v-lazy="images[1].imageUrl" width="100%"/>
        </div>     -->
        <!-- 食品大类分类 导航 -->
        <div class="msite-nav">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(imagesRecommed,index) in imagesRecommeds" :key="index">
                        <a href="javascript:" class="link_to_food">
                            <div class="food_container">
                                <img :src="imagesRecommed.imageUrl">
                            </div>
                            <span>{{imagesRecommed.name}}</span>
                        </a>
                    </div>
                </div> 
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
            </div>
        </div>

        <!-- 精品美食推荐 -->
        <Recommend/>
        <!-- 家常菜显示模块 -->
        <JCFood/>
    </div>
 
</template>

<script>
    import Header from "../../components/Header/Header"
    import Recommend from "../../components/Recommend/Recommend"
    import JCFood from "../../components/JCFood/JCFood"
    import Swiper from 'swiper'
    import 'swiper/css/swiper.min.css'

    export default {
        data(){
            return {
                images:[
                    // 测试版
                    // {imageUrl:"../../../static/images/Swiper/swpier_01.png"},
                    // {imageUrl:"../../../static/images/Swiper/swpier_02.png"},
                    // {imageUrl:"../../../static/images/Swiper/swpier_03.png"}

                    // 生产打包版
                    {imageUrl:"./static/images/Swiper/swpier_01.png"},
                    {imageUrl:"./static/images/Swiper/swpier_02.png"},
                    {imageUrl:"./static/images/Swiper/swpier_03.png"}
                ],

                imagesRecommeds:[
                    // {imageUrl:"../../../static/images/nav/7.jpg",name:"甜品饮品"},
                    // {imageUrl:"../../../static/images/nav/7.jpg",name:"生鲜水饺"},
                    // {imageUrl:"../../../static/images/nav/1.jpg",name:"可口面食"},

                    // {imageUrl:"../../../static/images/nav/3.jpg",name:"时令水果"},
                    // {imageUrl:"../../../static/images/nav/7.jpg",name:"精美早餐"},
                    // {imageUrl:"../../../static/images/nav/7.jpg",name:"爱心小菜"},
                    // {imageUrl:"../../../static/images/nav/7.jpg",name:"健康午餐"},
                    // {imageUrl:"../../../static/images/nav/7.jpg",name:"简单夜宵"}



                    {imageUrl:"./static/images/nav/7.jpg",name:"甜品饮品"},
                    {imageUrl:"./static/images/nav/7.jpg",name:"生鲜水饺"},
                    {imageUrl:"./static/images/nav/1.jpg",name:"可口面食"},

                    {imageUrl:"./static/images/nav/3.jpg",name:"时令水果"},
                    {imageUrl:"./static/images/nav/7.jpg",name:"精美早餐"},
                    {imageUrl:"./static/images/nav/7.jpg",name:"爱心小菜"},
                    {imageUrl:"./static/images/nav/7.jpg",name:"健康午餐"},
                    {imageUrl:"./static/images/nav/7.jpg",name:"简单夜宵"}
                ]
            }
        },

        created(){
            new Swiper ('.swiper-container', {
                direction: 'vertical', // 垂直切换选项
                loop: true, // 循环模式选项                
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                }               
            })        
        },

        components:{
            Header,
            Recommend,
            JCFood
        }
    }
</script>

<style scoped>
.msite{
    width: 100%;
    height: 100%;    
    overflow: hidden;
}

.msite .swiper-area{
    width: 100%; 
    height: 140px;
    max-height: 200px;
    overflow: hidden;
    margin-bottom: 10px;
}

.msite .msite-nav{
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    padding-bottom: 10px;
    padding-top: 10px;    
    background-color: #fff;
    margin-bottom: 10px;
}

.msite .msite-nav .swiper-container{
    width: 100%;
}

.msite .msite-nav .swiper-container .swiper-wrapper{
    width: 100%;
    height: 100%;  
    display: flex;
    justify-content: space-around;  /* 元素按主轴方向列  */   
    flex-wrap: wrap; /*设置换行*/
}

.msite .msite-nav .swiper-container .swiper-wrapper .swiper-slide{    
    display: flex;
    width: 25%;    
    justify-content: center;
}

.msite .msite-nav .swiper-container .swiper-wrapper .swiper-slide .link_to_food{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.msite .msite-nav .swiper-container .swiper-wrapper .swiper-slide .link_to_food img{
    width: 50px;
    height: 50px;
}

.msite .msite-nav .swiper-container .swiper-wrapper .swiper-slide .link_to_food span{
    font-size: 13px;
    color: #666;
}


</style>