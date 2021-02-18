import moment from 'moment';
import Vue from 'vue'
import Vuex from 'vuex';


import axios from 'axios'
// axios.defaults.baseURL="http://localhost:3000";
axios.defaults.baseURL="https://localhost:3000"

Vue.prototype.axios=axios;
Vue.config.productionTip = false;

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lid:!localStorage.getItem('userInfo') ? 0:JSON.parse(localStorage.getItem('userInfo')).lid ,
    bid:localStorage.getItem('babySelect')=='undefined'||!localStorage.getItem('babySelect')? 0 :JSON.parse(localStorage.getItem('babySelect')).bid ,
    keyitem:{},//时间戳查询出的单条数据
    keytime:"",
    _key:[],
    canuse:false,
    userCanUse:false,
    babyCanUse:false,
  },
  mutations: {
    key(state,payload){
      state._key=payload;
    },
    pushkey(state,payload){//添加数据页面
      state._key.push(payload);
      //同时修改sessionStorage中的key值
      // sessionStorage.setItem('key',state._key);
      //保存到_key中
      state._key=state.key;
    },
    checkitem(state,payload){//通过时间戳查找数据
      state._key.forEach(item=>{//如果年月日相同
        if(moment(Number(item.write_time)).format("YYYY-MM-DD")==moment(Number(payload)).format("YYYY-MM-DD")){
          state.keyitem=item;//keyitem保存该条数据
        };
      });
    },
    findTime(state,payload){//通过年月日查找具体时间戳
      state._key.forEach(item=>{
        if(moment(Number(item.write_time)).format("YYYY-MM-DD")==payload){
          state.keytime=item.write_time;
        };
      });
    },
    updateKey(state,payload){//修改key数据
      state._key.forEach(item=>{
        if(moment(Number(item.write_time)).format("YYYY-MM-DD")==moment(Number(payload.write_time)).format("YYYY-MM-DD")){
          item.bstature=payload.bstature;
          item.bhdim=payload.bhdim;
          item.bweight=payload.bweight;
        };
      });
      //同时修改sessionStorage中的key值
      sessionStorage.setItem('key',state.key);
      //保存到_key中
      // state._key=state.key;
    },
    deleteKey(state,payload){//删除key中的数据

      for(let i in state._key){
        if(state._key[i].write_time==moment(Number(payload)).format("YYYY-MM-DD")){
          state._key.splice(i,1);//删除该项数据
        };
      };
      //同时修改sessionStorage中的key值
      sessionStorage.setItem('key',state.key);
      // //保存到_key中
      // state._key=state.key;
    }
  },
  actions: {
    searchKey(context,payload){
      axios.get(`/GUchart?lid=${payload.lid}&bid=${payload.bid}`).then(res=>{
        this.state._key=res.data.data
      })
    },
  },
  modules: {
  },
  getter:{
  }
})
