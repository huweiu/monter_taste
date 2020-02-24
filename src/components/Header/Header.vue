<template>
    <div class="head">
        <header>
            <div class="head-title">
                <i class="iconfont icon-weizhi"></i>
                <span>妈妈的味道</span>
            </div>
            <div class="search" @click="goto('/search')">
                <i class="iconfont icon-changyongicon-"></i>
                <span>猪肉大葱水饺</span>
            </div>
            <div class="search-right"></div>
        </header>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        methods:{
            // 头部搜索框点击之后跳转到搜索页面
            goto(path){                
                this.$router.replace(path)
            }
        }
    }
</script>

<style scoped>
.head{
    width: 100%;
    height: 57px;
    background-color: #ffe5ca; 
    box-sizing: border-box;  
    border-bottom: 1px solid #fff;    
}

.head header{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    overflow-y: hidden;
}

.head header .head-title{
   width: 130px;
   /* line-height: 0.48rem; */
   display: flex;
}

.head header .head-title i{
    font-size: 25px;
    color: #fe753e;
}

.head header .head-title span{
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    /* text-align: center; */
    font-weight: bold;
    color: #fe753e;
    padding-left: 3px;
    text-shadow: 2px 2px 0px pink;
}

.head header .search{
    flex: 1;
    height: 25px;
    border-radius: 25px;
    background-color: #fff;
    display: flex;
    align-items: center;
}

.head header .search i{
    padding-left: 12px;
    padding-right: 12px;
}

.head header .search span{
    font-size: 13px;
    color: #cecece
}

.search-right{
    width: 15px;
}
</style>