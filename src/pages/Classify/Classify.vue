<template>
    <div class="classify">
        <div class="classify_wapper">
            <div class="classify_title">
                <i class="iconfont icon-mjiantou-copy" @click="goto('/msite')"></i>
                <h2 class="title">商品分类</h2>
            </div>
            
            <div class="classify_content">
                <div class="classify_left">
                    <ul ref="piscUl">
                        <li class="classify_list" :class="{current:index === currentIndex}" 
                        v-for="(classifyList,index) in classifyLists" :key="index" @click="clickMenuItem(index)">
                            <span class="text">{{classifyList.classifyName}}</span>
                        </li>
                    </ul>
                </div>
                <div class="classify_right">
                    <ul ref="piscUl02">
                        <li class="title_list" v-for="(dataArr,index) in dataArrs" :key="index">
                            <h5 class="title">{{dataArr.classifyName}}</h5>
                            <ul >
                                <li @click="gotoNewPage(ClassifyArr)" class="right_content" v-for="(ClassifyArr,index) in dataArr.ClassifyArrs" :key="index">
                                    <img style="width:100px;height:100px;" v-lazy="ClassifyArr.pic" alt="">
                                    <div class="list_right">
                                        <h4>{{ClassifyArr.foodName}}</h4>
                                        <span class="foodinfo">{{ClassifyArr.foodinfo}}</span><br>
                                        <span class="foodinfo">评分 {{ClassifyArr.rate}}</span>
                                        <span class="foodinfo">月售 {{ClassifyArr.order}}单</span><br>
                                        <span class="foodinfo">原价 ¥{{ClassifyArr.price}}</span>
                                        <span v-if="ClassifyArr.discount > 0" class="foodinfo discount">折扣价 ¥{{ClassifyArr.discount}}</span>
                                        <i class="iconfont icon-icon22fuzhi"></i>
                                    </div>
                                </li>                       
                            </ul>
                        </li>
                    </ul>                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from '@better-scroll/core'
    import {getClassifyListsData,getClassifyData} from "../../api/index"
    export default {
        data(){
            return{
                classifyLists:[],
                Classifys:[],
                dataArrs:[],
                scrollY:"",
                tops:[]

            }
        },

        created(){
            this.getClassifyLists()
            this.getClassify()
        },

        mounted(){
            // this.dataCollection()
        },

        methods:{
            _initScroll() { 
                const ul = this.$refs.piscUl
                const liHeight = 60
                //const paddingHeight = 20
                const count = this.classifyLists.length
                ul.style.height = (liHeight ) * count +120+ 'px'
                new BScroll(".classify_left",{
                    click:false // 这里有一个坑  这个地方如果是true的话,会导致滑动的这个区域绑定的事件一旦触发停不下，
                                // 会自动成倍数的被自动触发
                })
            },

            _initScroll_2() { 
                const ul = this.$refs.piscUl02
                const liHeight = 138
                //const paddingHeight = 20
                const count = this.Classifys.length
                ul.style.height = (liHeight ) * count +120+ 'px'
                this.rightScroll = new BScroll(".classify_right",{
                    click:false, // 这里有一个坑  这个地方如果是true的话,会导致滑动的这个区域绑定的事件一旦触发停不下，
                                // 会自动成倍数的被自动触发
                    probeType: 2,  // 因为惯性滑动不会触发
                })

                // 给右侧列表绑定scroll监听
                this.rightScroll.on("scroll",({x,y})=>{
                    // console.log(x,y)
                    this.scrollY = Math.abs(y) // 滑动的时候时时获取 Y轴方向的的坐标值
                })

                this.rightScroll.on("scrollEnd",({x,y})=>{
                    // console.log(x,y)
                    this.scrollY = Math.abs(y) // 滑动的时候时时获取 Y轴方向的的坐标值
                })
            },

            _Topinit(){
                // 初始化tops
                let tops = []
                // 给tops数组初始值
                let top = 15
                tops.push(top)
                // 收集每一个分类大的li的高度
                let lis = this.$refs.piscUl02.getElementsByClassName("title_list")
                // 此时获取的li是一个伪数组
                // 转换成真数组遍历
                Array.prototype.slice.call(lis).forEach((li,index)=>{
                    top += li.clientHeight
                    tops.push(top)
                })

                // 把收集到的数据更新的全局的tops数组中
                this.tops = tops
                console.log("YYYYYYYYYYYY = ",this.tops)
            },

            clickMenuItem(index) {
                console.log("WWWWW = ",index)
                // 使用右侧列表滑动到对应的位置
                // this.currentIndex = index
                // 得到目标位置的scrollY
                const scrollY = this.tops[index]
                // 立即更新scrollY(让点击的分类项成为当前分类)
                this.scrollY = scrollY
                // 平滑滑动右侧列表
                this.rightScroll.scrollTo(0, -scrollY, 300)
            },

            // 点击单个条目 跳转到商品详情页面
            gotoNewPage(dataObj){
                this.$store.dispatch("saveClassifyData",dataObj)
                // 页面进行跳转
                this.$router.push("/jcfooddetail")
            },

            goto(path){
                this.$router.replace(path)
            },

            dataCollection(){
                let classifyListsLen = this.classifyLists.length
                let classifyLen = this.Classifys.length;
                let obj = {}
                let objArr = []
                for( let i = 0; i < classifyListsLen; i++ ){
                    obj = {}
                    objArr = []
                    if(!obj.classifyName){
                        obj.classifyName = this.classifyLists[i].classifyName
                    }
                    for( let j = 0; j < classifyLen; j++ ){               
                        if( this.classifyLists[i].classifyNo === this.Classifys[j].ClassifyNo ){                                                  
                            objArr.push(this.Classifys[j])                       
                        }
                    }
                    obj.ClassifyArrs = objArr
                    this.dataArrs.push(obj)
                }
            },

            async getClassifyLists(){
                let result = await getClassifyListsData()
                if(result.errCode === 0){                    
                    this.classifyLists = result.data
                    console.log("PPPPPP = ",this.classifyLists)
                }else{
                    console.log("分类列表数据获取失败")
                    return
                }
            },

            async getClassify(){
                let result = await getClassifyData()
                if(result.errCode === 0){
                    this.Classifys = result.data
                    this.dataCollection()
                }else{
                    console.log("获取分类数据失败")
                }                
            }
        },

        computed:{
            // 计算得到当前分类的下标
            currentIndex(){
                // 获取时时得到的滚动数据和已计算好的每个li大类高度的数组
                let {scrollY,tops} = this
                // 查找tops数组的下标
                let index = tops.findIndex((top,index)=>{
                    return scrollY + 15 >= top && scrollY < tops[index+1]
                })

                return index
            }
        },

        watch:{
            classifyLists(){
                this.$nextTick(()=>{
                    this._initScroll()
                })
            },

            dataArrs(){
                this.$nextTick(()=>{
                    this._initScroll_2()
                    this._Topinit()
                })
            }

        }
    }
