<template>

<div class="milk">
    <!-- 顶部标题 -->
    <van-nav-bar title="喂奶记录">
      <template #left>
        <img class="m_icon" src="imgs/Recordimgs/dm1.png" alt="" @click="skiptorecord" />
      </template>
    </van-nav-bar>
    <!-- 分页栏 -->
    <van-tabs animated v-model="active">
      <!-- 亲喂页面 -->
      <van-tab title="亲喂">
        <milkself></milkself>
      </van-tab>
      <!-- 母乳瓶喂 -->
      <van-tab title="母乳瓶喂">
        <milk-mom></milk-mom>
      </van-tab>
      <!-- 奶粉瓶喂 -->
      <van-tab title="奶粉瓶喂">
        <milk-milk></milk-milk>
      </van-tab>
    </van-tabs>
  </div>

  
</template>

<script>
// 导入亲喂组件
import milkself from "../components/milk_self.vue";
// 导入母乳瓶喂组件
import milkMom from "../components/milk_mom.vue";
//导入奶瓶喂养组件
import milkMilk from "../components/milk_milk.vue";
export default {
  inject:['reload'],
  components: {
    milkself,
    milkMom,
    milkMilk,
  },
  data() {
    return {
      active:0,
      show: true,
    };
  },
  watch:{
    active(){
      // console.log(this.active)
    }
  },
  methods: {
    skiptorecord(){
      this.$router.push("/record")
    },
  },
  mounted() {
    if(location.href.indexOf('#reloaded')==-1){
      location.href=location.href+'#reloaded';
      location.reload();
    }
  },
  beforeUpdate(){

  },
  watch: {},
  updated(){
  }
};
</script>


<style scoped>
.milk {
  width: 100%;
  height: 667px;
  background: #fff;
}
.m_icon {
  widows: 25px;
  height: 25px;
}
</style>