<template>
  <div class="m_container">
    <!-- 时间 -->
    <p class="m_startTime" :class="{ startShow: text }">
      开始时间：{{ startTime }}
    </p>
    <p class="m_timeDesc">总时长</p>
    <p class="m_timeTotal">{{ totalTime }}</p>
    <!-- 计时器 -->
    <van-row class="m_timer">
      <van-col span="2"> </van-col>
      <van-col span="10" style="position: relative">
        <p class="m_timerDesc">左侧</p>
        <p class="m_lefttime">{{ leftTime }}</p>
        <div @click="leftClick">
          <van-image
            width="120"
            height="120"
            src="imgs/Recordimgs/dbq.png"
            id="leftBtn"
          />
          <van-image
            width="20"
            height="20"
            src="imgs/Recordimgs/de5.png"
            class="stop"
            v-show="lFlag"
          />
        </div>
      </van-col>
      <van-col span="10" style="position: relative">
        <p class="m_timerDesc">右侧</p>
        <div @click="rightClick">
          <van-image
            width="120"
            height="120"
            src="imgs/Recordimgs/dbq.png"
            id="rightBtn"
          />
          <van-image
            width="20"
            height="20"
            src="imgs/Recordimgs/de5.png"
            class="stop"
            v-show="rFlag"
          />
        </div>

        <p class="m_righttime">{{ rightTime }}</p>
      </van-col>
      <van-col span="2"> </van-col>
    </van-row>
    <!-- 温馨提示 -->
    <div class="m_tip">温馨提示：每10~15分钟要换另一侧乳房喂养哦~</div>
    <!-- 底部按钮 -->
    <!-- <van-button round @click="selfSubmit" >完成</van-button> -->
    <div class="m_footer">
      <van-button round @click="selfSubmit">完成</van-button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { Dialog } from "vant";
import { Toast } from "vant";
export default {
  inject:['reload'],
  name: "milk_self",
  data() {
    return {
      startTime: "",
      startState: 0,
      text: true,
      leftTime: "00:00",
      rightTime: "00:00",
      timeL: 0,
      timeR: 0,
      leftTimer: null,
      rightTimer: null,
      lFlag: false,
      rFlag: false,
      endTime: 0,
      startTimes: 0,
      startDate: "",
    };
  },
  methods: {
    //左侧计时
    leftClick() {
      //如果是第一次开始计时
      if (this.startState == 0) {
        //显示开始计时的时间
        this.startTimes = new Date().getTime();
        this.startTime = moment(this.startTimes).format("YYYY-MM-DD HH:mm");
        this.startDate = moment(this.startTime).format("YYYY-MM-DD");
      }
      //切换是否第一次的属性
      this.startState = 1;
      //显示开始时间文字
      this.text = false;

      //如果右侧计时器状态为计时状态
      if (this.rFlag) {
        //清除右侧计时器
        clearInterval(this.rightTimer);
        //右侧计时器状态设置为未计时
        this.rFlag = false;
      }
      //如果左侧计时未开始，则开始计时
      if (!this.lFlag) {
        //计时器每秒加1秒
        this.leftTimer = setInterval(() => {
          this.timeL += 1000;
          this.leftTime = moment(this.timeL).format("mm:ss");
        }, 1000);
        //左侧计时器状态切换为正在计时
        this.lFlag = true;
      } else {
        //如果左侧开始计时，则清除计时器
        clearInterval(this.leftTimer);
        //左侧计时器状态切换为未计时
        this.lFlag = false;
      }         
    },
    //右侧计时
    rightClick() {
      //如果是第一次开始计时
      if (this.startState == 0) {
        //显示开始计时的时间
        this.startTimes = new Date().getTime();
        //计算总时间
        this.startTime = moment(this.startTimes).format("YYYY-MM-DD HH:mm");
      }
      this.startState = 1;
      //显示开始时间文字
      this.text = false;

      //如果左侧计时器状态为计时状态
      if (this.lFlag) {
        //清除左侧计时器
        clearInterval(this.leftTimer);
        //左侧计时器状态设置为未计时
        this.lFlag = false;
      }
      //如果右侧计时未开始，则开始计时
      if (!this.rFlag) {
        //计时器每秒加1秒
        this.rightTimer = setInterval(() => {
          this.timeR += 1000;
          this.rightTime = moment(this.timeR).format("mm:ss");
        }, 1000);
        //右侧计时器状态切换为正在计时
        this.rFlag = true;
      } else {
        //如果右侧开始计时，则清除计时器
        clearInterval(this.rightTimer);
        //左侧计时器状态切换为未计时
        this.rFlag = false;
      }
    },
    //提交事件
    selfSubmit() {
      //获取结束时间
      this.endTime = this.startTimes + this.timeL + this.timeR;
      //如果总计时不等于0
      if (this.timeR + this.timeL != 0) {
        Dialog.confirm({
          message: "已完成本次母乳喂养？",
          confirmButtonText: "完成",
        })
          .then(() => {
            // 点击完成时间
            //向后台发送请求
            this.axios
              .post(
                "/milkSelf",
                `startTime=${this.startTimes}&endTime=${
                  this.endTime
                }&duration=${this.timeL + this.timeR}&bid=${
                  this.$store.state.bid
                }&m_date=${this.startDate}`
              )
              .then((res) => {
                if (res.data == 1) {
                  this.$router.push('/record')
                }
              });
          })
          .catch(() => {
            // on cancel
          });
      }else{
        Toast('您还未开始计时')
      }
    },                                                                                  
  },
  computed: {
    totalTime() {
      return moment(this.timeL + this.timeR).format("mm:ss");
    },
  },
  mounted(){

  }
};
</script>

<style>
.m_footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  padding: 1% 3%;
  background: #fff;
}
.m_footer > button {
  width: 100%;
  height: 40px;
  border-radius: 115px;
  color: #fff;
  background-color: #dc4248;
}

.stop {
  position: absolute !important;
  left: 44%;
  top: 51%;
  background: #f7f7f7;
}
.m_container {
  width: 100%;
  height: 550px;
  text-align: center;
  margin-top: 20px;
  position: relative;
}
.m_startTime {
  font-size: 14px;
  color: #c6c6c6;
}
.m_timeDesc {
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
}
.m_timeTotal {
  font-size: 30px;
  margin-top: 10px;
}
.m_timer {
  margin-top: 50px;
}
.m_timerDesc {
  font-size: 16px;
  color: #c6c6c6;
  margin-bottom: 10px;
}
.m_lefttime {
  position: absolute;
  top: 110px;
  left: 59px;
  z-index: 999;
  color: #000;
}
.m_righttime {
  position: absolute;
  top: 110px;
  left: 59px;
  z-index: 999;
  color: #000;
}
.m_tip {
  width: 90%;
  height: 20px;
  line-height: 20px;
  border-radius: 10px;
  background: #e8e8e8;
  font-size: 14px;
  color: #000;
  margin: 0 auto;
  margin-top: 50px;
}
.m_btn1 {
  width: 90%;
  background: orangered !important;
  margin-top: 120px !important;
}
.startShow {
  opacity: 0;
}
</style>