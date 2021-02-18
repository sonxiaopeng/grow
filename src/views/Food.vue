<template>
  <div class="food-container">
    <!-- 头部 -->
    <!-- 头部 -->
    <van-nav-bar title="能不能吃" fixed @click-left="onClickLeft">
      <template #left>
        <img class="f_icon" src="imgs/Recordimgs/dm1.png" alt />
      </template>
    </van-nav-bar>
    <my-search @dispier="dispier" @showall="showall"></my-search>
    <!-- 菜单 -->
    <div class="content-container" v-show="show">
      <div class="food-box">
        <div class="food_menu">
          <ul class="foods" @click="search">
            <li v-for="(elem, i) of food_icon_img" :data-id="elem.name">
              <a href="#">
                <img :src="elem.img" />
              </a>
              <p>{{ elem.name }}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 分区标签 -->
      <div class="food_fenqu"></div>
      <!-- 食物黑白榜 -->
      <div class="food_heibai">
        <span>食物黑白榜</span>
        <span style="color:#aaa">孕妇</span>
        <span style="color:#aaa">月子期</span>
        <span style="color:#aaa">哺乳期</span>
        <span style="color:#aaa">婴幼儿</span>
      </div>
      <!-- 按钮 -->
      <div class="food_button">
        <button>可吃</button>
        <button>少吃</button>
        <button>慎吃</button>
        <button>不能吃</button>
      </div>
      <!-- 分区标签 -->
      <div class="food_fenqu"></div>
      <!-- 大家都关注 -->
      <div class="guanzhu">
        <span>大家都在关注</span>
        <button
          @click="changeContent"
          style="float:right;color:#aaa;font-size:14px;border:1px solid #aaa;outline:0;backgorund-color:transparent;padding:5px 5px;padding: 5px;
    margin-top: -4px;
    margin-right: 25px;
    border-radius: 6px;
    background-color: transparent;"
        >
          <van-icon color="red" style="vertical-align:middle" name="replay" />换一换
        </button>
      </div>
      <!-- 西瓜 -->

      <!-- for 循环处理片段 -->
      <div class="frults" v-for="(item, i) of List" :key="i">
        <p>{{ item.name }}</p>
        <div class="frults-box">
          <div>
            <div class="frult-box">
              <span class="state">
                <img :src="item.pragent" />
                孕妇
              </span>
              <span class="state">
                <img :src="item.yuezi" />
                坐月子
              </span>
              <span class="state">
                <img :src="item.boru" />
                哺乳
              </span>
              <span class="state">
                <img :src="item.baby" />
                婴幼儿
              </span>
            </div>
          </div>
          <img :src="item.pic" alt  v-lazy="item.pic" />
        </div>
        <!-- 分割线 -->
        <div class="fengexiang"></div>
      </div>
    </div>

    <!-- 西瓜结束 -->
    <!-- <div @click="showmore">加载更多</div> -->
  </div>
