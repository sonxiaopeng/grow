<template>
  <div>
    <div v-if="!key||key.length==0">
      <van-empty description="暂无数据,点击按钮添加">
        <van-button round type="danger" class="bottom-button" @click="toAdd">添加数据</van-button>
      </van-empty>
    </div>
    <div v-else>
      <div v-for="item,i in key" class='list-item' :key='i' @click='tomod(item.write_time)'>
        <div class="item-write_time">{{item.write_time}}</div>
        <div>
          <div>身高<br><span>{{item.bstature==0?'-':item.bstature}}</span>cm</div>
          <div>头围<br><span>{{item.bhdim==0?'-':item.bhdim}}</span>cm</div>
          <div>体重<br><span>{{item.bweight==0?'-':item.bweight}}</span>kg</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  inject:['reload'],
  props:["i"],
  data(){
    return{
      key:[],
      // _key:this.$store.state._key,
    }
  },
  methods:{
    //点击按钮添加数据(切换tab)
    toAdd(){
      this.$emit('changeTab',0)
    },
    tomod(k){//点击跳转到修改页面，同时路由传参

      this.$store.commit('findTime',k);
      k=Number(this.$store.state.keytime);
      this.$router.push({
        name:'Mod',
        params:{//向Mod页面传点击项的数据
          keytime:k
        },
      });
    }
  },
  watch:{
    i(){
      //axios请求数据
      this.axios.get(`/GUchart?lid=${JSON.parse(localStorage.getItem('userInfo')).lid}&bid=${JSON.parse(localStorage.getItem('babySelect')).bid}`).then(res=>{
        let key=res.data.data;
        this.$store.dispatch('searchKey',{lid:this.$store.state.lid,bid:this.$store.state.bid});
        if(!key){
          this.key=key
        }else{
          //随时间顺序排列arr.sort()
          key.sort((a,b)=>{
            return b.write_time-a.write_time
          });
          key.forEach(item => {
            item.write_time=moment(Number(item.write_time)).format("YYYY-MM-DD")
          });
          this.key=key
        }
      });
    }
  },
  mounted(){
    //axios请求数据
    this.axios.get(`/GUchart?lid=${JSON.parse(localStorage.getItem('userInfo')).lid}&bid=${JSON.parse(localStorage.getItem('babySelect')).bid}`).then(res=>{
      let key=res.data.data;
      this.$store.dispatch('searchKey',{lid:this.$store.state.lid,bid:this.$store.state.bid});
      if(!key){
        this.key=key
      }else{
        //随时间顺序排列arr.sort()
        key.sort((a,b)=>{
          return b.write_time-a.write_time
        });
        key.forEach(item => {
          item.write_time=moment(Number(item.write_time)).format("YYYY-MM-DD")
        });
        this.key=key
      }
    });
  },
}
</script>

<style>
.list-item{
  height: 135px;
  background: #fff;
  border-radius: 10px;
  padding: 3%;
  margin: 2%;
}
.list-item>div:first-child{
  display: flex;
  height: 40%;
}
.list-item>div:last-child{
  height: 60%;
  display:flex;
}
.list-item>div:last-child>div{
  flex:0 0 33.33%;
  text-align: center;
  line-height: 40px;
}
.list-item span{
  color:#cd748b;
  font-size: 1.5em;
}
.bottom-button {
  width: 160px;
  height: 40px;
}
.item-write_time{
  border-bottom: 1px solid #ccc;
}
</style>