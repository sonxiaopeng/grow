<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar title="辅食">
      <template #left>
        <img class="r_icon" src="imgs/Recordimgs/dm1.png" alt=""  @click="skiptorecord"/>
      </template>
    </van-nav-bar>
    <!-- 时间 -->
    <div class="d_time">
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="valueTime"
        label="辅食时间"
        placeholder="点击选择时间"
        @click="show = true"
        class="d_font"
      />
      <van-popup v-model="show" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirm"
          @cancel="show = false"
        />
      </van-popup>
    </div>
    <!-- 辅食名称 -->
    <div class="d_foodBox">
      <div class="d_foodName">
        <p>辅食名称</p>
        <span class="d_span">*必填</span>
      </div>
      <!-- 文本输入 -->
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="90"
        placeholder="可点击下方选项快捷输入"
        class="fileBox"
      />
      <!-- 快捷按钮 -->
      <div class="d_btnBox">
        <button
          class="d_foodBtn"
          v-for="(item, i) of foods"
          :key="i"
          @touchstart="gotouchstart(i)"
          @touchmove="gotouchmove"
          @touchend="gotouchend(item)"
        >
          {{ item }}
        </button>
        <button @click="btn_click" class="d_btnAdd">+</button>
      </div>
    </div>
    <!-- 描述框 -->
    <div class="d_descBox">
      <p style="padding: 20px 0px 0px 20px">描述</p>
      <!-- 文本输入 -->
      <van-field
        v-model="msg_desc"
        rows="2"
        autosize
        type="textarea"
        maxlength="200"
        placeholder="可填写具体的辅食描述，以便统计宝宝营养"
        class="descBox"
      />
    </div>
    <!-- 宝宝感受 -->
    <div class="feelBox">
      <p style="padding: 20px 0px 0px 20px">宝宝感受(选填)</p>
      <div class="feelIcon">
        <!-- 过敏图标 -->
        <div class="icons" @click="btnA">
          <van-icon
            name="imgs/Recordimgs/dbe.png"
            size="35"
            class="isAllergy"
            v-if="isA == 0"
          />
          <van-icon
            name="imgs/Recordimgs/dbf.png"
            size="35"
            class="isAllergy"
            v-else
          />
          <p class="icondesc">过敏</p>
        </div>
        <!-- 竖线 -->
        <div class="line"></div>
        <!-- 讨厌图标 -->
        <div class="icons" @click="btnB">
          <van-icon
            name="imgs/Recordimgs/db7.png"
            size="35"
            class="isAllergy"
            v-if="isB == 0"
          />
          <van-icon
            name="imgs/Recordimgs/db8.png"
            size="35"
            class="isAllergy"
            v-else
          />
          <p class="icondesc">很讨厌</p>
        </div>
        <!-- 不太喜欢图标 -->
        <div class="icons" @click="btnC">
          <van-icon
            name="imgs/Recordimgs/dba.png"
            size="35"
            class="isAllergy"
            v-if="isC == 0"
          />
          <van-icon
            name="imgs/Recordimgs/dbb.png"
            size="35"
            class="isAllergy"
            v-else
          />
          <p class="icondesc">不太喜欢</p>
        </div>
        <!-- 一般图标 -->
        <div class="icons" @click="btnD">
          <van-icon
            name="imgs/Recordimgs/dbc.png"
            size="35"
            class="isAllergy"
            v-if="isD == 0"
          />
          <van-icon
            name="imgs/Recordimgs/dbd.png"
            size="35"
            class="isAllergy"
            v-else
          />
          <p class="icondesc">一般</p>
        </div>
        <!-- 还可以图标 -->
        <div class="icons" @click="btnE">
          <van-icon
            name="imgs/Recordimgs/db9.png"
            size="35"
            class="isAllergy"
            v-if="isE == 0"
          />
          <van-icon
            name="imgs/Recordimgs/db_.png"
            size="35"
            class="isAllergy"
            v-else
          />
          <p class="icondesc">还可以</p>
        </div>
        <!-- 很喜欢图标 -->
        <div class="icons" @click="btnF">
          <van-icon
            name="imgs/Recordimgs/db5.png"
            size="35"
            class="isAllergy"
            v-if="isF == 0"
          />
          <van-icon
            name="imgs/Recordimgs/db6.png"
            size="35"
            class="isAllergy"
            v-else
          />
          <p class="icondesc">很喜欢</p>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="d_btn">
      <button class="d_commit" @click="dsubmit">保存</button>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import moment from "moment";
