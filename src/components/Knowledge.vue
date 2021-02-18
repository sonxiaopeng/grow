<template>
  <div class="knowledge">
    <!-- <div class="cut"></div> -->
    <div class="content">
      <span class="index">
        <router-link to="/" v-text="index[0]"></router-link> &gt;
        <router-link to="know" v-text="index[1]"></router-link> &gt;
        <router-link to="#" v-text="index[2]"></router-link>
      </span>
      <h1 v-text="title"></h1>
      <div class="small-mark">
        <span v-text="create_at"></span>
        <span>
          <van-icon name="eye-o" size="12px" />
          {{watch_num}}
        </span>
      </div>
    </div>
    <div class="cut"></div>
  </div>
</template>
<script >
export default {
  data() {
    return {
      title: "这是一个主题",
      index: ["宝宝树", "知识", "知识点"],
      watch_num:23423,
      create_at:'2019-06-25'
    };
  },
};
</script>
<style lang="less">
.knowledge {
  width: 100%;
  .cut {
    width: 100%;
    height: 8px;
    background: #333;
    opacity: 0.06;
  }
  .content {
    padding:14px 16px 20px;
    .index {
      font-size: 12px;
      color: #aaa;
      a {
        color: #aaa;
      }
    }
    h1 {
      margin-top:26px;
      font-size: 23px;
      color: #181818;
      font-weight: bold;
    }
    .small-mark{
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items:center;
      font-size: 12px;
      margin-top:18px;
      color:#aaa;

    }
  }
}
</style>