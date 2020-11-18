<template functional>
  <div class="nkFooter">
    <div>开发时间2020-10-23 in nkosies@</div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
@import url("../assets/color/color.less");
.nkFooter {
  width: 100%;
  height: 90px;
  background: #333;
  display: flex;
  color: #fff;
  font-size:@miniFont;
  div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
@media screen and (max-width: 780ox) {
  .nkFooter {
    width: 100%;
    height:50px;
    background: #333;
    display: flex;
    div {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
    }
  }
}
</style>