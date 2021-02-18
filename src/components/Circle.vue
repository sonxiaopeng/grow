<template>
  <div class="circle">
    <my-header></my-header>
    <span class="index">
      <router-link to="/" v-text="index[0]"></router-link> &gt;
      <router-link to="know" v-text="index[1]"></router-link> &gt;
      <router-link to="#" v-text="index[2]"></router-link>
    </span>
    <div class="content">
      <div class="user-info">
        <div class="user">
          <ul>
            <li><img src="imgs/lg_pregnancy_big_2020.png" alt="" /></li>
            <li>
              <p><span>评课</span><i>楼主</i></p>
              <s>6岁6个月</s>
            </li>
          </ul>
        </div>
        <p class="type">育儿交流圈</p>
      </div>
      <div
        class="con"
        v-html="content.know_html"
        :class="{ 'content-height': showall }"
      ></div>
    </div>
    <button class="btn-show-true" v-if="showall" @click="showAll">
      点击阅读全文
    </button>
    <!--额外的底部 -->
    <!-- <div class="bottom">
      <ul class="nav">
        <li><router-link to="/">首页</router-link></li>
        <li><router-link to="/">圈子</router-link></li>
        <li><router-link to="/">问答</router-link></li>
        <li><router-link to="/">知识</router-link></li>
      </ul>
      <div class="logo">
        <img src="imgs/lg_pregnancy_big_2020.png" alt="" />
      </div>
      <h3>宝宝树孕育</h3>
      <p>怀孕养娃神器 千万妈妈都在用</p>
      <div>
        <button>触屏版</button>
        <button>电脑版</button>
        <button>APP下载</button>
      </div>
      <span>
        <router-link to="/">&copy;2021宝宝树</router-link>&nbsp;
        <router-link to="/">联系我们</router-link>&nbsp;
        <router-link to="/">服务协议</router-link>&nbsp;
        <router-link to="/">隐私政策</router-link>
      </span>
    </div> -->
  </div>
</template>
<script>
import { getKnowledge } from "../assets/js/apis/circle";
export default {
  props: ["kid"],
  data() {
    return {
      isfirst: 0,
      title: "这是一个主题",
      index: ["宝宝树", "搜索", "搜索结果"],
      watch_num: 23423,
      create_at: "2019.06.25",
      user_avater: "",
      nickname: "",
      content: {},
      showall: true,
    };
  },
  methods: {
    showAll() {
      this.showall = false;
    },
  },
  mounted() {
    this.isfirst++;
    getKnowledge(this.kid).then((result) => {
      this.content = result;

    });
    var mask = document.querySelector(".v-modal");
    var con = document.querySelector(".el-popup-parent--hidden");
    if (!mask || !con) {
      null;
    } else {
      mask.style.display = "none";
      con.style.overflow = "auto";
    }
  },
};
</script>
<style lang="less">
.circle {
  width: 100% !important;
  .header {
    position: fixed;
  }
  .index {
    font-size: 12px;
    color: #aaa;
    margin: 0px 0 20px 15px;
    display: block;
    padding-top: 68px;
    a {
      color: #aaa;
    }
  }

  .content {
    width: 96%;
    box-shadow: 0 -0.25rem 1rem -0.25rem rgba(0, 0, 0, 0.2);
    border-radius: 0.4rem 0.4rem 0 0;
    margin: 0 auto;
    padding: 12px 9.6px;
    box-sizing: border-box;
    .user-info {
      display: flex;
      justify-content: space-between;
      flex-flow: row wrap;
      align-items: center;
      .user ul {
        display: flex;
        justify-content: center;
        li:first-child {
          width: 34px;
          height: 34px;
          overflow: hidden;
          border-radius: 17px;
          margin-right: 5px;
          img {
            width: 100%;
          }
        }
        li:last-child {
          font-size: 12px;
          color: #565a5c;
          span {
            font-size: 14px;
          }
          i {
            display: inline-block;
            color: #49c9c9;
            border: solid 1px #49c9c9;
            margin-bottom: 6px;
            margin-left: 4px;
            padding: 2px 2px;
            border-radius: 4px;
          }
          s {
            color: #aaa;
          }
        }
      }
      .type {
        font-size: 0.75rem;
        color: #27aeaa;
        display: none;
      }
    }
  }
  .content-height {
    height: 519px;
    overflow: hidden;
  }
  .bottom {
    width: 100%;
    text-align: center;
    padding-bottom: 80px;
    // padding:0 12px 0 12px;
    .nav {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 13px 0px 42px 0px;
      li {
        flex: 0 0 25%;

        a {
          color: #444;
          font-size: 0.8125rem;
        }
      }
    }
    .logo {
      width: 60px;
      height: 60px;
      margin: 0 auto;
      img {
        width: 100%;
      }
    }
    h3 {
      font-size: 16px;
      color: #444;
      font-weight: 900;
      margin: 5px 0 14px 0;
    }
    p {
      font-size: 14px;
      color: #444;
      margin-bottom: 20px;
    }
    div {
      margin: 20px 0 21px 0;
      button {
        margin: 0 3px;
        border: 1px solid #e0e0e0;
        background-color: #fff;
        font-size: 13px;
        outline: 0;
        padding: 8px 4px;
        border-radius: 4px;
      }
    }
    span {
      display: block;
      a {
        font-size: 12px;
        color: #aaa;
      }
    }
  }
  .btn-show {
    display: none;
  }

  .know-subject {
    margin-top: 1rem;
    line-height: 1.875rem;
    font-size: 1.125rem;
    color: #181818;
    text-align: justify;
    font-weight: 400;
  }
  .mod-content {
    margin-top: 0.75rem;
    line-height: 1.6rem;
    font-size: 1rem;
    text-align: justify;
    color: #565a5c;
  }
  .btn-show-true {
    position: absolute;
    bottom: 0;
    left: 50%;
    display: block;
    width: 100%;
    height: 50px;
    line-height: 68px;
    margin-left: -50%;
    font-size: 16px;
    color: #46d0db;
    text-align: center;
    background: -webkit-linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.9),
      #fff
    );
    background: -moz-linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.9),
      #fff
    );
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.9),
      #fff
    );
    border: none;
    outline: 0;
  }
  .el-popup-parent--hidden {
    overflow: auto !important;
  }
  button[class='openapp download-knowledge exposure-ele']{
    display: none;
  }
  video{
    display: none!important;
  }
  p[class="h5video-ol-subject"]{
    display: none;
  }
  img[class="h5video-ol-tb"]{
    margin:10px auto;
  }
}
</style>