<template>
  <div class="my-header">
    <van-row class="header" :class="{'show':show}" type="flex" justify="space-between" align="center" style="height:52px">
      <van-col span="7">
        <router-link to="/">
          <img class="logo" src="imgs/index/dt20202-common-logo.png" alt="">
        </router-link>
      </van-col>
      <van-col span="13">
        <van-search v-model="value" placeholder="育儿问题搜这里" shape="round" style="padding-bottom:8px"></van-search>
      </van-col>
      <van-col span="4">
        <!-- <van-icon name="wap-nav" size="22" /> -->
      </van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  data(){
    return {
      show:true,
      value:""
    }
  },
  mounted(){
    this.scrollEvent()
  },
  methods: {
    scrollEvent() {
      // const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const scrollTop = window.pageYOffset;
      // const scrollHeight = document.body.scrollHeight;
      if(scrollTop==0){
        this.show=true;
      }else{
       this.show=true; 
      }
   }
  }
}
</script>
<style lang="less">
  .my-header .logo{
   width:73px;
   height:25px;
 }
  .my-header .header{
   text-align: center;
   position:absolute;
   transition: all .3s linear;
   opacity:0;
   background-color: #fff;
   width:100%;
   box-shadow: 0 0 10px 3px rgba(168,60,55,.09);
   z-index: 10;
 }
  .my-header .show{
   opacity:1;
   position:fixed;
 }
</style>