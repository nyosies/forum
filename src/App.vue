<template>
  <div id="app">
    <router-view />
    <nkFooter></nkFooter>
  </div>
</template>
<script>
import NavBar from "./components/navHead";
import nkFooter from "./components/nkFooter";
export default {
    components:{nkFooter,NavBar},


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
</style>
