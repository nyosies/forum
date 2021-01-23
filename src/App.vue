<template>
  <div id="app">
    <!-- 缓存的组件视图 -->
    <keep-alive>
      <router-view v-if="!$route.meta.iscache" />
    </keep-alive>
    <router-view v-if="$route.meta.iscache"></router-view>
    <nkFooter></nkFooter>
  </div>
</template>
<script>
import NavBar from "./components/navHead";
import nkFooter from "./components/nkFooter";
export default {
  components: { nkFooter, NavBar }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.el-drawer {
  width: 50% !important;
}
.el-form-item__content{
  margin-left: 0 !important;
}
</style>
