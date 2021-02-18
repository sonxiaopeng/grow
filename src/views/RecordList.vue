<template>
  <div class="rlist">
    <div>
      <van-nav-bar title="宝宝成长数据" fixed>
        <template #left>
          <img
            class="m_icon"
            src="imgs/Recordimgs/dm1.png"
            alt=""
            @click="onClickLeft"
          />
        </template>
      </van-nav-bar>
    </div>
    <div class="tab">
      <van-tabs v-model="active" animated>
        <van-tab title="添加记录" class="tab-bcg-color">
          <div class="addform">
            <van-form @submit="onSubmit">
              <!-- 身高表单 -->
              <van-field
                readonly
                clickable
                :value="keystature"
                label="身高"
                placeholder="点击填写身高,单位cm"
                @click="Picker(1)"
              />
              <!-- 头围表单 -->
              <van-field
                readonly
                clickable
                :value="keyhdim"
                label="头围"
                placeholder="点击填写头围,单位cm"
                @click="Picker(2)"
              />
              <!-- 体重表单 -->
              <van-field
                readonly
                clickable
                :value="keyweight"
                label="体重"
                placeholder="点击填写体重,单位kg"
                @click="Picker(3)"
              />
              <!-- 时间表单 -->
              <van-field
                readonly
                clickable
                :value="keytime"
                label="日期"
                placeholder="点击选择时间"
                @click="Picker(4)"
              />
              <!-- 底部弹出内容 -->
              <!-- 提交按钮 -->
              <div style="margin: 16px">
                <van-button
                  round
                  block
                  color="linear-gradient(to right, #ff6034, #ee0a24)"
                  native-type="submit"
                  >提交</van-button
                >
              </div>
              <!-- <div> -->
              <!-- </div> -->
            </van-form>
            <!-- 表单控件结束 -->
          </div>
        </van-tab>
        <van-tab title="记录列表" class="tab-bcg-color">
          <r-ditem-1 @changeTab="chgTab" :i="i"></r-ditem-1>
        </van-tab>
      </van-tabs>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <!-- 日期选择器 -->
      <van-datetime-picker
        v-if="_k == 4"
        v-model="currentDate"
        id="dateshow"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @blur="show = false"
        @confirm="checkDate"
        @cancel="showPicker = false"
      />
      <!-- 关联身高数字键盘 -->
      <van-number-keyboard
        v-else
        :show="showkey"
        theme="custom"
        extra-key="."
        close-button-text="确定"
        @close="onClose"
        @input="onInput"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script>
