<style >

</style>
<template>
  <div class="Wy">
    <!-- 顶部导航栏 全局组件  -->
    <wy-navigation-bar></wy-navigation-bar>

    <!-- 头图片 开始-->
    <div class="toPicture">
      <div></div>
    </div>
    <!-- 头图片 结束 -->

    <!-- 视频 开始-->
    <div class="wys" style=" "></div>
    <!-- 视频 结束 -->

    <!-- 内容 开始  -->
    <div class="content">
      <div class="content2" style="position: relative">
        <div class="uid">
          <!-- 伴侣的 头像
            <div class="toxiang timg">
              <img src="../../public/imgs/My_img/qingwa.png" width="100%" />
            </div> -->
          <!-- 头像 -->
          <div class="toxiang2 timg" v-show="SignInAs">
            <img :src="tx" width="140%" 
              style="
              border-radius: 999px;
              width: 19vw;
              height: 19vw;"/>
          </div>
          <!-- 视频跳转 图标 -->
          <div class="pullDown">
            <img src="../../public/imgs/My_img/xiala.png" width="100%" />
          </div>

          <div style="height: 30px"></div>

          <!-- 编辑 -->
          <!-- <van-button
            round
            type="info"
            color="#000"
            plain
            class="button_tox"
            :to=" SignInAs ? '/compile': '/login' "
          >
            {{ SignInAs ? "编辑信息" : "注册登入" }}
          </van-button> --> 
          <button class="button_log button_click" v-if="!SignInAs" @click="button_click(false)">注册/登录</button>
          <button class="button_compile button_click" v-else @click="button_click(true)">编辑信息</button>
          

          <!-- 用户昵称 -->
          <div class="uname xt" v-show="SignInAs">{{ user_nick }}</div>
          <!-- VIP  -->
          <div class="xt" style="height: 20px" v-show="SignInAs">
            <!-- vip -->
            <div class="vip">
              <div class="vip2">
                <div class="vip_img">
                  <img src="../../public/imgs/My_img/vip.png" width="100%" />
                </div>
                <div class="vip_text">开通会员</div>
                <div class="vip_img2">
                  <img
                    src="../../public/imgs/My_img/vip_play.png"
                    width="100%"
                  />
                </div>
              </div>
            </div>
            <!-- 店主 -->
            <div class="dianzhu">
              <div class="vip2">
                <div class="vip_text" style="color: #ce6b69">成为妈妈店主</div>
                <div class="vip_img2">
                  <img
                    src="../../public/imgs/My_img/vip_play.png"
                    width="100%"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- 宝宝年龄 -->
          <div class="xt baby_text" v-show="SignInAs"> {{ jt }}天</div>
          <!-- 个人标签 -->
          <div class="label">
            {{ !SignInAs ? "HI ~ 欢迎来到宝宝树" : uintr }}
          </div>
          <!-- 互动 -->
          <div class="hudong xt" v-show="false">
            <ul>
              <li v-for="(p, index) of interaction">
                <span>{{ p.value }}</span>
                <span class="text">{{ p.huname }}</span>
              </li>
            </ul>
          </div>
          <!-- 播报 -->
          <div class="broadcast xt">
            <div>
              <img src="../../public/imgs/My_img/laba.png" alt="" />
              <span>分享宝宝喜报，瓜分100万树钻 !</span>
              <!-- <button>
                <div>点击制作</div>
              </button> -->
            </div>
          </div>
          <!-- 盆友圈 -->
          <div class="friend xt">
            <van-swipe-cell>
              <template slot="left"></template>

              <div class="social">
                <div class="community">
                  <div>
                    <p class="community_text">金乐社区</p>
                    <div class="community_img">3人</div>
                    <div>
                      <button class="community_button">进入小区</button>
                    </div>
                  </div>
                </div>
                <div class="privacy">
                  <div>
                    <p class="community_text">我的私密圈</p>
                    <div class="community_img">邀家人· 请闺蜜</div>
                    <div>
                      <button
                        class="community_button"
                        style="background-color: #ffcaca; color: #dd2222"
                      >
                        创建
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <template slot="right">
                <div class="add">
                  <div>
                    <div
                      class="establish"
                      style="border-bottom: 1px solid #000"
                    >
                      <div class="add_img"></div>
                      <div>添加小区</div>
                    </div>
                    <div class="establish">
                      <div class="add_img"></div>
                      <div>创建私密圈</div>
                    </div>
                  </div>
                </div>
              </template>
            </van-swipe-cell>
          </div>
          <!-- 我的宝宝 -->
          <div class="baby xt">
            <q>我的宝宝</q>
            <div class="baby2">
              <!-- 宝宝 -->
              <router-link :to=" SignInAs ? '/mybaby': '/login'">
                <div class="baby_left">
                <div style="margin-top: 14px; position: relative; top: -2px">
                  <!-- 头像 -->
                  <div class="baby_img">
                    <img v-show="bsex == 1" src="../../public/imgs/My_img/cig.png" width="100%" />
                    <img v-show="bsex == 0" src="../../public/imgs/My_img/cii.png" width="100%" />
                  </div>
                  <!-- 宝宝名称 -->
                  <div style="height: 25px;display: inline; float: left;color:#333;">{{bname}}</div>
                  <!-- 性别 -->
                  <div class="baby_sex">
                    <img v-show="bsex == 1" src="../../public/imgs/My_img/dx_.png" width="100%" />
                    <img v-show="bsex == 0" src="../../public/imgs/My_img/dxa.png" width="100%" />
                  </div>
                  <!-- 年龄 -->
                  <div style="font-size: 12px;
                    color: rgb(151, 147, 147);
                    position: absolute;
                    left: 51px;
                    top: 23px;">
                    {{ jt2 }}天
                  </div>
                </div>
              </div>
              </router-link>
              
              <!-- 管理宝宝 -->
              <router-link :to=" SignInAs ? '/mybaby': '/login'">
                <div class="baby_right">
                <div style="margin-top: 14px; position: relative; top: -2px">
                  <router-link :to=" SignInAs ? '/mybaby': '/login'">
                    <div
                      class="baby_img"
                      style="width: 30px; position: relative; top: 0px"
                    >
                      <img
                        src="../../public/imgs/My_img/dxb.png"
                        width="100%"/>
                    </div>
                  </router-link>
                  <div style="height: 25px; margin-left: 40px;color:#333;" >管理宝宝</div>
                  <div
                    style="
                      font-size: 12px;
                      float: left;
                      color: #979393;
                      margin-left: 10px;
                    "
                  >
                    修改信息/状态
                  </div>
                </div>
              </div>
              </router-link>
              
            </div>
          </div>
          <!-- 我的工具 -->
          <div class="tool xt">
            <div class="tool_text">我的工具</div>
            <div>
              <ul>
                <li
                  class=""
                  v-for="(q2, index2) of s2"
                  style="width: 20%; margin: 23px auto; float: left"
                  @click="li_click"
                >
                  <div style="width: 50px; margin: 0px auto">
                    <img src="../../public/imgs/My_img/meat.png" width="100%" />
                  </div>
                  <div style="text-align: center;
                    font-size: 14px;
                    color: #696966;
                    margin: 4px;">能不能吃</div>
                </li>
              </ul>
            </div>
          </div>
          <!-- 动态 开始   -->
          <div class="DHTML">
            <div class="gaoling"></div>
            <div class="DHTML_left ">动态</div>
            <div class="DHTML_right">
              <img src="../../public/imgs/My_img/d8z.png" width="100%" />
            </div>
          </div>
          <!-- 内容  -->
          <div class="DHTML_content " v-show="false">
            <div class="DHTML_content2">
              <div style="height: 10px"></div>
              <!-- 头像 -->
              <div class="DHTML_headPortrait">
                <img src="../../public/imgs/My_img/qingwa.png" width="100%" />
              </div>
              <!-- 昵称 -->
              <div class="content_uname">昵称</div>
              <!-- 时间 -->
              <div class="content_time">01-09 关注了 谁</div>
            </div>
          </div>
          <div style="text-align: center;
            font-size: 14px;
            color: #9c9a9a;">暂无内容</div>
          <!-- 动态 结束   -->
        </div>
      </div>
    </div>
    <!-- 内容 结束 -->
    <my-footer></my-footer>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      // 测试
      s: 100,
      s2: 1,
      // 登录状态
      SignInAs: JSON.parse(localStorage.getItem("userInfo")),
      // 个人标签
      label_text: "",
      //互动
      interaction: {
        // 粉丝
        fans: {
          hid: 1,
          huname: "粉丝",
          value: "0",
        },
        // 关注
        attention: {
          hid: 2,
          huname: "关注",
          value: "0",
        },
        // 访客
        visitor: {
          hid: 3,
          huname: "访客",
          value: "4",
        },
        // 树钻
        // currency: {
        //   hid: 4,
        //   huname: "树钻",
        //   value: "0",
        // },
      },
      // 插入数据
      user_nick: "", //用户昵称
      jt: "", //宝宝年龄
      jt2: "", //宝宝年龄
      towm : '',
      uintr: "", //简介
      user_avatar:"",//头像
      tx:"", //tx
      babySelect:"", //当前选择的宝宝
      bsex:'',
      bname:"",
    };
  },
  mounted() {
    //测试  
    // let a = { lid :1}
    // localStorage.setItem("userlnfo", JSON.stringify(a));

    if(!localStorage.getItem("babySelect")||localStorage.getItem("babySelect")!="undefined"){
       this.babySelect = JSON.parse(localStorage.getItem("babySelect"))
    }

    if(this.babySelect){
      this.bsex = this.babySelect.bsex
      this.bname = this.babySelect.bname
    }else{
      this.bsex = 1
      this.bname = '宝宝'
    }

    //登入的传入的值
    // 获取 用户表
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(userInfo)
    if(userInfo != null){
      //渲染页面
      this.user_nick = userInfo.user_nick; //用户昵称
      if(userInfo.uintr){//简介  
        this.uintr = userInfo.uintr;  
      }else{// 如果没有简介就是默认内容
        this.uintr = '暂无内容'
      }

      this.user_avatar = userInfo.user_avatar
      if( userInfo.user_avatar ){//头像
        this.tx = "http://localhost:3000/" + userInfo.user_avatar   
      }else{
        // 如果没有头像就是默认头像
        this.tx = "http://localhost:3000/lg_pregnancy_big_2020.png" 
      }

      
      // 检索
      let lid = userInfo.lid;
      let parentId = lid;
      // console.log(lid,parentId)


      this.axios.get("/select", {
        params: { parentId: parentId },
      }).then((result2) => {
        if(result2){
          // 在localStorage 保存 宝宝表对象
          let babytree_baby = JSON.stringify(result2.data);
          localStorage.setItem("babyInfo", babytree_baby);
          // console.log(JSON.parse(localStorage.getItem("babyInfo")))
          // console.log(result2)
          //渲染页面
          //选择了什么宝宝就用什么
          if(result2.data[0] && userInfo){
            let udatey = result2.data[0].bbir; //宝宝注册时间
            this.jt = moment.duration((Date.now() - udatey)).days()  //宝宝活了多少天
            this.jt2 = this.jt
            if(userInfo.user_towm){
              // console.log(userInfo.user_towm.split(' '))
              let s = userInfo.user_towm.split(' ')
              for(var a of s){
                // console.log(a)
                this.towm += a.substr(0,a.length-1)
                this.towm += ' '
              }
              if(userInfo.user_towm){
                this.jt =  this.towm + "| 宝宝" + this.jt
              }else{
                this.jt = "宝宝" + this.jt 
              }
            }
            
          }
          
        }
        
      });
    }
  // BabyStockpile(){
  //   this.$router.push("/BabyStockpile");
  // }
  },
  methods:{
    button_click(i){
      // console.log("1")
      if(i){
        this.$router.push("/compile")
      }else{
        this.$router.push("/login")
      }
    },
    li_click(){
      this.$router.push("/food")
    }
  }
};
</script>

