<template>
  <div class="zan">
    <van-icon
      class="icon"
      :class="{ color: color == true }"
      name="good-job-o"
      @click="addZan"
    /> <span>{{good_num ? good_num : 0}}</span>
  </div>
</template>
<script>
export default {
  props:["good_num"],
  data() {
    return {
      color: false,
      // good_num:6
    };
  },
  methods: {
    addZan() {
      if (this.color == false) {
        this.color = true;
        this.$emit("add_zan")
      } else {
        this.color = false; 
         this.$emit("del_zan")
      }
    },
  },
};
</script>
<style lang="less">
.zan {
  display: inline-block;
  .color {
    color: red;
  }
  .icon{
    vertical-align: 2px;
  }
}
</style>