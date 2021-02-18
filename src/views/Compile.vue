<template>
  <div class="complie">
    <div class="complie2">
      <van-nav-bar
        title="个人资料编辑"
        
        class="xt"
        @click-left="quit"
        @click-right="save"
        right-text="保存"
        fixed
      >      <template #left>
        <img class="m_icon" src="imgs/Recordimgs/dm1.png" alt=""/>
      </template></van-nav-bar>
      <!-- 视频 -->
      <div class="video">
      </div>
      <div class="xt">
        <van-uploader :after-read="user_click">
          <van-cell
            title="头像"
            value=""
            is-link
            style="width: 100vw"
          />
          <div class="timg" >
            <img :src="tx" width="140%" 
              style="
                border-radius: 999px;
                width: 10vw;
                height: 10vw;"/>
          </div>
        </van-uploader>

        <van-cell title="昵称" :value="user_nick" is-link @click="nick_dy" />
        <van-cell
          title="性别"
          :value="usex == 1 ? '男' : usex == 0 ? '女' : '未设置'"
          is-link
          @click="tao(2)"
        />
        <van-cell title="身高" :value="ustature" is-link @click="tao(3)" />
        <van-cell title="生日" :value="ubir" is-link @click="tao(4)" />
        <van-cell title="简介" :value="uintr" is-link @click="tao(5)" />
      </div>

      <div class="xt">
        <van-cell title="所在地" :value="user_towm" is-link @click="tao(6)" />
        <van-cell title="收获地址" :value="user_towm" is-link @click="tao(7)" />
        <van-cell title="建档医院" :value="hospital" is-link @click="tao(8)" />
        <van-cell title="老婆的经期" value="" is-link @click="tao(9)" />
      </div>

      <div>
        <van-cell title="UID" :value="uid" is-link @click="tao(10)" />
        <van-cell
          title="更换绑定的手机"
          :value="utel"
          is-link
          @click="tao(11)"
        />
        <van-cell title="修改密码" value="" is-link @click="tao(12)" />
        <van-cell title="注册时间" :value="udatey" is-link @click="tao(13)" />
      </div>
    </div>
    <!-- 弹出层 -->
    <div>
      <!-- 性别  sex-->
      <van-popup v-model="sex" position="bottom">
        <van-picker
          show-toolbar
          :columns="sex_arr"
          @cancel="sex = false"
          @confirm="sex_yes"
        />
      </van-popup>
      <!-- 身高 -->
      <van-popup v-model="stature" position="bottom">
        <van-picker
          show-toolbar
          :columns="stature_arr"
          @cancel="stature = false"
          @confirm="stature_yes"
        />
      </van-popup>
      <!-- 生日 -->
      <van-popup v-model="birthday" position="bottom">
        <van-datetime-picker
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="birthday = false"
          @confirm="birthday_yes"
        />
      </van-popup>
      <!-- 简介 -->
      <van-popup v-model="intr" position="right" :style="{ height: '100%' }">
        <div style="width: 100vw" class="intr">
          <van-nav-bar
            title="个人简介"
            class="xt bar"
            @click-left="intr = false"
            @click-right="intr_yes"
            right-text="确认"
          ><template #left>
        <img class="m_icon" src="imgs/Recordimgs/dm1.png" alt=""/>
      </template></van-nav-bar></van-nav-bar>
          <div class="intr_content">
            <div style="height: 35vw">
              <input
                type="text"
                class="intr_input"
                v-model="intr_input"
                maxlength="20"
              />
            </div>
            <div style="float: right; margin-right: 3vw">
              {{ intr_input.length }}/20
            </div>
          </div>
        </div>
      </van-popup>
      <!-- 地区 -->
      <van-popup v-model="towm" position="bottom">
        <van-area
          value="110105"
          title="标题"
          :area-list="areaList"
          @cancel="towm = false"
          @confirm="towm_yes"
        />
      </van-popup>
      <!-- 昵称 -->
      <van-popup v-model="nick" class="block">
        <div>
          <div class="block_text">请输入昵称</div>
          <div class="block_input">
            <input
              class="block_input2"
              ref="input3"
              v-model="nick_value"
              @keydown.13="nick = false"
            />
          </div>
          <van-button
            round
            type="info"
            block
            style="margin: 0 auto; width: 90%"
            color="#45e7c9"
            @click="nick_yes"
            >保存</van-button
          >
          <div style="height: 10px"></div>
          <van-button
            round
            type="info"
            block
            style="margin: 0 auto; width: 90%"
            color="#eee"
            @click="nick = false"
            >取消</van-button
          >
        </div>
      </van-popup>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      lid: "", //用户id
      user_avatar: "", //头像
      user_nick: "", //昵称
      usex: "", // 性别
      ustature: "", // 身高
      ubir: "", // 生日
      uintr: "", // 简介
      user_towm: "", // 所在地
      user_towm: "", // 收获地址
      hospital: "", // 建档医院
      // 老婆的经期
      uid: "", // UID
      utel: "", // 更换绑定的手机
      // 修改密码
      udatey: "", // 注册时间

      // 弹出层 控制
      sex: false,
      stature: false,
      birthday: false,
      intr: false,
      towm: false,
      nick: false,
      // 数组
      sex_arr: ["女", "男"],
      stature_arr: [],

      // 时间 最小
      minDate: new Date(2000, 0, 1),
      // 最大 今天
      maxDate: new Date(),
      // input 的值
      intr_input: "",
      // 地址
      areaList: "",
      // 弹出层输入框
      nick_value: "",
      // 头像地址
      tx: "",
    };
  },
  mounted() {
    // 用户表
    let babytree_login = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(localStorage.getItem("userInfo")==null)

    if (true) {
      // console.log(babytree_login);
      // 页面渲染

      if (babytree_login.user_avatar) {
        this.user_avatar = babytree_login.user_avatar;
      } else {
        this.user_avatar = "1.jpg";
      }
      //头像
      if (babytree_login.user_avatar) {
        this.tx = "http://localhost:3000/" + babytree_login.user_avatar;
      } else {
        // 如果没有头像就是默认头像
        this.tx = require("../../public/imgs/My_img/lg_pregnancy_big_2020.png");
      }

      //性别
      this.user_nick = babytree_login.user_nick;
      if (babytree_login.usex) {
        this.usex = babytree_login.usex;
      } else {
        this.usex = 1;
      }
      // 身高
      if (babytree_login.ustature) {
        this.ustature = babytree_login.ustature;
      } else {
        this.ustature = "未设置";
      }
      this.ubir = this.moment(Number(babytree_login.ubir)).format("YYYY-MM-DD");

      //简介
      if (babytree_login.uintr) {
        this.uintr = babytree_login.uintr;
      } else {
        this.uintr = "暂无内容";
      }

      // 地区
      if (babytree_login.user_towm) {
        this.user_towm = babytree_login.user_towm;
      } else {
        this.user_towm = "未设置";
      }

      this.hospital = babytree_login.hospital;
      this.lid = babytree_login.lid;
      this.uid = babytree_login.uid;
      this.utel =
        babytree_login.utel.substring(0, 3) +
        "****" +
        babytree_login.utel.substring(7);
      this.udatey = this.moment(Number(babytree_login.udatey)).format(
        "YYYY-MM-DD"
      );
      // console.log(this.user_avatar)
      // 数组
      for (var i = 80; i <= 280; i++) {
        this.stature_arr.push(i + "cm");
      }
      this.areaList = site;
      // console.log(this.areaList);
    }
  },

  methods: {
    tao(i) {
      //单元格点击
      // console.log(i);
      if (i == 1) {
      } else if (i == 2) {
        this.sex = true;
      } else if (i == 3) {
        this.stature = true;
      } else if (i == 4) {
        this.birthday = true;
      } else if (i == 5) {
        this.intr = true;
      } else if (i == 6) {
        this.towm = true;
      }
    },
    nick_dy() {
      this.nick = true;
      this.nick_value = "";
      this.$nextTick(() => {
        this.$refs.input3.focus();
      });
    },
    sex_yes(val, index) {
      // 把选择的值到页面
      // console.log(val);
      this.usex = index;
      this.sex = false;
    },
    stature_yes(val, index) {
      this.ustature = val;
      this.stature = false;
    },
    birthday_yes(val) {
      // console.log(val);
      this.birthday = false;
      this.ubir = this.moment(Number(val)).format("YYYY-MM-DD");
    },
    intr_yes() {
      this.intr = false;
      if (!this.intr_input == "") {
        this.uintr = this.intr_input;
      }
    },
    towm_yes(v) {
      this.towm = false;
      if (v[0].name == v[1].name) {
        this.user_towm = v[1].name + " " + v[2].name;
      } else {
        this.user_towm = v[0].name + " " + v[1].name + " " + v[2].name;
      }
    },
    nick_yes() {
      this.nick = false;
      if (this.nick_value) {
        this.user_nick = this.nick_value;
      }
    },

    quit() {
      //退出
      this.$router.go(-1);
    },
    user_click(file) {
      // 此时可以自行将文件上传至服务器

      // 接收用户传过来的文件数据
      let filelist = file.file;
      let formData = new FormData();

      formData.append("uploadFile", filelist);

      this.axios.post("/tp", formData).then((res) => {
        // console.log('1')

        let a = res.data;
        this.user_avatar = a[0].filename;
        // console.log(this.user_avatar)
        this.save();
      });
    },
    save() {
      //保存
      // 发送请求修改用户数据
      let ubir = new Date(this.ubir).getTime();
      let a = JSON.parse(localStorage.getItem("userInfo"));
      // console.log(a)
      let paramss = {
        params: {
          user_avatar: this.user_avatar,
          user_nick: this.user_nick,
          usex: this.usex,
          ustature: this.ustature,
          ubir: ubir,
          uintr: this.uintr,
          user_towm: this.user_towm,
          lid: this.lid,
        },
      };
      // console.log(paramss)
      this.axios.get("/update2", paramss).then((result) => {
        // console.log(result)
        if (result.data.message == "error") {
          this.$toast("请勿重复操作");
        } else {
          this.$toast("修改成功");
          // 在localStorage 保存
          var params = {
            // 不变的值
            utel: a.utel,
            lid: a.lid,
            udatey: a.udatey,
            uid: a.uid,
            upwd: a.upwd,
            username: a.username,
            // 改变的值
            user_avatar: this.user_avatar,
            user_nick: this.user_nick,
            usex: this.usex,
            ustature: this.ustature,
            ubir: ubir,
            uintr: this.uintr,
            user_towm: this.user_towm,
            uid: this.uid,
          };
          // console.log(this.user_avatar)
          localStorage.setItem("userInfo", JSON.stringify(params));
        }
      });
    },
  },
};
</script>

