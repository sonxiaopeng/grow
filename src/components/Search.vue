<template>
  <div class="search">
    <el-drawer
      title=""
      :visible.sync="drawer"
      :before-close="handleClose"
      style="width: 100%"
    >
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch($event)"
        @cancel="onCancel"
        @clear="onClear"
      />

      <el-autocomplete
        id="autorecommend"
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        @select="onSearch($event)"
        select-when-unmatched
        highlight-first-item
      ></el-autocomplete>

      <div class="no-result" v-if="show == 1">
        <div class="show-qs">
          <ul class="qs-list" @click="searchRecommend">
            <li
              class="qs-item"
              v-for="(item, i) of qs"
              v-text="item"
              :key="i"
            ></li>
          </ul>
        </div>
        <div class="cut"></div>
        <p
          style="
            font-size: 14px;
            font-weight: bold;
            color: #000;
            margin: 10px 0px 20px 12px;
          "
        >
          搜索指定的内容
        </p>
        <van-row
          type="flex"
          justify="center"
          align="center"
          @click="searchSpecial"
          style="
            font-size: 14px;
            color: #aaa;
            text-align: center;
            padding-bottom: 10px;
          "
        >
          <van-col
            :span="8"
            v-for="(item, i) of special"
            :key="i"
            v-text="item"
          ></van-col>
        </van-row>
        <div class="cut"></div>
        <p
          style="
            font-size: 14px;
            font-weight: bold;
            color: #000;
            margin: 10px 0px 20px 12px;
          "
        >
          搜索历史
        </p>
        <div class="show-qs">
          <ul class="qs-list">
            <li
              class="qs-item"
              v-for="(item, i) of history"
              v-text="item"
              :key="i"
            ></li>
            <li class="qs-item" @click="clearHistory">
              <van-icon size="16" name="cross" style="vertical-align: middle" />
              清除历史
            </li>
          </ul>
        </div>
        <div class="cut"></div>
        <!-- <p
          style="
            font-size: 14px;
            font-weight: bold;
            color: #000;
            margin: 10px 0px 20px 12px;
          "
        >
          宝宝树热搜榜
        </p>
        <div class="hotsearch" @click="searchHot">
          <span v-for="(item, i) of hotsearch" class="hotitem" :key="i">
            <van-badge content="Hot">
              <span class="hotitem-span">{{ item }}</span>
            </van-badge>
          </span>
        </div> -->
      </div>

      <!-- 结果集显示区 -->
      <div class="result" v-else>
        <router-link
          v-for="(item, i) of results"
          :key="i"
          :to="`/circle/${item.know_id}`"
        >
          <p class="title" v-html="item.know_title"></p>
          <span class="describe" v-html="item.know_text"></span>
          <ul>
            <li>
              <van-icon
                style="vertical-align: text-bottom; padding-top: 3px"
                size="20"
                name="eye-o"
              />
              {{ item.watch_num }}
            </li>
            <li>
              <van-icon
                style="vertical-align: text-bottom"
                size="20"
                name="good-job-o"
              />
              {{ item.good_num }}
            </li>
          </ul>
        </router-link>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { Toast } from "vant";
