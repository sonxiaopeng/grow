<template>
  <div class="statistics">
    <div>
      <van-cell title="点击选择日期" :value="chkdate" @click="calshow=true" />
      <van-calendar
        v-model="calshow"
        :round="false"
        position="top"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="checkdate"
      />
    </div>
    <div class="stat-tab-content">
      <div class="stat-time">
        <div>{{ chkdate }}</div>
      </div>
      <!-- 数据列表开始 -->
      <div class="stat-relist">
        <!-- 无数据的情况 -->
        <van-empty style="height:480px" description="该日还没有记录~" v-if="showList" />
        <!-- 无数据的情况结束 -->
        <!-- 有数据的情况 -->
        <div class="stat-item" v-else>
          <!-- 尿布开始 -->
          <div v-for="(k, i) in diaper" :key="i + '1'">
            <div class="stat-item-left">
              <div>
                <img src="imgs/Recordimgs/db3.png" alt="" />
              </div>
              <div>{{ k.dReplaceTime }}</div>
            </div>
            <div class="stat-item-right">
              <div>换尿布</div>
              <div>
                <span class="item-span-s1">尿布状态</span>
                <span class="item-span-s2">{{ k.dstate }}</span>
              </div>
              <div v-show="k.niaoColor.length > 0">
                <span class="item-span-s1">嘘嘘性状</span>
                <span
                  class="item-span-s2 circle"
                  :style="{ background: k.niaoColor }"
                ></span>
              </div>
              <div v-show="k.bianColor.length > 0 || k.bianState.length > 0">
                <span class="item-span-s1">便便形状</span>
                <span class="item-span-s2">{{ k.bianState }}</span>
                <span class="circle"></span>
              </div>
            </div>
          </div>
          <!-- 尿布结束 -->
          <!-- 睡眠开始 -->
          <div v-for="(k, i) in sleep" :key="i + '2'">
            <div class="stat-item-left">
              <div>
                <img src="imgs/Recordimgs/dbo.png" alt="" />
              </div>
              <div>{{ k.sstartTime }}</div>
            </div>
            <div class="stat-item-right">
              <div>睡眠</div>
              <div>
                <span class="item-span-s1">开始时间</span>
                <span class="item-span-s2">{{ k.sstartTime }}</span>
              </div>
              <div>
                <span class="item-span-s1">结束时间</span>
                <span class="item-span-s2">{{ k.sendTime }}</span>
              </div>
              <div>
                <span class="item-span-s1">总计时间</span>
                <span class="item-span-s2">{{ k.sduration }}</span>
              </div>
            </div>
          </div>
          <!-- 睡眠结束 -->
          <!-- 喂食开始 -->
          <div v-for="(k, i) in dietary" :key="i + '3'">
            <div class="stat-item-left">
              <div>
                <img src="imgs/Recordimgs/dbl.png" alt="" />
              </div>
              <div>{{ k.d_time }}</div>
            </div>
            <div class="stat-item-right">
              <div>辅食</div>
              <div>
                <span class="item-span-s1">食材</span>
                <span class="item-span-s2">{{ k.d_name }}</span>
              </div>
            </div>
          </div>
          <!-- 喂食结束 -->
          <!-- 亲喂开始 -->
          <div v-for="(k, i) in m1" :key="i + '4'">
            <div class="stat-item-left">
              <div>
                <img src="imgs/Recordimgs/dbj.png" alt="" />
              </div>
              <div>{{ k.m_startTime }}</div>
            </div>
            <div class="stat-item-right">
              <div>母乳亲喂</div>
              <div>
                <span class="item-span-s1">开始时间</span>
                <span class="item-span-s2">{{ k.m_startTime }}</span>
              </div>
              <div>
                <span class="item-span-s1">结束时间</span>
                <span class="item-span-s2">{{ k.m_endTime }}</span>
              </div>
              <div>
                <span class="item-span-s1">总计时间</span>
                <span class="item-span-s2">{{ k.m_duration==''?'小于1分钟':k.m_duration }}</span>
              </div>
            </div>
          </div>
          <!-- 亲喂结束 -->
          <!-- 瓶喂开始 -->
          <div v-for="(k, i) in m2" :key="i + '5'">
            <div class="stat-item-left">
              <div>
                <img src="imgs/Recordimgs/dbj.png" alt="" />
              </div>
              <div>{{ k.m_startTime }}</div>
            </div>
            <div class="stat-item-right">
              <div>瓶喂</div>
              <div>
                <span class="item-span-s1">用量</span>
                <span class="item-span-s2">{{ k.m_ml }}ml</span>
              </div>
            </div>
          </div>
          <!-- 瓶喂结束 -->
        </div>
        <!-- 有数据情况结束 -->
      </div>
      <!-- 数据列表结束 -->
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { Empty } from "vant";
import { Dialog } from 'vant';
export default {
  data() {
    return {
      diaper: [], //尿布数据
      sleep: [], //睡眠数据
      dietary: [], //喂食数据
      m1: [], //亲喂数据
      m2: [], //瓶喂数据
      dataAll: [], //二维数组
      showList: false,
      btncss: false,
      tonow: 1, //保存宝宝出生天数
      calshow: false,
      minDate: new Date(2020, 0, 1), //日历起始时间
      maxDate: new Date(), //日历结束时间,在mounted中修改为今天
      chkdate: "", //保存日历选择时间
    };
  },
  mounted() {
    //配置momentjs相关参数
    let year = Number(moment(Date.now()).format("YYYY"));
    let month = Number(moment(Date.now()).format("MM"));
    let today = Number(moment(Date.now()).format("DD"));
    //日期选择器锁定在当前日期
    this.maxDate = new Date(year, month - 1, today);
    //load后显示当前日期
    // this.chkdate=moment(Date.now()).format("YYYY年MM月DD日");
    this.chkdate = year + "年" + month + "月" + today + "日";
    //获取数据库查询条件时间
    let fourtime = moment(Date.now()).format("YYYY-MM-DD");

    //判断查看信息的满足条件
    if(!localStorage.getItem('userInfo')){
      Dialog.confirm({
        title: '温馨提示',
        message: '请绑登录后查看',
        confirmButtonText:'前往登录',
        cancelButtonText:'留在本页'
      }).then(() => {
        this.$router.push('/login')
      }).catch(() => {
        /***/
      });
    }else if(localStorage.getItem('babyInfo')=='[]'){
      Dialog.confirm({
        title: '温馨提示',
        message: '请绑定宝宝信息后查看',
        confirmButtonText:'前往绑定',
        cancelButtonText:'留在本页'
      }).then(() => {
        this.$router.push('/mybaby')
      }).catch(() => {
        /***/
      });
    }else{
      //发送axios请求，获取数据
      this.axios.get(`/fourdata?bid=${JSON.parse(localStorage.getItem('babySelect')).bid}&date=${fourtime}`).then((res) => {
          let dataAll = []; //收集总数据
          this.diaper = res.data.data1; //尿布数据
          this.sleep = res.data.data2; //睡眠数据
          this.dietary = res.data.data3; //喂食数据
          let milk = res.data.data4; //喂奶数据
          let m1 = []; //亲喂数组
          let m2 = []; //瓶喂数组
          //迭代数据转换为具体时分
          if (this.diaper.length == 0) {
            this.diaper = [];
          } else {
            this.diaper.map((item) => {
              //开始时间
              item.dReplaceTime = moment(Number(item.dReplaceTime)).format(
                "HH:mm"
              );
            });
          }
          //睡眠表同上
          if (this.sleep.length == 0) {
            this.sleep = [];
          } else {
            this.sleep.map((item) => {
              item.sstartTime = moment(Number(item.sstartTime)).format("HH:mm");
              //结束时间
              item.sendTime = moment(Number(item.sendTime)).format("HH:mm");
              //总计时间
              item.sduration =
                `${moment.duration(Number(item.sduration)).hours()}` +
                "小时" +
                `${moment.duration(Number(item.sduration)).minutes()}` +
                "分钟";
              //迭代总计时间
              for (let i in item.sduration) {
                if (item.sduration[0] == "0") {
                  item.sduration = item.sduration.slice(3, 7);
                }
              }
            });
          }
          //喂食表
          if (this.dietary.length == 0) {
            this.dietary = [];
          } else {
            this.dietary.map((item) => {
              item.d_time = moment(Number(item.d_time)).format("HH:mm");
            });
          }
          //喂奶表
          if (milk.length == 0) {
            milk = [];
          } else {
            milk.map((item) => {
              //开始时间
              item.m_startTime = moment(Number(item.m_startTime)).format("HH:mm");
              //结束时间
              item.m_endTime = moment(Number(item.m_endTime)).format("HH:mm");
              //总计时间
              item.m_duration =
                `${moment.duration(Number(item.m_duration)).hours()}` +
                "小时" +
                `${moment.duration(Number(item.m_duration)).minutes()}` +
                "分钟";
              //迭代总计时间
              for (let i in item.m_duration) {
                if (item.m_duration[0] == "0") {
                  item.m_duration = item.m_duration.slice(3, 7);
                }
              }
            });
          }
          //判断是否为空状态
          if (
            this.diaper.length == 0 &&
            this.sleep.length == 0 &&
            this.dietary.length == 0 &&
            milk.length == 0
          ) {
            this.showList = true;
          } else {
            //有数据的情况，有一条记录即可
            //拆分喂奶表，把亲喂和瓶喂分开为两个数组
            milk.forEach((item) => {
              if (item.m_type == "亲喂") {
                m1.push(item);
              } else {
                m2.push(item);
              }
            });
          }
          this.m1 = m1;
          this.m2 = m2;
          dataAll.push(this.diaper, this.sleep, this.dietary, this.m1, this.m2);
          //迭代数组，过滤(filter)其中的空数组
          dataAll = dataAll.filter((item) => {
            return item.length != 0;
          });
          this.dataAll = dataAll; //保存到变量dataAll中
        });
    }
  },
  methods: {
    changebtn(i) {
      this.btncss = i;
    },
    checkdate(chkdate) {
      //选择日期并请求相关宝宝数据
      let fourtime = moment(chkdate).format("YYYY-MM-DD"); //选择器选择后的时间
      this.chkdate = moment(chkdate).format("YYYY年MM月DD日"); //页面显示时间

      //发送axios请求，获取数据
      this.axios.get(`/fourdata?bid=${JSON.parse(localStorage.getItem('babySelect')).bid}&date=${fourtime}`).then((res) => {
        if (
          res.data.data1.length == 0 &&
          res.data.data2.length == 0 &&
          res.data.data3.length == 0 &&
          res.data.data4.length == 0
        ) {
          this.showList = true;
        } else {
          this.showList = false;
          let dataAll = [];
          this.diaper = res.data.data1; //尿布数据
          this.sleep = res.data.data2; //睡眠数据
          this.dietary = res.data.data3; //喂食数据
          let milk = res.data.data4; //喂奶数据
          let m1 = []; //亲喂数组
          let m2 = []; //瓶喂数组
          //迭代数据转换为具体时分
          if (this.diaper.length == 0) {
            this.diaper = [];
          } else {
            this.diaper.map((item) => {
              //开始时间
              item.dReplaceTime = moment(Number(item.dReplaceTime)).format(
                "HH:mm"
              );
            });
          }
          //睡眠表同上
          if (this.sleep.length == 0) {
            this.sleep = [];
          } else {
            this.sleep.map((item) => {
              item.sstartTime = moment(Number(item.sstartTime)).format("HH:mm");
              //结束时间
              item.sendTime = moment(Number(item.sendTime)).format("HH:mm");
              //总计时间
              item.sduration =
                `${moment.duration(Number(item.sduration)).hours()}` +
                "小时" +
                `${moment.duration(Number(item.sduration)).minutes()}` +
                "分钟";
              //迭代总计时间
              for (let i in item.sduration) {
                if (item.sduration[0] == "0") {
                  item.sduration = item.sduration.slice(3, 7);
                }
              }
            });
          }
          //喂食表
          if (this.dietary.length == 0) {
            this.dietary = [];
          } else {
            this.dietary.map((item) => {
              item.d_time = moment(Number(item.d_time)).format("HH:mm");
            });
          }
          //喂奶表
          if (milk.length == 0) {
            milk = [];
          } else {
            milk.map((item) => {
              //开始时间
              item.m_startTime = moment(Number(item.m_startTime)).format(
                "HH:mm"
              );
              //结束时间
              item.m_endTime = moment(Number(item.m_endTime)).format("HH:mm");
              //总计时间
              item.m_duration =
                `${moment.duration(Number(item.m_duration)).hours()}` +
                "小时" +
                `${moment.duration(Number(item.m_duration)).minutes()}` +
                "分钟";
              //迭代总计时间
              for (let i in item.m_duration) {
                if (item.m_duration[0] == "0") {
                  item.m_duration = item.m_duration.slice(3, 7);
                }
              }
            });
          }
          //判断是否为空状态
          if (
            this.diaper.length == 0 &&
            this.sleep.length == 0 &&
            this.dietary.length == 0 &&
            milk.length == 0
          ) {
            this.showList = true;
          } else {
            //有数据的情况，有一条记录即可
            //拆分喂奶表，把亲喂和瓶喂分开为两个数组
            milk.forEach((item) => {
              if (item.m_type == "亲喂") {
                m1.push(item);
              } else {
                m2.push(item);
              }
            });
          }
          this.m1 = m1;
          this.m2 = m2;

          dataAll.push(this.diaper, this.sleep, this.dietary, this.m1, this.m2);
          //迭代数组，过滤(filter)其中的空数组
          dataAll = dataAll.filter((item) => {
            return item.length != 0;
          });
          this.dataAll = dataAll; //保存到变量dataAll中
        }
      });

      this.calshow = false;
      //以下请求宝宝数据
    },
  },
};
</script>

