<template>
  <div id="mybaby">
    <!-- 导航栏开始 -->
    <van-nav-bar
      title="我的宝宝"
      right-text="添加"
      left-arrow
      @click-right="onClickRight"
    >
      <template #left>
        <img
          class="r_icon"
          src="imgs/Recordimgs/dm1.png"
          alt=""
          @click="onClickLeft"
        />
      </template>
    </van-nav-bar>
    <!-- 导航栏结束 -->
    <!-- 宝宝列开始 -->
    <van-radio-group v-model="radio">
      <div class="babylist" v-for="(item, i) of baby" :key="i">
        <!-- 内部整体开始 -->
        <div>
          <!-- 列表上层宝宝简介 -->
          <div class="item-top">
            <!-- 点击跳转宝宝信息详情页 -->
            <!-- 宝宝头像 -->
            <div class="item-top-ava">
              <!-- <img src="../../public/imgs/My_img/cig.png" v-if=""> -->
              <img
                v-show="item.bsex == 1"
                src="../../public/imgs/My_img/cig.png"
              />
              <img
                v-show="item.bsex == 0"
                src="../../public/imgs/My_img/cii.png"
              />
            </div>
            <!-- 头像结束 -->
            <!-- 简介开始 -->
            <div class="item-top-info">
              <!-- 宝宝名称 -->
              <div>{{ item.bname }}</div>
              <!-- 宝宝生日 -->
              <div>
                宝宝生日:{{
                  moment(Number(item.bbir)).format("YYYY年MM月DD日")
                }}
              </div>
            </div>
            <!-- 简介结束 -->
          </div>
          <!-- 宝宝简介结束 -->
          <!-- 当前选择的宝宝开始 -->
          <div class="item-bottom">
            <div>
              <van-radio
                :name="i"
                icon-size="18px"
                class="rfont"
                @click="changebaby(i)"
                >选择此宝宝</van-radio
              >
            </div>
            <div class="rfont" @click="tomore(item.bid)">
              修改
              <img
                src="../../public/imgs/My_img/mod.png"
                style="width: 24px; height: 24px"
              />
            </div>
          </div>
          <!-- 当前选择的宝宝结束 -->
        </div>
        <!-- 内部整体结束 -->
      </div>
    </van-radio-group>
    <!-- 宝宝列结束 -->
  </div>
</template>

<script>
import moment from "moment";
export default {
  inject: ["reload"],
  data() {
    return {
      back:0,
      radio: "",
      baby: [],
    };
  },
  methods: {
    onClickLeft() {
      //导航栏返回按钮
      this.$router.go(-1);
    },
    onClickRight() {
      //添加按钮,跳转添加页面
      this.$router.push({
        name: "BabyStockpile",
        params: {
          k: 0,
        },
      });
    },
    tomore(k) {
      this.$router.push({
        name: "BabyStockpile",
        params: {
          k: k,
        },
      });
    },
    changebaby(i) {
      localStorage.setItem("babySelect", JSON.stringify(this.baby[i]));
    },
  },
  mounted() {
    this.reload();
    if (
      localStorage.getItem("babySelect") == "undefined" ||
      !localStorage.getItem("babySelect")
    ) {
      return;
    } else {
      this.baby = JSON.parse(localStorage.getItem("babyInfo"));
      // 默认选中项
      for (let i in this.baby) {
        if (
          JSON.parse(localStorage.getItem("babySelect")).bid == this.baby[i].bid
        ) {
          this.radio = Number(i);
        }
      }
    }
  },
};
</script>

<style scoped>
.babylist {
  background: #fff;
  margin-bottom: 5px;
}
.babylist > div:first-child {
  margin-top: 5px;
}
.babylist > div {
  width: 95%;
  margin: 0 auto;
}
.item-top {
  display: flex;
  height: 60px;
  border-bottom: 0.5px solid #ccc;
}
.item-top-ava {
  height: 100%;
  flex: 0 0 25%;
  display: flex;
  justify-content: center;
}
.item-top-ava > img {
  margin: 0 auto;
  width: 55px;
  height: 55px;
}
.item-top-info {
  height: 100%;
  flex: 0 0 75%;
}
.item-top-info > div {
  margin-top: 8px;
}
.item-top-info > div:last-child {
  font-size: 14px;
  color: #8a8a8a;
}
.item-bottom {
  height: 25px;
  display: flex;
  justify-content: space-between;
}
.item-bottom > div {
  align-content: center;
}
.rfont {
  font-size: 14px;
}
</style>