<style>
.Wy .button_click{
  width: 30vw;
  height: 6vh;
  position: absolute;
  right: 5px;
  /* bottom: 1px; */
  border-radius: 999px;
  border-width: 0px;
  z-index: 1000;
}
.Wy .button_log{
  background-color: #fd00000f;
  color: #eb00008c;
}
.Wy .button_compile{
  background-color: #5656560d;
  color: #4242429e;
}
.Wy .to {
  width: 100%;
  height: 10%;
  position: fixed;
  z-index: 9999;
}
.Wy .to2 {
  width: 90%;
  margin: 23px auto 0;
}
.Wy .to_left {
  float: left;
}
.Wy .to_right {
  float: right;
}
.Wy .to .to_more {
  width: 35px;
}
/* 头图片 */
.Wy .toPicture {
  width: 100%;
  height: 375px;
  /* background-color: #000; */
  position: absolute;
}
/* 视频 */
.Wy .wys {
  width:100vw ;
  height: 27vh;
  background-image: url(../../public/imgs/My_img/ck.png);
  background-size: 100% 100%;
}
/* 内容 */

.Wy .content {
  width: 100%;
  height: 850px;
  border-radius: 10px;
  background-color: rgb(244, 244, 244);
  position: relative;
  transition: 1s;
}
.Wy .content2 {
  width: 90%;
  margin: 0 auto;
}
.Wy .timg {
  /* border-radius: 50%; */
  width: 70px;
  height: 70px;
  /* border: 2px solid #fff; */
  position: absolute;
  top: -25px;
  background-image: url(../../public/imgs/My_img/a6a.png);
  background-size: 100%;
}
.Wy .toxiang {
  left: 55px;
}
.Wy .pullDown {
  margin: 0 auto;
  width: 20px;
  height: 20px;
}
.Wy .button_tox {
  float: right;
  border: 1px solid #eee !important;
  height: 35px !important;
  color: rgb(117, 116, 116) !important;
}

