<template>
  <div class="set ">
    <div class="content">
      <van-nav-bar
        title="设置"
        @click-left="onClickLeft"
        class="xt"
      >
        <template #left>
          <img class="f_icon" src="imgs/Recordimgs/dm1.png" alt />
        </template>
      </van-nav-bar>
      <div class="account xt" @click="Compile" v-show="SignInAs">
        <div class="account2">
          <div class="headPortrait ">
            <img :src="tx" width="140%" 
              style="
                border-radius: 999px;
                width: 10vw;
                height: 10vw;"/>
          </div>
          <div style="float: left;">
            <div class="account_uname">{{user_nick}}</div>
            <div class="account_uid">UID: u{{uid}}</div>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="xt">
        <van-cell title="绑定另一半" is-link @click="tao" />
      </div>
      <!--  -->
      <div class="xt">
        <van-cell title="信息通知" is-link @click="tao" />
        <van-cell title="通用" is-link @click="tao" />
        <van-cell title="安全中心" is-link @click="tao" />
        <van-cell title="分享好友" is-link @click="tao" />
      </div>
      <!--  -->
      <div class="xt">
        <van-cell title="帮助与反馈" is-link @click="tao" />
        <van-cell title="隐私" is-link @click="tao" />
        <van-cell title="关于我们" is-link @click="tao" />
      </div>

      <van-cell class="xt" title="切换身份" is-link @click="tao" />
      <van-cell title="退出登录" is-link @click="tao(10)" />
    </div>
    
  </div>
</template>

<script>
export default {
    data(){
        return{
          tx:"",
          user_nick: "",
          uid: "",
          SignInAs: JSON.parse(localStorage.getItem("userInfo")),
        }
    },
    methods: {
       onClickLeft(){
         this.$router.go(-1);
       } ,
       tao(i){
          if(i == 10){

            localStorage.clear()
            this.$router.push("/wy");
          }

       },
       Compile(){
          this.$router.push("/Compile");
       }
    },
    mounted(){
      if( JSON.parse(localStorage.getItem("userInfo"))){
        let babytree_login = JSON.parse(localStorage.getItem("userInfo"));
        if( babytree_login.user_avatar ){//头像
          this.tx = "http://localhost:3000/" + babytree_login.user_avatar   
        }else{
          // 如果没有头像就是默认头像
          this.tx = require ("../../public/imgs/My_img/lg_pregnancy_big_2020.png" )
        }
        this.uid = babytree_login.uid
        this.user_nick = babytree_login.user_nick
      }
      window.scrollTo(0,0)
    }
};
</script>
    
<style>
.set .xt{margin-bottom: 10px;}
.set .content{
  background-color:rgb(238, 232, 232) ;
  width: 100%;
  /* height: 1000px; */
}
.set .account{
  width: 100%;
  height: 60px;
  background-color: #fff;
}
.set .account2{
  width: 90%;
  margin: 0px auto 1px;
  padding-top: 10px;
}
.set .headPortrait{
  width: 12%;
  height: 67%;
  background: url(../../public/imgs/My_img/a6a.png) no-repeat ;
  background-size: 40px ;
  float: left;
  margin-right: 10px;
}
.set .account_uname{
  margin-bottom: 8px;
  font-weight: 700;
}
.set .account_uid{
  font-size: 13px;
  color: #7e7e7e;
}
</style>