import moment from "moment";
import RDitem1 from "../components/RDitem1.vue";
import { Toast } from "vant";
import { Dialog } from "vant";
// import AddGuData from '../components/AddGuData.vue';
export default {
  inject: ["reload"],
  components: {
    RDitem1,
    // AddGuData
  },
  data() {
    return {
      i: 0,
      key: [], //保存上一级页面传来的数据
      active: 1, //控制显示面版，默认列表页
      _k: 0, //关联相关键盘
      keytime: "", //数据记录日期
      keyweight: "", //体重数据
      keyhdim: "", //头围数据
      keystature: "", //身高数据
      showPicker: false, //底部弹出层显示
      showkey: true, //数字键盘显示
      minDate: new Date(2020, 0, 1), //最早日期
      maxDate: new Date(2025, 11, 31), //最晚日期
      currentDate: new Date(), //日期选择器显示当前日期
    };
  },
  methods: {
    chgTab(k) {
      //子组件传参，更改显示面板($emit)
      this.active = k;
    },
    checkstr() {
      //检查表单长度，长度为2清空
      if (this.keystature.length == 2) this.keystature = "";
      if (this.keyhdim.length == 2) this.keyhdim = "";
      if (this.keyweight.length == 2) this.keyweight = "";
    },
    onClickLeft() {
      //返回按钮点击事件
      //跳转到图表页
      this.$router.push("/GUchart");
    },
    Picker(k) {
      //根据不同表单传入的值,调用onInput执行不同操作
      this._k = k;

      if (k == 1 || k == 2 || k == 3) {
        this.showPicker = true;
        this.showkey = true;
        let _value = "";
        if (k == 1) {
          //身高
          this.onInput = (value) => {
            _value += value;
            this.keystature = _value + "cm";
          };
          this.onDelete = (value) => {
            //数字键盘删除键
            this.keystature =
              this.keystature.slice(0, this.keystature.length - 3) + "cm";
            this.checkstr();
            _value = this.keystature.slice(0, this.keystature.length - 2);
          };
        } else if (k == 2) {
          //头围
          this.onInput = (value) => {
            //数字键盘
            _value += value;
            this.keyhdim = _value + "cm";
          };
          this.onDelete = (value) => {
            //数字键盘删除键
            this.keyhdim =
              this.keyhdim.slice(0, this.keyhdim.length - 3) + "cm";
            this.checkstr();
            _value = this.keyhdim.slice(0, this.keyhdim.length - 2);
          };
        } else if (k == 3) {
          //体重
          this.onInput = (value) => {
            //数字键盘
            _value += value;
            this.keyweight = _value + "kg";
          };
          this.onDelete = (value) => {
            //数字键盘删除键
            this.keyweight =
              this.keyweight.slice(0, this.keyweight.length - 3) + "kg";
            this.checkstr();
            _value = this.keyweight.slice(0, this.keyweight.length - 2);
          };
        }
      } else {
        this.showPicker = true;
        this.showkey = false;
      }
    },
    onInput(value) {
      //点击数字键盘
      this.keystature += value;
      // this.hdim+=value
    },
    onDelete(value) {
      //数字键盘删除键
      this.keystature = this.keystature.slice(0, this.keystature.length - 1);
    },
    onClose() {
      //确认按钮关闭键盘
      this.showPicker = false;
    },
    checkDate(time) {
      //日期选择器

      this.keytime = moment(time).format("YYYY-MM-DD");
      this.showPicker = false;
    },
    onSubmit() {
      //提交按钮收集数据并校验，校验成功写入数据库

      if (!this.keystature && !this.keyhdim && !this.keyweight) {
        //至少填写一项数据，全为空给提示
        Toast("请至少填写一项数据(时间除外)");
        return;
      } else {
        //截取数据发送axios请求
        //数据整理
        let stature = this.keystature.slice(0, -2);
        let hdim = this.keyhdim.slice(0, -2);
        let weight = this.keyweight.slice(0, -2);
        let time = "";
        //如果为当天记录，保存精确时间
        if (
          moment(Date.now()).format("YYYY-MM-DD") ==
          moment(this.keytime).format("YYYY-MM-DD")
        ) {
          time = Date.now();
        } else {
          //若为后续补录，则记录被修改日
          time = moment(this.keytime).format("x");
        }
        //数据打包
        let params = `lid=${
          JSON.parse(localStorage.getItem("userInfo")).lid
        }&bid=${
          JSON.parse(localStorage.getItem("babySelect")).bid
        }&stature=${stature}&hdim=${hdim}&weight=${weight}&time=${time}`;
        //发送axios请求
        this.axios.post("/rlist", params).then((res) => {
          if (res.data.message == "OK") {
            //数据写入成功时
            //写入成功清空表单，并切换页面
            Toast.success("添加成功");
            this.i++;
            this.active = 1;
            this.keystature = "";
            this.keyhdim = "";
            this.keyweight = "";
          } else {
            //数据写入失败时
            Dialog.confirm({
              title: "提示",
              message: "该日数据已存在,若需更改请前往修改页。",
              confirmButtonText: "前往修改",
              cancelButtonText: "留在本页",
            })
              .then(() => {
                //确认按钮跳转修改页
                this.$router.push({
                  name: "Mod",
                  params: {
                    //跳转传参，时间戳
                    keytime: time,
                  },
                });
              })
              .catch(() => {}); //留在本页
          }
        });
      }
    },
  },
  mounted() {
    //查询页面跳转携带的参数，解析active值，显示相应的页面
    this.active = this.$route.params.tab;

    //自动显示当前日期
    let Now = moment(Date.now()).format("YYYY-MM-DD");
    this.keytime = Now;
    let year = Number(moment(Date.now()).format("YYYY"));
    let month = Number(moment(Date.now()).format("MM"));
    let today = Number(moment(Date.now()).format("DD"));
    //日期选择器锁定在当前日期
    this.maxDate = new Date(year, month - 1, today);
  },
};
</script>

<style scoped>
/* html{
  background:#ececec ;
} */
.addform {
  padding: 2%;
}
.van-nav-bar__text {
  color: #000 !important;
}
.van-nav-bar .van-icon {
  color: #000 !important;
}
.van-nav-bar__title {
  font-size: 18px !important;
  font-weight: 600 !important;
}
.tab {
  margin-top: 46px;
}
.van-tabs__wrap {
  position: fixed !important;
  z-index: 1;
  width: 100%;
}
.van-tab__pane {
  padding: 1%;
}
.van-tabs__track {
  margin-top: 46px;
}
.van-popup--center {
  top: 30% !important;
}
.van-overlay {
  background-color: rgba(0, 0, 0, 0.1) !important;
}
</style>