.Wy .uname {
  position: relative;
  margin-top: 10px;
  font-size: 20px;
}
.Wy .xt {
  margin-bottom: 10px;
}
.Wy .vip {
  float: left;
  width: 89px;
  height: 20px;
  border-radius: 2px;
  background-color: rgb(252, 241, 152);
}
.Wy .vip2 {
  width: 80%;
  height: 100%;
  margin: 0 auto;
}
.Wy .vip_img {
  float: left;
  width: 20%;
  height: 100%;
}
.Wy .vip_text {
  float: left;
  font-size: 12px;
  line-height: 19px;
  color: rgb(213, 174, 19);
}
.Wy .vip_img2 {
  float: left;
  width: 10%;
  height: 100%;
}
.Wy .dianzhu {
  float: left;
  margin-left: 15px;
  width: 100px;
  height: 20px;
  border-radius: 2px;
  background-color: #f9d3d3;
}
.Wy .baby_text,
.Wy .label {
  font-size: 12px;
  color: #636363;
}
.Wy .hudong ul {
  height: 65px;
}
.Wy .hudong li {
  float: left;
  height: 65px;
  line-height: 65px;
  margin: 0 24px;
}
.Wy .hudong .text {
  font-size: 12px;
  color: #0f0d0d66;
  margin-left: 2px;
}
/* 播报 */
.Wy .broadcast {
  width: 100%;
  height: 20px;
  margin-top: 20px;
}
.Wy .broadcast span {
  font-size: 13px;
}
.Wy .broadcast button {
  border-radius: 999px;
  float: right;
  width: 80px;
  height: 30px;
  border: none;
  background: linear-gradient(to right, #fc8a25 0%, #eb0000 100%);
}
.Wy .broadcast button div {
  line-height: 20px;
  width: 90%;
  margin: 0 auto;
  font-size: 13px;
  color: #fff;
}

/* 社区 */
.Wy .friend .social {
  width: 100%;
  height: 140px;
}
.Wy .friend .community,
.Wy .friend .privacy,
.Wy .add {
  border-radius: 15px;
  height: 100%;
  width: 49%;
}
.Wy .friend .community {
  float: left;
  background-image: url(../../public/imgs/My_img/e0l.png);
  background-size: 10px 10px;
  background: no-repeat;
  background-position: 0px 100px;
  background-color: #fff;
}
.Wy .friend .community_text {
  margin: 18px 0px 10px 15px;
}
.Wy .friend .community_img {
  margin-left: 15px;
  font-size: 14px;
}
.Wy .friend .community_button {
  font-size: 14px;
  height: 25px;
  margin-left: 15px;
  margin-top: 45px;
  border: none;
  border-radius: 15px;
  background-color: rgb(250, 242, 242);
}
.Wy .friend .privacy {
  float: right;
  background-color: #fff;
}

.Wy .add {
  width: 157px;
  background-color: #fff;
  margin-left: 10px;
}
.Wy .add > div {
  width: 80%;
  height: 100%;
  margin: 0 auto;
}
.Wy .add .establish {
  height: 50%;
  width: 100%;
  line-height: 75px;
}
.Wy .add .add_img {
  float: left;
  width: 40px;
  height: 58%;
  margin: 12px 6px 0 0;
  background-image: url(../../public/imgs/My_img/dxj.png);
  background-size: 40px;
}

/* 我的宝宝 */
.Wy .baby {
  width: 100%;
  height: 90px;
  border-radius: 15px;
  background-color: #fff;
}
.Wy .baby q {
  margin-left: 16px;
  font-weight: 700;
  position: relative;
  top: 6px;
}
.Wy .baby2 {
  width: 90%;
  margin: 0 auto;
}
.Wy .baby2 .baby_sex {
  width: 20px;
  float: left;
  position: relative;
  top: -3px;
}
.Wy .baby2 .baby_img {
  width: 52px;
  float: left;
  position: relative;
  top: -10px;
}
.Wy .baby2 .baby_left,
.Wy .baby2 .baby_right {
  float: left;
  width: 50%;
  height: 100%;
}
/* 我的工具 */
.Wy .tool {
  width: 100%;
  height: 130px;
  border-radius: 15px;
  background-color: #fff;
}
.Wy .tool .tool_text {
  position: relative;
  top: 6px;
  left: 16px;
  font-weight: 700;
}
/* 动态 */
.Wy .DHTML {
  width: 100%;
  height: 40px;
  margin-top: 25px;
  position:relative;
}
.Wy .DHTML .DHTML_left {
  float: left;
  color: #eb0000;
  font-weight: 700;
}
.Wy .DHTML .gaoling {
    width: 27px;
    border: 3px solid #f00;
    background-color: #f00;
    border-radius: 9999px;
    display: inline;
    position: absolute;
    top: 18px;
    left: 2px;
}
.Wy .DHTML .DHTML_right {
  float: right;
  width: 20px;
}
/* 内容 */
.Wy .DHTML_content {
  width: 100%;
  height: 50px;
  border-radius: 12px;
  background-color: #fff;
  margin: 5px 0px;
}
.Wy .DHTML_content2 {
  width: 80%;
  height: 80%;
  margin: 0 auto;
}
.Wy .DHTML_headPortrait {
  float: left;
  width: 30px;
  margin-right: 10px;
}
.Wy .content_uname {
  color: rgb(94 89 89);
}
.Wy .content_time {
  color: rgb(94 89 89);
  font-size: 12px;
}
</style>