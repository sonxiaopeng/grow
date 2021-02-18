<template>
  <div class="mom_container">
    <!-- 喂奶时间 -->
    <div class="m_milkTime">
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="mom_value"
        label="喂奶时间"
        placeholder="点击选择时间"
        @click="showPopup"
      />
      <van-popup
        v-model="show"
        position="bottom"
        id="pop1"
        overlay-class="momleft"
      >
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
    <!-- 奶瓶 -->
    <van-image
      width="20rem"
      height="20rem"
      fit="contain"
      src="imgs/Recordimgs/d9h.png"
      class="bottle"
    />
    <!-- 奶瓶左侧显示ui -->
    <div class="showMilk">
      <van-image width="5rem" src="imgs/Recordimgs/d9i.png" />
      <p class="milkText">{{ `${milkML}ml` }}</p>
      <van-image
        class="showIcon"
        width="0.5rem"
        src="imgs/Recordimgs/d9j.png"
      />
    </div>
    <!-- 滚动选择 -->
    <mt-picker :slots="slots" @change="onValuesChange" id="picker1"></mt-picker>
    <!-- 底部按钮 -->
    <div class="m_footer">
      <van-button round @click="momSubmit">完成</van-button>
    </div>
    <div id="kong"></div>
  </div>
</template>

<script>
import moment from "moment";
import { Toast } from "vant";
import { Dialog } from "vant";
export default {
  inject: ["reload"],
  name: "milk_mom",
  data() {
    return {
      mom_value: "",
      milkML: "",
      slots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center",
        },
      ],
      show: false,
      tabnum: 2,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      momStart: 0,
      mc: {},
      mb: {},
      startDate: "",
    };
  },
  methods: {
    //获取母乳瓶喂奶瓶刻度
    onValuesChange(picker, values) {
      this.milkML = values;
    },
    //弹出框
    showPopup() {
      this.show = true;
    },
    //时间选择
    onConfirm(time) {
      this.mom_value = moment(Date.parse(time)).format("YYYY-MM-DD HH:mm");
      this.show = false;
      this.momStart = Date.parse(time);
      this.startDate = moment(Date.parse(time)).format("YYYY-MM-DD");
    },
    // 按钮点击提交事件
    momSubmit() {
      if (this.mom_value != "") {
        Dialog.confirm({
          message: "已完成本次母乳瓶喂？",
          confirmButtonText: "完成",
        })
          .then(() => {
            // 点击完成时间
            //向后台发送请求
            this.axios
              .post(
                "/momMilk",
                `starttime=${this.momStart}&m_ml=${this.milkML}&bid=${this.$store.state.bid}&m_date=${this.startDate}`
              )
              .then((res) => {
                if (res.data == 1) {
                  this.$router.push("/record");
                }
              });
          })
          .catch(() => {
            // on cancel
          });
      } else {
        Toast("请先选择喂奶时间");
      }
    },
  },
  // activated() {

  // },
  // deactivated() {

  // },
  mounted() {
        //配置momentjs相关参数
    let year = Number(moment(Date.now()).format("YYYY"));
    let month = Number(moment(Date.now()).format("MM"));
    let today = Number(moment(Date.now()).format("DD"));
    //日期选择器锁定在当前日期
    this.maxDate = new Date(year, month - 1, today,23,59);
    //生成奶瓶刻度
    for (let i = 10; i <= 500; i += 5) {
      this.slots[0].values.unshift(i);
    }
    this.mc = document.getElementById("kong");
    this.mb = document.getElementById("kong");
  },
  updated() {
    // this.reload()
    //修改弹出框的样式

    if (document.getElementsByClassName("van-overlay").length != 0) {
      this.mc = document.getElementsByClassName("van-overlay");
      this.mb = document.getElementsByClassName("van-popup--bottom");

      if (this.tabnum == 2) {
        this.mb[0].classList.add("momleft");
        this.mc[0].classList.add("momleft");
      }
      if (this.mc[0].classList.contains("milkleft")) {
        this.mb[0].classList.remove("milkleft");
        this.mc[0].classList.remove("milkleft");
      }
    }
  },
};
</script>


<style>
.momleft {
  left: 100% !important;
}
#my-container {
  width: 100%;
  height: 50%;
  position: fixed;
  top: 50%;
  left: 100%;
}
/* .van-overlay {
  left: 100% !important;
}
.van-popup--bottom {
  left: 100% !important;
} */
.mom_container {
  width: 100%;
  height: 550px;
  text-align: center;
  margin-top: 20px;
  position: relative;
}
.m_milkTime {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-top: 15px;
}
.m_desc {
  font-size: 16px;
}
.showMilk {
  position: absolute;
  left: 1.5rem;
  top: 15rem;
  text-align: center;
}
.milkText {
  position: absolute;
  top: 35%;
  left: 24%;
  color: #ff636a;
}
#picker1 {
  position: absolute;
  left: 43%;
  top: 33%;
  z-index: 999;
}
.m_btn2 {
  width: 90%;
  background: orangered !important;
  margin-top: 80px !important;
}
.picker-item {
  color: #ff636a !important;
}
.bottle {
  margin-top: 50px !important;
}
.m_time {
  color: cadetblue;
}
</style>