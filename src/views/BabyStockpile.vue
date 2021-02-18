<template>
  <div class="BabyStockpile">
    <div class="BabyStockpile2">
      <div style="height: 47px"></div>
      <!-- 导航栏 -->
      <van-nav-bar
        title="设置宝宝信息"
        left-arrow
        :click-left="onClickLeft"
        class="xt"
        @click-left="wode"
        @click-right="save"
        right-text="保存"
        fixed
      />
      <!-- 上传图片 -->
      <div class="uploading_img xt">
        <div class="uploading_img2">
          <!-- 图片底盘 -->
          <div class="uploading_tp"></div>
          <div class="uploading_tx" v-if="sex_value == '小公主'"></div>
          <div class="uploading_tx2" v-else-if="sex_value == '小王子' ||sex_value == '不告诉你'"></div>
        </div>
      </div>
      <!-- 当前状态 -->
      <van-cell title="当前状态" value="已出生" is-link @click="" />
      <!-- 宝宝生日 -->
      <van-cell
        title="宝宝生日"
        :value="birthday_value"
        is-link
        @click="birthday = true"
      />
      <!-- 宝宝昵称 -->
      <van-cell title="宝宝名称" :value="bname_value" @click="bname_click" />
      <!-- 宝宝性别 -->
      <van-cell
        title="宝宝性别"
        :value="sex_value"
        is-link
        @click="sex = true"
      />
      <!-- 宝宝体重 -->
      <van-cell
        title="出生体重(kg)"
        :value="weight_value"
        @click="weight_click"
      />
      <!-- 宝宝身高 -->
      <van-cell
        title="出生身高(cm)"
        :value="height_value"
        @click="height_click"
      />
      <van-cell title="出生孕期" value="未选择" is-link @click="" />
      <!-- 独身子女 -->
      <div class="alone">
        <div class="alone2">
          <span class="alone_text">独身子女</span>
          <van-radio-group
            v-model="balone"
            direction="horizontal"
            style="float: right"
          >
            <van-radio name="1">是</van-radio>
            <van-radio name="0">否</van-radio>
          </van-radio-group>
        </div>
      </div>
    </div>

    <!-- 键盘 -->
    <van-number-keyboard
      :show="keyboard_weight"
      theme="custom"
      extra-key="."
      close-button-text="完成"
      @blur="keyboard_weight = false"
      v-model="weight"
      z-index="8000"
    />
    <van-number-keyboard
      :show="keyboard_height"
      theme="custom"
      extra-key="."
      close-button-text="完成"
      @blur="keyboard_height = false"
      v-model="height"
      z-index="8001"
    />

    <!-- 遮罩层 -->
    <!-- 体重 -->
    <van-popup v-model="show" class="block">
      <div>
        <div class="block_text">请输入宝宝体重</div>
        <div class="block_input">
          <input class="block_input2" ref="input" v-model="weight" /> kg
        </div>
        <van-button
          round
          type="info"
          block
          style="margin: 0 auto; width: 90%"
          color="#45e7c9"
          @click="button(1)"
          >保存</van-button
        >
        <div style="height: 10px"></div>
        <van-button
          round
          type="info"
          block
          style="margin: 0 auto; width: 90%"
          color="#eee"
          @click="show = false"
          >取消</van-button
        >
      </div>
    </van-popup>
    <!-- 身高 -->
    <van-popup v-model="show2" class="block">
      <div>
        <div class="block_text">请输入宝宝身高</div>
        <div class="block_input">
          <input class="block_input2" ref="input2" v-model="height" />cm
        </div>
        <van-button
          round
          type="info"
          block
          style="margin: 0 auto; width: 90%"
          color="#45e7c9"
          @click="button(2)"
          >保存</van-button
        >
        <div style="height: 10px"></div>
        <van-button
          round
          type="info"
          block
          style="margin: 0 auto; width: 90%"
          color="#eee"
          @click="show2 = false"
          >取消</van-button
        >
      </div>
    </van-popup>
    <!-- 昵称 -->
    <van-popup v-model="show3" class="block">
      <div>
        <div class="block_text">请输入宝宝昵称</div>
        <div class="block_input">
          <input
            class="block_input2"
            ref="input3"
            v-model="bname"
            @keydown.13="show3 = false"
          />
        </div>
        <van-button
          round
          type="info"
          block
          style="margin: 0 auto; width: 90%"
          color="#45e7c9"
          @click="button(3)"
          >{{user ?'保存':'添加'}}</van-button
        >
        <div style="height: 10px"></div>
        <van-button
          round
          type="info"
          block
          style="margin: 0 auto; width: 90%"
          color="#eee"
          @click="show3 = false"
          >取消</van-button
        >
      </div>
    </van-popup>

    <!-- 选择器 -->
    <!-- 性别  sex-->
    <van-popup v-model="sex" position="bottom">
      <van-picker
        show-toolbar
        :columns="['小公主', '小王子', '不告诉你']"
        @cancel="sex = false"
        @confirm="sex_yes"
      />
    </van-popup>
    <!-- 出生  birthday-->
    <van-popup v-model="birthday" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="birthday = false"
        @confirm="birthday_yes"
      />
    </van-popup>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      currentDate: new Date(),
      weight_value: "未填写",     // 体重
      height_value: "未填写",     // 身高
      bname_value: "宝宝",        // 名称
      sex_value: "小王子",      // 性别
      balone: "1",                 // 独身子女
      birthday_value: "",
      birthday_sm:"",     //出生毫秒
      // 输入框存的字符串
      weight: "",
      height: "",
      bname: "",
      // 遮罩层控制
      show: false,
      show2: false,
      show3: false,
      // 选择器控制
      sex: false,
      // 键盘控制
      keyboard_height: false,
      keyboard_weight: false,
      // 生日
      birthday: false,

      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      // 宝宝表
      babytree_baby :'',
      // 宝宝编辑传过来的值
      user:1,
    };
  },
  watch: {
    weight() {
      //限制输出
      let str = this.weight;
      let reg = /^(([0-8])|([0-9]\.\d{0,2}))$/;
      if (!reg.test(str)) {
        // 不添加
        let str2 = str.substr(0, str.length - 1);
        this.weight = str2;
      }
    },
    height() {
      //限制输出
      let str = this.height;
      let reg = /^(([0-8])|([0-9]\.\d{0,2}))$/;
      if (!reg.test(str)) {
        // 不添加
        let str2 = str.substr(0, str.length - 1);
        this.height = str2;
      }
    },
    username(){
      let str = this.bname_value
      let reg = /^[\u4E00-\u9FA0]{2,4}}$/
      if (reg.test(str)) {
        // 不添加
        let str2 = str.substr(0, str.length - 1);
        this.bname_value = str2;
      }
    }
  },
  mounted() {
    
    let bid=Number(this.$route.params.k);
    // 当前的选择的宝宝
    this.user = bid
    if(bid){
        // 宝宝表
      let babytree_baby = JSON.parse(localStorage.getItem("babyInfo"));
      
      for(var k of babytree_baby){
        // console.log(k)
        if(k.bid == this.user){
          babytree_baby = k
          this.babytree_baby = k
        }
      }

      this.bname_value = babytree_baby.bname; //宝宝昵称
      // 宝宝性别
      babytree_baby.bsex == null
        ? (this.sex_value = "不告诉你")
        : babytree_baby.bsex == 1
        ? (this.sex_value = "小王子")
        : (this.sex_value = "小公主");
      // 宝宝体重
      this.weight_value = babytree_baby.bweight ;
      // 宝宝身高
      this.height_value = babytree_baby.bheight ;
      // 宝宝出生
      this.birthday_value = moment(Number(babytree_baby.bbir)).format("YYYY-MM-DD");
      // 独身子女
      this.balone = String(babytree_baby.balone);
      // console.log(babytree_baby.balone);
    }else{
      this.birthday_value = moment(Number(new Date().getTime())).format("YYYY-MM-DD");
      this.birthday_sm = new Date().getTime()
    }
    
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    },
    // 弹出层自动聚焦
    weight_click() {
      this.show = true;
      // 弹出键盘
      this.keyboard_weight = true;
      this.weight = "";
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    // 弹出层自动聚焦
    height_click() {
      this.show2 = true;
      // 弹出键盘
      this.keyboard_height = true;
      this.height = "";
      this.$nextTick(() => {
        this.$refs.input2.focus();
      });
    },
    // 弹出层自动聚焦
    bname_click() {
      this.show3 = true;
      this.bname = "";
      this.$nextTick(() => {
        this.$refs.input3.focus();
      });
    },
    // 弹出层确认按钮
    button(i) {
      this.show = false;
      this.show2 = false;
      this.show3 = false;
      if (i == 1 && this.weight) {
        this.weight_value = this.weight ;
      } else if (i == 2 && this.height) {
        this.height_value = this.height ;
      } else if (i == 3 && this.bname) {
        this.bname_value = this.bname;
      }
    },
    // 跳转到之前的页面
    wode() {
      this.$router.go(-1);
    },
    // 确认
    sex_yes(val) {
      // 把选择的值到页面
      this.sex_value = val;
      this.sex = false;
    },
    birthday_yes(val) {
      this.birthday = false;
      this.birthday_value = this.moment(Number(val)).format("YYYY-MM-DD");
      this.birthday_sm = Number(val)
    },
    save() {
      // 传过来的值
      if(this.user){
        // 发送请求修改宝宝表
        // 用户表
        let bbir = new Date(this.birthday_value).getTime();
        if(this.sex_value == "不告诉你"){
          var bsex = null
        }else if(this.sex_value=="小王子"){
          var bsex = 1
        }else{
          var bsex = 0
        }
        // console.log(bsex)
        // 保存宝宝表
        this.axios.get("/update", {
            params: {
              bid: this.user,     // 宝宝id
              bbir: bbir,   // 宝宝出生
              bname: this.bname_value,
              bsex : bsex,
              bheight:this.height_value,
              bweight:this.weight_value,
              balone:this.balone
            },
          }).then((result) => {
            // console.log(result.data.message);//OK//error
            if(result.data.message =="error"){
              this.$toast("请勿重复操作")
            }else{
              
              // 在localStorage 保存
              var params = {
                bid: this.user,     // 宝宝id
                bbir: bbir,   // 宝宝出生
                bname: this.bname_value,
                bsex : bsex,
                bheight:this.height_value,
                bweight:this.weight_value,
                balone:this.balone
              }//更新 babyInfo
              let arr = []
              let userInfo = JSON.parse(localStorage.getItem("babyInfo"))
              for(var i of userInfo){
                if(i.bid == this.user){
                  arr.push(params)
                }else{
                  arr.push(i)
                  // console.log(i)
                }
              }
              // console.log(arr)
              localStorage.setItem("babyInfo", JSON.stringify(arr));
              // 更新 babySelect
              localStorage.setItem("babySelect", JSON.stringify(params));

              this.$router.push("/mybaby");
            }
          });
      }else{
        //获取用户id绑定宝宝
        let parentId = JSON.parse(localStorage.getItem("userInfo")).lid;
        // console.log(parentId)
        if(this.sex_value == "不告诉你"){
          var bsex = null
        }else if(this.sex_value=="小王子"){
          var bsex = 1
        }else{
          var bsex = 0
        }
        this.axios.get("/bcbaby",{
          params: { 
            parentId: parentId ,
            bname:this.bname_value,
            bsex:bsex,
            bir:this.birthday_sm,
            bweight : this.weight_value,
            bheight : this.height_value,
            balone :this.balone
          }
        }).then((result) => {
          // console.log(result)
          this.axios.get("/select",{ 
            params: { parentId: parentId 
          }}).then((result2) => {
            let bbir = new Date().getTime()
            var params ={
              bid: result2.data[result2.data.length-1].bid,   // 宝宝id
              bbir: bbir,   // 宝宝出生
              bname: this.bname_value,
              bsex : bsex,
              bheight:this.height_value,
              bweight:this.weight_value,
              balone:1
            }
            let babyInfo = JSON.parse(localStorage.getItem("babyInfo"));
            babyInfo.push(params)
            // console.log(babyInfo)
            localStorage.setItem("babyInfo", JSON.stringify(babyInfo));
            if(localStorage.getItem('babySelect')=='undefined'){
              localStorage.setItem('babySelect',JSON.stringify(params))
            }
            this.$router.push("/mybaby");
          })
          
          });
      }
      
      
    },
  },
};
</script>

