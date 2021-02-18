<template>
  <div>
    <!-- 顶部导航栏 -->
    <van-nav-bar :title="this.$route.params.type">
      <template #left>
        <img
          class="r_icon"
          src="imgs/Recordimgs/dm1.png"
          alt=""
          @click="onClickLeft"
        /> </template
    ></van-nav-bar>
    <!-- 搜索 -->
    <van-search
      v-model="value"
      shape="round"
      placeholder="查查什么能吃"
      @search="topsearch"
    />
    <!-- 下拉菜单开始 -->
    <!-- 西瓜 -->
    <!-- 西瓜 -->
    <div class="frults" v-for="(item, i) of List">
      <p style="margin-top: 10px">{{ item.name }}</p>
      <div class="frults-box">
        <div>
          <div class="frult-box">
            <span class="state">
              <img :src="item.pragent" />
              孕妇
            </span>
            <span class="state">
              <img :src="item.yuezi" />
              月子期
            </span>
            <span class="state">
              <img :src="item.boru" />
              哺乳
            </span>
            <span class="state">
              <img :src="item.baby" />
              婴幼儿
            </span>
          </div>
        </div>
        <img :src="item.pic" alt />
      </div>
      <!-- 分割线 -->
      <div class="fengexiang"></div>
    </div>

    <!-- 西瓜结束 -->
    <!-- 搜索界面显示开始 -->
    <div class="frults" v-for="(item, i) of newList">
      <p>{{ item.name }}</p>
      <div class="frults-box">
        <div>
          <div class="frult-box">
            <span class="state">
              <img :src="item.pragent" />
              孕妇
            </span>
            <span class="state">
              <img :src="item.yuezi" />
              月子期
            </span>
            <span class="state">
              <img :src="item.boru" />
              哺乳
            </span>
            <span class="state">
              <img :src="item.baby" />
              婴幼儿
            </span>
          </div>
        </div>
        <img :src="item.pic" alt />
      </div>
      <!-- 分割线 -->
      <div class="fengexiang"></div>
    </div>
    <!--  搜索界面显示结束-->
    <!-- 下拉菜单结束 -->
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  props: ["type"],
  data() {
    return {
      timer: null, //用一个变量保存定时器序号
      name: "",
      value: "",
      List: [],
      newList: [],
    };
  },
  methods: {
    onClickLeft() {
      Toast("返回");
      this.$router.go(-2); //跳转两页
    },
    //搜索功能
    topsearch(e) {
      //a.如果有定时器在等待的话先清掉这个定时
      // if (this.timer != null) {
      //   clearTimeout(this.timer);
      // }
      // this.timer = setTimeout(() => {
      //c.按关键词查找
      //点击search时，

      //如果用户输入了有意义的关键词
      if (e) {
        //获得用户输入的关键词，执行查找操作

        this.axios.get(`/foodsearching/${e}`).then((result) => {
          this.List = [];
          var result = result.data;
          //解析数据
          result.forEach((element) => {
            var arr = [];
            var objItem = new Object();
            objItem.name = element.name;
            objItem.pragent = JSON.parse(element.iconpng)[1];
            objItem.yuezi = JSON.parse(element.iconpng)[2];
            objItem.boru = JSON.parse(element.iconpng)[3];
            objItem.baby = JSON.parse(element.iconpng)[4];
            objItem.pic = element.png;
            this.newList.push(objItem);
          });
        });
      }
      // }, 1000);
    },
    // 结束
  },
  mounted() {
    this.axios.get(`/foodsearch/${this.type}`).then((result) => {
      var result = result.data;
      result.forEach((element) => {
        var arr = [];
        var objItem = new Object();
        objItem.name = element.name;
        objItem.pragent = JSON.parse(element.iconpng)[1];
        objItem.yuezi = JSON.parse(element.iconpng)[2];
        objItem.boru = JSON.parse(element.iconpng)[3];
        objItem.baby = JSON.parse(element.iconpng)[4];
        objItem.pic = element.png;
        this.List.push(objItem);
      });
    });
  },
};
</script>
<style scoped>
.frults {
  width: 100%;
}
.frults p {
  text-align: left;
  margin-left: 28px;
  margin-bottom: 13px;
}
.frult-box img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  margin-left: 20px;
}
.frults-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.frults-box > img {
  /* flex:0 0 30%; */
  width: 97px;
  height: 72px;
  margin-right: 30px;
}
.frult-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
}
.frult-box .state {
  flex: 0 0 50%;
  margin: 10px 0px;
}
.frults p {
  margin-left: 10px;
}
.fengexiang {
  margin-top: 30px;
  margin-bottom: 10px;
  border-bottom: 1px solid #cccccc;
  margin-top: 20px;
}
</style>