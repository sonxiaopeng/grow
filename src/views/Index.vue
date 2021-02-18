<template>
  <div class="index">
    <van-row
      class="header"
      :class="{ show: show }"
      type="flex"
      justify="space-between"
      align="center"
      style="height: 52px"
    >
      <van-col span="7">
        <router-link to="/">
          <img class="logo" src="imgs/index/dt20202-common-logo.png" alt="" />
        </router-link>
      </van-col>
      <van-col span="13">
        <van-search
          v-show="topShow"
          v-model="value"
          placeholder="育儿问题搜这里"
          shape="round"
          style="padding-bottom: 8px"
          @focus="search"
        ></van-search>
      </van-col>
      <van-col span="4">
        <van-icon name="wap-nav" size="22" @click="goCanEat" />
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24">
        <img class="banner" src="imgs/index/mobile_home_bg.png" alt="" />
      </van-col>
    </van-row>

    <input
      v-show="bottomShow"
      @focus="search"
      class="search-box"
      placeholder="搜索母婴问题、知识"
      :class="{ 'search-box-none': showSearchBox == true }"
    />
    <div class="qs-list" @click="indexSearch">
      <span class="qs-item" v-for="(item, i) of question" v-text="item"></span>
      <span @click.stop="changeQs" class="qs-item" style="color: red"
        ><van-icon name="replay" />换一换</span
      >
    </div>
    <div class="layer"></div>
    <!-- <p class="title" v-text="title[0]"></p>
    <div class="show-tools">
      <div class="tools">
        <router-link
          class="application"
          to="/food"
          v-for="(item, i) of tools"
          :key="i"
        >
          <div class="tool-box">
            <img
              src="imgs/index/index-tools.png"
              :style="{ left: `${-i * 44}px` }"
              alt=""
            />
          </div>
          <p>{{ tools[i] }}</p>
        </router-link>
      </div>
    </div> -->

    <!-- <div class="layer"></div> -->
    <p class="title" v-text="title[1]"></p>
    <!-- 内容板块 -->
    <!-- 无限滚动项目 -->
    <div class="content">
      <router-link
        class="content-box"
        :to="`/details/${item.article_id}`"
        :aid="item.article_id"
        v-for="(item, i) of articleList"
        :key="i"
      >
        <div class="content-font">
          <p class="content-title" v-text="item.article_title"></p>
          <p class="from-watch">
            <span class="from" v-text="item.article_from"></span>
            <!-- <span class="watch-num">
              <van-icon name="eye-o" size="12px" />
              {{ item.watch_num }}
            </span> -->
          </p>
        </div>
        <div class="content-img">
          <img :src="item.article_pic" alt=""  v-lazy="item.article_pic" />
        </div>
      </router-link>
    </div>
    <div class="loading" v-show="loading" v-html="bottom_loading">
      <i class="el-icon-loading"></i>加载中哈...
    </div>
    <my-footer></my-footer>
    <search
      ref="search"
      :index_drawer="index_drawer"
      :searchIndex="searchIndex"
    ></search>
  </div>
