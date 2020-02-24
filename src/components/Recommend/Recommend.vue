<template>
    <div class="recommend">
        <!-- 精品美食推荐 -->
        <div class="recommend-header">
            <i class="iconfont icon-tuijian"></i>
            <h2 class="recommend-title">精品美食推荐</h2>
        </div>

        <!--精品美食内容部分-->
        <section class="section">
            <div class="recommend-wrapper">
                <ul ref="picsUl" class="recommend_list">
                    <li v-for="(JPFoodDataBase,index) in JPFoodDataBases" :key="index">
                        <img :src="JPFoodDataBase.pic" alt="#">
                        <span>{{JPFoodDataBase.foodName}}</span>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
    import {getJPFoodRecData} from "../../api/index"
    import BScroll from '@better-scroll/core'
    export default {
        data(){
            return {
                JPFoodDataBases:[]
            }
        },

        created(){
            this.getJPFoodRecInfo()
        },

        mounted(){
            // this._initScroll()
        },

        methods: {
            _initScroll() {  
                // 动态计算ul的宽度
                console.log("111111")
                const ul = this.$refs.picsUl
                //const ul = document.querySelector(".recommend-content-list")
                console.log(ul)
                const liWidth = 120
                const space = 5
                const count = this.JPFoodDataBases.length
                console.log("222222 = " + count)
                console.log((liWidth + space) * count -space)
                ul.style.width = (liWidth + space) * count -space + 'px'
                console.log("3333333")
                
                new BScroll('.recommend-wrapper', {
                    scrollX: true // 水平滑动
                })
            },

            async getJPFoodRecInfo(){
                let result = await getJPFoodRecData()
                if(result.errCode === 0){
                    this.JPFoodDataBases = result.data
                }
            }
        },

        watch:{
            JPFoodDataBases(){
                this.$nextTick(()=>{
                    this._initScroll()
                })
            }
        }
    }
</script>

<style scoped>
.recommend{
    width: 100%;
    border-top: 1px solid #e4e4e4;
    overflow: hidden;   
}

.recommend .section{
    padding-left: 8px;
    padding-right: 8px;
}

.recommend .recommend-header{
    display: flex;
    width: 100%;
    height: 20px;
    box-sizing: border-box;
    background-color: #ffffff;
    margin-bottom: 5px;
}

.recommend .recommend-header i{
    padding-left: 8px;
    padding-right: 8px;
    font-size:18px;
    color:#fe753e;
    display: flex;
    align-items: center;
}

.recommend .recommend-header .recommend-title{
    color: #999;
    font-size: 14px;
    line-height: 20px;
}

.recommend  .recommend-wrapper{
    width: 100%;
    box-sizing: border-box;    
    overflow: hidden;
}

.recommend  .recommend-wrapper ul{
    /* width: 200%; */
    display: flex;    
    flex-wrap: nowrap;    
    box-sizing: border-box;
    /* background-color: red; */
}

.recommend  .recommend-wrapper ul li{
    width: 120px;
    height: 130px;
    display: flex;
    /* background-color: pink; */
    margin-right: 5px;
    flex-direction: column;
    align-items: center;
}

.recommend  .recommend-wrapper ul li:last-child{
    margin-right: none;
}

.recommend  .recommend-wrapper ul li img{
    width: 120px;
    height: 110px;
}

.recommend  .recommend-wrapper ul li span{
    color: #999;
    font-size: 14px;
    line-height: 20px;
}
</style>