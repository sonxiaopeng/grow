import Vue from 'vue'
import VueRouter from 'vue-router'
// 小鹏
import Index from '../views/Index.vue'
import Circle from '../components/Circle'
import Knowledge from '../components/Knowledge'
import Details from '../views/Details'
import Comment from '../components/Comment'
import Recommend from '../components/Recommend'
import Zan from '../components/Zan'
// 蔡蔡
import Wy from '../views/Wy.vue'
import Set from '../views/Set.vue'
import Compile from '../views/Compile.vue'
import BabyStockpile from '../views/BabyStockpile.vue'
import Found from '../views/Found.vue'
// 朱涛
import Record from '../views/Record.vue'
import Milk from '../views/Milk.vue'
import Dietary from '../views/Dietary.vue'
// 徐张敏
import Sleep from '../views/Sleep.vue'
import Diaper from '../views/Diaper.vue'
// 马亚军
import Food from '../views/Food.vue'
import Foodsearching from '../views/Foodsearching.vue'
//汪宇深
import RecordList from '../views/RecordList.vue'
import ModGuData from '../views/ModGuData.vue'
import GrowUpChart from '../views/GrowUpChart.vue'
import MyBaby from '../views/MyBaby.vue'

// 正式页面
import Loginlose from '../views/Loginlose.vue'
import Login from '../views/Login.vue'



Vue.use(VueRouter)

const routes = [
  // 小鹏路由
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/reco',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/zan',
    name: 'Zan',
    component: Zan
  },
  {
    path: '/know',
    name: 'Knowledge',
    component: Knowledge
  },
  {
    path: '/circle/:kid',
    name: 'Circle',
    component: Circle,
    props: true
  },
  {
    path: '/comment',
    name: 'Comment',
    component: Comment
  },

  {
    path: '/details/:aid',
    name: 'Details',
    component: Details,
    props: true
  },

  // 蔡蔡路由
  {//宝宝修改
    path: '/babystockpile',
    name: 'BabyStockpile',
    component: BabyStockpile
  },
  {//用户修改
    path: '/compile',
    name: 'Compile',
    component: Compile
  },
  {//设置
    path: '/set',
    name: 'Set',
    component: Set
  },
  {//我的
    path: '/wy',
    name: 'Wy',
    component: Wy
  },
  
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  // 朱涛 & 徐张敏
  {
    path: '/record',
    name: 'Record',
    component: Record
  },
  {
    path: '/milk',
    name: 'Milk',
    component: Milk
  },
  {
    path: '/dietary',
    name: 'Dietary',
    component: Dietary
  },
  {
    path: '/diaper',
    name: 'Diaper',
    component: Diaper
  },
  {
    path: '/sleep',
    name: 'Sleep',
    component: Sleep
  },
  // 马亚军
  {
    path: '/foodsearching/:type',
    name: 'Foodsearching',
    component: Foodsearching,
    props: true
  },
  // 配置正式页面路径
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/food',
    name: 'Food',
    component: Food
  },
  {
    path: '/loginlose',
    name: 'Loginlose',
    component: Loginlose
  },
  //汪宇深
  {
    path:'/Mod',
    component:ModGuData,
    props:true,
    name:'Mod'
  },
  {
    path:'/GUchart',
    component:GrowUpChart,
    props:true
  },
  {
    path: '/rlist',
    component: RecordList,
    props:true,
    name:'rlist'
  },
  {//404
    path: '/mybaby',
    name: 'MyBaby',
    component: MyBaby
  },
  {//404
    path: '*',
    name: 'Found',
    component: Found
  },
]

const router = new VueRouter({
  routes
})

export default router
