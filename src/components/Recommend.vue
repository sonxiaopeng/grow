<template>
  <div id="recommend">
    <div class="recommend" v-for="item,i of results" :key="i">
      <p class="rec">本周你要了解的内容</p>
      <!-- from comment -->
      <!-- <div class="user">
        <ul>
          <li><img src="imgs/index/lg_pregnancy_big_2020.png" alt="" /></li>
          <li>
            <p><span>评课</span></p>
            <s>6岁6个月</s>
          </li>
        </ul>
        <div class="delete">
          <el-button type="primary" round plain size="mini">关注</el-button>
          <i class="el-icon-close"></i>
        </div>
      </div> -->
      <h4>{{qw}}</h4>
      <div class="content">
        <img src="" alt="" />
        <img class="play" src="" alt="" />
        <em>{{item.know_title}}</em>
      </div>
      <router-link class="type" to="/">圈子 </router-link>
      <van-row type="flex" justify="center" align="center" class="text">
        <van-col span="8" style="vertical-align: text-bottom">
          <i class="el-icon-share" style="font-size: 20px"
            ><span style="font-size: 14px; line-height: 20px"> 39</span></i
          >
        </van-col>
        <van-col span="8">
          <i class="el-icon-chat-line-round" style="font-size: 20px"
            ><span style="font-size: 14px; line-height: 20px"> 3</span></i
          >
        </van-col>
        <van-col span="8">
          <van-icon
            name="good-job-o"
            size="20"
            style="vertical-align: text-bottom"
          />
          {{item.good_num}}
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import { getCount, getArticle, getSearch } from "../assets/js/apis/index";
export default {
  props: ["qw"],
  data() {
    return {
      results: [],
      type:["问大家","知识育儿","圈子","大杂烩"]
    };
  },
  methods: {
    // onSearch() {
    //   getSearch(this.qw).then((result) => {
    //     this.results = result;

    //   });
    // },
  },
};
</script>
<style lang="less">
.recommend {
  border-radius: 10px;
  width: 88%;
  margin: 10px auto;
  padding: 0px 10px 10px 10px;
  box-shadow: 0 0 10px 3px rgba(133, 114, 113, 0.09);
  // text-align:center;
  p.rec {
    margin-left: -10px;
    background-color: #0ff;
    color: greenyellow;
    border-radius: 10px 0px 10px 0px;
    padding: 4px 10px;
    display: inline-block;
  }
  .user {
    position: relative;
    ul {
      display: flex;
      justify-content: left;
      margin: 20px 0px 12px 0px;
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
    .delete {
      position: absolute;
      top: 0px;
      right: 0px;
      button {
        background-color: #fff;
        border-color: #aaa;
        color: #aaa;
      }
      i {
        margin-left: 10px;
        vertical-align: middle;
        color: #aaa;
        opacity: 0.5;
      }
    }
  }
  h4 {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-top: 10px;
  }
  .content {
    margin: 16px 0px;
    em {
      color: #aaa;
      font-size: 15px;
    }
  }
  .type {
    margin: 0px 0px 12px 0px;
    display: inline-block;
    border-radius: 16px;
    background-color: #aaa;
    font-size: 13px;
    color: #1f2020;
    // font-weight: bold;
    padding: 5px 10px;
    // opacity: .3;
  }
  .text {
    text-align: center;
    font-size: 14px;
    color: #aaa;
  }
}
</style>