<style scoped>
.van-overlay,.van-popup--top{
  left:100% !important;
  height:400px !important;
}
.van-calendar__selected-day {
  border-radius: 50% !important;
  height: 40px !important;
  width: 40px !important;
}
.stat-time {
  height: 40px;
  background: #fff;
  border-top: 0.5px solid #ccc;
  line-height: 40px;
}
.stat-time > div:first-child {
  font-size: 18px;
  font-weight: 600;
  padding: 0 0 5px 10px;
  font-size: 18px;
}
.stat-classify-btn {
  height: 100px;
  background: #fff;
  display: flex;
}
.stat-classify-btn > div {
  flex: 0 0 100%;
  align-items: center;
  display: flex;
  justify-content: space-around;
}
.btn1 {
  height: 50px;
  width: 23%;
  background: #fff;
  outline: none;
  border: 0.5px solid #999999b3;
  border-radius: 3px;
  box-shadow: 0 0 0.5px 0.5px #ccc;
  font-weight: 600;
  font-size: 15px;
  font-family: PingFangSC-Regular, sans-serif;
}
.btn2 {
  height: 50px;
  width: 23%;
  background: #fff;
  outline: none;
  border-radius: 3px;
  font-weight: 600;
  font-size: 15px;
  border: 0.5px solid #000;
}