<style>
/* 遮罩层 */
.BabyStockpile .block {
  border-radius: 10px;
  background-color: #fff;
}
.BabyStockpile .block_text {
  text-align: center;
  margin-top: 10%;
  margin-bottom: 10%;
}
.BabyStockpile .block_input {
  margin: 0 auto;
  width: 35%;
}
.BabyStockpile .block_input2 {
  width: 55%;
  height: 40px;
  border: none;
  border-bottom: 1px solid #eee;
}
/*  */
.BabyStockpile .BabyStockpile2 {
  width: 100%;
  background-color: rgb(238, 232, 232);
}
.BabyStockpile .uploading {
  position: absolute;
  top: 105px;
  left: 151px;
}
.BabyStockpile .uploading_img {
  height: 200px;
  background-color: #fff;
}
.BabyStockpile .uploading_img2 {
  width: 50%;
  margin: 0 auto;
  height: 100px;
}
.BabyStockpile .uploading_tp {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
  right: -25%;
  top: 50%;
}
.BabyStockpile .uploading_tx,
.BabyStockpile .uploading_tx2  {
  width: 100px;
  height: 100px;
  border: 0px solid rgb(202, 36, 36);
  border-radius: 50%;
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  right: -25%;
  top: -65%;
}
.uploading_tx{background-image: url(../../public/imgs/My_img/cii.png)}
.uploading_tx2{background-image: url(../../public/imgs/My_img/cig.png)}
.BabyStockpile .van-icon input {
  display: none !important;
}
.BabyStockpile .alone {
  width: 100%;
  background-color: #fff;
}
.BabyStockpile .alone2 {
  padding: 10px 16px;
}
.BabyStockpile .alone_text {
  /* float: left; */
  font-size: 14px;
}
.BabyStockpile .alone_img:nth-child(1) {
  float: left;
}
</style>