</template>
<script>
import {
  getCount,
  getArticle,
  getSearch,
  getAll,
} from "../assets/js/apis/index";
import { Lazyload } from 'vant';
export default {
  data() {
    return {
      value: "",
      question: [
        "清暑又降火",
        "通草丝瓜虾仁汤",
        "产后催乳什么好",
        "孕期瑜伽",
        "觅食反射",
      ],
      tools: ["能不能吃", "宝宝看", "孕育周刊", "疫苗事件表", "看懂B超单"],
      title: ["孕育工具", "精选内容"],
      show: false,
      pageNum: 1,
      articleList: [],
      type: [""],
      pageCount: 1,
      timer: null,
      loading: false,
      index_drawer: false,
      qsPage: 1,
      qslist: [],
      searchIndex: "",
      canScroll: true,
      showSearchBox: false,
      bottom_loading: "<i class='el-icon-loading'></i>加载中哈...",
      topShow:true,
      bottomShow:true
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollEvent, false);
    window.scrollTo(0, 0);
    getCount().then((result) => {
      this.pageCount = Math.ceil(result.count / 10);
    });

    getArticle(this.pageNum).then((result) => {
      this.articleList = result;
    });

    getAll().then((result) => {
      var arr = [];
      result.forEach((element) => {
        var str = element.know_title.slice(0, 6);
        if (str.trim() !== "" && str.length ==6) {
          arr.push(str);
        }
      });
      this.qslist = arr;
    });
  },
  methods: {
    scrollEvent() {
      // const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const scrollTop = window.pageYOffset;
      const scrollHeight = document.body.scrollHeight;
      if (scrollTop == 0) {
        this.show = false;
        this.showSearchBox = false;
        var timer1 = setTimeout(()=>{this.topShow = false},400)
         this.bottomShow = true
      } else {
        this.count += 1;
        this.show = true;
        this.topShow = true
        this.showSearchBox = true;
        // var timer2 = setTimeout(()=>{this.bottomShow = false},1000)
      }
      if (scrollHeight - scrollTop < 687 && this.canScroll == true) {
        if (this.$route.name == "Index") {
          this.pageNum++;
          if (this.pageNum >= this.pageCount) {
            this.loading = true;
            this.bottom_loading = "已经到底啦";
            return;
          }
          this.canScroll = false;
          this.loading = true;
          getArticle(this.pageNum).then((result) => {
            this.articleList = this.articleList.concat(result);
            this.loading = false;
            window.setTimeout(() => {
              this.canScroll = true;
              this.loading = true;
            }, 1000);
          });
        }
      }
    },
    search(e) {
      this.index_drawer = true;
      e.target.blur();
      setTimeout(() => {
        this.index_drawer = false;
      }, 50);
    },
    changeQs() {
      this.question = [];
      var newQuestion = [];
      for (var i = 0; i < 5; i++) {
        newQuestion.push(this.qslist[Math.floor(Math.random() * 60)]);
      }
      this.question = newQuestion;
    },
    indexSearch(e) {
      if(e.target.innerText.length<=9){
        this.search(e)
        this.searchIndex = e.target.innerText;
        setTimeout(()=>{
          this.searchIndex = ""
        },500)
      }
    },
    goCanEat(){
      this.$router.push("/food")
    },
  },
  beforeRouteEnter:(to,from,next)=>{
    window.scrollTo(0,0)
    next();
  },
};
</script>
<style lang="less">
.index .logo {
  width: 73px;
  height: 25px;
}
.index .banner {
  width: 100%;
  margin-bottom: 18px;
}
.index .search-box {
  background-color: transparent;
  box-shadow: 0 0 10px 3px rgba(168, 60, 55, 0.09);
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  width: 86%;
  background: #fff !important;
  border-radius: 25px;
  font-size: 15px;
  color: #aaa;
  height: 50px;
  line-height: 50px !important;
  text-align: center;
  outline: none;
  border: 0;
  transition: all 0.3s linear;
}
.index .search-box-none {
  opacity: 0;
}
.index .qs-list {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 50px 20px;
  flex-flow: row wrap;
}
.index .qs-list > .qs-item {
  display: inline-block;
  background-color: #fff;
  text-align: center;
  border-radius: 13px;
  height: 26px;
  border: 1px solid #e0e0e0;
  font-size: 14px;
  line-height: 26px;
  padding: 0 8px;
  margin: 5px;
}
.index .layer {
  width: 100%;
  background-color: #e0e0e0;
  opacity: 0.4;
  height: 10px;
}
.index .title {
  padding-top: 16px;
  padding-left: 16px;
  line-height: 25px;
  font-size: 18px;
  color: #444;
  margin: 0px;
  font-weight: bold;
  text-align: left;
}
.index .header {
  text-align: center;
  position: absolute;
  transition: all 0.3s linear;
  opacity: 0;
  background-color: #fff;
  width: 100%;
  box-shadow: 0 0 10px 3px rgba(168, 60, 55, 0.09);
  z-index: 10;
}
.index .show {
  opacity: 1;
  position: fixed;
}
.index .show-tools {
  overflow: hidden;
  width: 100%;
  padding-bottom: 15px;
  .tools {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    font-size: 12px;
    color: #444444;
    padding-left: 10px;
    text-align: center;
    a {
      display: block;
      margin: 15px 5px 5px 5px;
      width: 65px;
      color: #444444;
      .tool-box {
        overflow: hidden;
        width: 44px;
        height: 44px;
        margin: 0 auto;
        position: relative;
        img {
          height: 44px;
          position: absolute;
          top: 0px;
          //  left:-44px;
        }
      }
      p {
        margin-top: 5px;
      }
    }
  }
}
.index {
  margin-bottom: 58px;
  .loading {
    width: 100%;
    text-align: center;
    height: 50px;
    background-color: #fff;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 0 10px 3px rgba(133, 114, 113, 0.09);
    line-height: 50px;
    color: #aaa;
    .el-icon-loading {
      font-size: 20px;
    }
  }
  .content {
    padding: 0 16px;
    .content-box {
      display: flex;
      border-bottom: 1px solid #e8e8e8;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      .content-font {
        padding: 16px 0 12px;
        line-height: 26px;
        font-size: 16px;
        color: #333;
        max-width: 220px;
        .from-watch {
          display: flex;
          justify-content: space-between;
          flex-flow: row nowrap;
          font-size: 12px;
          .from {
            color: #aaa;
          }
        }
      }
      .content-img {
        width: 112px;
        height: 75px;
        overflow: hidden;
        border-radius: 10px;
        img {
          width: 100%;
        }
      }
    }
  }
  .v-modal {
    display: none !important;
  }
  .el-popup-parent--hidden {
    overflow: initial !important;
  }
}
</style>