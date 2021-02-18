<template>
  <div class="footer">
    <van-tabbar style="width:100%;" v-model="active" active-color="#ee0a24" inactive-color="#000" @change="onChange" route>
      <van-tabbar-item name="home" icon="wap-home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item name="records" icon="records" to="/record">记录</van-tabbar-item>
      <van-tabbar-item name="chart" icon="bar-chart-o" to="/GUchart">视图</van-tabbar-item>
      <van-tabbar-item name="user" icon="user-circle-o" to="/Wy">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active:"home",
    };
  },
  methods: {
   onChange(index){

   }
  },
};
</script>
<style lang="less">
.footer {
  position: fixed;
  left: 0px;
  bottom: 0px !important;
  z-index: 100;
  background-color: #fff;
  width: 100%;
  height: 50px;
  padding-top: 8px;
  box-shadow: 0 0 10px 3px rgba(155, 97, 94, 0.09);
  .footer-box {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    .menu-item {
      text-align: center;
      color: #000;
      // font-size: 12px;
      flex: 0 0 25%;
      i {
        font-size: 28px;
      }
      span {
        display: block;
        font-size: 12px;
      }
    }
  }
  .light {
    color: red;
  }
}

// 调用样式
</style>