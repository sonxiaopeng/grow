<template>
  <div id="app">
    <transition name="van-fade">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
    </transition>
    <transition name="van-fade">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <!-- <router-view></router-view> -->
  </div>
</template>

<style>
ul li p a {
  padding: 0;
  margin: 0px;
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
ul {
  list-style: none;
}
</style>


<script>
export default {
  name: "App",
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true, //控制视图是否显示的变量
    };
  },
  methods: {
    listenLocalUser() {
      localStorage.getItem("userInfo")
        ? (this.$store.state.userCanUse = true)
        : null;
    },
    listenLocalBaby() {
      localStorage.getItem("babytree_baby")
        ? (this.$store.state.babyCanUse = true)
        : null;
    },

    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true; //再打开
      });
    },
  },
};
</script>