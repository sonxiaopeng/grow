<template>
  <div class="search-result">
    <h1>这是搜索结果的页面</h1>
    <router-link to="/">
       <p class="title"></p>
       <span class="describe"></span>
       <ul>
         <li><van-icon name="eye-o" /></li>
         <li><van-icon name="good-job-o" /></li>
       </ul>
    </router-link>
  </div>
</template>
<script>
import { getCount, getArticle, getSearch } from "../assets/js/apis/index";
export default {
  props:["qw"],
  data(){
    return{
      
    }
  },
  onSearch(){
    
  }
}
</script>
<style lang="less">
.search-result{
  width:100%;
  a{
    display: block;
    p{font-size:16px;}
    span{font-size:13px;}
    ul{
      display: flex;
      justify-content: space-between;
      flex-flow: row nowrap;
      align-items:center;
    }
  }
}
</style>