import { Dialog } from "vant";
import { Toast } from "vant";
export default {
  data() {
    return {
      formData: {},
      valueTime: "",
      valueMs:0,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      show: false,
      foods: [
        "米粉",
        "面条",
        "香蕉",
        "苹果",
        "火龙果",
        "土豆",
        "南瓜",
        "胡萝卜",
        "山药",
        "菠菜",
        "青菜",
        "番茄",
        "鸡蛋",
        "猪肉",
        "牛肉",
        "鸡肉",
        "猪肝",
        "红薯",
        "蓝莓",
        "牛油果",
      ],
      timeOutEvent: 0,
      message: "",
      msg_desc: "",
      fileList: [],
      isA: 0,
      isB: 0,
      isC: 0,
      isD: 0,
      isE: 0,
      isF: 0,
      d_date:"",
      d_feel:0
    };
  },
  mounted(){
            //配置momentjs相关参数
    let year = Number(moment(Date.now()).format("YYYY"));
    let month = Number(moment(Date.now()).format("MM"));
    let today = Number(moment(Date.now()).format("DD"));
    //日期选择器锁定在当前日期
    this.maxDate = new Date(year, month - 1, today,23,59);
  },
  methods: {
    //添加新辅食按钮
    btn_click() {
      MessageBox.prompt(null, "新增辅食名称快捷键").then(
        ({ value, action }) => {
          if (this.foods.length < 24) {
            if(this.foods.indexOf(value)==-1){
              this.foods.unshift(value);
            }else{
              Toast("该快捷键已添加")
            }
          } else {
            Toast("已经最多个数了，建议删除后添加");
          }
        }
      );
    },
    //弹出框确定按钮
    onConfirm(time) {
      this.valueTime = moment(Date.parse(time)).format("YYYY-MM-DD HH:mm");
      this.show = false;
      this.d_date=moment(Date.parse(time)).format("YYYY-MM-DD");
      this.valueMs=Date.parse(time)

    },
    gotouchstart(i) {
      let food = this.foods;
      clearTimeout(this.timeOutEvent); //清除定时器
      this.timeOutEvent = 0;
      this.timeOutEvent = setTimeout(function () {
        //执行长按要执行的内容，提示是否删除该选项
        Dialog.confirm({
          title: "是否删除该快捷选项",
        })
          .then(() => {
            // on confirm 点击确定删除该选项
            food.splice(i, 1);
          })
          .catch(() => {
            // on cancel
          });
      }, 800);
      this.foods = food; //这里设置定时
    },
    //手释放，如果在800毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    gotouchend(item) {
      clearTimeout(this.timeOutEvent);
      if (this.timeOutEvent != 0) {
        //这里写要执行的内容（尤如onclick事件）
        if (this.message.length == 0) {
          this.message += `${item}`;
        } else {
          this.message += `，${item}`;
        }
      }
    },
    //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    gotouchmove() {
      clearTimeout(this.timeOutEvent); //清除定时器
      this.timeOutEvent = 0;
    },
    //按钮提交事件
    dsubmit() {

      if(this.isB==1){
        this.d_feel=1
      }else if(this.isC==1){
        this.d_feel=2
      }else if(this.isD==1){
        this.d_feel=3
      }else if(this.isE==1){
        this.d_feel=4
      }else if(this.isF==1){
        this.d_feel=5
      }
      if (this.d_date!="") {
        let str=`d_date=${this.d_date}&d_time=${this.valueMs}&d_name=${this.message}&d_desc=${this.msg_desc}&d_allerg=${this.isA}&d_feel=${this.d_feel}&b_id=${this.$store.state.bid}&d_date=${this.d_date}`
        this.axios.post('/dietary',str).then((res)=>{
          Toast("添加成功")
          this.$router.go(-1)
        })
      }else{
        Toast('请先选择时间');
      }
    },
    //是否过敏图标点击事件
    btnA() {
      if (this.isA == 0) {
        this.isA = 1;
      } else {
        this.isA = 0;
      }
    },
    //是否讨厌图标点击事件
    btnB() {
      if (this.isB == 0) {
        this.isB = 1;
        this.isC = 0;
        this.isD = 0;
        this.isE = 0;
        this.isF = 0;
      }
    },
    btnC() {
      if (this.isC == 0) {
        this.isB = 0;
        this.isC = 1;
        this.isD = 0;
        this.isE = 0;
        this.isF = 0;
      }
    },
    btnD() {
      if (this.isD == 0) {
        this.isB = 0;
        this.isC = 0;
        this.isD = 1;
        this.isE = 0;
        this.isF = 0;
      }
    },
    btnE() {
      if (this.isE == 0) {
        this.isB = 0;
        this.isC = 0;
        this.isD = 0;
        this.isE = 1;
        this.isF = 0;
      }
    },
    btnF() {
      if (this.isF == 0) {
        this.isB = 0;
        this.isC = 0;
        this.isD = 0;
        this.isE = 0;
        this.isF = 1;
      }
    },
    skiptorecord(){
      this.$router.push("/record")
    }
  },
};
</script>

<style>
.d_font {
  font-size: 16px !important;
  padding: 10px 0px !important;
}
.d_time {
  height: 40px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  margin-top: 5px;
  padding: 0 20px;
  box-sizing: border-box;
}
.d_foodBox {
  height: 330px;
  background: #fff;
  margin-top: 5px;
}
.d_foodName {
  display: flex;
  padding: 20px;
}
.d_span {
  color: #c6c6c6;
  font-size: 10px;
  margin-top: 4px;
  margin-left: 5px !important;
}
.d_foodBtn {
  width: 60px;
  height: 30px;
  font-size: 12px;
  border: none;
  border-radius: 5px;
  margin-bottom: 7px;
  margin-left: 7px;
}
.d_btnBox {
  width: 90%;
  margin: 0 auto;
  display: flex;
  margin-top: 10px;
  flex-flow: wrap;
}
.d_btnAdd {
  width: 60px;
  height: 30px;
  border: none;
  border-radius: 5px;
  font-size: 30px;
  color: #c6c6c6;
  margin-left: 7px;
}
.van-cell::after {
  border-bottom: none !important;
}
.d_descBox {
  height: 200px;
  background: #fff;
  margin-top: 5px;
}
.feelBox {
  height: 120px;
  background: #fff;
  margin-top: 5px;
}
.feelIcon {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  align-items: center;
}
.icons {
  width: 20%;
  text-align: center;
}
.icondesc {
  font-size: 10px;
  margin-top: 5px;
  color: #c6c6c6;
}
.line {
  width: 1px;
  height: 30px;
  background: #c6c6c6;
}
.d_btn {
  width: 100%;
  background: #fff;
  text-align: center;
}
.d_commit {
  width: 90%;
  height: 40px;
  color: #fff;
  border-radius: 50px;
  border: none;
  outline: none;
  margin-top: 30px;
  margin-bottom: 20px;
  background-color: #dc4248;
}
</style>