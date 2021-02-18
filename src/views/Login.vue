<template>
  <div>
    <!-- 顶部导航栏开始 -->
    <div>
      <van-nav-bar title="注册|登录">
        <template #left>
          <img
            class="r_icon"
            src="imgs/Recordimgs/dm1.png"
            alt=""
            @click="onClickLeft"
          /> </template
      ></van-nav-bar>
    </div>
    <!-- 顶部导航栏结束 -->
    <!--手机快捷注册开始-->
    <van-tabs v-model="active">
      <van-tab title="手机快捷注册">
        <div class="check">
          <div class="login_input3">
            <input
              type="text"
              v-model="nickname"
              label="昵称"
              @blur="checknickname"
              placeholder="昵称：格式为中文"
            />
            <div class="msg" v-show="nicknamemsg">昵称：2-16位中文</div>
            <input
              type="tel"
              v-model="tel"
              label="手机号"
              @blur="checktel"
              placeholder="手机号：11位数字组成"
            />
            <div class="msg" v-show="telmsg">手机号：11位数字组成</div>
            <input
              type="password"
              v-model="password"
              label="密码"
              @blur="checkpassword"
              placeholder="密码：8-16位字母或者数字组成"
            />
            <div class="msg" v-show="pwdmsg">密码：8-16位字母或者数字组成</div>
          </div>
          <!-- 验证码开始 -->
          <div class="form-group">
            <div>
              <input
                type="text"
                v-model="code"
                class="code"
                placeholder="请输入验证码"
              />
            </div>
            <div @click="refreshCode">
              <!--验证码组件-->
              <s-identify :identifyCode="identifyCode"></s-identify>
              <a href="#">看不清楚?换一张</a>
            </div>
          </div>
          <div class="msg" v-show="codemsg">验证码为4位数</div>
          <!-- 验证码结束 -->
          <van-button round @click="handle" class="sbmit_reguster"
            >注册</van-button
          >
        </div>
      </van-tab>
      <!-- 手机快捷注册结束-->
      <!-- 账号密码登录开始 -->
      <!-- class="tel" -->
      <van-tab title="账号密码登录">
        <!-- 输入框1 -->
        <div class="chosse_register">
          <input
            type="text"
            placeholder="请输入用户名"
            v-model="username"
            v-if="light == 1"
          />
          <input
            type="text"
            placeholder="请输入昵称"
            v-model="nickname"
            v-else="light == 0"
          />

          <span
            class="nicheng"
            @click="changeLight"
            :class="{ choose: light == 0 }"
            >昵称</span
          >
          <span class="xiegang">|</span>

          <span
            class="yonghuming"
            @click="changeLight"
            :class="{ choose: light == 1 }"
            >用户名</span
          >
          <!-- 输入框2-->
          <input
            type="password"
            placeholder="请输入密码"
            v-model="password"
            class="password1"
          />
        </div>
        <!-- 账号密码登录结束 -->
        <!-- 自定义内容开始 -->

        <router-link to="/login_lose">
          <p style="margin-left: 50px; margin-bottom: 20px; color: #cccc">
            找回密码 &gt;
          </p>
        </router-link>

        <van-button round @click="denglu" class="denglu_button"
          >登录</van-button
        >
        <!-- 
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">其他方式登录</van-divider>

        <img src="imgs/iconfont/QQ.png" style="width:50px;" />

        <img src="imgs/iconfont/weixin.png" style="width:50px;" />

        <img src="imgs/iconfont/taobao.png" style="width:50px;" />

        <img src="imgs/iconfont/weibo.png" style="width:50px;" />-->

        <!-- 自定义内容结束 -->
      </van-tab>
    </van-tabs>
  </div>
</template>



