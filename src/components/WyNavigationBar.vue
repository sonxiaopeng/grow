<template>
  <div class="wy_navigation_bar">
    <div class="to" :style="`background-color: rgba(255, 255, 255, ${tmd});`">
      <div class="to2">
        <!-- 更多 左 -->
        <div class="to_left">
          <div class="to_more">
            <img :src="picurl" style="width: 100%" />
          </div>
        </div>
        <!-- 昵称 -->
        <div style="float: left;" v-show="show_img" @click="button_click">
          <div class="img" style="float: left;">
            <img :src="user_avatar" width="100%" >
          </div>
          <div style="float: left;" class="img_text">{{user_nick}}</div>
        </div>
        <!-- 信息 设置 右-->
        <div class="to_right">
          <div class="to_more" style="float: right;  margin-left:10px ;">
            <img :src="picurl1" style="width: 100%" />
          </div>
          <div class="to_more" style="float: right;" @click="set">
            <img :src="picurl2" style="width: 100%" />
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
data() {
    return {
      scrollTop:"",
      // 导航栏背景透明过渡
      tmd: "0",
      // to_导航图片地址
      picurl:'',
      picurl1:'',
      picurl2:'',
      userInfo:{},
      user_nick:"",
      user_avatar:"",
      show_img:false,
    };
  },
  mounted() {
    if(JSON.parse(localStorage.getItem("userInfo"))) {
      if(this.scrollTop>175) this.show_img = true;
      let userInfo = JSON.parse(localStorage.getItem("userInfo"))
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
      // 页面渲染
      this.user_nick = this.userInfo.user_nick
      if(userInfo.user_avatar ){
        this.user_avatar = "http://localhost:3000/"  + userInfo.user_avatar 
      }else{
        this.user_avatar = "http://localhost:3000/lg_pregnancy_big_2020.png" 
      }
      // console.log(this.user_nick)
    }else{
      this.show_img = false
    }

    this.picurl = require("../../public/imgs/My_img/d90.png");
    this.picurl1 = require("../../public/imgs/My_img/d92.png");
    this.picurl2 = require("../../public/imgs/My_img/d94.png");
    // 监听window 并使用方法
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // 滚轮事件函数
    handleScroll() {
      // 当前滚轮到顶的距离
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //透明度  让0~175之间的值保持0~1
      this.tmd = this.scrollTop / 175;
      if (this.scrollTop > 175) {
        this.picurl = require("../../public/imgs/My_img/d8z.png");
        this.picurl1 = require("../../public/imgs/My_img/d91.png");
        this.picurl2 = require("../../public/imgs/My_img/d93.png");
        this.show_img = true
      } else {
        this.picurl = require("../../public/imgs/My_img/d90.png");
        this.picurl1 = require("../../public/imgs/My_img/d92.png");
        this.picurl2 = require("../../public/imgs/My_img/d94.png");
        this.show_img = false
      }
    },
    set(){
      this.$router.push("/set");
    },
    button_click(){
      this.$router.push("/compile");
    }
  },
};
</script>

<style>
.wy_navigation_bar .img {
  margin: 3px 0px 0px 8px;
}
.wy_navigation_bar .img img{
  border-radius: 100%;
  width: 30px;
  height: 30px;
}
.wy_navigation_bar .img_text{
  margin-left: 8px;
  font-size: 14px;
  line-height: 36px;
}
.wy_navigation_bar .to {
  width: 100%;
  height: 10%;
  position: fixed;
  z-index: 9999;
}
.wy_navigation_bar .to2{
  width: 90%;
  margin: 23px auto 0;
}
.wy_navigation_bar .to_left{ float: left;}
.wy_navigation_bar .to_right{ float: right;}
.wy_navigation_bar .to .to_more {width: 35px;}
</style>