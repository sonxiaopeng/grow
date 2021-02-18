<template>
  <div class="comment">
    <p class="title-box">
      <span class="title">评论</span><i class="count">.5</i>
    </p>
    <div class="commetn-box" v-for="item of 2" :key="item">
      <div class="user-info">
        <div class="user">
          <ul>
            <li><img src="imgs/index/lg_pregnancy_big_2020.png" alt="" /></li>
            <li>
              <p><span>评课</span></p>
              <s>6岁6个月</s>
            </li>
          </ul>
        </div>
      </div>
      <div class="comment-content">
        <p class="content">多大宝宝用</p>
        <div class="marker">
          <span>2020.12.15</span>
          <i>
            <u><van-icon name="good-job-o" size="14" />1</u>
            <s>回复</s>
          </i>
        </div>
      </div>
    </div>
    <div class="tools">
      <input type="text" placeholder="我来说两句..." />
      <van-icon name="chat-o" />
      <van-icon name="good-job-o" />
      <van-icon name="star-o" />
      <van-icon name="share-o" />
    </div>

    <!-- 额外添加； -->
    <div class="flied">
      <el-input
        type="textarea"
        placeholder="请输入..."
        v-model="textarea"
        show-word-limit
        resize="none"
        autofocus
        :autosize="{ minRows: 2, maxRows: 8}"
      >
      </el-input>
      <div class="bottom-tool">
        <van-row type="flex" align="center" justify="space-around">
          <van-col :span="4">
            <van-icon size="20" name="photo-o" />
          </van-col>
          <van-col :span="4">
            <van-icon size="20" name="music-o" />
          </van-col>
          <van-col :span="4">
            <van-icon size="20" name="smile-o" />
          </van-col>
          <van-col :span="4" offset="8">
            <van-button
              round
              type="info"
              color="linear-gradient(to right, #ff6034, #ee0a24)"
              size="mini"
              style="padding: 0px 12px"
              >发布</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      textarea:""
    }
  }
}
</script>
<style lang="less">
.comment {
  padding: 18px 15px;
  .flied {
    margin: 20px 10px;
    position: relative;
    textarea {
      height: 120px !important;
      // border-radius: 20px;
    }
    .bottom-tool{
      position: relative;
      top:-32px;
      left:0px;
      padding:0px 18px;
    }
  }
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
    padding: 12px 16px 24px 38px;
    .content {
      font-size: 16px;
      color: #333;
      margin-bottom: 6px;
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
    bottom: 59px;
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
  }
}
</style>