<script>
import Sidentify from "../components/Sidentify";
import { Toast } from "vant";
export default {
  name: "enlist",
  components: { Sidentify },
  data() {
    return {
      nicknamemsg: false,
      telmsg: false,
      pwdmsg: false,
      codemsg: false,
      lid: 1,
      light: 1,
      identifyCodes: "0123456789",
      identifyCode: "",
      code: "",
      username: "",
      password: "",
      active: 2,
      submit: "",
      tel: "",
      minDate: new Date(1999, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      datey: 1000000,
      nickname: "",
      choose: 1,
    };
  },
  mounted() {
    this.identifyCode = "";
    this.markCode(this.identifyCodes, 4);
  },
  created() {
    this.refreshCode();
  },
  methods: {
    onClickLeft() {
      Toast("返回");
      this.$router.go(-1);
    }, //顶部导航栏
    changeLight() {
      if (this.light == 1) {
        this.light = 0;
      } else {
        this.light = 1;
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.markCode(this.identifyCodes, 4);
    },
    markCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    //检测昵称
    checknickname() {
      let nicknameRegExp = /^[\u4e00-\u9fa5]{2,16}$/;
      if (nicknameRegExp.test(this.nickname)) {
        this.nicknameState = "success";
        this.nicknamemsg = false;
        return true;
      } else {
        this.nicknameState = "error";
        this.nicknamemsg = true;
        return false;
      }
    },
    // 检测注册手机号
    checktel() {
      let telRegExp = /^1[3-9][0-9]{9}$/;
      if (telRegExp.test(this.tel)) {
        this.telRegExp = "success";
        this.telmsg = false;
        return true;
      } else {
        this.telRegExp = "error";
        this.telmsg = true;
        return false;
      }
    },
    //检测密码
    checkpassword() {
      let passwordRegExp = /^[0-9A-Za-z]{8,16}$/;
      if (passwordRegExp.test(this.password)) {
        this.passwordState = "success";
        this.pwdmsg = false;
        return true;
      } else {
        this.passwordState = "error";
        this.pwdmsg = true;
        return false;
      }
    },
    // 注册
    handle() {
      //检测验证码

      if (this.code != "" && this.identifyCode == this.code) {
        this.codemsg = false;
        if (this.checktel() && this.checkpassword() && this.checknickname()) {
          //发送ajax post请求，执行注册业务
          //获取时间开始

          let timey = new Date();

          // 格式化时间
          var y = timey.getFullYear();
          var m = timey.getMonth() + 1;
          m = m < 10 ? "0" + m : m;
          var d = timey.getDate();
          d = d < 10 ? "0" + d : d;
          const timer = y + "-" + m + "-" + d;
          // return time;

          var date = new Date(Date.parse(timer.replace(/-/g, "/"))); //转换成Data();

          let datey = date.getTime();
          this.datey = datey;

          //获取时间结束
          let params = `tel=${this.tel}&password=${this.password}&datey=${this.datey}&active=${this.active}&nickname=${this.nickname}`;
          this.axios.post("/login", params).then((res) => {
            if (res.data.code == 0) {
              Toast.loading({
                message: "注册成功,即将跳转登录",
                forbidClick: true,
                duration: 1000,
              });
              setInterval(() => {
                this.active = 1;
              }, 0);
            } else {
              this.$toast("注册失败，再检查检查叭");
            }
          });
        }
      } else {
        this.codemsg = true;
      }
    },
    //发送登录请求
    denglu() {
      let params = `username=${this.username}&light=${this.light}&nickname=${this.nickname}&password=${this.password}&active=${this.active}`;

      this.axios.post("/login", params).then((res) => {
        //获取后台数据之后，渲染页面

        //this.$store.commit("updateLid", res.data.data[0].lid);
        if (res.data.code == 0) {
          this.$toast("登录失败");
        } else {
          this.$toast("登录成功");
          this.$router.push("/");

          this.lid = res.data.data[0].lid;
          localStorage.setItem("userInfo", JSON.stringify(res.data.data[0]));
          //登录成功之后存储数据
          let params = `lid=${this.lid}`;
          this.axios.post("/shuju", params).then((res) => {
            // sessionStorage.setItem(
            //   "babyInfo",
            //   JSON.stringify(res.data.data[0])
            // );
            // localStorage.setItem("babyInfo", JSON.stringify(res.data.data[0]));

            localStorage.setItem("babyInfo", JSON.stringify(res.data.data));
            localStorage.setItem(
              "babySelect",
              JSON.stringify(res.data.data[0])
            );
          });
        }
      });
    },
  },
  // watch:{
  //   active(){

  //   }
  // }
};
</script>
<style scoped>
.r_icon {
  widows: 25px;
  height: 25px;
}
.sbmit_reguster,
.denglu_button {
  width: 80%;
  height: 45px;
  font-size: 18px;
  background-color: #dc4248 !important;
  color: #fff;
  display: block;
  margin: 0 auto;
}
.msg {
  width: 245px;
  margin: 0;
  padding-left: 20px;
  color: red;
  text-align: left;
  position: relative;
  left: 65px;
  top: -12px;
  background: url(/imgs/login_img/err_small.png) no-repeat left;
}
.login_input3 {
  text-align: center;
  vertical-align: middle;
  margin-top: 20px;
}
.login_input3 input {
  width: 80%;
  height: 45px;
  margin-bottom: 20px;
  padding-left: 30px;
  box-sizing: border-box;
  background-color: rgb(238, 235, 235);
  border-radius: 50px;
  outline: 0;
  border: 0;
  caret-color: red;
}
.form-group {
  margin-left: 50px;
  display: flex;
}
.form-group input {
  height: 45px;
  width: 150px;
  margin-bottom: 20px;
  padding-left: 30px;
  box-sizing: border-box;
  background-color: rgb(238, 235, 235);
  border-radius: 50px;
  outline: 0;
  border: 0;
  caret-color: red;
  margin-left: -10px;
}

.chosse_register {
  text-align: center;
  vertical-align: middle;
  margin-top: 20px;
  position: relative;
}
.chosse_register input {
  width: 80%;
  height: 45px;
  margin-bottom: 20px;
  padding-left: 30px;
  box-sizing: border-box;
  background-color: rgb(238, 235, 235);
  border-radius: 50px;
  outline: 0;
  border: 0;
  caret-color: red;
}
.nicheng {
  position: absolute;
  top: 15px;
  left: 210px;
}
.xiegang {
  position: absolute;
  top: 15px;
  left: 245px;
}
.yonghuming {
  position: absolute;
  top: 15px;
  left: 255px;
}
.choose {
  color: red;
}
</style>