import {
  getCount,
  getArticle,
  getSearch,
  getAll,
} from "../assets/js/apis/index";
export default {
  props: ["index_drawer", "searchIndex"],
  data() {
    return {
      drawer: false,
      value: "",
      qs: ["促进宝宝大脑发育", "眨眼反射", "宝宝为什么总是喜欢哭闹"],
      special: ["瑜伽", "宝宝", "孕期"],
      results: [],
      show: 1,
      history: [],
      hotsearch: [
        "营养密度更高的虾干蒸豆腐",
        "适合夏天喝的汤，清暑又降火",
        "促进宝宝大脑发育的关键营养素，都藏在在这道菜里啦",
        "哺乳瘦身两不误，通草丝瓜虾仁汤",
        "胎宝宝生长离不开的基础物质：蛋白质，孕妈怎么吃？",
        "软糯易消化的菠菜豆沙青团，带来孕期“青”营养",
        "产后瘦身第5式：纤纤细腿蹬出来",
        "温热鲜香的牛蒡蘑菇羊肉汤，给孕妈带来充足血气！",
      ],
      restaurants: [],
      state: "",
      timeout: null,
    };
  },
  methods: {
    handleClose() {
      this.drawer = false;
    },
    onSearch(e) {
      Toast.loading({
        duration: 3000, // 持续展示 toast
        forbidClick: true,
        message: "拼命加载中",
      });
      getSearch(this.state).then((result) => {
        if (result != 0) {
          this.history.unshift(this.state);
          localStorage.setItem("history", JSON.stringify(this.history));
          this.results = result;
          this.show = 0;
          this.results.forEach((element) => {
            element.know_text = `${element.know_text.substr(0, 54)}...`;
            var reg = new RegExp(this.state, "ig");
            element.know_text = element.know_text.replace(
              reg,
              `<span style='color:red;font-size:14px'>${this.state}</span>`
            );
            element.know_title = element.know_title.replace(
              reg,
              `<span style='color:red;font-size:16px'>${this.state}</span>`
            );
          });
          this.state = "";
          Toast.clear();

        }else{
          Toast("暂无数据")
        }
      });
    },
    onClear() {
      this.show = 1;
    },
    onCancel() {
      this.show = 1;
      this.drawer = false;
    },
    clearHistory() {
      localStorage.clear("history");
      localStorage.setItem("history", "");
      this.history = [];
    },
    searchRecommend(e) {

      getSearch(e.target.textContent).then((result) => {
        if (result != 0) {
          this.results = result;
          this.show = 0;
          this.results.forEach((element) => {
            element.know_text = `${element.know_text.substr(0, 54)}...`;
            var reg = new RegExp(e.target.textContent, "ig");
            element.know_text = element.know_text.replace(
              reg,
              `<span style='color:red;font-size:14px'>${e.target.textContent}</span>`
            );
            element.know_title = element.know_title.replace(
              reg,
              `<span style='color:red;font-size:16px'>${e.target.textContent}</span>`
            );

          });
        } else {
          Toast("暂无数据");
        }
      });
    },
    searchSpecial(e) {
      this.searchRecommend(e);
    },
    searchHot(e) {
      this.searchRecommend(e);
    },
    // 搜索建议
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 30 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {

    },
  },
  mounted() {
    // this.history = JSON.parse(localStorage.getItem("history"));
    var arr = [];
    getAll().then((result) => {
      result.forEach((element) => {
        arr.push({ value: element.know_title });
      });
      this.restaurants = arr;
    });
  },
  watch: {
    index_drawer() {
      if (this.index_drawer == true) {
        this.drawer = this.index_drawer;
      }
    },
    state() {
      this.value = this.state;
    },
    searchIndex() {
      if (this.searchIndex != "") {
        getSearch(this.searchIndex).then((result) => {
          if (!result == 0) {
            this.results = result;
            this.show = 0;
            this.results.forEach((element) => {
              element.know_text = `${element.know_text.substr(0, 54)}...`;
              var reg = new RegExp(this.searchIndex, "ig");
              element.know_text = element.know_text.replace(
                reg,
                `<span style='color:red;font-size:14px'>${this.searchIndex}</span>`
              );
              element.know_title = element.know_title.replace(
                reg,
                `<span style='color:red;font-size:16px'>${this.searchIndex}</span>`
              );

            });
          } else {
            Toast("暂无数据");
          }
        });
      }
    },
  },
};
</script>
<style lang="less">
.search {
  width: 100%;
  #autorecommend {
    position: absolute;
    left: 42px;
    top: -56px;
    width: 230px;
    border: 0;
    background-color: #f7f8fa;
    height: 33px;
    padding-left: 0px;
  }
  .no-result {
    .hotsearch {
      display: flex;
      flex-flow: row wrap;
      justify-content: left;
      align-items: center;
      padding: 0px 25px 20px 25px;
      .hotitem {
        flex: 0 0 50%;
        color: #333;
        font-size: 14px;
        margin: 8px 0px;
        .van-badge--fixed {
          right: -15px;
        }
      }
    }
  }
  .result {
    width: 100%;
    a {
      display: block;
      margin: 10px auto;
      width: 91%;
      border-bottom: 1px solid #aaa;
      padding-bottom: 8px;
      p {
        font-size: 16px;
        padding: 0px;
        margin: 20px 0px;
        color: #333;
      }
      span {
        font-size: 14px;
        color: #333;
        margin-bottom: 15px;
        display: inline-block;
        line-height: 21px;
      }
      ul {
        display: flex;
        justify-content: space-between;
        flex-flow: row nowrap;
        align-items: center;
        li {
          color: #aaa;
          vertical-align: baseline;
          font-size: 12px;
        }
      }
    }
  }
  .el-drawer {
    width: 100% !important;
    #el-drawer__title {
      display: none;
    }
  }
  .show-qs {
    .qs-list {
      padding: 0px;
      display: flex;
      flex-flow: row wrap;
      justify-content: left;
      align-items: center;
      width: 100%;
      .qs-item {
        border-radius: 20px;
        padding: 3px 8px;
        background-color: #f7f8fa;
        font-size: 12px;
        border: 0;
        color: #aaa;
      }
    }
  }
  .cut {
    width: 100%;
    height: 8px;
    background-color: #f7f8fa;
    margin-top: 7px;
  }
  .el-drawer.ltr,
  .el-drawer.rtl,
  .el-drawer__container {
    overflow: scroll;
  }
  .type {
    display: inline-block;
    width: 14px;
    height: 14px;
    background-color: crimson;
    color: #fff;
    font-size: 12px;
    text-align: center;
    line-height: 14px;
    border-radius: 4px;
  }
  .v-modal {
    display: none !important;
  }
  .el-popup-parent--hidden {
    overflow: initial !important;
  }
}
</style>