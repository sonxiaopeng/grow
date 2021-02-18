<template>
  <div>
    <!-- 顶部导航栏开始 -->
    <div>
      <van-nav-bar title="找回密码" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <!-- 顶部导航栏结束 -->

    <p>你的账号是{{phoneNumber}}</p>
    <div class="mima_lose">
      <input type="text" v-model="phoneNumber" placeholder="输入验证码" />
      <div class="dingwei">
        <img src="imgs/login_img/hengxxian.png" />
        <span @click="getCode">获取验证码</span>
      </div>
      <input type="password" placeholder="输入新密码(8-16位字母或者数字组成)" />
      <button class="lose_buttonn">提交</button>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      phoneNumber: 18392133680
    };
  },
  methods: {
    onClickLeft() {
      Toast("返回");
      this.$router.push("/login");
    }, //顶部导航栏
    getCode() {
      // this.axios
      //   .post("/check", `phoneNumber=${this.phoneNumber}`)
      //   .then(result => {

      //   });
    }
  }
};
</script>

<style scoped>
.mima_lose {
  text-align: center;
  vertical-align: middle;
  margin-top: 20px;
  position: relative;
}
.mima_lose input {
  width: 80%;
  height: 45px;
  margin-bottom: 20px;
  padding-left: 20px;
  box-sizing: border-box;
  background-color: rgb(238, 235, 235);
  border-radius: 50px;
  outline: 0;
  border: 0;
  caret-color: red;
}
.lose_buttonn {
  width: 80%;
  height: 45px;
  margin-bottom: 20px;
  background-color: rgb(238, 235, 235);
  border-radius: 50px;
  outline: 0;
  border: 0;
  caret-color: red;
  text-align: center;
}
.dingwei {
  position: absolute;
  top: 15px;
  left: 230px;
}
p{
  margin-top:20px;
}
</style>