<style>
.m_icon {
  widows: 25px;
  height: 25px;
}
.complie .xt {
  margin-bottom: 10px;
}
.complie .block {
  border-radius: 10px;
  background-color: #fff;
}
.complie .block_text {
  text-align: center;
  margin-top: 10%;
  margin-bottom: 10%;
}
.complie .block_input {
  margin: 0 auto;
  width: 35%;
}
.complie .block_input2 {
  width: 55%;
  height: 40px;
  border: none;
  border-bottom: 1px solid #eee;
}
.complie .complie2 {
  height: 1000px;
  background-color: rgb(238, 232, 232);
}
.complie .video {
  width: 100%;
  height: 200px;
  background-image: url(../../public/imgs/My_img/ck.png);
  background-size: 100% 100%;
}
.complie .intr_content {
  background-color: #fff;
  height: 25vh;
}
.complie .intr {
  background-color: rgb(216, 211, 211);
  height: 100vh;
}
.complie .intr_content .intr_input {
  width: 90vw;
  padding-top: 2vh;
  margin: 1vw 5vw;
  float: left;
  border: 0px;
}
.complie .timg {
  width: 10vw;
  height: 10vw;
  position: absolute;
  top: 2px;
  left: 81vw;
  background-image: url(../../public/imgs/My_img/a6a.png);
  background-size: 100%;
}
.van-nav-bar__text {
  color: #000 !important;
}
</style>