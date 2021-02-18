<template>
  <div class="milk_container">
    <!-- 喂奶时间 -->
    <div class="m_milkTime">
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="milk_value"
        label="喂奶时间"
        placeholder="点击选择时间"
        @click="showPopup2"
      />
      <van-popup
        v-model="show2"
        position="bottom"
        id="pop2"
        overlay-class="milkleft"
      >
        <van-datetime-picker
          v-model="currentDate"
          :min-date="minDate"
          :max-date="maxDate"
          type="datetime"
          @confirm="onConfirm2"
          @cancel="show2 = false"
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
      <p class="milkText">{{ `${milkML2}ml` }}</p>
      <van-image
        class="showIcon"
        width="0.5rem"
        src="imgs/Recordimgs/d9j.png"
      />
    </div>
    <!-- 滚动选择 -->
    <mt-picker
      :slots="slots2"
      @change="onValuesChange2"
      id="picker2"
    ></mt-picker>
    <!-- 底部按钮 -->
    <div class="m_footer">
      <van-button round @click="milkSubmit">完成</van-button>
    </div>
    <div id="kong2"></div>
  </div>
</template>

<script>
import moment from "moment";
import { Toast } from "vant";
import { Dialog } from "vant";
export default {
  inject: ["reload"],
  name: "milk_milk",
  data() {
    return {
      milk_value: "",
      milkML2: "",
      slots2: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center",
        },
      ],
      show2: false,
      tabnum: 3,
      milkStart: 0,
      mc: {},
      mb: {},
      startDate: "",
      currentDate: new Date(),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
    };
  },
  // activated() {

  // },
  // deactivated() {

  // },
  methods: {
    //获取母乳瓶喂奶瓶刻度
    onValuesChange2(picker, values) {
      this.milkML2 = values;
    },
    showPopup2() {
      this.show2 = true;

      // this.mb = document.getElementsByClassName("van-popup--bottom")
      // this.mb[0].classList.add('milkleft')
    },
    //时间选择
    onConfirm2(time) {
      this.milk_value = moment(Date.parse(time)).format("YYYY-MM-DD HH:mm");
      this.show2 = false;
      this.milkStart = Date.parse(time);
      this.startDate = moment(Date.parse(time)).format("YYYY-MM-DD");
    },
    //按钮提交事件
    milkSubmit() {
      if (this.milk_value != "") {
        Dialog.confirm({
          message: "已完成本次奶粉瓶喂？",
          confirmButtonText: "完成",
        })
          .then(() => {
            // 点击完成时间
            //向后台发送请求
            this.axios
              .post(
                "/milkMilk",
                `starttime=${this.milkStart}&m_ml=${this.milkML2}&bid=${this.$store.state.bid}&m_date=${this.startDate}`
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
  mounted() {
            //配置momentjs相关参数
    let year = Number(moment(Date.now()).format("YYYY"));
    let month = Number(moment(Date.now()).format("MM"));
    let today = Number(moment(Date.now()).format("DD"));
    //日期选择器锁定在当前日期
    this.maxDate = new Date(year, month - 1, today,23,59);
    //生成奶瓶刻度
    for (let i = 10; i <= 500; i += 5) {
      this.slots2[0].values.unshift(i);
    }

    this.mc = document.getElementById("kong2");
    this.mb = document.getElementById("kong2");
  },
  updated() {
    // this.reload()
    //弹出层设置

    if (document.getElementsByClassName("van-overlay").length != 0) {
      this.mc = document.getElementsByClassName("van-overlay");
      this.mb = document.getElementsByClassName("van-popup--bottom");

      if (this.mc.length == 1) {
        this.mb[0].classList.add("milkleft");
        this.mc[0].classList.add("milkleft");
      } else {
        this.mb[1].classList.add("milkleft");
        this.mc[1].classList.add("milkleft");
      }
    }
  },
};
</script>


<style>
#my-container2 {
  width: 100%;
  height: 50%;
  position: fixed;
  top: 50%;
  left: 200%;
}
.milkleft {
  left: 200% !important;
}
#p2 {
  left: 200% !important;
}
.milk_container {
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
}

.picker-item {
  color: #ff636a !important;
}

#picker2 {
  position: absolute;
  left: 43%;
  top: 33%;
  z-index: 999;
}
.bottle {
  margin-top: 50px !important;
}
.m_time {
  color: cadetblue;
}
</style>