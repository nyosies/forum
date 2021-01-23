<template>
  <div class="index" ref="index">
    <NavBar :headbgColor="headbgColor" :drawer="drawer" @nowSmall="now" :title="msg">
      <!-- <template v-slot:left>
        <div class="Nkosies">{{msg}}</div>
      </template>-->
    </NavBar>
    <div class="index-core">
      <div class="banner">
        <div class="wow animate__animated animate__fadeInDown title">前端菜鸟!前端菜鸟!前端菜鸟</div>
        <transition>
          <div class="wow animate__animated animate__bounceInLeft introduce">star 快来开发</div>
        </transition>
      </div>
      <div class="next">
        <span class="next-item" @click="next">
          <i class="iconfont icon-xiayibu" />
        </span>
      </div>
    </div>
    <div class="middle wow animate__bounceInLeft animated bounceInLeft" ref="secondBox">
      <div class="middle_head">
        <h2 class="middle_title">热门博客 |</h2>
        <div class="card-box">
          <el-card
            v-for="item in [1,2,3]"
            :key="item"
            :body-style="{ padding: '0px' }"
            shadow="hover"
          >
            <div class="card_head">
              <img src="../assets/img/bgtimg.jpg" alt srcset />
              <div class="card_font">这是今日热门博客</div>
              <div class="more">
                go
                <i class="iconfont icon-icon-"></i>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div class="middle_body">
        <h2>个人简历</h2>
        <div class="tree">
          <div class="tree_frist">
            <div>1</div>
            <div></div>
          </div>
          <div class="tree_second">
            <div></div>
            <div>1</div>
          </div>
        </div>
        <div class="goBlog">
          <span @click="Inregister">前往博客</span>
        </div>
      </div>
      <div class="middle_footer">
        <!-- <nkFooter></nkFooter> -->
      </div>
    </div>
  </div>
</template>

