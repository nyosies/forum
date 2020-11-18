<template>
  <div class="notFound">
    <NavBar headbgColor='Crimson' logoColor='#2f3542'/>
    <h1>404 not Found</h1>
  </div>
</template>
<script>
import NavBar from "../components/navHead";
export default {
  components: { NavBar }
};
</script>
<style lang="less" scoped>
@import url('../assets/color/style.less');
.notFound {
  width: 100%;
  min-height: calc(100vh - 90px);
  display: flex;
  justify-content: center;
  h1 {
    padding-top: 120px;
  }
}
</style>
