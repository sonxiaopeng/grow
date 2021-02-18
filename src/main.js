import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Bus from './bus.js'
import store from './store'
import MyFooter from './components/MyFooter'
import MyHeader from './components/MyHeader'
import Knowledge from './components/Knowledge'
import Circle from './components/Circle'
import WyNavigationBar from './components/WyNavigationBar'
// element ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// vant ui组件
import 'vant/lib/index.css'
import Vant from 'vant'
import Search from './components/Search'
import { Toast } from 'vant';
import moment from 'moment'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Sidentify from "./components/Sidentify"
import Zan from  "./components/Zan"
import Foodsearch from "./views/Foodsearch.vue"

Vue.use(Toast);
// 配置相关的组件
Vue.use(ElementUI)
Vue.use(MintUI)
Vue.use(Vant)
// 给当前的Vue对象的原型对象添加公有方法
Vue.prototype.bus=Bus

Vue.use(ElementUI);
Vue.prototype.moment=moment
Vue.prototype.axios=axios;
// 全局组件
Vue.component("s-identify",Sidentify);
Vue.component('wy-navigation-bar',WyNavigationBar);
Vue.component("my-footer",MyFooter)
Vue.component("my-header",MyHeader)
Vue.component("my-circle",Circle)
Vue.component("knowledge",Knowledge)
Vue.component("search",Search)
Vue.component("my-zan",Zan)
Vue.component("my-search",Foodsearch)
// 配置axios
axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.baseURL="https://localhost:3000"
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
