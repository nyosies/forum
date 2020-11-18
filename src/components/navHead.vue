<template>
  <div class="navHead" :style="{background:headbgColor}" style="transitionDuration:2s">
    <div class="navleft">
      <div class="logo" :style="{color:logoColor}">{{title}}</div>
      <slot name="left"></slot>
    </div>
    <div class="navright">
      <ul>
        <li v-for="item in navTitle" :key="item.id">
          <router-link :to="item.path" :style="{color:color}">{{item.title}}</router-link>
        </li>
      </ul>
    </div>
    <div class="menu">
      <div class="menu-item" @click="nowSmall">
        <i class="iconfont icon-caidan"></i>
      </div>
    </div>
    <!-- 右侧导航 -->
    <el-drawer title="Menus" :visible.sync="drawer" :with-header="false" :modal="false">
      <div class="menus">
        <div class="menus-personal">
          <div class="menus-after"></div>
        </div>
        <ul class="menus-item">
          <li v-for="item in navTitle" :key="item.id">
            <router-link :to="item.path">
              {{item.title}}
            </router-link>
          </li>
        </ul>
        <div class="menu-footer">Nkosies @2020 in N</div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  props: {
    navTitle: {
      type: Array,
      default:()=>[
        { id: 1, title: "首页", path: "/" },
        { id: 2, title: "博客", path: "/blog" },
        { id: 3, title: "时间线", path: "/timeline" },
        { id: 4, title: "关于", path: "/About" }
      ]
    },
    headbgColor: {
      type: String,
      default: "#2f3542"
    },
    title: {
      type: String,
      default: "Nkosies"
    },
    color: {
      type: String,
      default: "#fff"
    },
    logoColor:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      drawer: false
    };
  },
  created() {
    // console.log(this.navTitle);
  },
  mounted() {
    this.$nextTick(() => {
      window.onscroll = function() {
        var headerMain = document.querySelector(".navHead");
        if (window.pageYOffset >= 120) {
          headerMain.classList.add("headerMain-bg");
        } else {
          headerMain.classList.remove("headerMain-bg");
        }
      };
    });
  },
  methods: {
    nowSmall() {
      //  this.$emit('nowSmall',this.drawer)
      this.drawer = true;
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../assets/color/color.less");
.logo {
  color: #7ed6df;
}
.headerMain-bg {
  background: @headbgColor;
  transition-duration: 1s;
}
.navHead {
  z-index: 99;
  width: 100%;
  padding: 5px;
  //   position: sticky;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  .navleft {
    width: 40%;
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    display: flex;
    justify-content: flex-start;
    margin-left: 10%;
  }
  .navright {
    flex: 1;
    display: flex;
    justify-content: center;
    ul {
      list-style: none;
      color: @whiteFontColor;
      display: flex;
      li {
        cursor: pointer;
        font-size: @smallFont;
        margin-left: 36px;
        a {
          text-decoration: none;
          color: @whiteFontColor;
        }
      }
      & li a:hover {
        transition-duration: 1s;
        color: @selectFontColor;
      }
    }
  }
  .menus {
    height: 100%;
    background: @whiteFontColor;
    display: flex;
    flex-direction: column;
    .menus-personal {
      width: 100px;
      height: 100px;
      position: relative;
      padding-top: 40px;
      width: 100%;
      background: @graybg;
      display: flex;
      justify-content: center;
      align-items: center;
      .menus-after {
        width: 100px;
        height: 100px;
        background: #fff;
        border-radius: 50%;
        position: absolute;
        transform: translateY(10%);
      }
    }
    .menus-item {
      li {
        margin: 10px;
        padding: 5px;
        border-bottom: 1px solid @graybg;
        font-size: @smallFont;
        a{
          text-decoration: none;
           color: #57606f;
        }
        &:first-child {
          margin-top: 20px;
        }
        &:hover {
          color: #000;
          font-weight: bold;
        }
      }
    }
    .menu-footer {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      margin-bottom: 20px;
      font-size: @miniFont;
      color: @graybg;
    }
  }

  @media screen and (max-width: 780px) {
    .navright {
      background: aqua;
      // opacity: 0;
      display: none;
    }
    .navleft {
      margin-left: 10px;
    }
    .menu {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .menu-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        background: @whiteFontColor;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
  @media screen and (min-width: 780px) {
    .menu {
      display: none;
    }
  }
}
</style>