<script>
import { WOW } from "wowjs";
// import NavBar from "../components/navHead";
import nkSwiper from "../components/nkSwiper";
import nkFooter from "../components/nkFooter";
export default {
  name: "Home",
  data() {
    return {
      msg: "Nkosies",
      loginIn: "",
      headbgColor: "",
      drawer: false
    };
  },
  components: {nkSwiper, nkFooter },
  created() {
    // document.querySelector('title').innerHTML='首页'
    // this.$req.commpontThis(this)
    this.$req.login.loginIn({
      method: "get",
      data: { account: "admin", password: "123456" },
      success: res => {
        console.log(666, res);
      }
    });
    //  this.Inregister()
  },
  mounted() {
    new WOW().init()
  },
  methods: {
    now(v) {
      this.drawer = v;
    },
    next() {
      this.$nextTick(() => {
        this.$refs.secondBox.scrollIntoView({ behavior: "smooth" });
      });
    },
    Inregister() {
      //        let data={
      //     account:'admin66',
      //     password:'123456'
      //  }
      //   this.$req.login.register({
      //     method:'post',
      //     data:data,
      //     success:(res)=>{
      //       console.log('res=>',res)
      //     }
      //   })
     this.$router.push("/blog");
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/color/color.less");
@paddingLR: 50px 75px;
.index {
  width: 100%;
  .index-core {
    box-sizing: border-box;
    width: 100%;
    min-height: 100vh;
    background: url(../assets/img/timg.jpg) no-repeat;
    // background-size: 100% 100%;
    background-size:cover;

    
    background-attachment: fixed;
    background-position: center;
    color: @whiteFontColor;
    display: flex;
    flex-direction: column;
    .banner {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .introduce {
        font-size: @Font;
        font-family: @fontType;
      }
    }
    .next {
      display: flex;
      justify-content: center;
      align-items: center;
      transform: rotate(90deg);
      margin-bottom: 50px;
      box-sizing: border-box;
      .next-item {
        display: flex;
        justify-content: center;
        z-index: 22;
        // animation: nexts 3s linear 2s all;
        animation-name: aniNext;
        animation-duration: 2s;
        animation-delay: 1s;
        animation-iteration-count: infinite;
        cursor: pointer;
        .icon-xiayibu {
          font-size: 36px;
          color: #1e90ff;
        }
      }
    }
  }
  .title {
    margin-bottom: 20px;
    font-size: @bigFont;
    font-family: @fontType;
  }

  .middle {
    // height: 100vh;
    background: #f5f5f5;
    color: @whiteFontColor;
    display: flex;
    flex-direction: column;
    align-items: center;
    .middle_head {
      box-sizing: border-box;
      padding: @paddingLR;
      color: #000;
      .card-box {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .card_head {
          cursor: pointer;
          border: 1px solid #ddd;
          img {
            width: 100%;
            height: 200px;
            &:hover {
              transform: scale(50%);
            }
          }
          .card_font {
            font-size: @smallFont;
            color: @blackFont;
            padding: 10px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .more {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin: 0 10px 10px 0;
            text-transform: uppercase;
            font-size: @miniFont;
            &:hover {
              transition-duration: 0.6s;
              color: #f67000;
              font-weight: bold;
            }
          }
        }
        .el-card {
          width: 260px;
          margin-left: 20px;
          &:nth-child(odd) {
            animation-name: card;
            animation-duration: 2s;
            animation-delay: 6;
            animation-iteration-count: 1;
          }
        }
      }
    }
    .middle_body {
      box-sizing: border-box;
      width: 100%;
      background: #d65050;
      padding: @paddingLR;
      h2 {
        margin-bottom: 40px;
        text-align: center;
      }
      .tree {
        position: relative;
        box-sizing: border-box;
        &::after {
          content: "";
          position: absolute;
          top: 0;
          right: 50%;
          width: 6px;
          height: 100%;
          background: #fff;
        }
        .tree_frist {
          display: flex;
          justify-content: center;
          div {
            display: flex;
            justify-content: center;
            width: 30%;
            height: 200px;
            &:nth-child(odd) {
              box-sizing: border-box;
              border-radius: 15px;
              background-color: #fff;
              margin-right: 60px;
            }
            // &:nth-child(even) {
            //   border-left: 6px solid #fff;
            // }
          }
        }
        .tree_second {
          display: flex;
          justify-content: center;
          div {
            display: flex;
            justify-content: center;
            width: 30%;
            height: 200px;
            // &:nth-child(odd) {
            //   border-right: 6px solid #fff;
            //   margin-left:25px;
            // }
            &:nth-child(even) {
              box-sizing: border-box;
              border-radius: 15px;
              border: 2px solid #ebebeb;
              padding: 15px;
              background-color: #fff;
              margin-left: 60px;
              margin-bottom: 20px;
            }
          }
        }
      }
    }
    .goBlog {
      margin-top: 68px;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        cursor: pointer;
        padding: 15px 30px;
        border: 1px solid @whiteFontColor;
        transition-duration: 2s;
        &:hover {
          background: @blackFont;
          color: @whiteFontColor;
        }
      }
    }
    .middle_footer {
      width: 100%;
      // height: 80px;
      // background: #747d8c;
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
        color: #57606f;
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
    .index-core {
      .title {
        margin-bottom: 20px;
        font-family: @fontType;
        color: @whiteFontColor;
        font-size: 20px;
      }
      .banner {
        .introduce {
          font-size: @smallFont;
          font-size: 16px;
          color: #dfe4ea;
        }
      }
    }
    .middle {
      .middle_title {
        font-size: @smallFont;
        font-family: @fontType;
        color: @blackFont;
        margin-left: 10px;
      }
      .middle_head {
        padding: 10px;
        .card-box {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          // align-items: center;
          .el-card {
            width: 90%;
            margin-bottom: 10px;
          }
        }
      }
      .middle_body {
        box-sizing: border-box;
        padding: 10px;
        .tree {
          position: relative;
          box-sizing: border-box;
          &::after {
            content: "";
            position: absolute;
            top: 0;
            right: 50%;
            width: 3px;
            height: 100%;
            background: #fff;
          }
          .tree_frist,
          .tree_second {
            div {
              width: 80%;
              height: 150px;
            }
          }
          .goBlog {
            span {
              padding: 10px 30px;
            }
          }
        }
      }
    }
  }
}
h2 {
  color: #2f3542;
}
@keyframes aniNext {
  from {
    transform: translateX(0);
  }
  50% {
    transform: translateX(50%);
  }
  to {
    transform: translateX(0%);
  }
}
@keyframes card {
  from {
    transform: translateY(20%);
  }
  to {
    transform: translateY(0%);
  }
}
</style>