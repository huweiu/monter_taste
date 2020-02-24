<template>
    <div class="search">
        <div class="search_wrapper">
            <div class="search_head">
                <i class="iconfont icon-mjiantou-copy myArrow" @click="$router.back()"></i>
                <form action="" class="search_form">
                    <i class="iconfont icon-changyongicon-"></i>
                    <input type="text" name="conent" placeholder="猪肉大葱水饺" v-model="searchName">
                    <i class="iconfont icon-chahao myXX" v-if="isShowXX" @click="clearSearchName"></i>
                </form>
                <button>搜索</button>
            </div>
            <!-- 搜索历史 -->
            <div class="search_history"></div>
            <!-- 热门搜索 -->
            <div class="search_hot">
                <h5 class="hot_title">热门搜索</h5>
                <span class="search_hot_food">麻婆豆腐</span>
                <span class="search_hot_food">水煮鱼</span>
                <span class="search_hot_food">美味煎饺</span>
                <span class="search_hot_food">麻婆豆腐</span>
                <span class="search_hot_food">水煮鱼</span>
                <span class="search_hot_food">美味煎饺</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                searchName:"", // 搜索框中输入的内容
                // isShowXX:false, // 是否显示喳喳 
            }
        },
        methods:{
            clearSearchName(){
                this.searchName = ""
            }
        },

        computed:{
            isShowXX(){
                return this.searchName ? true : false;
            }
        }
    }
</script>

<style scoped>
.search{
    width: 100%;
    height: 100%;
    background-color: #fff;
}

.search .search_wrapper{
    width: 100%;
    height: 100%;
}

.search .search_wrapper .search_head{
    width: 95%;
    margin: 0 auto;
    height: 50px;
    /* background-color: pink; */
    display: flex;
}

.search .search_wrapper .search_head .myArrow{
    flex:1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
}

.search .search_wrapper .search_head .search_form{
    width: 70%;
    height: 100%;
    /* background-color: gray; */
    display: flex;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 25px;
    
}

.search .search_wrapper .search_head .search_form i{
    font-size: 28px;
    display: flex;
    align-items: center;
    padding-right: 8px;
    background-color: #f5f5f5;
}

.search .search_wrapper .search_head .search_form .myXX{
    font-size: 18px;
    color: #666;
}

.search .search_wrapper .search_head .search_form input{
    width: 85%;
    border: none;
    background-color: #f5f5f5;
    padding-right: 5px;
}

.search .search_wrapper .search_head button{
    flex:1;
    border: none;
    background-color: #fff;
}

.search .search_wrapper .search_hot{
    width: 95%;
    margin: 10px auto;     
    font-size: 0;
}

.search .search_wrapper .search_hot .hot_title{
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 20px;
}

.search .search_wrapper .search_hot .search_hot_food{
    padding: 10px;
    display: inline-block;
    background-color: #f5f5f5;
    border-radius: 5px;
    font-size: 15px;
    margin: 5px;
}

.search .search_wrapper .search_hot .search_hot_food:nth-of-type(1){
    color: #fe753e;
}

.search .search_wrapper .search_hot .search_hot_food:nth-of-type(2){
    color: #fe753e;
}
</style>