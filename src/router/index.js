import Vue from 'vue'
import Router from 'vue-router'
import Msite from "../pages/Msite/Msite"
import Order from "../pages/Order/Order"
import Profile from "../pages/Profile/Profile"
import Cart from "../pages/Cart/Cart"
import Classify from "../pages/Classify/Classify"
import Search from "../pages/Search/Search"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"
import Setup from "../pages/Setup/Setup"
import JCFoodDetail from "../components/JCFoodDetail/JCFoodDetail"
import Address from "../components/Address/Address"
import AddAddress from "../components/AddAddress/AddAddress"
import EditAddress from "../components/EditAddress/EditAddress" 
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect:"/msite"}, // 路由重定向
    {path:"/msite",name:"msite",component: Msite,meta:{showFooter:true}},
    {path:"/order",name:"order",component: Order,meta:{showFooter:true}},
    {path:"/profile",name:"profile",component: Profile,meta:{showFooter:true}},
    {path:"/cart",name:"cart",component: Cart,meta:{showFooter:true}},
    {path:"/classify",name:"classify",component: Classify,meta:{showFooter:true}},
    {path:"/search",name:"search",component: Search},
    {path:"/login",name:"login",component: Login},
    {path:"/register",name:"register",component: Register},
    {path:"/setup",name:"setup",component: Setup},
    {path:"/jcfooddetail",name:"jcfooddetail",component: JCFoodDetail},
    {path:"/addressAdmin",name:"addressAdmin",component:Address},
    {path:"/addAddress",name:"addAddress",component:AddAddress},
    {path:"/editAddress",name:"editAddress",component:EditAddress}
  ]
})
