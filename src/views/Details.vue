<template>
  <div class="details">
    <my-header></my-header>
    <div class="place"></div>
    <!-- <div class="my-header">
      <van-row class="header show"  type="flex" justify="space-between" align="center" style="height:52px" fixed>
      <van-col span="7">
        <router-link to="/">
          <img class="logo" src="imgs/index/dt20202-common-logo.png" alt="">
        </router-link>
      </van-col>
      <van-col span="13">
        <!-- <van-search v-model="value" placeholder="育儿问题搜这里" shape="round" style="padding-bottom:8px"></van-search> -->
    <!-- </van-col>
      <van-col span="4"> -->
    <!-- <van-icon name="wap-nav" size="22" /> -->
    <!-- </van-col>
    </van-row>
    </div> -->
    <div class="knowledge">
      <!-- <div class="cut"></div> -->
      <div class="content">
        <span class="index">
          <router-link to="/" v-text="index[0]"></router-link> &gt;
          <router-link
            to="know"
            v-text="index[result.article_type - 1]"
          ></router-link>
          &gt;
          <router-link to="#" v-text="result.article_from"></router-link>
        </span>
        <h1 v-text="result.article_title"></h1>
        <div class="small-mark">
          <span v-text="create_at"></span>
          <span>
            <van-icon name="eye-o" size="12px" />
            {{ result.watch_num }}
          </span>
        </div>
      </div>
      <div class="cut"></div>
    </div>
    <div
      class="content"
      :class="{ 'content-show': showall }"
      v-html="result.article_content"
    ></div>
    <button class="btn-show-true" v-if="showall" @click="showAll">
      点击阅读全文
    </button>

    <!-- 评论 -->
    <div class="comment">
      <p class="title-box">
        <span class="title">评论</span
        ><i class="count">.{{ comment_list.length }}</i>
      </p>
      <div class="commetn-box" v-for="(item, i) of comment_list" :key="i">
        <div class="user-info">
          <div class="user">
            <ul>
              <li><img :src="item.user_avatar" alt="" /></li>
              <li>
                <p  v-text="item.user_nick" style="margin-top:13px;font-size:14px;font-weight:bold"></p>
                <!-- <s v-text="item.babyage"></s> -->
              </li>
            </ul>
          </div>
        </div>
        <div class="comment-content">
          <p class="content" v-text="item.comment_content"></p>
          <div class="marker">
            <span>{{ item.create_at }}</span>
            <i>
              <!-- <u @click="addGood($event,item.comment_id)" :data-index="item.comment_id"
                ><van-icon name="good-job-o" :class="{'color':zan==item.comment_id}" size="14" />{{ item.good_num }}</u
              > -->
              <my-zan
                :good_num="item.good_num"
                @add_zan="add_zan(i)"
                @del_zan="del_zan(i)"
              ></my-zan>
              <!-- <s>回复</s> -->
            </i>
          </div>
        </div>
      </div>
      <div class="tools">
        <input type="text" placeholder="我来说两句..." @focus="show = true" />
        <van-icon @click="show = true" name="chat-o" />
        <!-- <van-icon name="good-job-o" /> -->
        <my-zan class="bottom_zan" :good_num="result.watch_num"></my-zan>
        <van-icon name="star-o" />
        <van-icon name="share-o" />
      </div>

      <!-- 额外添加； -->
      <div></div>
    </div>
    <!-- <div class="bottom">
      <ul class="nav">
        <li><router-link to="/">首页</router-link></li>
        <li><router-link to="/">圈子</router-link></li>
        <li><router-link to="/">问答</router-link></li>
        <li><router-link to="/">知识</router-link></li>
      </ul>
      <div class="logo">
        <img src="imgs/index/lg_pregnancy_big_2020.png" alt="" />
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
    <!-- 遮罩层的信息 -->
    <van-overlay :show="show" @click="show = false" class="overlay">
      <div class="flied" @click.stop="show = true">
        <el-input
          type="textarea"
          placeholder="请输入..."
          v-model="textarea"
          show-word-limit
          resize="none"
          autofocus
          :autosize="{ minRows: 2, maxRows: 8 }"
        >
        </el-input>
        <div class="bottom-tool">
          <van-row type="flex" align="center" justify="space-around">
            <van-col :span="4">
              <!-- <van-icon size="20" name="photo-o" /> -->
            </van-col>
            <van-col :span="4">
              <!-- <van-icon size="20" name="music-o" /> -->
            </van-col>
            <van-col :span="4">
              <!-- <van-icon size="20" name="smile-o" /> -->
            </van-col>
            <van-col :span="4" offset="8">
              <van-button
                round
                type="info"
                color="linear-gradient(to right, #ff6034, #ee0a24)"
                size="mini"
                style="padding: 0px 12px"
                @click="publish"
                >发布</van-button
              >
            </van-col>
          </van-row>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import moment from "moment";