.stat-relist {
  width: 100%;
  background: #fff;
  margin-bottom: 55px;
  min-height: 400px;
}
.stat-item > div {
  height: 100px;
  padding-top: 10px;
  width: 95%;
  margin: 0 auto 10px;
  box-shadow: 0 0 5px 2px #dedede;
  border-radius: 5px;
  display: flex;
}
.stat-item-left {
  flex: 0 0 20%;
}
.stat-item-right {
  flex: 0 0 80%;
}
.stat-item-left > div:first-child {
  /* background: #000; */
  height: 48px;
  width: 48px;
  margin: 0 auto;
  border-radius: 50%;
}
.stat-item-left > div:first-child > img {
  width: 48px;
  height: 48px;
}
.stat-item-left > div:last-child {
  color: #9e9e9e;
  text-align: center;
  margin-top: 5px;
}
.stat-item-right > div {
  padding-left: 5px;
  margin-bottom: 5px;
  font-size: 15px;
}
.stat-item-right > div:first-child {
  font-size: 17px;
  font-weight: 600;
}
.item-span-s1 {
  color: #6b6b6b;
}
.item-span-s2 {
  font-weight: 600;
  margin-left: 5px;
}
.circle {
  display: inline-block;
  width: 15px !important;
  height: 15px;
  border-radius: 50%;
  vertical-align: -2px;
}
</style>