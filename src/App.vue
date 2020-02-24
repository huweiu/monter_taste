<template>
  <div id="app">    
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"/> <!--$route代表的是当前路由-->
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide"
import {mapActions} from "vuex"
export default {
  name: 'App',
  components:{
    FooterGuide
  },

  mounted(){
    let user_id = localStorage.getItem("mon_taste_login_id")
    this.getuserInfo(user_id)
  },

  methods:{
    ...mapActions(["getuserInfo"])
  }

}
</script>

<style>
/* 页面主题颜色 #fe753e */
#app{
  width: 100%;
  height: 100%;
  /* 清除滚动条 */
  overflow: hidden;
}
</style>