import { Dialog } from "vant";
import {
  getDetails,
  setComment,
  getComment,
  getCommentAndUser,
  getBabyAge,
  setGoodAdd,
  setGoodDel,
  setWatch,
} from "../assets/js/apis/details";
export default {
  props: ["aid"],
  data() {
    return {
      index: ["宝宝树", "知识", "知识点"],
      create_at: "2019-06-25",
      result: "",
      showarticle: true,
      showall: true,
      show: false,
      textarea: "",
      comment_list: [],
      zan: -1,
      babyage: "",
    };
  },
  methods: {
    showAll() {
      this.showall = false;
    },
    publish() {
      var time = new Date().getTime();
      var to_id = this.result.article_id;
      var user_id = this.result.author_id;
      if (localStorage.getItem("userInfo")) {
        var from_id = JSON.parse(localStorage.getItem("userInfo")).lid;
        setComment(from_id, time, to_id, this.textarea, user_id).then(
          (result) => {
            if (result.code == 1) {
              this.show = false;
              var currentTime = new Date().getTime();
              if (
                localStorage.getItem("babySelect") == "undefined" ||
                localStorage.getItem("babySelect") == null ||
                localStorage.getItem("babySelect") == 0
              ) {
                var bbir = new Date().getTime();
              } else {
                var bbir = parseInt(
                  JSON.parse(localStorage.getItem("babySelect")).bbir
                );
              }

              var duration = currentTime - bbir;
              if (!JSON.parse(localStorage.getItem("userInfo")).user_avatar) {
                // var user_avatar = `http://localhost:3000/lg_pregnancy_big_2020.png`;
                var user_avatar = `http://localhost:3000/lg_pregnancy_big_2020.png`;
              } else {
                user_avatar = `http://localhost:3000/${
                  JSON.parse(localStorage.getItem("userInfo")).user_avatar
                }`;
              }
              this.comment_list.push({
                user_avatar: user_avatar,
                user_nick: JSON.parse(localStorage.getItem("userInfo"))
                  .user_nick,
                babyage:
                  moment.duration(duration).years() >= 1
                    ? moment.duration(duration).years() + "岁"
                    : moment.duration(duration).months() + "个月",
                create_at: moment(time).format("YYYY.MM.DD"),
                comment_content: this.textarea,
                good_num: 0,
              });
            }
          }
        );
      } else {
        Dialog.confirm({
          title: "温馨小提示",
          message: "需要登录才可以评论哦",
          confirmButtonText: "去登录",
          cancelButtonText: "稍后再说",
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            this.show = false;
          });
      }
    },
    add_zan(i) {
      this.comment_list[i].good_num++;
      setGoodAdd(this.comment_list[i].comment_id);
      getBabyAge(1).then((result) => {});
    },
    del_zan(i) {
      this.comment_list[i].good_num--;
      setGoodDel(this.comment_list[i].comment_id);
    },
  },
  mounted() {
    // 回调地狱用法
    getDetails(this.aid).then((result) => {
      this.result = result;
      setWatch(this.result.article_id);
      getComment(this.result.article_id).then((result) => {
        result.forEach((element) => {
          var obj = new Object();
          obj.comment_id = element.comment;
          obj.comment_content = element.comment_content;
          obj.good_num =
            typeof element.good_num == "number" ? element.good_num : 0;
          obj.create_at = moment(parseInt(element.crtate_at)).format(
            "YYYY.MM.DD"
          );
          getCommentAndUser(element.comment).then((result) => {
            if(!result.user_avatar){
            var user_avatar = `http://localhost:3000/lg_pregnancy_big_2020.png`
            }else{
              user_avatar = `http://localhost:3000/${result.user_avatar}`
            }
            obj.user_avatar = user_avatar;
            obj.user_nick = result.user_nick;
            getBabyAge(result.lid).then((result) => {
              obj.babyage = "";
              var currentTime = new Date().getTime();
              var duration = currentTime - parseInt(result.bbir);
              obj.babyage =
                parseInt(moment.duration(duration).years()) >= 1
                  ? moment.duration(duration).years() + "岁,"
                  : moment.duration(duration).months() + "个月,";
              
            });
            this.comment_list.push(obj);
          });
        });
      });
    });
  },
  // beforeRouteEnter (to, from, next) {

  //   // setWatch(this.result.article_id).then(result=>{

  //   // })
  //   // if(from)
  //   next();
  // }
};
</script>
<style lang="less">
.details {
  padding-bottom: 100px;
  .color {
    color: red !important;
  }
  .overlay {
    left: 0px !important;
    height: 100% !important;
    top: 0px !important;
  }
  .place {
    width: 100%;
    height: 50px;
  }
  .flied {
    margin: 20px 10px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    textarea {
      height: 120px !important;
      // border-radius: 20px;
    }
    .bottom-tool {
      position: relative;
      top: -32px;
      left: 0px;
      padding: 0px 18px;
    }
  }
  .knowledge {
    width: 100%;
    .cut {
      width: 100%;
      height: 8px;
      background: #333;
      opacity: 0.06;
    }
    .content {
      padding: 14px 16px 20px;
      .index {
        font-size: 12px;
        color: #aaa;
        a {
          color: #aaa;
        }
      }
      h1 {
        margin-top: 20px;
        font-size: 23px;
        color: #181818;
        font-weight: bold;
        line-height: 35px;
      }
      .small-mark {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        margin-top: 18px;
        color: #aaa;
      }
    }
  }
  .content-show {
    height: 407px;
    overflow: hidden;
  }
  .content {
    padding: 10px 15px 20px;
    // max-height:546px;
    // overflow: hidden;
    transition: height 0.3s linear;
    img {
      max-width: 100% !important;
    }
    p {
      margin-top: 0.75rem;
      line-height: 1.6rem;
      font-size: 1rem;
      text-align: justify;
      color: #565a5c;
    }
    .btn-show {
      display: none;
    }
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
  .btn-show-true {
    position: absolute;
    bottom: 30px;
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
  .comment {
    padding: 18px 15px;
    // margin-top: 65px;
    .title-box {
      margin: 20px 0;
      .title {
        color: #333;
        font-weight: bold;
        font-size: 20px;
      }
      .count {
        color: #333;
        font-size: 14px;
      }
    }
    .comment-content {
      padding: 4px 16px 18px 38px;
      .content {
        font-size: 16px;
        color: #333;
        margin-bottom: 6px;
        padding: 0px 0px;
      }
      .marker {
        display: flex;
        justify-content: space-between;
        flex-flow: row nowrap;
        align-items: center;
        span {
          font-size: 12px;
          color: #aaa;
        }
        i {
          font-size: 12px;
          color: #aaa;
          vertical-align: text-bottom;
          s {
            margin-left: 28px;
          }
        }
      }
    }
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
          p {
            font-size: 14px;
            margin-bottom: 5px;
          }
          s {
            color: #aaa;
          }
        }
      }
    }
    .tools {
      padding: 10px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      width: 100%;
      font-size: 18px;
      box-shadow: 0 0 10px 3px rgba(133, 114, 113, 0.09);
      position: fixed;
      left: 0px;
      bottom: 0px;
      z-index: 10;
      background-color: #fff;
      input {
        width: 43%;
        height: 28px;
        border-radius: 14px;
        background-color: #e8e8e8;
        padding-left: 8px;
        line-height: 28px;
        font-size: 14px;
        color: #aaa;
        outline: 0;
        border: 0;
        opacity: 0.4;
        margin-right: 15px;
      }
      .bottom_zan {
        span {
          display: none;
        }
      }
    }
  }
}
.openapp {
  display: block;
  margin: 5px auto;
  width: 250px;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  text-align: center;
  border: solid 1px #ff5860;
  font-size: 14px;
  color: #ff5860;
  background-color: #fff;
}
.tag-lz {
  display: inline-block;
  color: #49c9c9;
  border: solid 1px #49c9c9;
  margin-bottom: 6px;
  margin-left: 4px;
  padding: 2px 2px;
  border-radius: 4px;
}
.detail-week {
  font-size: 12px;
  line-height: 1.2rem;
  color: #ccc;
}
.detail-date {
  font-size: 0.75rem;
  color: #afafaf;
}
.th1 {
  font-size: 20px;
  font-weight: 400;
  color: #333;
  line-height: 1.5;
  margin-top: 10px;
}
.detail-user-name > a {
  color: #181818;
}
button[class="openapp download-topic exposure-ele"] {
  display: none;
}
.my-header .logo {
  width: 73px;
  height: 25px;
}
.my-header .header {
  text-align: center;
  position: absolute;
  transition: all 0.3s linear;
  opacity: 0;
  background-color: #fff;
  width: 100%;
  box-shadow: 0 0 10px 3px rgba(168, 60, 55, 0.09);
  z-index: 10;
}
.my-header .show {
  opacity: 1;
  position: fixed;
  //  margin-top:10px
}
a[class="g1afbdb82d8bfb8ef66f5c4bb5496cf35 vote-btn"] {
  display: none;
}
</style>