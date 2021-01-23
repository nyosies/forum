<template>
  <div class="timeline">
    <NavBar :headbgColor="headbgColor" :logoColor="logoColor" :color="logoColor" :boxShadow="boxShadow"></NavBar>
    <timeline-item></timeline-item>
  </div>
</template>
<script>
import NavBar from "../components/navHead";
import timelineItem from "@/components/timelineItem/timelineItem";
export default {
  components: { NavBar, timelineItem },
  data() {
    return {
      headbgColor: "linear-gradient(to right,#84fab0,#8fd3f4)",
      logoColor: "#000",
      boxShadow:"3px 3px 3px #ddd"
    };
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/color/style.less");
.timeline {
  padding-top: 45px;
  width: 100%;
  min-height: @minHieght;
}
</style>