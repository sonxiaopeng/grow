<template>
  <div class="mod">
    <div>
      <van-nav-bar
        class="nav-bottom-border"
        title="修改宝宝成长数据"
        right-text="删除"
        fixed
        @click-right="onClickRight"
      >
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
    <div>
      <div class="modform">
        <van-form @submit="onSubmit">
          <!-- 身高表单 -->
          <van-field
            readonly
            clickable
            :value="bstature"
            label="身高"
            placeholder="点击填写身高,单位cm"
            @click="Picker(1)"
          />
          <!-- 头围表单 -->
          <van-field
            readonly
            clickable
            :value="bhdim"
            label="头围"
            placeholder="点击填写头围,单位cm"
            @click="Picker(2)"
          />
          <!-- 体重表单 -->
          <van-field
            readonly
            clickable
            :value="bweight"
            label="体重"
            placeholder="点击填写体重,单位kg"
            @click="Picker(3)"
          />
          <!-- 时间表单 -->
          <van-field
            readonly
            clickable
            :value="write_time"
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
          <div>
            <van-popup v-model="showPicker" position="bottom">
              <!-- 日期选择器 -->
              <van-datetime-picker
                v-if="_k == 4"
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
        </van-form>
        <!-- 表单控件结束 -->
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { Toast } from "vant";
import { Dialog } from "vant";
export default {
  data() {
    return {
      _k: 0,
      write_time: "", //数据记录日期
      bweight: "", //体重数据
      bhdim: "", //头围数据
      bstature: "", //身高数据
      showPicker: false, //底部弹出层显示
      showkey: true, //数字键盘显示
      minDate: new Date(2020, 0, 1), //最早日期
      maxDate: new Date(2025, 11, 31), //最晚日期
    };
  },
  mounted() {
    //接收添加页的跳转传参
    let time = Number(this.$route.params.keytime);
    //最大和最小时间均为传入的时间
    let Now = moment(time).format("YYYY-MM-DD");
    this.write_time = Now;
    let year = Number(moment(time).format("YYYY"));
    let month = Number(moment(time).format("MM"));
    let today = Number(moment(time).format("DD"));
    //日期选择器锁定在当前日期
    this.minDate = new Date(year, month - 1, today);
    this.maxDate = new Date(year, month - 1, today);

    //利用时间戳查询出该用户当日的记录，渲染到表单中
    //1.向vux发送时间戳，通过vux中的方法查询数据并返回
    this.$store.commit("checkitem", time);
    //2.获取vux中的计算结果,保存到相应的变量中
    let keyitem = this.$store.state.keyitem;
    //2.1条件判断若值为null，则不显示

    keyitem.bweight == 0
      ? (this.bweight = "")
      : (this.bweight = keyitem.bweight + "kg");
    keyitem.bhdim == 0
      ? (this.bhdim = "")
      : (this.bhdim = keyitem.bhdim + "cm");
    keyitem.bstature == 0
      ? (this.bstature = "")
      : (this.bstature = keyitem.bstature + "cm");
  },
  methods: {
    checkstr() {
      //检查表单长度，长度为2清空
      if (this.bstature.length == 2) this.bstature = "";
      if (this.bhdim.length == 2) this.bhdim = "";
      if (this.bweight.length == 2) this.bweight = "";
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
            this.bstature = _value + "cm";
          };
          this.onDelete = (value) => {
            //数字键盘删除键
            this.bstature =
              this.bstature.slice(0, this.bstature.length - 3) + "cm";
            this.checkstr();
            _value = this.bstature.slice(0, this.bstature.length - 2);
          };
        } else if (k == 2) {
          //头围
          this.onInput = (value) => {
            //数字键盘
            _value += value;
            this.bhdim = _value + "cm";
          };
          this.onDelete = (value) => {
            //数字键盘删除键
            this.bhdim = this.bhdim.slice(0, this.bhdim.length - 3) + "cm";
            this.checkstr();
            _value = this.bhdim.slice(0, this.bhdim.length - 2);
          };
        } else if (k == 3) {
          //体重
          this.onInput = (value) => {
            //数字键盘
            _value += value;
            this.bweight = _value + "kg";
          };
          this.onDelete = (value) => {
            //数字键盘删除键
            this.bweight =
              this.bweight.slice(0, this.bweight.length - 3) + "kg";
            this.checkstr();
            _value = this.bweight.slice(0, this.bweight.length - 2);
          };
        }
      } else {
        this.showPicker = true;
        this.showkey = false;
        // this._k=k;
      }
    },
    onClickLeft() {
      //返回按钮点击事件
      this.$router.push({
        //跳转到图表页
        name: "rlist",
        params: {
          //向Mod页面传点击项的数据
          tab: 1,
        },
      });
    },
    onClickRight() {
      //导航栏右侧删除按钮，跳转回数据列表页，并删除数据
      //放在axios执行结果中执行，成功删除跳转，失败提示
      // this.$router.push('/rlist?tab=1');
      //提示是否确认修改
      Dialog.confirm({
        title: "提示",
        message: "是否确认删除",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          //确认按钮发送axios请求删除数据
          //发送axios请求，删除数据
          this.axios
            .delete(
              `/ModDeDa?lid=${
                JSON.parse(localStorage.getItem("userInfo")).lid
              }&bid=${
                JSON.parse(localStorage.getItem("babySelect")).bid
              }&write_time=${Number(this.$store.state.keyitem.write_time)}`
            )
            .then((res) => {
              if (res.data.message == "OK") {
                //成功
                //修改掉store中的数据
                this.$store.commit(
                  "deleteKey",
                  Number(this.$store.state.keyitem.write_time)
                );
                //跳转记录页记录面板
                Toast.success("删除成功");
                //跳转记录也tab1面板
                this.$router.push({
                  name: "rlist",
                  params: {
                    //跳转携带的参数
                    tab: 1,
                  },
                });
              } else {
                //失败
                Toast.fail("删除失败");
              }
            });
        })
        .catch(() => {}); //取消留在原地
    },
    onInput(value) {
      //点击数字键盘
      this.bstature += value;
      // this.hdim+=value
    },
    onDelete(value) {
      //数字键盘删除键
      this.bstature = this.bstature.slice(0, this.bstature.length - 1);
    },
    onClose() {
      //确认按钮关闭键盘
      this.showPicker = false;
    },
    checkDate(time) {
      //日期选择器
      this.showPicker = false;
    },
    onSubmit() {
      //提交按钮收集数据并校验，校验成功写入数据库
      //收集数据
      if (!this.bstature && !this.bhdim && !this.bweight) {
        //至少填写一项数据，全为空给提示
        Toast("请至少填写一项数据(时间除外)");
        return;
      } else {
        let stature = this.bstature.slice(0, -2);
        let hdim = this.bhdim.slice(0, -2);
        let weight = this.bweight.slice(0, -2);
        let time = Number(this.$store.state.keyitem.write_time);

        //数据打包
        let params = `lid=${
          JSON.parse(localStorage.getItem("userInfo")).lid
        }&bid=${
          JSON.parse(localStorage.getItem("babySelect")).bid
        }&bstature=${stature}&bhdim=${hdim}&bweight=${weight}&write_time=${time}`;
        // 发送axios请求
        this.axios.post("/ModUpDa", params).then((res) => {
          if (res.data.message == "OK") {
            //如果成功
            //修改掉store中的数据
            this.$store.commit("updateKey", {
              bstature: stature,
              bhdim: hdim,
              bweight: weight,
              write_time: time,
            });
            //跳转记录页记录面板
            Toast.success("修改成功");
            //跳转记录也tab1面板
            this.$router.push({
              name: "rlist",
              params: {
                //跳转携带的参数
                tab: 1,
              },
            });
          } else {
            //失败
            Toast.fail("修改失败");
          }
        });
      }
    },
  },
};
</script>

<style  scoped>
.modform {
  margin-top: 46px;
  padding: 2%;
}
</style>