</script>

<style scoped>
.classify{
    width: 100%;
    height: 100%;
    background-color: #fff;
}

.classify .classify_wapper{
    width: 95%;
    height: 100%;
    margin: 0 auto;
}

.classify .classify_wapper .classify_title{
    width: 100%;
    height: 40px;
    background-color: #fff;
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
}

.classify .classify_wapper .classify_title i{
    font-size: 35px;
}

.classify .classify_wapper .classify_title .title{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-family: "微软雅黑"
}

.classify .classify_wapper .classify_content{
    width: 100%;
    height: 100%;
    background-color: #fff;
    margin-top: 50px;
    display: flex;
}

.classify .classify_wapper .classify_content .classify_left{
    width: 80px;
    height: 100%;
    background-color: #fff;
}

.classify .classify_wapper .classify_content .classify_left ul{
    width: 100%;
    /* height: 100%; */
}

.classify .classify_wapper .classify_content .classify_left ul .classify_list{
    width: 100%;
    height: 60px;
    font-size: 12px;
    margin-bottom: 1px;
    background-color: #f3f5f7;
    display: flex;
    justify-content: center;
    align-items: center;
}

.classify .classify_wapper .classify_content .classify_left ul .current{
    background-color: #fff;
    color: #fe753e;
}

.classify .classify_wapper .classify_content .classify_right{
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    /* background-color: skyblue; */
    padding-left: 5px;
}

.classify .classify_wapper .classify_content .classify_right ul{
    width: 100%;
    /* height: 100%; */
}

.classify .classify_wapper .classify_content .classify_right ul .title_list{
    width: 100%;
    /* height: 100%; */
}

.classify .classify_wapper .classify_content .classify_right ul .title_list .title{
    height: 30px;
    line-height: 30px;
    color: rgb(147, 153, 159);
    background-color: #f3f5f7;
}

.classify .classify_wapper .classify_content .classify_right ul .title_list .right_content{
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    margin-bottom: 3px;
    /* background-color: pink; */
    display: flex;
}

.classify .classify_wapper .classify_content .classify_right ul .title_list .right_content .list_right{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    margin-left: 8px;
    padding: 8px 8px 8px 0px;
    /* background-color: deeppink; */
    position: relative;
}

.classify .classify_wapper .classify_content .classify_right ul .title_list .right_content .list_right h4{
    font-size: 14px;
    color: rgb(7, 17, 27);
    font-weight: 700;
    line-height: 24px;
}

.classify .classify_wapper .classify_content .classify_right ul .title_list .right_content .list_right .foodinfo{
    font-size: 12px;
    /* line-height: 18px; */
    color: rgb(147, 153, 159);    
}

.classify .classify_wapper .classify_content .classify_right ul .title_list .right_content .list_right .discount{
    color: #fe753e;
}

.classify .classify_wapper .classify_content .classify_right ul .title_list .right_content .list_right i{
    position: absolute;
    right: 8px;
    bottom: 15px;
    z-index: 100;
    color: #fff;
    background-color: #fe753e;
    border-radius: 50%;
    font-size: 22px;

}
</style>