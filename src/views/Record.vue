<template>
  <div id="r_content">
    <van-nav-bar title="喂养记录">
      <template #left>
        <img
          class="r_icon"
          src="imgs/Recordimgs/dm1.png"
          alt=""
          @click="skiptohome"
        />
      </template>
    </van-nav-bar>
    <div id="r_msg">
      <van-image
        round
        width="5rem"
        height="5rem"
        src="imgs/Recordimgs/cii.png"
        id="r_face"
        v-if="bsex == 0"
      />
      <van-image
        round
        width="5rem"
        height="5rem"
        src="imgs/Recordimgs/cig.png"
        v-else
      />
      <div id="r_info">
        <p class="r_name">{{ bname }}</p>
        <p class="r_day">{{ b2now }} 天</p>
      </div>
    </div>

    <van-tabs v-model="active" animated line-width="16px" color="#FF5B54">
      <van-tab title="记录">
        <div id="r_pageBox">
          <!-- 喂奶 -->
          <van-row class="r_page" @click="toMilk">
            <van-col span="8" class="r_head">
              <van-image
                round
                width="3rem"
                height="3rem"
                src="imgs/Recordimgs/dbj.png"
                id="r_face"
                class="r_typeIcon"
              />
              <p class="r_details">喂奶</p>
            </van-col>
            <van-col span="12"></van-col>
            <van-col span="4">
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                src="imgs/Recordimgs/dbg.png"
                id="r_face"
                class="r_buttonIcon"
              />
            </van-col>
          </van-row>
          <!-- 辅食 -->
          <van-row class="r_page" @click="toDietary">
            <van-col span="8" class="r_head">
              <van-image
                round
                width="3rem"
                height="3rem"
                src="imgs/Recordimgs/dbl.png"
                id="r_face"
                class="r_typeIcon"
              />
              <p class="r_details">辅食</p>
            </van-col>
            <van-col span="12"></van-col>
            <van-col span="4">
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                src="imgs/Recordimgs/dbk.png"
                id="r_face"
                class="r_buttonIcon"
              />
            </van-col>
          </van-row>
          <!-- 换尿布 -->
          <van-row class="r_page" @click="toDiaper">
            <van-col span="8" class="r_head">
              <van-image
                round
                width="3rem"
                height="3rem"
                src="imgs/Recordimgs/db3.png"
                id="r_face"
                class="r_typeIcon"
              />
              <p class="r_details">换尿布</p>
            </van-col>
            <van-col span="12"></van-col>
            <van-col span="4">
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                src="imgs/Recordimgs/db2.png"
                id="r_face"
                class="r_buttonIcon"
              />
            </van-col>
          </van-row>
          <!-- 睡眠 -->
          <van-row class="r_page" @click="toSleep">
            <van-col span="8" class="r_head">
              <van-image
                round
                width="3rem"
                height="3rem"
                src="imgs/Recordimgs/dbo.png"
                id="r_face"
                class="r_typeIcon"
              />
              <p class="r_details">睡眠</p>
            </van-col>
            <van-col span="12"></van-col>
            <van-col span="4">
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                src="imgs/Recordimgs/dbn.png"
                id="r_face"
                class="r_buttonIcon"
              />
            </van-col>
          </van-row>
        </div>
      </van-tab>
      <van-tab title="统计">
        <statistics></statistics>
      </van-tab>
    </van-tabs>
    <my-footer></my-footer>
  </div>
</template>

<script>
import Statistics from "../components/Statistics";
import moment from "moment";
import { Toast } from "vant";
import { Dialog } from "vant";
export default {
  components: { Statistics },
  data() {
    return {
      active: 2,
      b2now: "0",
      bname: "宝宝",
      bsex: 0,
    };
  },
  mounted() {
    //获取宝宝生日毫秒数
    if (
      localStorage.getItem("babySelect") == "undefined" ||
      !localStorage.getItem("babySelect")
    ) {
      null;
    } else {
      let bir = JSON.parse(localStorage.getItem("babySelect")).bbir;
      //获取当天毫秒数
      let now = Date.now();
      this.b2now = moment.duration(now - bir).days();
      this.bname = JSON.parse(localStorage.getItem("babySelect")).bname;
      this.bsex = JSON.parse(localStorage.getItem("babySelect")).bsex;
    }
  },
  methods: {
    dialog1() {
      Dialog.confirm({
        title: "温馨提示",
        message: "请登录后使用该功能",
        confirmButtonText: "前往登录",
        cancelButtonText: "留在本页",
      })
        .then(() => {
          this.$router.push("/login");
        })
        .catch(() => {
          /***/
        });
    },
    dialog2() {
      Dialog.confirm({
        title: "温馨提示",
        message: "请添加宝宝",
        confirmButtonText: "前往添加",
        cancelButtonText: "留在本页",
      })
        .then(() => {
          this.$router.push('/mybaby');
        })
        .catch(() => {
          /***/
        });
    },
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
    // 跳转喂奶界面
    toMilk() {
      if (!localStorage.getItem("babySelect")) {
        this.dialog1();
      } else if (localStorage.getItem("babySelect") == "undefined") {
        this.dialog2();
      } else {
        this.$router.push("/milk");
      }
    },
    // 跳转辅食界面
    toDietary() {
      if (!localStorage.getItem("babySelect")) {
        this.dialog1();
      } else if (localStorage.getItem("babySelect") == "undefined") {
        this.dialog2();
      } else {
        this.$router.push("./dietary");
      }
    },
    // 跳转换尿布界面
    toDiaper() {
      if (!localStorage.getItem("babySelect")) {
        this.dialog1();
      } else if (localStorage.getItem("babySelect") == "undefined") {
        this.dialog2();
      } else {
        this.$router.push("./diaper");
      }
    },
    // 跳转睡眠界面
    toSleep() {
      if (!localStorage.getItem("babySelect")) {
        this.dialog1();
      } else if (localStorage.getItem("babySelect") == "undefined") {
        this.dialog2();
      } else {
        this.$router.push("./sleep");
      }
    },
    skiptohome() {
      if (!localStorage.getItem("babySelect")) {
        this.dialog1();
      } else if (localStorage.getItem("babySelect") == "undefined") {
        this.dialog2();
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scope >
.r_icon {
  widows: 25px;
  height: 25px;
}

.van-nav-bar__title {
  font-size: 17px !important;
  font-weight: 600 !important;
}

#r_face {
  margin-left: 10px !important;
}

#r_msg {
  display: flex;
  background: #fff;
}

#r_info {
  margin-top: 30px;
}

.r_day {
  font-size: 12px;
  color: #c6c6c6;
  margin-top: 10px;
}

html {
  background: #f5f5f5;
}

.van-tab--active {
  color: #000;
  font-size: 16px !important;
  font-weight: 600 !important;
}

.van-tab {
  padding-top: 10px !important;
}

#r_pageBox {
  width: 98%;
  margin: 0 auto;
  margin-top: 10px;
}

.r_page {
  height: 68px;
  background: #fff;
  margin-top: 5px;
  border-radius: 6px;
}

.r_typeIcon {
  margin-top: 10px;
}

.r_details {
  font-size: 16px;
  font-weight: 600;
  margin-left: 15px;
  margin-top: 28px;
}

.r_buttonIcon {
  margin-top: 24px;
}

.r_head {
  display: flex;
}
</style>