</template>
<script>
import { Toast } from "vant";
import { Lazyload } from 'vant'
export default {
  data() {
    return {
      name: "",
      elems: [],
      value: "",
      info: [
        { stat: "孕妇", pnger: "imgs/food_img/guanzhu_01.png" },
        { stat: "坐月子", pnger: "imgs/food_img/guanzhu_02.png" },
        { stat: "哺乳期", pnger: "imgs/food_img/guanzhu_03.png" },
        { stat: "婴幼儿", pnger: "imgs/food_img/guanzhu_04.png" }
      ],
      food_icon_img: [
        { name: "五谷杂粮", img: "imgs/food_img/corn.png" },
        { name: "蔬菜菌类", img: "imgs/food_img/carrot.png" },
        { name: "肉类蛋类", img: "imgs/food_img/meat.png" },
        { name: "水产海鲜", img: "imgs/food_img/seafood.png" },
        { name: "水果", img: "imgs/food_img/fruits.png" },
        { name: "坚果类", img: "imgs/food_img/nut.png" },
        { name: "零食小吃", img: "imgs/food_img/snacks.png" },
        { name: "饮品", img: "imgs/food_img/drink.png" },
        { name: "豆奶制品", img: "imgs/food_img/bean.png" },
        { name: "加工食品", img: "imgs/food_img/processed.png" },
        { name: "调味品", img: "imgs/food_img/flavour.png" },
        { name: "补品草药", img: "imgs/food_img/tonic.png" }
      ],
      List: [],
      frultList: [],
      show: true,
      page: 1
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    search(e) {
      // console.log(e.path[2].dataset.id)
      // console.log(2)
      this.$router.push(`/foodsearching/${e.path[2].dataset.id}`);
    },
    dispier() {
      this.show = false;
    },
    showall() {
      this.show = true;
    },
    changeContent() {
      if (this.page >= 11) {
        this.page = 1;
      }
      this.axios.get(`/food2/${this.page}`).then(result => {
        this.frultList = [];
        result.data.forEach(element => {
          var arr = [];
          var objItem = new Object();
          objItem.name = element.name;
          objItem.pragent = JSON.parse(element.iconpng)[1];
          objItem.yuezi = JSON.parse(element.iconpng)[2];
          objItem.boru = JSON.parse(element.iconpng)[3];
          objItem.baby = JSON.parse(element.iconpng)[4];
          objItem.pic = element.png;
          this.frultList.push(objItem);
        });
        this.page++;
        this.List = this.frultList;
      });
    }
  },
  //无需传参拿数据
  mounted() {
    // console.log(1);
    this.axios.get("/food").then(result => {
      result.data.forEach(element => {
        var arr = [];
        var objItem = new Object();
        objItem.name = element.name;
        objItem.pragent = JSON.parse(element.iconpng)[1];
        objItem.yuezi = JSON.parse(element.iconpng)[2];
        objItem.boru = JSON.parse(element.iconpng)[3];
        objItem.baby = JSON.parse(element.iconpng)[4];
        objItem.pic = element.png;
        this.List.push(objItem);
      });
      // console.log(this.List);
    });
  }
};
</script>
<style >
.food-container {
  margin-top: 46px;
}
/* .food-box {
  margin-top: 0px;
} */
.f_icon {
  width: 25px;
  height: 25px;
}
.m_icon  {
  width: 25px;
  height: 25px;
}
.food_menu {
  width: 343px;
  height: 297px;
}
.foods {
  display: flex;
  flex-flow: row wrap;
  text-align: center;
  margin-left: 0 auto;
  width: 100%;
  margin-left: 17px;
}
.foods li {
  flex: 0 0 25%;
  width: 85px;
  height: 81px;
  margin-bottom: 20px;
  margin-top: 10px;
}
.food_menu ul li a img {
  width: 55px;
  height: 55px;
}
.food_black_rongqi {
  width: 375px;
  height: 110px;
  margin-top: 30px;
}
.food_black {
  width: 90px;
  height: 26px;
  font-size: 18px;
  font-weight: 700;
  color: #000;
  line-height: 18px;
  margin-left: 10px;
}
.food_shiqi {
  width: 253px;
  height: 26.4px;
  float: right;
  margin-right: -50px;
}
.food_shiqi span {
  margin-right: 10px;
}
.food_shiqi span:hover {
  color: red;
  border-bottom: 3px solid red;
}
.foods_li {
  width: 375px;
  height: 50px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  margin-top: 20px;
}
.foods_li li {
  width: 79px;
  height: 50px;
  border: 2px solid #cccccc;
  flex: 0 0 20%;
  border-radius: 10px;
  margin-top: 20px;
  text-align: center;
  line-height: 50px;
  outline: 0;
  border: none;
}
.foods_li li:first-child {
  background-color: #9ee9cc;
  color: #2bce90;
  font-weight: bolder;
  font-size: 18px;
}
.foods_li li:nth-child(2) {
  background-color: #eee2fc;
  color: #af7ced;
  font-weight: bolder;
  font-size: 18px;
}
.foods_li li:nth-child(3) {
  background-color: #ffddb1;
  color: #ffa02a;
  font-weight: bolder;
  font-size: 18px;
}
.foods_li li:last-child {
  background-color: #fedddb;
  color: #fa878d;
  font-weight: bolder;
  font-size: 18px;
}
.frults {
  width: 100%;
}
.frults p {
  text-align: left;
  margin-left: 22px !important;
  margin-bottom: 13px;
}
.frult-box img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  margin-left: 20px;
}
.frults-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.frults-box > img {
  /* flex:0 0 30%; */
  width: 97px;
  height: 72px;
  margin-right: 30px;
}
.frult-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
}
.frult-box .state {
  flex: 0 0 50%;
  margin: 10px 0px;
}

.food_fenqu {
  margin-top: 25px;
  margin-bottom: 10px;
  border-bottom: 8px solid #e8e8e8;
}
.xigua > div:first-child {
  font-size: 20px;
  text-align: left;
  margin-bottom: 20px;
}
.xigua {
  border-bottom: 1px solid #cccccc;
}
.guanzhu {
  font-size: 18px;
  text-align: left;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 22px;
  color: #000;
  font-weight: bolder;
}
.frults p {
  margin-left: 10px;
}
.fengexiang {
  margin-top: 30px;
  margin-bottom: 10px;
  border-bottom: 1px solid #cccccc;
  opacity: 0.5;
  margin: 18px auto;
  width: 90%;
}
.food_heibai {
  margin-left: 20px;
  margin-top: 21px;
}
.food_heibai span:first-child {
  margin-right: 20px;
  font-size: 18px;
  font-weight: bolder;
  margin-top: 30px;
  color: #000;
}
.food_heibai span {
  margin-right: 10px;
}
.food_button {
  margin-top: 20px;
  margin-left: 20px;
}
.food_button button {
  border-radius: 10px;
  width: 79px;
  height: 50px;
  margin-right: 5px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  border: 0;
  outline: 0;
}
.food_button button:first-child{
  background-color: #d2f5e8;
  color: #4ad5a0;
  }
  .food_button button:nth-child(2){
  background-color: #F0E9F9;
  color: #B6A0DF;
  }
    .food_button button:nth-child(3){
  background-color: #FFEDCE;
  color: #F1BC77;
  }
    .food_button button:nth-child(4){
  background-color:#FFDADA;
  color: #FD7D91;
  }
</style>